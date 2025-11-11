---
layout: post
title: 'Automate Your Facebook and Instagram Posts with n8n: The Lifesaver Guide'
date: 2025-11-06
author: Nicolas Dabène
categories:
- Development
- Artificial Intelligence
- Tutorial
tags:
- API
- automation
excerpt: If you thought Meta integration would be child's play, this detailed guide will save you hours of frustration and show you the way.
image: /assets/images/blog/2025/11/automatisation-meta-n8n.jpg
lang: en
ref: automatiser-publications-facebook-instagram-n8n-guide-salvateur-nov2025
featured: true
difficulty: Intermediate
technologies:
- n8n
- Meta API
- Facebook
- Instagram
- No-Code
estimated_reading_time: 15 minutes
faq:
- question: Can I publish to multiple Instagram/Facebook accounts from the same n8n workflow?
  answer: Absolutely! Simply create multiple credentials in n8n (one per account) and duplicate your publishing branches. However, watch out for rate limits if you manage many accounts.
- question: Does the non-expiring Instagram token need to be renewed?
  answer: Theoretically no, it's supposed to never expire. In practice, if you modify the permissions of your developer application or system user, you may need to generate a new one. Keep documentation of the procedure so you're not caught off guard.
- question: Can we schedule publications with this method?
  answer: Yes! Use n8n's Schedule Trigger node to trigger your workflows at specific times. You can even create a database (Airtable, Notion, etc.) containing your scheduled posts, and n8n publishes them automatically.
