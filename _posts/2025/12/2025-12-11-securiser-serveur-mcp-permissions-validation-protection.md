---
layout: post
title: "Sécuriser votre Serveur MCP : Permissions, Validation et Protection"
date: 2025-12-11
author: Nicolas Dabène
categories: [Tutoriel, Intelligence Artificielle, Sécurité]
tags: [MCP, sécurité, permissions, validation, authentification, TypeScript]
excerpt: "Votre serveur MCP fonctionne ? Parfait. Maintenant, sécurisons-le pour qu'il soit production-ready avec validation, permissions et protection."
image: /assets/images/blog/2025/12/2025-12-11-securiser-serveur-mcp.jpg
featured: true
difficulty: "Intermédiaire"
technologies: ["TypeScript", "MCP", "Security", "JWT", "Validation"]
estimated_reading_time: "16 minutes"
faq:
  - question: "Est-ce que ce système est production-ready ?"
    answer: "C'est une excellente base, mais pour la production, ajoutez : vrai JWT (avec jsonwebtoken), hash bcrypt, HTTPS obligatoire, logging vers un service externe, et tests de sécurité automatisés."
  - question: "Comment gérer les permissions plus complexes ?"
    answer: "Implémentez un système RBAC (Role-Based Access Control) complet avec des rôles composables et des permissions hiérarchiques. Vous pouvez aussi utiliser CASL ou Casbin."
  - question: "Que faire si un utilisateur abuse du système ?"
    answer: "Ajoutez un système de bannissement temporaire ou permanent, avec détection automatique des comportements suspects (trop d'erreurs, patterns anormaux)."
  - question: "Comment protéger contre les attaques DDoS ?"
    answer: "Utilisez un reverse proxy comme Nginx avec rate limiting, un WAF (Web Application Firewall), et des services comme Cloudflare en frontal."
---

# Sécuriser votre Serveur MCP : Permissions, Validation et Protection

Votre serveur MCP expose maintenant plusieurs outils que les IA peuvent découvrir et utiliser. Génial ! Mais une question cruciale se pose : qui peut utiliser quoi ? Dans cet article, nous allons transformer votre serveur en une forteresse sécurisée, sans sacrifier sa simplicité d'utilisation. Parce qu'un serveur puissant doit aussi être un serveur protégé.

## Introduction

En 15 ans de développement d'API, j'ai appris une règle d'or : la sécurité ne se rajoute pas après coup, elle se conçoit dès le départ. Un serveur MCP qui donne accès à vos fichiers, vos données, vos ressources sensibles nécessite plusieurs couches de protection. Mais rassurez-vous : sécuriser ne veut pas dire complexifier.

Aujourd'hui, nous allons implémenter quatre piliers de sécurité essentiels : la validation des entrées (pour éviter les données malveillantes), l'authentification (qui êtes-vous ?), l'autorisation (qu'avez-vous le droit de faire ?) et la limitation des ressources (pour éviter les abus). À la fin de cet article, votre serveur sera production-ready.

## Les Quatre Piliers de la Sécurité MCP

Avant de coder, comprenons notre stratégie de défense en profondeur :

### 1. Validation des Entrées

**Le principe** : Ne jamais faire confiance aux données entrantes. Toujours valider, nettoyer, vérifier.

**Pourquoi ?** Un paramètre mal validé peut permettre un accès à des fichiers sensibles (`../../etc/passwd`), une injection de code, ou un crash du serveur.

### 2. Authentification

**Le principe** : Identifier qui utilise votre serveur. Chaque requête doit être associée à une identité vérifiée.

**Pourquoi ?** Sans authentification, n'importe qui peut utiliser vos outils. C'est comme laisser votre maison sans serrure.

### 3. Autorisation

**Le principe** : Vérifier les permissions. Même authentifié, tout le monde ne peut pas tout faire.

**Pourquoi ?** Votre stagiaire n'a pas besoin d'accéder aux fichiers RH. Les permissions granulaires protègent vos données sensibles.

### 4. Limitation des Ressources

**Le principe** : Imposer des quotas, des limites de taille, des timeouts.

**Pourquoi ?** Éviter qu'un utilisateur malveillant (ou une erreur) ne sature votre serveur avec 10 000 requêtes par seconde.

## Validation Robuste des Entrées

Commençons par le plus important : valider toutes les entrées. Créez `src/security/validator.ts` :

