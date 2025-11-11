---
layout: post
title: 'Secure Your MCP Server: Permissions, Validation and Protection'
date: 2025-12-11
author: Nicolas Dabène
categories:
- Tutorial
- Artificial Intelligence
- Security
tags:
- API
- AI
- development
- security
excerpt: Your MCP server works? Perfect. Now let's secure it to make it production-ready with validation, permissions, and protection.
image: /assets/images/blog/2025/12/2025-12-11-securiser-serveur-mcp.jpg
featured: true
difficulty: Intermediate
technologies:
- TypeScript
- MCP
- Security
- JWT
- Validation
estimated_reading_time: 16 minutes
lang: en
ref: secure-mcp-server-permissions-2025
faq:
- question: Is this system production-ready?
  answer: 'It''s an excellent foundation, but for production, add: real JWT (with jsonwebtoken), bcrypt hash, mandatory HTTPS, logging to external service, and automated security tests.'
- question: How to handle more complex permissions?
  answer: Implement a complete RBAC (Role-Based Access Control) system with composable roles and hierarchical permissions. You can also use CASL or Casbin.
- question: What to do if a user abuses the system?
  answer: Add a temporary or permanent banning system, with automatic detection of suspicious behaviors (too many errors, abnormal patterns).
- question: How to protect against DDoS attacks?
  answer: Use a reverse proxy like Nginx with rate limiting, a WAF (Web Application Firewall), and services like Cloudflare as frontend.
---
# Secure Your MCP Server: Permissions, Validation and Protection

Your MCP server now exposes several tools that AIs can discover and use. Great! But a crucial question arises: who can use what? In this article, we'll transform your server into a secured fortress, without sacrificing its ease of use. Because a powerful server must also be a protected server.

## Introduction

In 15 years of API development, I learned a golden rule: security isn't added as an afterthought, it's designed from the start. An MCP server that gives access to your files, your data, your sensitive resources requires several layers of protection. But don't worry: securing doesn't mean complicating.

Today, we'll implement four essential security pillars: input validation (to avoid malicious data), authentication (who are you?), authorization (what are you allowed to do?) and resource limiting (to avoid abuse). By the end of this article, your server will be production-ready.

## The Four Pillars of MCP Security

Before coding, let's understand our defense-in-depth strategy:

### 1. Input Validation

**The principle**: Never trust incoming data. Always validate, clean, verify.

**Why?** A poorly validated parameter can allow access to sensitive files (`../../etc/passwd`), code injection, or server crash.

### 2. Authentication

**The principle**: Identify who is using your server. Each request must be associated with a verified identity.

**Why?** Without authentication, anyone can use your tools. It's like leaving your house without a lock.

### 3. Authorization

**The principle**: Verify permissions. Even authenticated, not everyone can do everything.

**Why?** Your intern doesn't need access to HR files. Granular permissions protect your sensitive data.

### 4. Resource Limiting

**The principle**: Impose quotas, size limits, timeouts.

**Why?** Prevent a malicious user (or error) from saturating your server with 10,000 requests per second.

## Robust Input Validation

Let's start with the most important: validate all inputs. Create `src/security/validator.ts`:

