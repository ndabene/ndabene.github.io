---
layout: post
title: "GEO for e-commerce: how I optimized a product page to appear in ChatGPT, Gemini and Perplexity answers"
date: 2026-02-26
ref: geo-ecommerce-optimiser-fiche-produit-reponses-ia-2026
author: Nicolas Dabene
category: seo-marketing
subcategory: technical-seo
categories:
  - SEO & Marketing
  - E-commerce
  - Artificial Intelligence
tags:
  - GEO
  - SEO
  - e-commerce
  - ChatGPT
  - Gemini
  - Perplexity
  - product page
  - PrestaShop
  - Schema.org
  - structured data
  - Generative AI
  - optimization
excerpt: "A step-by-step case study: how I took a PrestaShop product page from 0 to 14 mentions in ChatGPT, Gemini and Perplexity answers in 60 days, with the complete process and before/after measurements."
image: /assets/images/blog/2026/02/geo-ecommerce-optimiser-fiche-produit-reponses-ia/image-principale.webp
featured: true
difficulty: Intermediate
technologies:
  - PrestaShop
  - Schema.org
  - JSON-LD
  - ChatGPT
  - Gemini
  - Perplexity
estimated_reading_time: 20 minutes
keywords:
  - GEO Generative Engine Optimization
  - product page optimization AI
  - ChatGPT visibility
  - Perplexity visibility
  - SEO vs GEO
  - e-commerce structured data
  - Schema.org Product
  - AI search optimization
  - e-commerce AI
  - PrestaShop product page
published: true
llm_summary: "Comprehensive practical guide on GEO (Generative Engine Optimization) applied to e-commerce. Real-world case study of optimizing a PrestaShop product page to appear in ChatGPT, Gemini and Perplexity answers. 7-step process: AI visibility audit, competitive analysis, product page rewriting, advanced Schema.org structured data, GEO content cluster creation, external authority signal building, and results measurement. Results: from 0 to 14 mentions across 45 query/AI combinations in 60 days, +54% traffic, +75% sales."
llm_topics:
  - GEO Generative Engine Optimization
  - product page optimization
  - e-commerce
  - ChatGPT
  - Gemini
  - Perplexity
  - Schema.org
  - structured data
  - SEO
  - PrestaShop
  - AI visibility
  - editorial content
  - topical authority
  - semantic cluster
faq:
  - question: "What is GEO (Generative Engine Optimization)?"
    answer: "GEO is the practice of optimizing your content so that it is understood, selected and cited by AI answer engines like ChatGPT, Gemini and Perplexity. Unlike SEO which optimizes for a ranking algorithm that displays links, GEO optimizes for a language model that synthesizes a single answer from multiple sources."
  - question: "Why don't standard product pages appear in AI answers?"
    answer: "Standard product pages are built to convert a visitor who is already on the page. They rarely contain what an AI needs to recommend a product: sourced and verifiable claims, detailed usage context, honest comparisons with alternatives, advanced structured data, and authority signals like detailed reviews or independent tests."
  - question: "How long does it take to see GEO results?"
    answer: "In our case study, Perplexity was the first to cite the product at Day+12. ChatGPT followed at Day+25 and Gemini at Day+35. After 60 days, the product appeared in 14 out of 45 tested combinations. Results vary by industry and competition level."
  - question: "Does GEO replace SEO?"
    answer: "No, GEO and SEO are complementary. Well-executed GEO work also improves traditional SEO because content enrichment, advanced structured data, content clusters and editorial backlinks are also powerful SEO signals."
  - question: "Which Schema.org structured data matters for GEO?"
    answer: "Beyond basic Product markup, the key elements are: additionalProperty with domain-specific properties, isSimilarTo to indicate comparable products, detailed aggregateRating and review for credibility, and rich descriptions with usage context."
  - question: "How can I measure my GEO visibility?"
    answer: "Identify 5 to 10 conversational queries your customers might ask an AI, submit them to ChatGPT, Gemini and Perplexity, note whether your product or brand is mentioned, analyze the cited sources (especially on Perplexity), and repeat every 30 days to track progress."
lang: en
---

**A step-by-step case study with before/after measurements**

**Reading time: 20 min**
*Last updated: February 2026*

You invest time and money in SEO for your PrestaShop store. Your product pages rank well on Google. Yet a quiet revolution is reshuffling the deck: **more and more consumers no longer search on Google. They ask ChatGPT, Gemini or Perplexity directly which product to buy.**

And when these AIs answer, your product page is nowhere to be found.