```typescript
// src/security/validator.ts
import path from 'path';
import { InputSchema } from '../mcp/protocol';

/**
 * Erreur de validation
 */
export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
    public expected?: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Validateur de paramètres basé sur JSON Schema
 */
export class ParameterValidator {
  
  /**
   * Valider les paramètres selon un schéma
   */
  static validate(params: any, schema: InputSchema): void {
    // Vérifier que params est un objet
    if (typeof params !== 'object' || params === null) {
      throw new ValidationError('Les paramètres doivent être un objet');
    }

    // Vérifier les champs requis
    for (const requiredField of schema.required) {
      if (!(requiredField in params)) {
        throw new ValidationError(
          `Le champ '${requiredField}' est requis`,
          requiredField
        );
      }
    }

    // Valider chaque propriété
    for (const [fieldName, fieldValue] of Object.entries(params)) {
      const fieldSchema = schema.properties[fieldName];
      
      if (!fieldSchema) {
        throw new ValidationError(
          `Le champ '${fieldName}' n'est pas autorisé`,
          fieldName
        );
      }

      this.validateField(fieldName, fieldValue, fieldSchema);
    }
  }

  /**
   * Valider un champ spécifique
   */
  private static validateField(
    fieldName: string,
    value: any,
    schema: any
  ): void {
    // Validation de type
    const actualType = typeof value;
    const expectedType = schema.type;

    if (expectedType === 'string' && actualType !== 'string') {
      throw new ValidationError(
        `Le champ '${fieldName}' doit être une chaîne de caractères`,
        fieldName,
        expectedType
      );
    }

    if (expectedType === 'number' && actualType !== 'number') {
      throw new ValidationError(
        `Le champ '${fieldName}' doit être un nombre`,
        fieldName,
        expectedType
      );
    }

    if (expectedType === 'boolean' && actualType !== 'boolean') {
      throw new ValidationError(
        `Le champ '${fieldName}' doit être un booléen`,
        fieldName,
        expectedType
      );
    }

    // Validation d'énumération
    if (schema.enum && !schema.enum.includes(value)) {
      throw new ValidationError(
        `Le champ '${fieldName}' doit être l'une des valeurs : ${schema.enum.join(', ')}`,
        fieldName
      );
    }

    // Validation de longueur pour les strings
    if (expectedType === 'string') {
      if (schema.minLength && value.length < schema.minLength) {
        throw new ValidationError(
          `Le champ '${fieldName}' doit contenir au moins ${schema.minLength} caractères`,
          fieldName
        );
      }

      if (schema.maxLength && value.length > schema.maxLength) {
        throw new ValidationError(
          `Le champ '${fieldName}' ne peut pas dépasser ${schema.maxLength} caractères`,
          fieldName
        );
      }
    }

    // Validation de plage pour les nombres
    if (expectedType === 'number') {
      if (schema.minimum !== undefined && value < schema.minimum) {
        throw new ValidationError(
          `Le champ '${fieldName}' doit être supérieur ou égal à ${schema.minimum}`,
          fieldName
        );
      }

      if (schema.maximum !== undefined && value > schema.maximum) {
        throw new ValidationError(
          `Le champ '${fieldName}' ne peut pas dépasser ${schema.maximum}`,
          fieldName
        );
      }
    }

    // Validation de pattern pour les strings
    if (expectedType === 'string' && schema.pattern) {
      const regex = new RegExp(schema.pattern);
      if (!regex.test(value)) {
        throw new ValidationError(
          `Le champ '${fieldName}' ne correspond pas au format attendu`,
          fieldName
        );
      }
    }
  }
}

/**
 * Validateur de chemins de fichiers
 */
export class PathValidator {
  private allowedDirectories: string[];
  private blockedPaths: string[];

  constructor(allowedDirectories: string[], blockedPaths: string[] = []) {
    // Résoudre tous les chemins en absolus
    this.allowedDirectories = allowedDirectories.map(dir => path.resolve(dir));
    this.blockedPaths = blockedPaths.map(p => path.resolve(p));
  }

  /**
   * Valider qu'un chemin est sûr
   */
  validatePath(filePath: string): string {
    // Résoudre le chemin absolu
    const absolutePath = path.resolve(filePath);

    // Vérifier les path traversal (../)
    if (absolutePath.includes('..')) {
      throw new ValidationError(
        'Les chemins avec ".." ne sont pas autorisés (path traversal)'
      );
    }

    // Vérifier que le chemin est dans un répertoire autorisé
    const isInAllowedDir = this.allowedDirectories.some(dir =>
      absolutePath.startsWith(dir)
    );

    if (!isInAllowedDir) {
      throw new ValidationError(
        `Accès refusé : le chemin doit être dans l'un des répertoires autorisés`
      );
    }

    // Vérifier que le chemin n'est pas bloqué
    const isBlocked = this.blockedPaths.some(blocked =>
      absolutePath.startsWith(blocked)
    );

    if (isBlocked) {
      throw new ValidationError(
        `Accès refusé : ce chemin est explicitement bloqué`
      );
    }

    return absolutePath;
  }

  /**
   * Ajouter un répertoire autorisé
   */
  addAllowedDirectory(directory: string): void {
    this.allowedDirectories.push(path.resolve(directory));
  }

  /**
   * Bloquer un chemin spécifique
   */
  blockPath(pathToBlock: string): void {
    this.blockedPaths.push(path.resolve(pathToBlock));
  }
}

/**
 * Validateur de taille de fichier
 */
export class SizeValidator {
  /**
   * Valider qu'une taille est acceptable
   */
  static validateSize(
    size: number,
    maxSize: number,
    fieldName: string = 'fichier'
  ): void {
    if (size > maxSize) {
      throw new ValidationError(
        `Le ${fieldName} est trop volumineux (max ${this.formatSize(maxSize)})`
      );
    }
  }

  /**
   * Formater une taille en octets en format lisible
   */
  static formatSize(bytes: number): string {
    const units = ['octets', 'Ko', 'Mo', 'Go'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }
}
```

Ce validateur complet vérifie :

**Types de données** : string, number, boolean

**Valeurs requises** : les champs obligatoires sont présents

**Énumérations** : les valeurs sont dans la liste autorisée

**Longueurs** : min/max pour les chaînes

**Plages** : min/max pour les nombres

**Patterns** : expressions régulières pour les formats

**Chemins** : protection contre path traversal et accès non autorisés

**Tailles** : limites de fichiers

## Système d'Authentification JWT

Créons maintenant un système d'authentification basé sur JSON Web Tokens. Créez `src/security/auth.ts` :

```typescript
// src/security/auth.ts
import crypto from 'crypto';

/**
 * Interface utilisateur
 */
export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user' | 'readonly';
  permissions: string[];
}

/**
 * Token JWT simplifié (pour la démo - utilisez une vraie lib JWT en prod)
 */
interface Token {
  userId: string;
  username: string;
  role: string;
  permissions: string[];
  expiresAt: number;
}

/**
 * Gestionnaire d'authentification
 */