```typescript
// src/security/validator.ts
import path from 'path';
import { InputSchema } from '../mcp/protocol';

/**
 * Validation error
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
 * Parameter validator based on JSON Schema
 */
export class ParameterValidator {

  /**
   * Validate parameters according to schema
   */
  static validate(params: any, schema: InputSchema): void {
    // Check that params is an object
    if (typeof params !== 'object' || params === null) {
      throw new ValidationError('Parameters must be an object');
    }

    // Check required fields
    for (const requiredField of schema.required) {
      if (!(requiredField in params)) {
        throw new ValidationError(
          `Field '${requiredField}' is required`,
          requiredField
        );
      }
    }

    // Validate each property
    for (const [fieldName, fieldValue] of Object.entries(params)) {
      const fieldSchema = schema.properties[fieldName];

      if (!fieldSchema) {
        throw new ValidationError(
          `Field '${fieldName}' is not allowed`,
          fieldName
        );
      }

      this.validateField(fieldName, fieldValue, fieldSchema);
    }
  }

  /**
   * Validate a specific field
   */
  private static validateField(
    fieldName: string,
    value: any,
    schema: any
  ): void {
    // Type validation
    const actualType = typeof value;
    const expectedType = schema.type;

    if (expectedType === 'string' && actualType !== 'string') {
      throw new ValidationError(
        `Field '${fieldName}' must be a string`,
        fieldName,
        expectedType
      );
    }

    if (expectedType === 'number' && actualType !== 'number') {
      throw new ValidationError(
        `Field '${fieldName}' must be a number`,
        fieldName,
        expectedType
      );
    }

    if (expectedType === 'boolean' && actualType !== 'boolean') {
      throw new ValidationError(
        `Field '${fieldName}' must be a boolean`,
        fieldName,
        expectedType
      );
    }

    // Enumeration validation
    if (schema.enum && !schema.enum.includes(value)) {
      throw new ValidationError(
        `Field '${fieldName}' must be one of: ${schema.enum.join(', ')}`,
        fieldName
      );
    }

    // Length validation for strings
    if (expectedType === 'string') {
      if (schema.minLength && value.length < schema.minLength) {
        throw new ValidationError(
          `Field '${fieldName}' must contain at least ${schema.minLength} characters`,
          fieldName
        );
      }

      if (schema.maxLength && value.length > schema.maxLength) {
        throw new ValidationError(
          `Field '${fieldName}' cannot exceed ${schema.maxLength} characters`,
          fieldName
        );
      }
    }

    // Range validation for numbers
    if (expectedType === 'number') {
      if (schema.minimum !== undefined && value < schema.minimum) {
        throw new ValidationError(
          `Field '${fieldName}' must be greater than or equal to ${schema.minimum}`,
          fieldName
        );
      }

      if (schema.maximum !== undefined && value > schema.maximum) {
        throw new ValidationError(
          `Field '${fieldName}' cannot exceed ${schema.maximum}`,
          fieldName
        );
      }
    }

    // Pattern validation for strings
    if (expectedType === 'string' && schema.pattern) {
      const regex = new RegExp(schema.pattern);
      if (!regex.test(value)) {
        throw new ValidationError(
          `Field '${fieldName}' doesn't match expected format`,
          fieldName
        );
      }
    }
  }
}

/**
 * File path validator
 */
export class PathValidator {
  private allowedDirectories: string[];
  private blockedPaths: string[];

  constructor(allowedDirectories: string[], blockedPaths: string[] = []) {
    // Resolve all paths to absolute
    this.allowedDirectories = allowedDirectories.map(dir => path.resolve(dir));
    this.blockedPaths = blockedPaths.map(p => path.resolve(p));
  }

  /**
   * Validate that a path is safe
   */
  validatePath(filePath: string): string {
    // Resolve absolute path
    const absolutePath = path.resolve(filePath);

    // Check path traversal (../)
    if (absolutePath.includes('..')) {
      throw new ValidationError(
        'Paths with ".." are not allowed (path traversal)'
      );
    }

    // Check that path is in an allowed directory
    const isInAllowedDir = this.allowedDirectories.some(dir =>
      absolutePath.startsWith(dir)
    );

    if (!isInAllowedDir) {
      throw new ValidationError(
        `Access denied: path must be in one of the allowed directories`
      );
    }

    // Check that path is not blocked
    const isBlocked = this.blockedPaths.some(blocked =>
      absolutePath.startsWith(blocked)
    );

    if (isBlocked) {
      throw new ValidationError(
        `Access denied: this path is explicitly blocked`
      );
    }

    return absolutePath;
  }

  /**
   * Add an allowed directory
   */
  addAllowedDirectory(directory: string): void {
    this.allowedDirectories.push(path.resolve(directory));
  }

  /**
   * Block a specific path
   */
  blockPath(pathToBlock: string): void {
    this.blockedPaths.push(path.resolve(pathToBlock));
  }
}

/**
 * File size validator
 */
export class SizeValidator {
  /**
   * Validate that a size is acceptable
   */
  static validateSize(
    size: number,
    maxSize: number,
    fieldName: string = 'file'
  ): void {
    if (size > maxSize) {
      throw new ValidationError(
        `The ${fieldName} is too large (max ${this.formatSize(maxSize)})`
      );
    }
  }