- question: Does this configuration comply with Meta's terms of use?
  answer: Yes, as long as you use the official API (which we're doing here) and respect Meta's content rules. This method is perfectly legal and encouraged by Meta for legitimate business uses.
---
# Automate Your Facebook and Instagram Posts with n8n: The Lifesaver Guide

If like me you use n8n and thought Meta integration for posting would be easy, you probably discovered a very different reality. Between the Facebook developer application, Meta Business Suite, access tokens, system users and multiple endpoints to juggle... you may have found yourself staring at your screen with that familiar feeling of "but why is this so complicated?".

Good news: you're not alone in this struggle, and above all, there's a clear and detailed solution. This guide is inspired by the remarkable work of Julien Sanson, a YouTuber who had the patience and generosity to dissect all this complexity in a complete video. We'll build on his teachings to save you hours of frustration and allow you to automate your Facebook and Instagram publications from n8n.

## Introduction

Automating social media publications represents considerable time savings for businesses and content creators. n8n, this open-source automation platform we appreciate so much for its flexibility, theoretically allows managing these publications via the Meta API. But here's the thing: between theory and practice, there's a gulf made of obscure configurations, tangled permissions and documentation that assumes you already know half the answers.

In my 15 years of developing automation tools, I've rarely seen an integration as labyrinthine as Meta's. This guide will walk you through this labyrinth step by step, explaining not only the "how" but also the "why" of each step.

### Julien Sanson's Tutorial: The Foundation of This Guide

Before going further, I want to highlight the remarkable work of **Julien Sanson**, a YouTube content creator passionate about automation and no-code tools. It's thanks to his exhaustive video tutorial that I was able to dissect this complex integration and offer you this detailed guide. Julien had the patience and pedagogy to document every step, every pitfall, every subtlety of the Meta API.

If you're more of a visual learner, I warmly recommend watching his complete tutorial:

<iframe width="560" height="315" src="https://www.youtube.com/embed/neVYoVwPAJo?si=GGWo4sarm7tiTwwQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

This written guide builds on and develops Julien's teachings, adding my own feedback and additional explanations to make the process even more accessible. A huge thanks to him for his foundational work!

## Understanding the Architecture: The Three Pillars of Meta Integration

Before diving into the technical details, let's take a moment to understand the ecosystem we'll be working in. The integration rests on **three interconnected pillars** that must communicate harmoniously:

### 1. The Facebook Developer Application

This is your gateway to the Meta API. Imagine it as the access badge that authorizes you to dialogue with Facebook and Instagram servers. Without this properly configured application, it's impossible to go further.

### 2. Meta Business Suite (Business Portfolio)

This is the control center that groups all your Meta assets: your Facebook pages, Instagram accounts, and even your developer application. This is where you'll define who has the right to do what, and it's also where you'll generate the precious non-expiring Instagram token.

### 3. n8n, Your Orchestrator

This is the tool that will exploit everything you've configured in the first two pillars. It will send requests to the Meta API using the access tokens we're going to generate.

**The challenge?** These three components must be perfectly synchronized, each having its own rules and logic. A weak link in this chain and everything collapses. But don't worry, we're going to build this chain link by link.

## Phase 1: Building Foundations - Meta Ecosystem Configuration

### Step 1: Create and Configure the Facebook Developer Application

Let's start at the beginning: creating your developer application. Go to the [Facebook developer console](https://developers.facebook.com/) and log in with your account.

#### Application Creation

During creation, you'll face two crucial choices:

**Use Case:** Select "Other". Why? Because predefined use cases are designed for specific scenarios that Meta has identified. Our objective – using the API via n8n – doesn't fit any of these pre-established boxes.

**Application Type:** Imperative to choose "Business". This is a non-negotiable point. Only this application type will allow you to manage both Instagram and Facebook via the API. "Consumer" applications are limited and won't give you access to the features you need.

#### Going Live: Necessary Bureaucracy

By default, your application starts in "Development" mode. It's a secure sandbox, but useless for real automation. To go "Live", you must provide two legal documents:

- A Privacy Policy
- Terms of Service

If you don't have these documents yet, don't panic. Online generators like [Termsfed](https://www.termsfeed.com/) can create these documents for you. Yes, it's bureaucratic. Yes, it's tedious. But Meta takes data protection very seriously (following numerous past scandals), and this step is unavoidable.

#### Add the Instagram Product

Your application by default only manages Facebook. For Instagram, you must explicitly add the product. In your application dashboard, look for the "Products" section and add Instagram. This step is often forgotten, leading to hours of debugging later.

#### Verify Roles

Last crucial point of this step: ensure your account is defined as **Admin** of the application. Go to "App Roles" > "Roles" and verify. Without this role, you won't be able to perform certain critical operations in the following steps.

### Step 2: The Bridge Between Facebook and Instagram

Here's a subtlety that causes a lot of confusion: **your Instagram account must be connected to a Facebook page**. This isn't optional, it's a Meta architectural requirement.

Go to your Facebook page dashboard (not your personal profile, but the page you manage). Navigate to "Settings" > "Linked Accounts". You should see an option to connect an Instagram account.

**Why this connection?** Historically, Meta built its infrastructure making Facebook the central hub. Instagram, acquired later, was integrated as an extension of this ecosystem. This inherited architecture explains why, even in 2025, you must go through Facebook to manage Instagram via the API.

Once connected, both accounts will appear in your business portfolio, which is essential for the next step.

### Step 3: Meta Business Suite - Ultimate Control Center

Meta Business Suite (formerly Business Manager) is the brain of the operation. This is where everything will be coordinated.

#### Create the Business Portfolio

If you don't already have one, create a new business portfolio on [business.facebook.com](https://business.facebook.com/). Give it a meaningful name – you'll be spending time there.

#### Add Your Assets

In "Settings" > "Accounts", you must add three elements:

**1. Your Facebook Page**
- Use the page URL rather than its name to avoid confusion if you manage multiple pages
- You'll need to confirm you're its administrator

**2. Your Instagram Account**
- If it was already linked to the Facebook page, it may add automatically
- Otherwise, you'll need to "claim" it and log in to prove it's yours

**3. The Developer Application**
- Add it using its Application ID (found in the developer dashboard)
- This step officially links your application to your business portfolio

#### The System User: Your Automation Robot

Here's the most important concept for automation: **the system user**. Think of it as an admin robot that will act on your behalf via the API.

**Create the system user:**
1. In Business Suite, go to "Settings" > "Users" > "System Users"
2. Create a new system user with **Admin** role
3. Give it a descriptive name like "n8n Automation"

**Assign permissions:**
This is the critical step. Your system user must have **full control** over:
- Your Facebook Page
- Your Instagram Account
- Your Facebook Developer Application

Without this full control, you'll encounter frustrating permission errors during publishing attempts. Be generous with permissions here – it's your own robot, after all.

## Phase 2: The Keys to the Kingdom - Access Token Generation

Access tokens are the keys that will allow n8n to authenticate with the Meta API. You'll generate two: one for Instagram (which never expires – the Holy Grail!), and one for Facebook (which expires every two months).

### The Non-Expiring Instagram Token: The Holy Grail

This is the preferred method for automation. A token that never expires means you configure once and forget.

**Generation procedure:**

1. Return to your Meta Business Suite
2. Navigate to "Settings" > "Users" > "System Users"
3. Select the system user you created
4. Click "Generate new token"
5. In the window that opens:
   - Select your developer application
   - **Crucial:** Choose the option "Token never expires"
   - Check all Instagram-related permissions, notably:
     - `instagram_basic`
     - `instagram_content_publish`
     - `pages_show_list`
     - `pages_read_engagement`
6. Generate and **immediately copy** this token to a safe place

**Important:** This token will only be displayed once. If you lose it, you'll need to generate a new one.

### The Long-Lived Facebook Token: The Viable Alternative

For Facebook, the procedure is different and slightly more complex. Meta doesn't allow generating a non-expiring token for Facebook the same way as Instagram. We'll therefore create a long-lived token (60 days) that you'll need to renew periodically.

**Step 1: Generate a Short-Lived Token**

1. Go to your developer application
2. Go to "Tools" > "Graph API Explorer"
3. Select your application in the dropdown menu
4. Grant necessary permissions (check all boxes related to pages and publishing)
5. Generate a token – this first token expires in 1 hour

**Step 2: Extend Token Duration**

1. Copy the short token you just generated
2. In the same developer space, go to "Tools" > "Access Token Debugger"
3. Paste your short token in the field
4. Click "Debug"
5. At the bottom of the page, you'll see a button "Extend Access Token"
6. Click it – your short token becomes a long-lived token (60 days)
7. Copy this new token and keep it safe

**Pro tip:** Set up a reminder in your calendar to renew this token 2 weeks before expiration. This will avoid service interruptions.

## Phase 3: Publishing Mechanics - Logic and Workflows in n8n

Now that you have your tokens, we enter the really interesting part: how to actually publish content. The logic differs depending on whether you're targeting Facebook or Instagram.

### Credential Configuration in n8n

First of all, you must register your tokens in n8n:

1. In n8n, go to "Credentials"
2. Create two new credentials:
   - **Instagram:** Type "Instagram OAuth2 API" – use the non-expiring token
   - **Facebook:** Type "Facebook Graph API" – use the long-lived token

For each credential, you'll need your account ID (Instagram Business Account ID or Facebook Page ID). These IDs are found in your Meta Business Suite settings.

### Publishing on Facebook: The Edge Logic

Facebook uses a concept called "edges" to manage different types of publications. An edge is essentially a specialized API endpoint.

#### Publishing an Image (Post or Story)

Image publishing on Facebook follows a two-step process:

**Step 1: Upload without publishing**
```
Endpoint: /{page_id}/photos
Parameters:
- url: [your hosted image URL]
- published: false
- message: [your publication text]
```

This first step uploads the image to Facebook and returns an image ID.

**Step 2: Actual publishing**
```
Endpoint: /{page_id}/feed (for a post)
        or /{page_id}/photo_stories (for a story)
Parameters:
- attached_media: [{"media_fbid": "ID_from_step_1"}]
```

**Why this two-step process?** Meta wants time to process and verify your image (inappropriate content detection, compression, etc.) before it's publicly visible.

#### Publishing a Video

For videos, the logic is more direct but requires sending the binary file:

```
Endpoint: /{page_id}/videos
Method: POST
Body:
- file_data: [video binary file]
- description: [your text]
```

**n8n tip:** Use the "HTTP Request" node in "Binary Data" mode to send your video. You must first retrieve the video (from a URL, cloud service, etc.) and convert it to binary in n8n.

### Publishing on Instagram: The Container System

Instagram works differently with a "container" system. It's always a two-step process, but the logic is more uniform.

#### Step 1: Create the Container

A container is like a draft that carries your media and its metadata.

```
Endpoint: /{instagram_account_id}/media
Parameters:
- image_url (or video_url): [your hosted media URL]
- caption: [your text with hashtags]
- media_type: [See table below]
```

**Media types (`media_type`):**
- `IMAGE` → Classic image post
- `VIDEO` → Classic video post
- `STORIES` → Story (image or video)
- `REELS` → Reel

This request returns a `creation_id` – your container identifier.

#### Step 2: Publish the Container

```
Endpoint: /{instagram_account_id}/media_publish
Parameters:
- creation_id: [ID from step 1]
```

And there you go! Your publication is online.

**Point of attention:** Instagram may take a few seconds to process your media. If you publish immediately after creating the container, you might receive an error. In n8n, add a "Wait" node of 3-5 seconds between the two steps for videos and reels.

### Complete n8n Workflow: A Concrete Example

Here's an example n8n workflow to publish an image on Instagram and Facebook simultaneously:

**Workflow Architecture:**

1. **Trigger Node** (Webhook, Schedule, or Manual)
   - Receives or triggers the process
   - Contains: image URL, publication text

2. **Instagram Branch**
   - "HTTP Request" Node → Create Instagram container
   - "Wait" Node → 3 seconds
   - "HTTP Request" Node → Publish Instagram container

3. **Facebook Branch (parallel)**
   - "HTTP Request" Node → Upload Facebook image (published=false)
   - "HTTP Request" Node → Publish on Facebook feed

4. **Notification Node** (optional)
   - Slack, Email, or Discord to confirm publication

**Error Handling:**

Always add "Error Trigger" nodes to capture failures. Common errors include:
- Expired token (for Facebook)
- Insufficient permissions
- Unsupported media format
- Processing delay exceeded

## Common Pitfalls and Solutions

### Error: "Invalid OAuth access token"

**Cause:** Your token has expired or doesn't have the right permissions.

**Solution:**
- For Instagram: Regenerate a token from Business Suite
- For Facebook: Extend your token via debugger
- Verify all necessary permissions are granted

### Error: "Unsupported video format"

**Cause:** Instagram and Facebook have strict requirements on video formats.

**Solution:**
- Video: MP4, MOV
- Codec: H.264
- Ratio: 16:9 for posts, 9:16 for stories and reels
- Max size: 100 MB (Instagram), 4 GB (Facebook)

Use FFmpeg in n8n (via "Execute Command" node) to convert your videos if necessary.

### Error: "Media not ready for publishing"

**Cause:** You're trying to publish the Instagram container before it's ready.

**Solution:** Increase the "Wait" node delay between creation and publication. For long videos, wait up to 10-15 seconds.

### My Instagram token works in test but not in production

**Cause:** The developer application isn't in "Live" mode.

**Solution:** Return to your developer application and ensure it's properly switched to Live mode with configured privacy policies.

## Optimizations and Best Practices

### Host Your Media Correctly

Meta doesn't store your media – you must provide publicly accessible URLs. Some options:

**Recommended Cloud Solutions:**
- **Cloudinary**: Automatic optimization, fast CDN
- **AWS S3**: Reliable and scalable, but requires configuration
- **Imgur**: Simple for images, free with limitations

**Tip:** Configure URLs with limited lifespan (signed URLs) for more security. Once Meta has downloaded your media, the URL can expire.

### Manage Hashtags Intelligently

Instagram limits to 30 hashtags per publication. For better engagement:
- Use 5-10 very targeted hashtags rather than 30 generic ones
- Vary your hashtags between publications
- Include 2-3 niche hashtags with low competition

### Scheduling and Rate Limits

Meta imposes publication limits:
- Instagram: 25 posts/day
- Facebook: No strict limit, but avoid spam

In n8n, use the "Schedule Trigger" node to space out your publications and respect these limits.

### Monitoring and Analytics

Configure a logging system in n8n to track:
- Publication successes/failures
- Publication IDs (for later analytics)
- Processing time

You can use the "Airtable" or "Google Sheets" node to create a tracking dashboard.

## Conclusion

Configuring Meta integration with n8n is undeniably complex. Between the developer application, Business Suite, system users, multiple token types and different publishing logics, there's plenty to get lost. But once this initial configuration is complete, you unlock extraordinary automation potential.

**Key points to remember:**

- Meta ecosystem rests on three pillars: developer application, Business Suite and n8n
- The non-expiring Instagram token is the Holy Grail – take time to configure it properly
- Facebook and Instagram have different publishing logics, but both follow a two-step process
- Documentation and debugging are your best friends – keep a trace of each step

This approach has allowed me to automate publication of hundreds of contents for different clients, saving hours of manual work each week. The learning curve is steep, but the investment is well worth it.

A huge thanks to Julien Sanson for his detailed video tutorial that served as the basis for this article. If you prefer video format, I warmly recommend checking out his complete video on YouTube.

Now it's your turn to play! Configure your integration step by step, test carefully, and you'll soon be able to orchestrate your Meta publications like a digital conductor.

---

*Article published November 6, 2025 by Nicolas Dabène - Automation and AI Expert with 15+ years of experience developing no-code and low-code tools.*