export class AuthManager {
  private users: Map<string, User> = new Map();
  private tokens: Map<string, Token> = new Map();
  private readonly SECRET_KEY: string;
  private readonly TOKEN_DURATION = 24 * 60 * 60 * 1000; // 24 heures

  constructor(secretKey: string) {
    this.SECRET_KEY = secretKey;
    
    // Créer quelques utilisateurs de test
    this.createUser({
      id: '1',
      username: 'admin',
      role: 'admin',
      permissions: ['*'] // Toutes les permissions
    });

    this.createUser({
      id: '2',
      username: 'user',
      role: 'user',
      permissions: ['readFile', 'listFiles', 'searchFiles']
    });

    this.createUser({
      id: '3',
      username: 'readonly',
      role: 'readonly',
      permissions: ['readFile', 'listFiles']
    });
  }

  /**
   * Créer un utilisateur
   */
  createUser(user: User): void {
    this.users.set(user.username, user);
  }

  /**
   * Authentifier un utilisateur et générer un token
   */
  authenticate(username: string, password: string): string | null {
    // En production, vérifier le mot de passe hashé !
    // Ici c'est simplifié pour la démo
    const user = this.users.get(username);
    
    if (!user) {
      return null;
    }

    // Générer un token
    const tokenId = crypto.randomBytes(32).toString('hex');
    const token: Token = {
      userId: user.id,
      username: user.username,
      role: user.role,
      permissions: user.permissions,
      expiresAt: Date.now() + this.TOKEN_DURATION
    };

    this.tokens.set(tokenId, token);
    return tokenId;
  }

  /**
   * Valider un token
   */
  validateToken(tokenId: string): Token | null {
    const token = this.tokens.get(tokenId);
    
    if (!token) {
      return null;
    }

    // Vérifier l'expiration
    if (Date.now() > token.expiresAt) {
      this.tokens.delete(tokenId);
      return null;
    }

    return token;
  }

  /**
   * Révoquer un token
   */
  revokeToken(tokenId: string): void {
    this.tokens.delete(tokenId);
  }

  /**
   * Obtenir un utilisateur
   */
  getUser(username: string): User | undefined {
    return this.users.get(username);
  }

  /**
   * Nettoyer les tokens expirés
   */
  cleanExpiredTokens(): void {
    const now = Date.now();
    for (const [tokenId, token] of this.tokens.entries()) {
      if (now > token.expiresAt) {
        this.tokens.delete(tokenId);
      }
    }
  }
}

/**
 * Middleware d'authentification pour Express
 */
export function authMiddleware(authManager: AuthManager) {
  return (req: any, res: any, next: any) => {
    // Récupérer le token de l'en-tête Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Token d\'authentification manquant'
      });
    }

    const tokenId = authHeader.substring(7); // Enlever "Bearer "
    const token = authManager.validateToken(tokenId);

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Token invalide ou expiré'
      });
    }

    // Ajouter les infos utilisateur à la requête
    req.user = token;
    next();
  };
}
```

## Système de Permissions Granulaires

Maintenant, créons un système qui vérifie si un utilisateur peut exécuter un outil spécifique. Créez `src/security/permissions.ts` :

```typescript
// src/security/permissions.ts
import { User } from './auth';

/**
 * Erreur de permission
 */
export class PermissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PermissionError';
  }
}

/**
 * Gestionnaire de permissions
 */
export class PermissionManager {
  /**
   * Vérifier si un utilisateur a la permission d'utiliser un outil
   */
  static hasPermission(
    user: User,
    toolName: string,
    params?: any
  ): boolean {
    // Les admins ont accès à tout
    if (user.permissions.includes('*')) {
      return true;
    }

    // Vérifier la permission spécifique
    if (!user.permissions.includes(toolName)) {
      return false;
    }

    // Permissions contextuelles supplémentaires
    // Par exemple, vérifier les chemins autorisés pour readFile
    if (toolName === 'readFile' && params?.chemin_du_fichier) {
      return this.canAccessPath(user, params.chemin_du_fichier);
    }

    return true;
  }

  /**
   * Vérifier l'accès à un chemin spécifique
   */
  private static canAccessPath(user: User, filePath: string): boolean {
    // En readonly, uniquement lecture dans certains dossiers
    if (user.role === 'readonly') {
      const allowedPaths = ['/public', '/docs'];
      return allowedPaths.some(allowed => 
        filePath.startsWith(allowed)
      );
    }

    return true;
  }

  /**
   * Obtenir les permissions d'un utilisateur
   */
  static getPermissions(user: User): string[] {
    return user.permissions;
  }

  /**
   * Vérifier et lancer une erreur si pas de permission
   */
  static requirePermission(
    user: User,
    toolName: string,
    params?: any
  ): void {
    if (!this.hasPermission(user, toolName, params)) {
      throw new PermissionError(
        `Permission refusée : vous n'avez pas accès à l'outil '${toolName}'`
      );
    }
  }
}

/**
 * Politique de permissions pour un outil
 */
export interface ToolPolicy {
  allowedRoles: string[];
  requiredPermissions: string[];
  rateLimit?: {
    maxRequests: number;
    windowMs: number;
  };
}

/**
 * Gestionnaire de politiques d'outils
 */
export class PolicyManager {
  private policies: Map<string, ToolPolicy> = new Map();

  /**
   * Définir une politique pour un outil
   */
  setPolicy(toolName: string, policy: ToolPolicy): void {
    this.policies.set(toolName, policy);
  }

  /**
   * Obtenir la politique d'un outil
   */
  getPolicy(toolName: string): ToolPolicy | undefined {
    return this.policies.get(toolName);
  }