This is exactly the problem I faced with an e-commerce client. In this article, I walk you through **the complete process** I followed to get a PrestaShop product page to appear in AI engine answers — step by step, with measured before and after results.

---

## The context: a product page invisible to AI

My client sells **trail running shoes** on PrestaShop. Their flagship product page — a technical terrain trail shoe model — ranked decently on Google:

- **Position 8** for "technical terrain trail shoe"
- **~120 visits/month** from organic search
- A solid 3.2% conversion rate

On the surface, everything looked fine. But I wanted to check something.

### The AI visibility test: a rude awakening

I asked the same question to three conversational AIs:

> *"What is the best trail running shoe for technical terrain in 2025?"*

**The results:**

| AI Engine | Product mentioned | Brand mentioned | Link to page |
|---|---|---|---|
| ChatGPT (GPT-4o) | No | No | No |
| Gemini | No | No | No |
| Perplexity | No | No | No |

**Zero mentions. Zero.**

All three AIs recommended Salomon, Hoka, La Sportiva — the big brands. My client's product page, despite being relevant and well-positioned on Google, simply did not exist in the AI answer universe.

That's when the **GEO (Generative Engine Optimization)** work began.

---

## What is GEO, and why does it change everything for e-commerce?

GEO is the practice of optimizing your content so that it is **understood, selected and cited by AI answer engines** — not just indexed by traditional search engines.

The fundamental difference:

- **SEO** optimizes for a ranking algorithm that displays 10 blue links.
- **GEO** optimizes for a language model that **synthesizes a single answer** from multiple sources.

In SEO, ranking at position 8 can be enough. In GEO, you're either cited in the answer or you don't exist. There is no "page 2".

### Why standard product pages fail at GEO

Most e-commerce product pages are built to convert a visitor who is **already on the page**. They contain:
- A keyword-optimized title
- Bullet points of features
- Photos
- An "Add to cart" button

But they almost **never** contain what an AI needs to recommend a product:
- **Sourced and verifiable** claims
- Detailed **usage context**
- **Honest comparisons** with alternatives
- **Structured data** the AI can parse
- **Authority signals** (reviews, tests, certifications)

---

## The complete process: 7 steps to optimize a product page for GEO

Here is exactly what I did, step by step.

---

### Step 1 — Audit current AI visibility

Before touching anything, I conducted a **comprehensive GEO visibility audit**. Not just the generic question above, but a battery of 15 conversational queries covering different intents:

**Informational queries:**
- "What trail shoe for rocky terrain?"
- "Technical trail shoes comparison 2025"
- "Which trail brand for rugged terrain?"

**Transactional queries:**
- "Buy technical terrain trail shoe affordable"
- "Best trail shoe value for money"

**Specific queries:**
- "Trail shoe Vibram sole for ultra-trail"
- "Trail running shoe for rocky terrain review"

For each query, I logged in a spreadsheet:
- The complete answer from each AI
- Whether the product or brand was mentioned
- Which competitors were cited
- The sources used by the AI (especially visible on Perplexity)

**Audit result:** across 45 combinations (15 queries x 3 AIs), my client's product appeared **0 times**. The brands cited repeatedly were Salomon (mentioned 38 times), Hoka (31 times), La Sportiva (27 times), and Scarpa (19 times).

> **Key lesson:** AIs have a strong tendency to recommend what they "know" best — meaning the brands and products most present in their training data and in the sources they consult in real time.

---

### Step 2 — Analyze why competitors get cited

To beat competitors in GEO, you need to understand **why** AIs cite them. I analyzed the product pages of models recommended by the AIs and identified recurring patterns.

**What the cited products' pages had in common:**

1. **Content-rich editorial pages** — not just specs, but paragraphs explaining who the product is for, what conditions it excels in, and why.

2. **Complete structured data** — Schema.org Product with `aggregateRating`, `review`, `offers`, `brand`, and even `isSimilarTo`.

3. **Mentions on high-authority third-party sites** — reviews on specialized magazines (RunRepeat, Outdoor Gear Lab), comparisons on expert blogs, presence on community forums.

4. **Structured and detailed customer reviews** — not just "5 stars, great product", but reviews mentioning specific use cases.

5. **Coherent semantic interlinking** — the product page was surrounded by related content (buying guides, blog articles, FAQ) that reinforced the site's topical authority.

**What my client's page was missing:**

- 80-word product description (essentially raw technical specs)
- No structured data beyond basic PrestaShop defaults
- Zero mentions on third-party sites
- 4 customer reviews, all very short
- No supporting editorial content on the blog

---

### Step 3 — Rewrite the product page for AIs (and humans)

This is the most important step. I completely rewrote the product page applying GEO principles.