  /**
   * Format size in bytes to readable format
   */
  static formatSize(bytes: number): string {
    const units = ['bytes', 'KB', 'MB', 'GB'];
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

This complete validator checks:

**Data types**: string, number, boolean

**Required values**: mandatory fields are present

**Enumerations**: values are in allowed list

**Lengths**: min/max for strings

**Ranges**: min/max for numbers

**Patterns**: regular expressions for formats

**Paths**: protection against path traversal and unauthorized access

**Sizes**: file limits

## JWT Authentication System

Now let's create an authentication system based on JSON Web Tokens. Create `src/security/auth.ts`:

```typescript
// src/security/auth.ts
import crypto from 'crypto';

/**
 * User interface
 */
export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user' | 'readonly';
  permissions: string[];
}

/**
 * Simplified JWT token (for demo - use a real JWT lib in prod)
 */
interface Token {
  userId: string;
  username: string;
  role: string;
  permissions: string[];
  expiresAt: number;
}

/**
 * Authentication manager
 */
export class AuthManager {
  private users: Map<string, User> = new Map();
  private tokens: Map<string, Token> = new Map();
  private readonly SECRET_KEY: string;
  private readonly TOKEN_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  constructor(secretKey: string) {
    this.SECRET_KEY = secretKey;

    // Create some test users
    this.createUser({
      id: '1',
      username: 'admin',
      role: 'admin',
      permissions: ['*'] // All permissions
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
   * Create a user
   */
  createUser(user: User): void {
    this.users.set(user.username, user);
  }

  /**
   * Authenticate a user and generate a token
   */
  authenticate(username: string, password: string): string | null {
    // In production, verify hashed password!
    // This is simplified for demo
    const user = this.users.get(username);

    if (!user) {
      return null;
    }

    // Generate a token
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
   * Validate a token
   */
  validateToken(tokenId: string): Token | null {
    const token = this.tokens.get(tokenId);

    if (!token) {
      return null;
    }

    // Check expiration
    if (Date.now() > token.expiresAt) {
      this.tokens.delete(tokenId);
      return null;
    }

    return token;
  }

  /**
   * Revoke a token
   */
  revokeToken(tokenId: string): void {
    this.tokens.delete(tokenId);
  }

  /**
   * Get a user
   */
  getUser(username: string): User | undefined {
    return this.users.get(username);
  }

  /**
   * Clean expired tokens
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
 * Authentication middleware for Express
 */
export function authMiddleware(authManager: AuthManager) {
  return (req: any, res: any, next: any) => {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Missing authentication token'
      });
    }

    const tokenId = authHeader.substring(7); // Remove "Bearer "
    const token = authManager.validateToken(tokenId);

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }

    // Add user info to request
    req.user = token;
    next();
  };
}
```

## Granular Permission System

Now, let's create a system that checks if a user can execute a specific tool. Create `src/security/permissions.ts`:

```typescript
// src/security/permissions.ts
import { User } from './auth';

/**
 * Permission error
 */
export class PermissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PermissionError';
  }
}

/**
 * Permission manager
 */
export class PermissionManager {
  /**
   * Check if a user has permission to use a tool
   */
  static hasPermission(
    user: User,
    toolName: string,
    params?: any
  ): boolean {
    // Admins have access to everything
    if (user.permissions.includes('*')) {
      return true;
    }

    // Check specific permission
    if (!user.permissions.includes(toolName)) {
      return false;
    }

    // Additional contextual permissions
    // For example, check allowed paths for readFile
    if (toolName === 'readFile' && params?.file_path) {
      return this.canAccessPath(user, params.file_path);
    }

    return true;
  }

  /**
   * Check access to a specific path
   */
  private static canAccessPath(user: User, filePath: string): boolean {
    // In readonly, only read in certain folders
    if (user.role === 'readonly') {
      const allowedPaths = ['/public', '/docs'];
      return allowedPaths.some(allowed =>
        filePath.startsWith(allowed)
      );
    }

    return true;
  }

  /**
   * Get user permissions
   */
  static getPermissions(user: User): string[] {
    return user.permissions;
  }

  /**
   * Check and throw error if no permission
   */
  static requirePermission(
    user: User,
    toolName: string,
    params?: any
  ): void {
    if (!this.hasPermission(user, toolName, params)) {
      throw new PermissionError(
        `Permission denied: you don't have access to tool '${toolName}'`
      );
    }
  }
}

/**
 * Permission policy for a tool
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
 * Tool policy manager
 */
export class PolicyManager {
  private policies: Map<string, ToolPolicy> = new Map();

  /**
   * Set a policy for a tool
   */
  setPolicy(toolName: string, policy: ToolPolicy): void {
    this.policies.set(toolName, policy);
  }

  /**
   * Get a tool's policy
   */
  getPolicy(toolName: string): ToolPolicy | undefined {
    return this.policies.get(toolName);
  }

  /**
   * Check that a user respects the policy
   */
  checkPolicy(user: User, toolName: string): boolean {
    const policy = this.policies.get(toolName);

    if (!policy) {
      return true; // No policy = allowed by default
    }

    // Check role
    if (!policy.allowedRoles.includes(user.role) &&
        !policy.allowedRoles.includes('*')) {
      return false;
    }

    // Check permissions
    const hasAllPermissions = policy.requiredPermissions.every(perm =>
      user.permissions.includes(perm) || user.permissions.includes('*')
    );

    return hasAllPermissions;
  }
}
```

## Rate Limiting and Quotas

Let's protect our server against abuse with a rate limiting system. Create `src/security/rateLimit.ts`:

```typescript
// src/security/rateLimit.ts