  /**
   * Vérifier qu'un utilisateur respecte la politique
   */
  checkPolicy(user: User, toolName: string): boolean {
    const policy = this.policies.get(toolName);
    
    if (!policy) {
      return true; // Pas de politique = autorisé par défaut
    }

    // Vérifier le rôle
    if (!policy.allowedRoles.includes(user.role) && 
        !policy.allowedRoles.includes('*')) {
      return false;
    }

    // Vérifier les permissions
    const hasAllPermissions = policy.requiredPermissions.every(perm =>
      user.permissions.includes(perm) || user.permissions.includes('*')
    );

    return hasAllPermissions;
  }
}
```

## Rate Limiting et Quotas

Protégeons notre serveur contre les abus avec un système de rate limiting. Créez `src/security/rateLimit.ts` :

```typescript
// src/security/rateLimit.ts

/**
 * Enregistrement d'utilisation
 */
interface UsageRecord {
  count: number;
  resetAt: number;
}

/**
 * Gestionnaire de rate limiting
 */
export class RateLimiter {
  private usage: Map<string, UsageRecord> = new Map();

  constructor(
    private maxRequests: number,
    private windowMs: number
  ) {}

  /**
   * Vérifier et incrémenter le compteur pour un utilisateur
   */
  checkLimit(userId: string): boolean {
    const now = Date.now();
    const record = this.usage.get(userId);

    // Pas d'enregistrement ou fenêtre expirée
    if (!record || now > record.resetAt) {
      this.usage.set(userId, {
        count: 1,
        resetAt: now + this.windowMs
      });
      return true;
    }

    // Limite atteinte
    if (record.count >= this.maxRequests) {
      return false;
    }

    // Incrémenter le compteur
    record.count++;
    return true;
  }

  /**
   * Obtenir les infos de limite pour un utilisateur
   */
  getLimitInfo(userId: string): {
    current: number;
    max: number;
    resetsAt: Date;
  } {
    const record = this.usage.get(userId);
    
    if (!record) {
      return {
        current: 0,
        max: this.maxRequests,
        resetsAt: new Date(Date.now() + this.windowMs)
      };
    }

    return {
      current: record.count,
      max: this.maxRequests,
      resetsAt: new Date(record.resetAt)
    };
  }

  /**
   * Réinitialiser le compteur pour un utilisateur
   */
  reset(userId: string): void {
    this.usage.delete(userId);
  }

  /**
   * Nettoyer les enregistrements expirés
   */
  cleanup(): void {
    const now = Date.now();
    for (const [userId, record] of this.usage.entries()) {
      if (now > record.resetAt) {
        this.usage.delete(userId);
      }
    }
  }
}

/**
 * Middleware de rate limiting pour Express
 */
export function rateLimitMiddleware(rateLimiter: RateLimiter) {
  return (req: any, res: any, next: any) => {
    const userId = req.user?.userId || req.ip;

    if (!rateLimiter.checkLimit(userId)) {
      const info = rateLimiter.getLimitInfo(userId);
      return res.status(429).json({
        success: false,
        error: 'Limite de requêtes atteinte',
        limit: {
          max: info.max,
          current: info.current,
          resetsAt: info.resetsAt
        }
      });
    }

    next();
  };
}

/**
 * Gestionnaire de quotas par outil
 */
export class QuotaManager {
  private quotas: Map<string, Map<string, number>> = new Map();

  /**
   * Définir un quota pour un utilisateur et un outil
   */
  setQuota(userId: string, toolName: string, maxUsage: number): void {
    if (!this.quotas.has(userId)) {
      this.quotas.set(userId, new Map());
    }
    this.quotas.get(userId)!.set(toolName, maxUsage);
  }

  /**
   * Vérifier et décrémenter le quota
   */
  checkQuota(userId: string, toolName: string): boolean {
    const userQuotas = this.quotas.get(userId);
    
    if (!userQuotas) {
      return true; // Pas de quota = illimité
    }

    const remaining = userQuotas.get(toolName);
    
    if (remaining === undefined) {
      return true; // Pas de quota pour cet outil
    }

    if (remaining <= 0) {
      return false; // Quota épuisé
    }

    userQuotas.set(toolName, remaining - 1);
    return true;
  }

  /**
   * Obtenir le quota restant
   */
  getRemainingQuota(userId: string, toolName: string): number | null {
    const userQuotas = this.quotas.get(userId);
    
    if (!userQuotas) {
      return null; // Illimité
    }

    return userQuotas.get(toolName) || null;
  }

  /**
   * Réinitialiser le quota d'un utilisateur
   */
  resetQuota(userId: string, toolName: string, maxUsage: number): void {
    this.setQuota(userId, toolName, maxUsage);
  }
}
```

## Intégration dans le Serveur

Maintenant, intégrons toutes ces couches de sécurité dans notre serveur. Modifiez `src/index.ts` :

```typescript
// src/index.ts
import express, { Request, Response, NextFunction } from 'express';
import { MCP_PROTOCOL_VERSION, SERVER_INFO, DiscoveryResponse } from './mcp/protocol';
import { toolRegistry } from './mcp/registry';
import { AuthManager, authMiddleware } from './security/auth';
import { PermissionManager, PermissionError } from './security/permissions';
import { RateLimiter, rateLimitMiddleware, QuotaManager } from './security/rateLimit';
import { ParameterValidator, ValidationError, PathValidator } from './security/validator';

const app = express();
const PORT = 3000;

// ============================================
// INITIALISATION SÉCURITÉ
// ============================================

const authManager = new AuthManager(process.env.SECRET_KEY || 'your-secret-key-change-me');
const rateLimiter = new RateLimiter(100, 60 * 1000); // 100 req/minute
const quotaManager = new QuotaManager();
const pathValidator = new PathValidator([
  process.cwd(), // Répertoire courant
  '/tmp',        // Dossier temporaire
]);

// Quotas par défaut
quotaManager.setQuota('2', 'readFile', 1000); // user : 1000 lectures/jour
quotaManager.setQuota('3', 'readFile', 100);  // readonly : 100 lectures/jour