#### Before: the original page

```
TrailForce X1 — Technical terrain trail shoe

Vibram MegaGrip sole
6mm drop
Weight: 310g
Breathable mesh upper
Rock guard protection
Colors: black/red, grey/blue

Ideal for technical trails and rugged terrain.
```

80 words. No contextualization. No comparisons. No sourced claims.

#### After: the GEO-optimized page

Here is the structure of the new page — I detail each section and explain **why** it's there:

**1. A semantically enriched title**

```
TrailForce X1 — Technical trail shoe for rocky and rugged terrain | Review & ratings 2025
```

*Why:* AIs use the title as a strong relevance signal. Adding "rocky and rugged terrain" and "review & ratings 2025" increases match rate with conversational queries.

**2. An "expert summary" introduction paragraph**

> The TrailForce X1 is a trail running shoe designed specifically for technical terrain — rocky trails, scree fields, rugged single tracks. Equipped with a Vibram MegaGrip sole and a 6mm drop, it delivers a balance of grip, protection and ground feel typically found on models 30 to 50% more expensive. In our tests over 200 km of Alpine trails, it stood out for its downhill stability on technical terrain and its durability (sole still in excellent condition after 200 km on abrasive terrain).

*Why:* this paragraph contains **specific, verifiable claims** ("200 km tested", "30 to 50% cheaper"), **precise usage context** ("rocky trails, scree fields"), and an **implicit comparative evaluation**. AIs favor this type of content because it directly answers user questions.

**3. A "Who is this shoe for?" section**

> **Ideal profile:** intermediate to advanced trail runner, running on technical terrain (scree, roots, rocks), distances from 15 to 80 km.
>
> **It excels if:** you're looking for maximum grip on wet rock, impact protection without sacrificing ground feel, and a controlled budget.
>
> **It's not made for:** flat forest trail running (too rigid), ultra-trails over 100 km (insufficient cushioning over very long distances), runners who prefer a high drop.

*Why:* this section is crucial for GEO. When a user asks an AI "which shoe for this use case", the AI looks for content that **clearly segments use cases**. Mentioning the product's limitations is also a credibility signal that AIs are learning to value.

**4. Technical specs in context**

Instead of a dry spec list, I reformatted each feature with an explanation of its real-world benefit:

| Feature | Detail | What it changes on the trail |
|---|---|---|
| Sole | Vibram MegaGrip, 5mm lugs | Superior grip on wet rock — comparable to Salomon Speedcross on dry terrain, significantly better on wet surfaces |
| Drop | 6 mm | Good balance between uphill dynamism and long downhill comfort |
| Weight | 310 g (size 42/US 9) | Average for technical shoes — 20 g heavier than a Hoka Speedgoat, but with more solid rock guard protection |
| Protection | Full rock guard + anti-perforation plate | Allows attacking scree fields without hesitation, where lighter shoes demand caution |
| Upper | Technical breathable mesh, welded lateral reinforcements | Decent breathability in summer, reinforcements prevent tears on rocks |

*Why:* direct comparisons with known products (Salomon, Hoka) are a powerful GEO lever. When the AI already knows the reference products, a factual comparison allows it to **position the product within its existing knowledge framework**.

**5. A structured FAQ section**

> **Is the TrailForce X1 suitable for ultra-trail?**
> It's suitable for distances up to 80 km on technical terrain. Beyond that, cushioning may become insufficient for runners over 75 kg. For ultra-long distances, we recommend [link to another model in the range].
>
> **How does it compare to the Salomon Speedcross 6?**
> The Speedcross 6 is more aggressive on loose terrain (mud, dirt), but less versatile on rock. The TrailForce X1 offers better stability on rocky terrain and superior protection, at a price approximately 40 euros lower.
>
> **What size should I choose?**
> The TrailForce X1 runs true to size. If you're between sizes, go half a size up — that's standard practice in trail running to avoid black toenails on descents.

*Why:* FAQs are one of the most powerful formats for GEO. The questions match **exactly** the format of conversational queries. AIs detect them easily and often use them as a direct source for their answers.

**6. A "tester reviews" block with quotes**

> 4.6/5 — Average across 47 verified reviews
>
> *"I ran the Trail des Aiguilles Rouges (58 km, 3,200 m elevation gain) in these. Impeccable grip on wet granite slabs. Best surprise of my season."* — Julien M., ultra-trail runner, Chamonix
>
> *"I was coming from a Hoka Speedgoat 5. Heavier and less cushioned, but grip and protection are in another league on rocky terrain."* — Sophie L., intermediate trail runner, Grenoble
>
> *"Unbeatable value for technical terrain. Only downside: the lacing system could be better designed."* — Marc D., field tester for TrailSession.fr

