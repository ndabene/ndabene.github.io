220
 <div class="skill-content-section">
221 <h3 class="skill-name-section">{{ skill.name }}</h3>
222 <p class="skill-description-section">{{ skill.description }}</p>
223 
224                        {% if skill.achievements %}
225 <div class="skill-achievements-section">
226 <div class="achievement-item-section">
227 <svg class="achievement-icon-section" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
228 <circle cx="12" cy="8" r="7"/>
229 <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
230 </svg>
231 <span class="achievement-text-section">{{ skill.achievements }}</span>
232 </div>
233 </div>
234                        {% endif %}
235 
236                        {% if skill.impact %}
237 <div class="skill-impact-section">
238 <div class="impact-item-section">
239 <svg class="impact-icon-section" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
240 <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
241 </svg>
242 <span class="impact-text-section">{{ skill.impact }}</span>
243 </div>
244 </div>
245                        {% endif %}
246 </div>
247 </div>
248                {% endfor %}
249            
250        
251 
252        {% endfor %}
253    
254
255
256 <section class="share-resources-section">
257  <div class="container">
258  <h2>Partage &amp; ressources</h2>
259  <div class="resources-columns">
260  <div class="resources-column">
261  <h3>Articles de blog</h3>
262  <ul>
263  <li><a href="{{ '/2025/08/06/prestashop-growth-hacking-mindset/' | relative_url }}">Quand l'édition de modules PrestaShop rencontre le growth hacking</a></li>
264  <li><a href="{{ '/2025/08/03/mcp-protocol-guide/' | relative_url }}">Model Context Protocol : Le Pont Révolutionnaire entre l'IA et vos Systèmes</a></li>
265  <li><a href="{{ '/2025/07/28/github-pages-jekyll-portfolio/' | relative_url }}">Créez Votre Portfolio Tech en Ligne avec GitHub Pages et Jekyll</a></li>
266  </ul>
267  </div>
268  <div class="resources-column">
269  <h3>Formations</h3>
270  <ul>
271  <li><a href="{{ '/formations/#formation-ia-pour-developpeurs-programme-phare' | relative_url }}">Formation "IA pour Développeurs"</a></li>
272  <li><a href="{{ '/formations/#formation-entreprise-transformation-ia' | relative_url }}">Formation Entreprise "Transformation IA"</a></li>
273  </ul>
274  </div>
275  </div>
276  </div>
277 </section>
278 
279 <p>Vous souhaitez aller plus loin ? Découvrez mes <a href="/formations/">formations</a>, parcourez mes <a href="/blog/">articles</a> ou <a href="/contact/">Contactez-moi pour échanger</a>.</p>
280 
281 
282 
283 <script>
284 document.addEventListener('DOMContentLoaded', function() {
285     // Animation des niveaux de compétences
286     function animateSkillLevels() {
287         const levelCircles = document.querySelectorAll('.level-circle[data-level]');
288         
289         levelCircles.forEach((circle, index) => {