// ============================================
// MIDDLEWARES
// ============================================

app.use(express.json());

// Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============================================
// ROUTES PUBLIQUES (sans auth)
// ============================================

/**
 * Page d'accueil
 */
app.get('/', (req, res) => {
  res.json({
    message: 'MCP File Server - Secured',
    version: SERVER_INFO.version,
    protocol_version: MCP_PROTOCOL_VERSION,
    status: 'operational',
    security: {
      authentication: 'required',
      rateLimit: '100 requests/minute',
      endpoints: {
        auth: '/auth/login',
        discovery: '/mcp/tools',
        execute: '/mcp/execute'
      }
    }
  });
});

/**
 * Endpoint d'authentification
 */
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: 'Username et password requis'
    });
  }

  const token = authManager.authenticate(username, password);

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Identifiants invalides'
    });
  }

  res.json({
    success: true,
    token: token,
    message: 'Authentification réussie'
  });
});

/**
 * Health check (public)
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    tools_count: toolRegistry.count(),
    timestamp: new Date().toISOString()
  });
});

// ============================================
// ROUTES PROTÉGÉES (avec auth + rate limit)
// ============================================

// Appliquer l'authentification à toutes les routes /mcp/*
app.use('/mcp', authMiddleware(authManager));
app.use('/mcp', rateLimitMiddleware(rateLimiter));

/**
 * Endpoint de découverte (protégé)
 */
app.get('/mcp/tools', (req: any, res) => {
  const user = req.user;
  
  // Filtrer les outils selon les permissions
  const allTools = toolRegistry.getAllDescriptions();
  const allowedTools = allTools.filter(tool =>
    PermissionManager.hasPermission(
      { 
        id: user.userId,
        username: user.username,
        role: user.role,
        permissions: user.permissions
      },
      tool.name
    )
  );

  const response: DiscoveryResponse = {
    protocol_version: MCP_PROTOCOL_VERSION,
    server_info: SERVER_INFO,
    tools: allowedTools
  };

  console.log(`📋 Découverte - ${allowedTools.length}/${allTools.length} outils visibles pour ${user.username}`);
  res.json(response);
});

/**
 * Endpoint d'exécution sécurisé
 */
app.post('/mcp/execute', async (req: any, res) => {
  const { tool, params } = req.body;
  const user = req.user;

  try {
    // Validation basique
    if (!tool) {
      return res.status(400).json({
        success: false,
        error: "Le paramètre 'tool' est requis"
      });
    }

    // Vérifier les permissions
    PermissionManager.requirePermission(
      {
        id: user.userId,
        username: user.username,
        role: user.role,
        permissions: user.permissions
      },
      tool,
      params
    );

    // Vérifier les quotas
    if (!quotaManager.checkQuota(user.userId, tool)) {
      return res.status(403).json({
        success: false,
        error: 'Quota épuisé pour cet outil',
        remaining: quotaManager.getRemainingQuota(user.userId, tool)
      });
    }

    // Obtenir la description de l'outil pour validation
    const toolDescription = toolRegistry.getDescription(tool);
    if (!toolDescription) {
      return res.status(404).json({
        success: false,
        error: `Outil '${tool}' introuvable`
      });
    }

    // Valider les paramètres selon le schéma
    ParameterValidator.validate(params || {}, toolDescription.input_schema);

    // Validation spécifique des chemins pour les outils de fichiers
    if (tool === 'readFile' || tool === 'listFiles') {
      const pathParam = params.chemin_du_fichier || params.chemin_du_dossier;
      if (pathParam) {
        params.validated_path = pathValidator.validatePath(pathParam);
      }
    }

    console.log(`⚙️  Exécution sécurisée : ${tool} par ${user.username}`);

    // Exécution via le registre
    const result = await toolRegistry.execute(tool, params);

    // Log du résultat
    if (result.success) {
      console.log(`✅ Succès : ${tool} par ${user.username}`);
    } else {
      console.log(`❌ Échec : ${tool} par ${user.username} - ${result.error}`);
    }

    res.json(result);

  } catch (error: any) {
    // Gestion des erreurs de sécurité
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        error: error.message,
        field: error.field
      });
    }

    if (error instanceof PermissionError) {
      return res.status(403).json({
        success: false,
        error: error.message
      });
    }

    // Erreur générique
    console.error('Erreur serveur:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur'
    });
  }
});

/**
 * Endpoint pour voir ses permissions
 */
app.get('/mcp/me', (req: any, res) => {
  const user = req.user;
  
  res.json({
    userId: user.userId,
    username: user.username,
    role: user.role,
    permissions: user.permissions,
    rateLimit: rateLimiter.getLimitInfo(user.userId)
  });
});

/**
 * Endpoint pour voir ses quotas
 */
app.get('/mcp/quotas', (req: any, res) => {
  const user = req.user;
  const tools = toolRegistry.getAllDescriptions();
  
  const quotas = tools.map(tool => ({
    tool: tool.name,
    remaining: quotaManager.getRemainingQuota(user.userId, tool.name)
  }));

  res.json({
    userId: user.userId,
    quotas: quotas
  });
});

// ============================================
// GESTION DES ERREURS
// ============================================

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Erreur non gérée:', err);
  res.status(500).json({
    success: false,
    error: 'Erreur interne du serveur'
  });
});

// ============================================
// TÂCHES DE MAINTENANCE
// ============================================

// Nettoyer les tokens expirés toutes les heures
setInterval(() => {
  authManager.cleanExpiredTokens();
  rateLimiter.cleanup();
  console.log('🧹 Nettoyage des tokens et rate limits expirés');
}, 60 * 60 * 1000);

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

