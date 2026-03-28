---
layout: page
title: "Politique de Confidentialité"
permalink: /politique-cookies/
alternates:
  - lang: en
    url: /en/cookie-policy/
description: "Politique de confidentialité et protection des données personnelles conforme au RGPD pour le site de Nicolas Dabène."
body_class: "cookie-policy-page"
llm_summary: Politique de confidentialité et protection des données personnelles conforme au RGPD pour le site de Nicolas Dabène.
llm_topics: [confidentialité, RGPD, cookies, données personnelles]
---

<div class="cookie-policy-container">
    <!-- Table des matières sticky -->
    <nav class="toc-sidebar">
        <h3>Sommaire</h3>
        <ul>
            <li><a href="#intro">Introduction</a></li>
            <li><a href="#responsable">Responsable du traitement</a></li>
            <li><a href="#donnees">Données collectées</a></li>
            <li><a href="#cookies">Cookies</a></li>
            <li><a href="#destinataires">Destinataires des données</a></li>
            <li><a href="#droits">Vos droits</a></li>
            <li><a href="#securite">Sécurité</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>

    <!-- Contenu principal -->
    <div class="cookie-policy-content">

        <!-- Introduction -->
        <section id="intro" class="policy-section">
            <h1>Politique de Confidentialité et Protection des Données</h1>
            <p class="lead">Nicolas Dabène s'engage à protéger votre vie privée et vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.</p>
            <p class="update-date"><strong>Dernière mise à jour :</strong> {{ "now" | date: "%d/%m/%Y" }}</p>
        </section>

        <!-- Responsable du traitement -->
        <section id="responsable" class="policy-section">
            <h2>1. Responsable du traitement</h2>
            <div class="info-grid">
                <div class="info-item">
                    <span class="icon">👤</span>
                    <div>
                        <strong>Identité</strong>
                        <p>Nicolas Dabène<br>Développeur PHP Senior & Architecte IA<br>Micro-entreprise</p>
                    </div>
                </div>
                <div class="info-item">
                    <span class="icon">📧</span>
                    <div>
                        <strong>Contact</strong>
                        <p><a href="https://calendly.com/ndabene2807/mcp-tools-plus">Formulaire de contact</a><br>
                        Site : <a href="https://nicolas-dabene.fr">nicolas-dabene.fr</a></p>
                    </div>
                </div>
                <div class="info-item">
                    <span class="icon">🏢</span>
                    <div>
                        <strong>Hébergement</strong>
                        <p>GitHub Pages<br>GitHub, Inc., San Francisco, CA, USA</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Données collectées -->
        <section id="donnees" class="policy-section">
            <h2>2. Données collectées et finalités</h2>

            <div class="data-category">
                <h3>Navigation sur le site</h3>
                <p><strong>Données :</strong> Adresse IP (anonymisée), type de navigateur, pages visitées, durée de visite</p>
                <p><strong>Finalité :</strong> Analyse d'audience, amélioration du site</p>
                <p><strong>Base légale :</strong> Consentement (Article 6.1.a du RGPD)</p>
                <p><strong>Conservation :</strong> 26 mois</p>
            </div>

            <div class="data-category">
                <h3>Formulaire de contact</h3>
                <p><strong>Données :</strong> Nom, prénom, email, message</p>
                <p><strong>Finalité :</strong> Répondre à vos demandes</p>
                <p><strong>Base légale :</strong> Mesures précontractuelles (Article 6.1.b du RGPD)</p>
                <p><strong>Conservation :</strong> 3 ans</p>
            </div>

            <div class="data-category">
                <h3>Commandes (Lemon Squeezy)</h3>
                <p><strong>Données :</strong> Nom, email, adresse de facturation</p>
                <p><strong>Finalité :</strong> Traitement des commandes, facturation</p>
                <p><strong>Base légale :</strong> Exécution du contrat (Article 6.1.b du RGPD)</p>
                <p><strong>Conservation :</strong> 10 ans (obligations comptables)</p>
            </div>

            <div class="data-category">
                <h3>Newsletter</h3>
                <p><strong>Données :</strong> Email, prénom (optionnel)</p>
                <p><strong>Finalité :</strong> Envoi d'informations, nouveaux articles, formations</p>
                <p><strong>Base légale :</strong> Consentement (Article 6.1.a du RGPD)</p>
                <p><strong>Conservation :</strong> Jusqu'à désinscription ou 3 ans d'inactivité</p>
            </div>
        </section>

        <!-- Cookies -->
        <section id="cookies" class="policy-section">
            <h2>3. Cookies et technologies similaires</h2>

            <div class="cookie-type">
                <div class="cookie-header essential">
                    <span class="icon">✓</span>
                    <div>
                        <h3>Cookies essentiels</h3>
                        <span class="badge required">Obligatoire</span>
                    </div>
                </div>
                <p>Nécessaires au fonctionnement du site, ne peuvent pas être désactivés.</p>
                <table class="cookie-table">
                    <tr>
                        <th>Cookie</th>
                        <th>Durée</th>
                        <th>Finalité</th>
                    </tr>
                    <tr>
                        <td><code>ndabene_cookie_consent</code></td>
                        <td>1 an</td>
                        <td>Mémorisation de vos préférences</td>
                    </tr>
                </table>
            </div>

            <div class="cookie-type">
                <div class="cookie-header analytics">
                    <span class="icon">📊</span>
                    <div>
                        <h3>Cookies d'analyse (Google Analytics)</h3>
                        <span class="badge optional">Optionnel</span>
                    </div>
                </div>
                <p>Nous aident à comprendre comment vous utilisez le site.</p>
                <table class="cookie-table">
                    <tr>
                        <th>Cookie</th>
                        <th>Durée</th>
                        <th>Finalité</th>
                    </tr>
                    <tr>
                        <td><code>_ga</code></td>
                        <td>2 ans</td>
                        <td>Identifier les utilisateurs uniques</td>
                    </tr>
                    <tr>
                        <td><code>_ga_*</code></td>
                        <td>2 ans</td>
                        <td>Identifier les sessions</td>
                    </tr>
                    <tr>
                        <td><code>_gid</code></td>
                        <td>24 heures</td>
                        <td>Identifier les utilisateurs</td>
                    </tr>
                </table>
            </div>

            <div class="cookie-type">
                <div class="cookie-header ads">
                    <span class="icon">📢</span>
                    <div>
                        <h3>Cookies publicitaires (Google AdSense)</h3>
                        <span class="badge optional">Optionnel</span>
                    </div>
                </div>
                <p>Utilisés pour afficher des publicités personnalisées.</p>
                <table class="cookie-table">
                    <tr>
                        <th>Cookie</th>
                        <th>Durée</th>
                        <th>Finalité</th>
                    </tr>
                    <tr>
                        <td><code>__gads, __gpi</code></td>
                        <td>13 mois</td>
                        <td>Performance publicitaire</td>
                    </tr>
                    <tr>
                        <td><code>IDE</code></td>
                        <td>13 mois</td>
                        <td>Personnalisation des annonces</td>
                    </tr>
                </table>
            </div>

            <div class="cookie-preferences">
                <h4>Gérer vos préférences</h4>
                <p>Vous pouvez modifier vos préférences à tout moment :</p>
                <ul>
                    <li>Via le banner de consentement Google qui s'affiche lors de votre première visite</li>
                    <li>En supprimant les cookies via les paramètres de votre navigateur</li>
                    <li>En nous contactant directement</li>
                </ul>
                <p><a href="https://tools.google.com/dlpage/gaoptout" class="btn-link" target="_blank" rel="noopener">→ Désactiver Google Analytics globalement</a></p>
            </div>
        </section>

        <!-- Destinataires -->
        <section id="destinataires" class="policy-section">
            <h2>4. Destinataires des données</h2>
            <p>Vos données peuvent être transmises aux services suivants :</p>

            <div class="info-grid">
                <div class="info-item">
                    <span class="icon">📊</span>
                    <div>
                        <strong>Google LLC</strong>
                        <p>Google Analytics 4, Google AdSense<br>
                        <em>Analyse et publicité - États-Unis</em></p>
                    </div>
                </div>
                <div class="info-item">
                    <span class="icon">💳</span>
                    <div>
                        <strong>Lemon Squeezy</strong>
                        <p>Paiement et facturation<br>
                        <em>États-Unis</em></p>
                    </div>
                </div>
                <div class="privacy-feature">
                    <span class="feature-icon">🎥</span>
                    <div>
                        <strong>YouTube (Google LLC)</strong>
                        <p><strong>Service :</strong> Hébergement de vidéos<br>
                        <strong>Finalité :</strong> Diffusion de contenu vidéo<br>
                        <strong>Localisation :</strong> États-Unis</p>
                    </div>
                </div>
                <div class="info-item">
                    <span class="icon">🎥</span>
                    <div>
                        <strong>YouTube</strong>
                        <p>Hébergement de vidéos<br>
                        <em>États-Unis</em></p>
                    </div>
                </div>
            </div>

            <p class="important-note">⚠️ <strong>Aucune donnée n'est vendue à des tiers.</strong></p>

            <div class="info-box">
                <h3>Transferts internationaux</h3>
                <p>Les transferts vers les États-Unis sont encadrés par :</p>
                <ul>
                    <li>Le <strong>Data Privacy Framework (DPF)</strong> pour les entreprises certifiées</li>
                    <li>Les clauses contractuelles types (SCC) de la Commission européenne</li>
                    <li>Des mesures de sécurité supplémentaires conformes au RGPD</li>
                </ul>
            </div>
        </section>

        <!-- Droits -->
        <section id="droits" class="policy-section">
            <h2>5. Vos droits (Articles 15 à 22 du RGPD)</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>

            <div class="rights-list">
                <div class="right-item">
                    <span class="icon">👁️</span>
                    <div>
                        <strong>Droit d'accès (Art. 15)</strong>
                        <p>Obtenir confirmation du traitement de vos données et en obtenir une copie</p>
                    </div>
                </div>
                <div class="right-item">
                    <span class="icon">✏️</span>
                    <div>
                        <strong>Droit de rectification (Art. 16)</strong>
                        <p>Demander la rectification de données inexactes ou incomplètes</p>
                    </div>
                </div>
                <div class="right-item">
                    <span class="icon">🗑️</span>
                    <div>
                        <strong>Droit à l'effacement (Art. 17)</strong>
                        <p>Demander la suppression de vos données dans certaines conditions</p>
                    </div>
                </div>
                <div class="right-item">
                    <span class="icon">⏸️</span>
                    <div>
                        <strong>Droit à la limitation (Art. 18)</strong>
                        <p>Demander la limitation temporaire du traitement</p>
                    </div>
                </div>
                <div class="right-item">
                    <span class="icon">📦</span>
                    <div>
                        <strong>Droit à la portabilité (Art. 20)</strong>
                        <p>Recevoir vos données dans un format structuré et lisible</p>
                    </div>
                </div>
                <div class="right-item">
                    <span class="icon">🚫</span>
                    <div>
                        <strong>Droit d'opposition (Art. 21)</strong>
                        <p>S'opposer au traitement pour des motifs légitimes</p>
                    </div>
                </div>
            </div>

            <div class="info-box">
                <h3>Comment exercer vos droits ?</h3>
                <p>Contactez-nous via le <a href="https://calendly.com/ndabene2807/mcp-tools-plus">formulaire de contact</a>.</p>
                <p>Votre demande sera traitée dans un délai d'<strong>1 mois</strong>.</p>
            </div>

            <div class="info-box">
                <h3>Droit de porter plainte (Art. 77)</h3>
                <p>Vous pouvez introduire une réclamation auprès de la <strong>CNIL</strong> :</p>
                <p>3 Place de Fontenoy - 75334 PARIS CEDEX 07<br>
                Tél : 01 53 73 22 22<br>
                <a href="https://www.cnil.fr" target="_blank" rel="noopener">www.cnil.fr</a></p>
            </div>
        </section>

        <!-- Sécurité -->
        <section id="securite" class="policy-section">
            <h2>6. Sécurité des données</h2>
            <p>Nous mettons en œuvre des mesures de sécurité appropriées :</p>

            <div class="security-grid">
                <div class="security-item">
                    <span class="icon">🔒</span>
                    <div>
                        <strong>Chiffrement HTTPS</strong>
                        <p>Communications sécurisées via TLS/SSL</p>
                    </div>
                </div>
                <div class="security-item">
                    <span class="icon">🛡️</span>
                    <div>
                        <strong>Cookies sécurisés</strong>
                        <p>Attributs Secure, SameSite, HttpOnly</p>
                    </div>
                </div>
                <div class="security-item">
                    <span class="icon">🔐</span>
                    <div>
                        <strong>Anonymisation IP</strong>
                        <p>Adresses IP anonymisées dans Analytics</p>
                    </div>
                </div>
                <div class="security-item">
                    <span class="icon">⏱️</span>
                    <div>
                        <strong>Minimisation</strong>
                        <p>Seules les données nécessaires sont collectées</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact -->
        <section id="contact" class="policy-section">
            <h2>7. Contact et questions</h2>
            <div class="contact-box">
                <h3>Pour toute question concernant cette politique :</h3>
                <p><strong>Nicolas Dabène</strong><br>
                Développeur PHP Senior & Architecte IA</p>
                <p>🌐 <a href="https://nicolas-dabene.fr">nicolas-dabene.fr</a><br>
                📝 <a href="https://calendly.com/ndabene2807/mcp-tools-plus">Formulaire de contact</a></p>
            </div>
        </section>

        <!-- Conformité légale -->
        <section class="policy-section legal-compliance">
            <h2>Conformité légale</h2>
            <p>Cette politique est conforme au :</p>
            <ul class="compliance-list">
                <li>🇪🇺 <strong>RGPD</strong> (Règlement UE 2016/679)</li>
                <li>🇫🇷 <strong>Loi Informatique et Libertés</strong> (Loi n°78-17 modifiée)</li>
                <li>🇪🇺 <strong>Directive ePrivacy</strong> (2002/58/CE)</li>
            </ul>
        </section>

        <!-- Footer note -->
        <div class="policy-footer">
            <p><em>En continuant à utiliser ce site, vous acceptez la version la plus récente de cette politique de confidentialité.</em></p>
        </div>

    </div>
</div>