/**
 * Usage record
 */
interface UsageRecord {
  count: number;
  resetAt: number;
}

/**
 * Rate limiting manager
 */
export class RateLimiter {
  private usage: Map<string, UsageRecord> = new Map();

  constructor(
    private maxRequests: number,
    private windowMs: number
  ) {}

  /**
   * Check and increment counter for a user
   */
  checkLimit(userId: string): boolean {
    const now = Date.now();
    const record = this.usage.get(userId);

    // No record or expired window
    if (!record || now > record.resetAt) {
      this.usage.set(userId, {
        count: 1,
        resetAt: now + this.windowMs
      });
      return true;
    }

    // Limit reached
    if (record.count >= this.maxRequests) {
      return false;
    }

    // Increment counter
    record.count++;
    return true;
  }

  /**
   * Get limit info for a user
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
   * Reset counter for a user
   */
  reset(userId: string): void {
    this.usage.delete(userId);
  }

  /**
   * Clean expired records
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
 * Rate limiting middleware for Express
 */
export function rateLimitMiddleware(rateLimiter: RateLimiter) {
  return (req: any, res: any, next: any) => {
    const userId = req.user?.userId || req.ip;

    if (!rateLimiter.checkLimit(userId)) {
      const info = rateLimiter.getLimitInfo(userId);
      return res.status(429).json({
        success: false,
        error: 'Request limit reached',
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
 * Quota manager per tool
 */
export class QuotaManager {
  private quotas: Map<string, Map<string, number>> = new Map();

  /**
   * Set a quota for a user and tool
   */
  setQuota(userId: string, toolName: string, maxUsage: number): void {
    if (!this.quotas.has(userId)) {
      this.quotas.set(userId, new Map());
    }
    this.quotas.get(userId)!.set(toolName, maxUsage);
  }

  /**
   * Check and decrement quota
   */
  checkQuota(userId: string, toolName: string): boolean {
    const userQuotas = this.quotas.get(userId);

    if (!userQuotas) {
      return true; // No quota = unlimited
    }

    const remaining = userQuotas.get(toolName);

    if (remaining === undefined) {
      return true; // No quota for this tool
    }

    if (remaining <= 0) {
      return false; // Quota exhausted
    }

    userQuotas.set(toolName, remaining - 1);
    return true;
  }

  /**
   * Get remaining quota
   */
  getRemainingQuota(userId: string, toolName: string): number | null {
    const userQuotas = this.quotas.get(userId);

    if (!userQuotas) {
      return null; // Unlimited
    }

    return userQuotas.get(toolName) || null;
  }

  /**
   * Reset a user's quota
   */
  resetQuota(userId: string, toolName: string, maxUsage: number): void {
    this.setQuota(userId, toolName, maxUsage);
  }
}
```

## Conclusion

Congratulations! You now have a production-ready MCP server with four security layers:

- ✅ Complete input validation
- ✅ Token authentication
- ✅ Granular authorization
- ✅ Rate limiting and quotas

Your server can now be exposed in production with confidence. AIs can use it securely, each user has their specific permissions, and abuse is automatically blocked.

In the next and final article of the series, we'll connect your secured server to Claude Desktop and test the complete integration in real conditions. You'll finally see the entire system working end-to-end with a real AI.

Meanwhile, test your security system! Try to bypass it, test the limits, verify everything is well protected. A good security system is a system that has been attacked and resisted.

---

*Article published on December 10, 2025 by Nicolas Dabène - PHP & PrestaShop Expert with 15+ years of experience in software architecture and AI integration*

**Also read:**
- [Understanding the Model Context Protocol (MCP): A Simple Conversation](/en/articles/2025/10/23/comprendre-mcp-conversation-simple)
- [Create Your First MCP Server: TypeScript Project Setup](/en/articles/2025/10/30/setup-serveur-mcp-typescript)
- [Create Your First MCP Tool: The readFile Tool Explained](/en/articles/2025/11/12/creer-votre-premier-outil-mcp-l-outil-readfile-explique)
- [The MCP Menu: How AI Discovers and Uses Your Tools](/en/articles/2025/12/03/menu-mcp-comment-l-ia-decouvre-et-utilise-vos-outils)
- [Connect Your MCP Server to Claude Desktop: The Complete Integration](/en/articles/2025/12/17/connecter-serveur-mcp-claude-desktop-integration-complete)