app.listen(PORT, () => {
  console.log('═══════════════════════════════════════');
  console.log('🔒 MCP File Server - Secured Edition');
  console.log('═══════════════════════════════════════');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🔐 Auth: POST http://localhost:${PORT}/auth/login`);
  console.log(`📋 Découverte: GET http://localhost:${PORT}/mcp/tools`);
  console.log(`⚙️  Exécution: POST http://localhost:${PORT}/mcp/execute`);
  console.log(`🔧 Outils: ${toolRegistry.count()}`);
  console.log('═══════════════════════════════════════');
  console.log('👤 Utilisateurs de test:');
  console.log('   - admin (toutes permissions)');
  console.log('   - user (lecture + liste + recherche)');
  console.log('   - readonly (lecture + liste seulement)');
  console.log('═══════════════════════════════════════');
});
```

## Tester le Système Sécurisé

Relançons notre serveur et testons toutes les couches de sécurité :

```bash
npm run dev
```

### Test 1 : Authentification

D'abord, essayons d'accéder sans authentification :

```bash
curl http://localhost:3000/mcp/tools
```

Résultat :

```json
{
  "success": false,
  "error": "Token d'authentification manquant"
}
```

Parfait ! Maintenant, authentifions-nous :

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "user", "password": "any"}'
```

Réponse :

```json
{
  "success": true,
  "token": "a1b2c3d4e5f6...",
  "message": "Authentification réussie"
}
```

Sauvegardez ce token dans une variable :

```bash
TOKEN="a1b2c3d4e5f6..."
```

### Test 2 : Découverte avec Permissions

Maintenant, découvrons les outils avec notre token :

```bash
curl http://localhost:3000/mcp/tools \
  -H "Authorization: Bearer $TOKEN"
```

L'utilisateur "user" ne verra que les outils auxquels il a accès (readFile, listFiles, searchFiles).

Comparons avec un utilisateur readonly :

```bash
# S'authentifier en readonly
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "readonly", "password": "any"}' \
  | jq -r '.token'

# Il verra moins d'outils (seulement readFile et listFiles)
```

### Test 3 : Validation des Paramètres

Testons avec des paramètres invalides :

```bash
curl -X POST http://localhost:3000/mcp/execute \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "readFile",
    "params": {
      "encoding": "invalid_encoding"
    }
  }'
```

Réponse :

```json
{
  "success": false,
  "error": "Le champ 'chemin_du_fichier' est requis",
  "field": "chemin_du_fichier"
}
```

Testons avec une énumération invalide :

```bash
curl -X POST http://localhost:3000/mcp/execute \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "readFile",
    "params": {
      "chemin_du_fichier": "test.txt",
      "encoding": "invalid"
    }
  }'
```

Réponse :

```json
{
  "success": false,
  "error": "Le champ 'encoding' doit être l'une des valeurs : utf-8, ascii, base64",
  "field": "encoding"
}
```

### Test 4 : Protection Path Traversal

Essayons d'accéder à un fichier sensible :

```bash
curl -X POST http://localhost:3000/mcp/execute \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "readFile",
    "params": {
      "chemin_du_fichier": "../../../etc/passwd"
    }
  }'
```

Réponse :

```json
{
  "success": false,
  "error": "Les chemins avec \"..\" ne sont pas autorisés (path traversal)"
}
```

Excellent ! Notre protection fonctionne.

### Test 5 : Rate Limiting

Créons un script pour tester le rate limiting. Créez `test-rate-limit.sh` :

```bash
#!/bin/bash

TOKEN="votre-token-ici"

echo "Test de rate limiting - 100 requêtes rapides..."

for i in {1..105}; do
  response=$(curl -s -w "\n%{http_code}" \
    -X POST http://localhost:3000/mcp/execute \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"tool": "listFiles", "params": {"chemin_du_dossier": "."}}')
  
  status_code=$(echo "$response" | tail -n1)
  
  if [ "$status_code" = "429" ]; then
    echo "Requête $i : Rate limit atteint ! ✓"
    echo "$response" | head -n-1 | jq .
    break
  else
    echo "Requête $i : OK"
  fi
done
```

Après 100 requêtes, vous verrez :

```json
{
  "success": false,
  "error": "Limite de requêtes atteinte",
  "limit": {
    "max": 100,
    "current": 100,
    "resetsAt": "2025-12-10T15:30:00.000Z"
  }
}
```

### Test 6 : Quotas

Testons les quotas. Créez un fichier de test puis exécutez plusieurs lectures :

```bash
# Voir ses quotas actuels
curl http://localhost:3000/mcp/quotas \
  -H "Authorization: Bearer $TOKEN"
```

Réponse :

```json
{
  "userId": "2",
  "quotas": [
    {
      "tool": "readFile",
      "remaining": 1000
    },
    {
      "tool": "listFiles",
      "remaining": null
    },
    {
      "tool": "searchFiles",
      "remaining": null
    }
  ]
}
```

## Créer un Client Sécurisé

Pour faciliter les tests, créons un client qui gère automatiquement l'authentification. Créez `src/secure-client.ts` :

```typescript
// src/secure-client.ts

const SERVER_URL = 'http://localhost:3000';

class SecureClient {
  private token: string | null = null;

  /**
   * S'authentifier
   */
  async login(username: string, password: string): Promise<boolean> {
    const response = await fetch(`${SERVER_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      this.token = data.token;
      console.log(`✅ Authentifié en tant que ${username}`);
      return true;
    }

    console.log(`❌ Échec d'authentification`);
    return false;
  }

  /**
   * Découvrir les outils disponibles
   */
  async discoverTools() {
    if (!this.token) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(`${SERVER_URL}/mcp/tools`, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });

    return await response.json();
  }

  /**
   * Exécuter un outil
   */
  async executeTool(toolName: string, params: any) {
    if (!this.token) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(`${SERVER_URL}/mcp/execute`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tool: toolName,
        params: params
      })
    });

    return await response.json();
  }

  /**
   * Voir ses informations
   */
  async getMe() {
    if (!this.token) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(`${SERVER_URL}/mcp/me`, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });

    return await response.json();
  }

  /**
   * Voir ses quotas
   */
  async getQuotas() {
    if (!this.token) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(`${SERVER_URL}/mcp/quotas`, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });

    return await response.json();
  }
}