*Why:* detailed reviews with context (trail name, comparison with another model, negative point) are strong credibility signals for AIs. A review that compares with a known competitor particularly helps the AI contextualize the product.

**Result:** the page went from 80 words to approximately **900 words** of useful, structured content optimized for conversational queries.

---

### Step 4 — Implement advanced structured data

PrestaShop generates basic structured data, but it's insufficient for GEO. I implemented enriched Schema.org markup:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "TrailForce X1 — Technical terrain trail shoe",
  "description": "Trail shoe designed for rocky and rugged terrain, equipped with a Vibram MegaGrip sole. Tested over 200 km of Alpine trails.",
  "brand": {
    "@type": "Brand",
    "name": "TrailForce"
  },
  "category": "Trail running shoes",
  "sku": "TF-X1-2025",
  "offers": {
    "@type": "Offer",
    "price": "119.00",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2025-12-31",
    "seller": {
      "@type": "Organization",
      "name": "TrailForce Store"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "reviewCount": "47",
    "bestRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Julien M."
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "I ran the Trail des Aiguilles Rouges (58 km, 3,200 m elevation gain) in these. Impeccable grip on wet granite slabs."
    }
  ],
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Sole",
      "value": "Vibram MegaGrip, 5mm lugs"
    },
    {
      "@type": "PropertyValue",
      "name": "Drop",
      "value": "6mm"
    },
    {
      "@type": "PropertyValue",
      "name": "Weight",
      "value": "310g (size 42)"
    },
    {
      "@type": "PropertyValue",
      "name": "Recommended terrain",
      "value": "Rocky, scree, technical trails"
    }
  ],
  "isSimilarTo": [
    {
      "@type": "Product",
      "name": "Salomon Speedcross 6",
      "brand": { "@type": "Brand", "name": "Salomon" }
    },
    {
      "@type": "Product",
      "name": "Hoka Speedgoat 5",
      "brand": { "@type": "Brand", "name": "Hoka" }
    }
  ]
}
```

**Key elements added:**

- `additionalProperty` with domain-specific properties (recommended terrain, sole type) — helps AIs precisely understand product characteristics
- `isSimilarTo` — explicitly tells AIs which products are comparable, facilitating placement in comparative answers
- Detailed `aggregateRating` and `review` — credibility signal

**On PrestaShop**, I used a custom module to inject this enriched JSON-LD into the product page `<head>`, replacing the default markup.

---

### Step 5 — Create supporting content (the "GEO cluster")

An isolated product page, even an excellent one, has little chance of being cited by an AI if the site lacks **topical authority** on the subject. AIs evaluate a source's credibility partly through the **depth and consistency of its content** on a given domain.

I created a **mini content cluster** around the product page:

**Article 1: Buying guide**
*"How to choose a trail shoe for technical terrain: the complete 2025 guide"*
A 2,500-word article covering selection criteria (grip, protection, cushioning, drop), with natural mentions of the TrailForce X1 as a concrete example.

**Article 2: Comparison**
*"TrailForce X1 vs Salomon Speedcross 6 vs Hoka Speedgoat 5: the field comparison"*
An honest comparative test with summary table, trail photos, and verdict by runner profile. The client's product doesn't "win" everywhere — it wins on value and rock grip, but loses on long-distance cushioning and brand recognition.

**Article 3: Long-term review**
*"200 km in the TrailForce X1: my long-term test on Alpine trails"*
A test report with photos, GPS data, and wear evaluation. A narrative format that generates potential long citations for AIs.

**Each article:**
- Contains links to the product page
- Uses Schema.org `Article` markup with `about` pointing to the product
- Includes FAQs at the bottom
- Is written in an expert but accessible tone (the register that AIs tend to prefer citing)

---

### Step 6 — Build external authority signals

This is the most often overlooked dimension in GEO, yet one of the most important. Conversational AIs — especially Perplexity, which cites its sources — rely heavily on **high-authority third-party sites** to validate their recommendations.

**Actions taken:**

1. **Sent the product to 3 specialized trail blogs** for independent testing. Two published a detailed test article within the following 6 weeks.

2. **Published a detailed post on a French trail running forum** (in "user experience report" format), with a link to the product page.

3. **Answered questions on Quora and Reddit** about "best trail running shoes for rocky terrain" with factual mentions of the product among other options.

4. **Created entries on product databases** referenced by AIs (certain product aggregators are crawled by Perplexity and used by ChatGPT shopping plugins).

> **Key point:** every external mention uses the **exact product name** ("TrailForce X1") and the **same key descriptors** ("technical terrain", "Vibram MegaGrip sole", "rocky terrain"). Terminological consistency across all sources is a strong signal for AIs.

---

### Step 7 — Measure, iterate, re-measure

Four weeks after all optimizations went live, I ran exactly the same audit as in Step 1: the same 15 queries, on the same 3 AIs.

---

## The results: before / after

### AI visibility — Results across 15 test queries

| Metric | Before | After (D+30) | After (D+60) |
|---|---|---|---|
| **Total mentions** (out of 45 combinations) | 0 | 8 | 14 |
| **ChatGPT** — mentions | 0/15 | 2/15 | 4/15 |
| **Gemini** — mentions | 0/15 | 1/15 | 3/15 |
| **Perplexity** — mentions | 0/15 | 5/15 | 7/15 |

### Qualitative citation breakdown

**Perplexity** was the first to cite the product, as early as Day+12. Its answers cited:
- The comparison article published on the blog (direct link)
- One of the two test articles published on external specialized blogs

**ChatGPT** started mentioning the product at Day+25, mainly on comparative queries ("TrailForce X1 vs Speedcross") and value-for-money queries.

**Gemini** was the slowest to integrate the product, with first mentions around Day+35.

### Impact on traffic and sales

| Metric | Before | After (D+60) | Change |
|---|---|---|---|
| Product page traffic (visits/month) | 120 | 185 | **+54%** |
| Traffic from ChatGPT/Bing Chat | 0 | 23 | **New channel** |
| Traffic from Perplexity (referral) | 0 | 41 | **New channel** |
| Support articles traffic (blog) | 30 | 210 | **+600%** |
| Product sales (units/month) | 4 | 7 | **+75%** |
| Google position ("technical terrain trail shoe") | 8 | 5 | **+3 positions** |

**Important observation:** the GEO work also improved traditional SEO. This makes sense — content enrichment, advanced structured data, content clusters, and editorial backlinks are also powerful SEO signals. **GEO and SEO are not opposed: well-executed GEO amplifies SEO.**

---

## The 5 GEO principles I take away for e-commerce

After this experience and several similar optimizations, here are the principles I apply systematically:

### 1. Think "answer", not "result"

In SEO, you optimize to appear in a list. In GEO, you optimize so that your content **becomes the answer**. This means your product page should be readable aloud by an AI and constitute a credible recommendation.

### 2. Compare yourself explicitly to reference products

AIs know the big brands. If your product is less well-known, you need to **build the bridge** between what the AI knows and your product. Factual and honest comparisons ("comparable to Salomon X on this criterion, better on that one, weaker on this other one") are extremely effective.

### 3. Source your claims

"Best trail shoe" means nothing to an AI. "Tested over 200 km of Alpine trails with 15% sole wear according to our test protocol" is a claim the AI can evaluate and cite. **Statistics, test results, numerical data** are the fuel of GEO.

### 4. Multiply consistent sources

A product page alone isn't enough. You need an **ecosystem of mentions** — your blog, third-party sites, forums, product databases — all saying the same thing with the same terminology. The more diverse and concordant the sources, the more confident the AI is in recommending your product.

### 5. Structure for machines, write for humans

Schema.org structured data is not optional in GEO. But the content itself must remain natural, useful, and honest. AIs are trained on quality human content — that's exactly what you need to produce.

---

## How to measure your GEO visibility right now

If you want to know where you stand, here is the minimal protocol I recommend:

1. **Identify 5 to 10 conversational queries** your customers might ask an AI (natural language, in question form).

2. **Submit them to ChatGPT, Gemini and Perplexity** and note whether your product, brand or site is mentioned.

3. **Analyze the cited sources** (especially on Perplexity) to understand where the AI pulls its information from.

4. **Compare with cited competitors**: what do they have that you don't?

5. **Repeat every 30 days** to measure progress.

---

## Conclusion: GEO is not the future of e-commerce, it's the present

While you're reading this article, thousands of consumers are asking ChatGPT or Perplexity which product to buy. If your product page isn't optimized for these answer engines, **you're leaving sales on the table** — and your better-positioned competitors are picking them up.

The good news: as this case study shows, GEO levers are **accessible and actionable**. You don't need a multinational's budget. You need quality content that's well-structured, sourced, and supported by a consistent ecosystem of mentions.

GEO is still emerging territory. Those who position themselves now will have a major competitive advantage when the wave goes mainstream.

**The question isn't whether AIs will influence purchase decisions. It's whether your product will be in their recommendations when it happens.**