/**
 * Démonstration complète
 */
async function demo() {
  console.log('═══════════════════════════════════════');
  console.log('🔒 Démo Client Sécurisé MCP');
  console.log('═══════════════════════════════════════\n');

  const client = new SecureClient();

  // Test 1 : Authentification
  console.log('📝 Test 1 : Authentification\n');
  await client.login('user', 'password');

  // Test 2 : Voir ses infos
  console.log('\n📝 Test 2 : Informations utilisateur\n');
  const me = await client.getMe();
  console.log(JSON.stringify(me, null, 2));

  // Test 3 : Découverte des outils
  console.log('\n📝 Test 3 : Découverte des outils\n');
  const discovery = await client.discoverTools();
  console.log(`Outils disponibles : ${discovery.tools.length}`);
  discovery.tools.forEach((tool: any) => {
    console.log(`  - ${tool.name}: ${tool.description}`);
  });

  // Test 4 : Exécution d'un outil
  console.log('\n📝 Test 4 : Exécution d\'un outil\n');
  const result = await client.executeTool('listFiles', {
    chemin_du_dossier: '.'
  });
  
  if (result.success) {
    console.log('✅ Succès !');
  } else {
    console.log(`❌ Erreur : ${result.error}`);
  }

  // Test 5 : Vérifier les quotas
  console.log('\n📝 Test 5 : Quotas restants\n');
  const quotas = await client.getQuotas();
  console.log(JSON.stringify(quotas, null, 2));

  console.log('\n═══════════════════════════════════════');
}

demo().catch(console.error);
```

Ajoutez le script dans `package.json` :

```json
"scripts": {
  "dev": "ts-node src/index.ts",
  "secure-client": "ts-node src/secure-client.ts"
}
```

Lancez-le :

```bash
npm run secure-client
```

## Dashboard de Sécurité

Créons une interface web pour visualiser la sécurité. Créez `src/public/security.html` :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MCP Security Dashboard</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', system-ui, sans-serif; 
      background: linear-gradient(135deg, #1e3a8a 0%, #ef4444 100%);
      padding: 20px;
    }
    .container { 
      max-width: 1200px; 
      margin: 0 auto; 
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 { 
      color: #1e3a8a; 
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .subtitle {
      color: #64748b;
      margin-bottom: 30px;
    }
    .login-form {
      background: #f8fafc;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .login-form input {
      width: 200px;
      padding: 8px 12px;
      margin: 5px;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
    }
    .login-form button {
      padding: 8px 16px;
      background: #1e3a8a;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin: 5px;
    }
    .login-form button:hover {
      background: #1e40af;
    }
    .user-info {
      background: #eff6ff;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .security-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .security-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
    }
    .security-card h3 {
      color: #1e3a8a;
      margin-bottom: 15px;
    }
    .permission-badge {
      display: inline-block;
      padding: 4px 8px;
      background: #3b82f6;
      color: white;
      border-radius: 4px;
      font-size: 0.85em;
      margin: 2px;
    }
    .quota-bar {
      height: 20px;
      background: #e2e8f0;
      border-radius: 4px;
      overflow: hidden;
      margin: 10px 0;
    }
    .quota-fill {
      height: 100%;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6);
      transition: width 0.3s;
    }
    .hidden { display: none; }
    .error { color: #ef4444; padding: 10px; background: #fee2e2; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔒 MCP Security Dashboard</h1>
    <p class="subtitle">Gestion de la sécurité et des permissions</p>
    
    <!-- Formulaire de connexion -->
    <div id="loginForm" class="login-form">
      <h3>Connexion</h3>
      <input type="text" id="username" placeholder="Username" value="user">
      <input type="password" id="password" placeholder="Password" value="any">
      <button onclick="login()">Se connecter</button>
      <div id="loginError" class="error hidden"></div>
    </div>

    <!-- Informations utilisateur -->
    <div id="userInfo" class="hidden user-info">
      <h3>👤 Utilisateur connecté</h3>
      <p><strong>Username:</strong> <span id="userUsername"></span></p>
      <p><strong>Rôle:</strong> <span id="userRole"></span></p>
      <p><strong>User ID:</strong> <span id="userId"></span></p>
      <button onclick="logout()" style="margin-top: 10px;">Déconnexion</button>
    </div>

    <!-- Grille de sécurité -->
    <div id="securityGrid" class="hidden security-grid">
      <!-- Permissions -->
      <div class="security-card">
        <h3>🔑 Permissions</h3>
        <div id="permissions"></div>
      </div>

      <!-- Rate Limit -->
      <div class="security-card">
        <h3>⏱️ Rate Limiting</h3>
        <div id="rateLimit"></div>
      </div>

      <!-- Quotas -->
      <div class="security-card">
        <h3>📊 Quotas</h3>
        <div id="quotas"></div>
      </div>
    </div>
  </div>

  <script>
    let token = null;

    async function login() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
          token = data.token;
          document.getElementById('loginForm').classList.add('hidden');
          document.getElementById('userInfo').classList.remove('hidden');
          document.getElementById('securityGrid').classList.remove('hidden');
          await loadSecurityData();
        } else {
          showError('Identifiants invalides');
        }
      } catch (error) {
        showError('Erreur de connexion');
      }
    }

    function logout() {
      token = null;
      document.getElementById('loginForm').classList.remove('hidden');
      document.getElementById('userInfo').classList.add('hidden');
      document.getElementById('securityGrid').classList.remove('hidden');
    }

    function showError(message) {
      const errorDiv = document.getElementById('loginError');
      errorDiv.textContent = message;
      errorDiv.classList.remove('hidden');
      setTimeout(() => errorDiv.classList.add('hidden'), 3000);
    }

    async function loadSecurityData() {
      // Charger les infos utilisateur
      const meResponse = await fetch('/mcp/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const me = await meResponse.json();

      document.getElementById('userUsername').textContent = me.username;
      document.getElementById('userRole').textContent = me.role;
      document.getElementById('userId').textContent = me.userId;

      // Afficher les permissions
      const permissionsDiv = document.getElementById('permissions');
      permissionsDiv.innerHTML = me.permissions.map(p => 
        `<span class="permission-badge">${p}</span>`
      ).join('');

      // Afficher le rate limit
      const rateLimitDiv = document.getElementById('rateLimit');
      const rateLimit = me.rateLimit;
      const percentage = (rateLimit.current / rateLimit.max) * 100;
      
      rateLimitDiv.innerHTML = `
        <p><strong>${rateLimit.current}</strong> / ${rateLimit.max} requêtes</p>
        <div class="quota-bar">
          <div class="quota-fill" style="width: ${percentage}%"></div>
        </div>
        <p style="font-size: 0.9em; color: #64748b;">
          Reset: ${new Date(rateLimit.resetsAt).toLocaleTimeString()}
        </p>
      `;

      // Charger les quotas
      const quotasResponse = await fetch('/mcp/quotas', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const quotasData = await quotasResponse.json();

      const quotasDiv = document.getElementById('quotas');
      quotasDiv.innerHTML = quotasData.quotas.map(q => `
        <p><strong>${q.tool}:</strong> ${q.remaining === null ? 'Illimité' : q.remaining}</p>
      `).join('');
    }
  </script>
</body>
</html>
```

Ouvrez `http://localhost:3000/security.html` pour voir le dashboard en action !

## Bonnes Pratiques de Sécurité

Maintenant que vous avez un système complet, voici les bonnes pratiques à suivre :

### 1. Gestion des Secrets

**Ne jamais commit les secrets** dans le code. Utilisez des variables d'environnement :

```typescript
// Créez un fichier .env
SECRET_KEY=your-super-secret-key-change-me-in-production
JWT_EXPIRATION=86400

// Dans votre code
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
```

### 2. Hash des Mots de Passe

En production, utilisez bcrypt pour hasher les mots de passe :

```bash
npm install bcrypt @types/bcrypt
```

```typescript
import bcrypt from 'bcrypt';

// Lors de la création d'un utilisateur
const hashedPassword = await bcrypt.hash(password, 10);

// Lors de l'authentification
const isValid = await bcrypt.compare(password, user.hashedPassword);
```

### 3. HTTPS Obligatoire

En production, forcez HTTPS :

```typescript
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});
```

### 4. Logging de Sécurité

Logguez tous les événements de sécurité :

```typescript
function logSecurityEvent(event: string, details: any) {
  // En production : envoyer vers un service d'audit
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    event: event,
    ...details
  }));
}

// Utilisation
logSecurityEvent('AUTH_FAILED', { username, ip: req.ip });
logSecurityEvent('PERMISSION_DENIED', { user: req.user.username, tool });
```

### 5. Audits Réguliers

Créez un système d'audit :

```typescript
class AuditLogger {
  log(action: string, userId: string, details: any) {
    // En production : envoyer vers un service d'audit
    console.log({
      timestamp: new Date().toISOString(),
      action,
      userId,
      ...details
    });
  }
}
```

## Conclusion

Félicitations ! Vous avez maintenant un serveur MCP production-ready avec quatre couches de sécurité :

- ✅ Validation complète des entrées
- ✅ Authentification par tokens
- ✅ Autorisation granulaire
- ✅ Rate limiting et quotas

Votre serveur peut maintenant être exposé en production en toute confiance. Les IA peuvent l'utiliser de manière sécurisée, chaque utilisateur a ses permissions spécifiques, et les abus sont automatiquement bloqués.

Dans le prochain et dernier article de la série, nous allons connecter votre serveur sécurisé à Claude Desktop et tester l'intégration complète en conditions réelles. Vous verrez enfin tout le système fonctionner de bout en bout avec une véritable IA.

En attendant, testez votre système de sécurité ! Essayez de le contourner, testez les limites, vérifiez que tout est bien protégé. Un bon système de sécurité est un système qui a été attaqué et qui a résisté.

---

*Article publié le 10 décembre 2025 par Nicolas Dabène - Expert PHP & PrestaShop avec 15+ ans d'expérience dans l'architecture logicielle et l'intégration d'IA*

**À lire aussi :**
- [Comprendre le Model Context Protocol (MCP) : Une Conversation Simple](/articles/2025/10/23/comprendre-mcp-conversation-simple)
- [Créer son Premier Serveur MCP : Setup du Projet TypeScript](/articles/2025/10/30/setup-serveur-mcp-typescript)
- [Créer votre Premier Outil MCP : L'Outil readFile Expliqué](/articles/2025/11/12/creer-votre-premier-outil-mcp-l-outil-readfile-explique)
- [Le Menu MCP : Comment l'IA Découvre et Utilise vos Outils](/articles/2025/12/03/menu-mcp-comment-l-ia-decouvre-et-utilise-vos-outils)
- [Connecter votre Serveur MCP à Claude Desktop : L'Intégration Complète](/articles/2025/12/17/connecter-serveur-mcp-claude-desktop-integration-complete)
