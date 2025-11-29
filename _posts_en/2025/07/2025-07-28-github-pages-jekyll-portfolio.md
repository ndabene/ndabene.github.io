---
layout: post
title: 'Create Your Tech Portfolio Online: Guide'
date: 2025-07-28
author: Nicolas Dabène
lang: en
ref: github-pages-jekyll-portfolio-2025
categories:
- Development
- Tutorials
tags:
- automation
- development
excerpt: Discover how to create a professional online portfolio for free with GitHub
  Pages and Jekyll. Complete guide for developers and creatives.
image: /assets/images/blog/2025/07/2025-07-28-github-pages-jekyll-portfolio.webp
featured: false
difficulty: Beginner
technologies:
- GitHub Pages
- Jekyll
- Git
- Markdown
- HTML
- CSS
estimated_reading_time: 12 minutes
llm_summary: Discover how to create a professional online portfolio for free with
  GitHub Pages and Jekyll. Complete guide for developers and creatives.
llm_topics:
- GitHub Pages
- Jekyll
- portfolio
- static site
- git
- web development
faq:
- question: What is GitHub Pages?
  answer: GitHub Pages is a free static website hosting service directly integrated
    with GitHub. It automatically transforms your source code into a publicly accessible
    website by creating a special repository named your-username.github.io, offering
    professional and reliable hosting without fees or complex server configuration.
- question: Why choose Jekyll to create a portfolio?
  answer: Jekyll is a static site generator that compiles your Markdown content into
    ready-to-serve HTML. It offers exceptional performance, enhanced security without
    a database, native integration with GitHub Pages, and allows clear separation
    of content and presentation for simplified maintenance and optimal scalability.
- question: How to publish my site on GitHub Pages?
  answer: Create a GitHub repository named your-name.github.io, enable GitHub Pages
    in Settings > Pages by selecting the main branch, then push your code with git
    add, git commit, and git push. Your site updates automatically within minutes
    with each modification without additional configuration.
- question: Can I use a custom domain name with GitHub Pages?
  answer: Yes, GitHub Pages perfectly supports custom domains like yourname.com. Configuration
    takes a few minutes and significantly strengthens your professional image by transforming
    your portfolio from a GitHub project into a true professional web presence for
    a minimal investment of a few euros per year.
- question: Do I need to install Jekyll locally to use GitHub Pages?
  answer: No, GitHub Pages can compile Jekyll in the cloud without local installation.
    However, installing Jekyll locally is highly recommended as it allows you to instantly
    preview each modification, test different designs, and debug before publishing,
    transforming your creative process into a more productive and serene experience.
- question: Is this suitable for beginners?
  answer: Yes, this guide is designed to be accessible with step-by-step explanations.
---

## Introduction

Imagine you're a digital craftsman. You create beautiful applications, elegant websites, or innovative designs. But here's the problem: all these masterpieces remain hidden in your computer, like paintings in a dusty attic. How do you show them to the world? How do you prove your expertise to a recruiter or attract new clients?

The answer is in three words: **online portfolio**. But be careful, we're not talking about creating a complex site with expensive servers and temperamental databases. No, we're going to discover together an elegant and free approach that has proven itself among thousands of developers: **GitHub Pages combined with Jekyll**.

In my development practice for over 15 years, I've seen too many talents wasted by the absence of a worthy digital showcase. Today, I'll guide you step by step to transform this problem into an opportunity. By the end of this article, you'll have all the keys to create your own professional portfolio, easily maintain its content, and evolve it according to your needs.

## Understanding the Foundations: GitHub Pages, Your Free Host

Let's start by understanding what GitHub Pages is, as it's the cornerstone of our digital edifice.

### What is GitHub Pages exactly?

GitHub Pages is a static website hosting service directly integrated with GitHub. Think of it as a magician that automatically transforms your source code into a website accessible to the world. The principle is remarkably simple: you create a special Git repository on GitHub, you place your HTML, CSS, and JavaScript files there, and **voilà**! Your site is online.

This approach revolutionizes personal website creation. Gone are complex server configurations, security worries, or accumulating hosting bills. GitHub Pages offers you professional, reliable, and **completely free** hosting for your open source projects and personal sites.

### How does this magic work?

GitHub Pages operation is based on a simple but powerful concept. When you create a repository with a specific name (generally `your-username.github.io`), GitHub automatically recognizes it as a website and activates hosting. Each time you push code to this repository, GitHub rebuilds and redeploys your site.

It's like having a personal assistant who constantly monitors your modifications and updates your professional showcase in real-time. This approach ensures your portfolio remains always synchronized with your most recent work.

### The different types of GitHub Pages sites

GitHub Pages offers three types of sites, each adapted to specific needs. **User sites** use the `username.github.io` repository and represent your main identity on the web. **Organization sites** function similarly but for companies or collectives. Finally, **project sites** allow creating documentation or presentation for each specific repository.

For a personal portfolio, we'll focus on the user site, which becomes your official digital business card.

## The Static Heart: Jekyll, Your Site Generator

Now that we've laid the foundations with GitHub Pages, let's talk about Jekyll, the tool that will bring your portfolio to life.

### Jekyll: What is it really?

Jekyll is a static site generator, and I know this term can seem technical at first. Let me explain with a simple analogy. Imagine you want to prepare a meal for guests. You have two options: either prepare each dish on demand when the guest arrives (dynamic site), or prepare all dishes in advance and serve them immediately (static site).

Jekyll works according to the second principle. It takes your content written in Markdown (a simple and readable text format), your design templates, and your configurations, then it "compiles" everything into HTML, CSS, and JavaScript files ready to be served instantly.

### Why did GitHub choose Jekyll?

This alliance between GitHub Pages and Jekyll is not random. GitHub integrated Jekyll by default because it perfectly corresponds to modern development philosophy: simplicity, performance, and version control. When you push your Jekyll code to GitHub, the platform automatically compiles it and deploys the result.

This native integration means you don't need to manage server-side compilation or worry about dependencies. GitHub takes care of all that for you, like a chef preparing your dishes behind the scenes.

### Jekyll's fundamental principles

Jekyll is based on several key concepts that are important to master. First, **Markdown for content**: you write your articles and pages in this simple format, which automatically transforms into HTML. Then, **Liquid templates** structure your content presentation with intuitive syntax. Finally, **the absence of a database** drastically simplifies architecture and improves performance.

This modular approach allows clear separation of content (your projects, your presentation) from form (design, navigation), greatly facilitating maintenance and future evolutions.

## Why Choose GitHub Pages and Jekyll for Your Portfolio?

After presenting the tools individually, let's explore why their combination constitutes an intelligent strategic choice for your portfolio.

### The undeniable financial advantage

In a world where hosting costs can quickly accumulate, GitHub Pages offers an **entirely free** solution. No hidden fees, no surprise subscriptions, no draconian bandwidth limits. This free service allows you to focus on the essential: creating and presenting your work.

This economy may seem anecdotal, but think about it: how many personal projects are abandoned because of recurring costs? With GitHub Pages, this barrier disappears completely.

### The power of version control with Git

Git is not just a development tool, it's an **intelligent backup system** for your portfolio. Every modification is tracked, every version is preserved. You broke something while experimenting with a new design? A simple `git revert` brings you back to the previous state.

This approach transforms your portfolio maintenance into a serene experience. You can experiment freely, knowing you always have a safety net.

### Revolutionary deployment simplicity

Forget complex FTP protocols, laborious server configurations, or temperamental deployment tools. With GitHub Pages and Jekyll, updating your portfolio comes down to three commands:

```bash
git add .
git commit -m "New project added"
git push origin main
```

That's it! Your site updates automatically within minutes. This simplicity encourages regular updates to your portfolio, keeping it relevant and attractive.

### Performance and security by design

Static sites generated by Jekyll are inherently **fast and secure**. No database to hack, no dynamic server to compromise, no vulnerable third-party plugins. Your portfolio loads quickly, even on slow connections, and naturally resists intrusion attempts.

This technical robustness strengthens your professional credibility: a portfolio that loads instantly gives an excellent first impression.

## Environment Preparation

Before launching into actual creation, let's prepare our working environment. This step, often neglected, yet conditions your project's success.

### Essential prerequisites

To begin, you'll need a **GitHub account**. If you don't have one yet, create one on github.com. Choose your username carefully, as it will be part of your portfolio URL (`your-name.github.io`).

For comfortable development and advanced customizations, I strongly recommend installing **Git**, **Ruby**, and **Jekyll** on your local machine. While these tools aren't strictly essential to create your first site (GitHub can compile everything in the cloud), they quickly become essential for testing your modifications before publication.

### Local installation: a profitable investment

Installing Jekyll locally may seem intimidating at first, but it's an investment that will save you a lot of time. Imagine being able to instantly preview every modification, test different designs, or debug problems without waiting for GitHub deployment.

This local development capability transforms your creative process: you can experiment freely, iterate quickly, and only publish when you're entirely satisfied with the result.

## The Step-by-Step Guide to Create Your Portfolio

Now that we've laid all the theoretical and practical foundations, let's dive into concrete creation of your portfolio. I'll guide you step by step, as if we were working together.

### Step 1: Create your site's GitHub repository

The first step is to create a new repository on GitHub. Naming is crucial here: your repository must imperatively be called `your-username.github.io`. This convention allows GitHub to automatically recognize that it's your main site.

During creation, check the option "Initialize this repository with a README". This initial file facilitates cloning and immediately gives a working base to your project.

```bash
# Clone the repository on your local machine
git clone https://github.com/your-username/your-username.github.io.git
cd your-username.github.io
```

### Step 2: Enable GitHub Pages

Go to your repository settings ("Settings" tab). In the "Pages" section, select the source branch, generally `main` or `master`. GitHub will confirm activation with a green message and give you your future site's URL.

This step is magical: your site becomes instantly accessible on the Internet, even if it currently contains only a simple README file.

### Step 3: Choose your Jekyll approach

Here, two paths open to you, each with specific advantages.

**Option A: Start from an existing theme (recommended for beginners)**

This approach saves you a lot of time by building on community work. GitHub offers several official themes directly in your repository settings, "Pages" section. For more varied options, explore Jekyll themes on GitHub or specialized sites like Jekyll Themes.

Forking a theme you like gives you an immediately functional solid base. You can then progressively customize it according to your tastes and needs.

**Option B: Create a minimal Jekyll structure**

For the more adventurous or those who want to understand Jekyll in depth, creating a structure from scratch is very educational. Here are the essential elements:

```yaml
# _config.yml - Your site configuration
title: "Your Name - Web Developer"
description: "Portfolio of developer specialized in PHP and JavaScript"
url: "https://your-name.github.io"
author:
  name: "Your Name"
  email: "your@email.com"

# Jekyll configuration
markdown: kramdown
highlighter: rouge
permalink: /:title/
```

The folder structure looks like this:

```
your-site/
├── _layouts/          # Page templates
│   ├── default.html   # Main template
│   └── post.html      # Template for articles
├── _includes/         # Reusable elements
│   ├── header.html    # Site header
│   └── footer.html    # Footer
├── _posts/            # Your articles/projects
├── assets/            # CSS, images, JavaScript
├── _config.yml        # Jekyll configuration
└── index.md           # Homepage
```

### Step 4: Customize your portfolio content

This is where your portfolio truly comes to life. Let's start with the homepage, your main showcase.

```markdown
---
layout: default
title: "Home"
---

# Hello, I'm [Your Name]

Passionate developer with X years of experience, I create innovative web solutions that combine technical performance and exceptional user experience.

## My Skills

- **Backend Development**: PHP, Python, Node.js
- **Modern Frontend**: JavaScript, React, Vue.js
- **Databases**: MySQL, PostgreSQL, MongoDB
- **DevOps**: Docker, CI/CD, Cloud Computing

## Recent Projects

[Here, you'll present your most notable projects]
```

To add your projects, create files in the `_posts` folder following the naming convention `YYYY-MM-DD-project-title.md`. Front Matter (metadata at file start) is crucial:

```markdown
---
layout: post
title: "Modern E-commerce Application"
date: 2025-01-15
categories: [Project, Ecommerce]
tags: [PHP, JavaScript, MySQL]
image: /assets/images/ecommerce-project.webp
demo_url: "https://demo-ecommerce.com"
github_url: "https://github.com/you/ecommerce-project"
---

## Project Description

This e-commerce application revolutionizes the online shopping experience through...

### Technologies Used

- **Backend**: PHP 8.1 with Symfony
- **Frontend**: Vanilla JavaScript with modern optimizations
- **Database**: MySQL with advanced indexing

### Challenges Overcome

The main challenge of this project was...
```

### Step 5: Visually enrich your portfolio

A portfolio without visual elements is like a book without illustrations: technically correct but not engaging. Fortunately, many free resources are at your disposal.

For background images and banners, explore Unsplash, Pixabay, or Pexels which offer high-quality photos under free license. For more specific graphic elements, Freepik and Vecteezy offer excellent vector resources.

Canva deserves special mention: this online tool allows you to easily create custom banners, simple logos, or professional mockups to present your web or mobile projects.

```css
/* CSS customization example */
.hero-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 100px 0;
    text-align: center;
}

.project-card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.project-card:hover {
    transform: translateY(-5px);
}
```

### Step 6: Preview and publication

Local preview is your best friend for refining your portfolio. With Jekyll installed locally, launch your development site:

```bash
# Install dependencies (first time only)
bundle install

# Launch development server
bundle exec jekyll serve

# Your site is now accessible at http://localhost:4000
```

This step allows you to instantly see the effect of each modification, adjust colors, test responsiveness on different screen sizes, and ensure all links work correctly.

Once satisfied with the result, publication is remarkably simple:

```bash
git add .
git commit -m "Initial portfolio with projects and custom design"
git push origin main
```

Your site updates automatically within minutes. You can follow the deployment process in your GitHub repository's "Actions" tab, where you'll see Jekyll compile and deploy your site in real-time.

## Going Further and Advanced Resources

Your basic portfolio is now online, but it's only the beginning of the adventure. Let's explore together improvement possibilities and resources that will accompany you in this evolution.

### Advanced Jekyll themes to stand out

The Jekyll community has created hundreds of sophisticated themes that can transform your portfolio into a stunning professional showcase. Themes like "Minimal Mistakes", "Beautiful Jekyll", or "Academic" offer advanced features: interactive portfolios, integrated blogs, detailed CV sections, or social media integration.

These advanced themes often include features you would have taken weeks to develop: comment systems, automatic SEO optimization, multi-language support, or integrated analytics.

### Custom domain: your digital identity

While the URL `your-name.github.io` is perfectly professional, using your own domain name (`yourname.com`) significantly strengthens your personal brand. GitHub Pages perfectly supports custom domains, and configuration only takes a few minutes.

This customization transforms your portfolio from a GitHub project into a true professional web presence. The investment (a few euros per year) is largely compensated by the impact on your credibility.

### Advanced features without server

The "serverless" services ecosystem allows adding dynamic features to your static site. Formspree or Netlify Forms allow you to integrate functional contact forms. Google Analytics or privacy-respecting alternatives like Plausible give you insights about your visitors.

These integrations maintain your static site advantages (speed, security) while adding the interactivity necessary for a modern portfolio.

### Continuous learning resources

Mastering Jekyll and GitHub Pages is a journey, not a destination. Jekyll's official documentation remains your main reference, complemented by excellent community tutorials. YouTube is full of detailed video guides, and GitHub itself offers many open source portfolio examples you can draw inspiration from.

Joining Jekyll communities on Reddit or Discord connects you with other creators who share tips, tricks, and solutions to technical challenges.

## Conclusion

We've traveled together on a fascinating journey, from understanding fundamental concepts to concrete creation of your online portfolio. GitHub Pages and Jekyll are not simply technical tools, they represent a **modern development philosophy**: simplicity, performance, and total control of your digital presence.

The advantages we've explored - free service, deployment ease, performance, security - make this combination an intelligent strategic choice for any creative professional. But beyond technical aspects, what truly matters is that your portfolio becomes the **authentic reflection of your expertise and personality**.

Your portfolio is never finished; it evolves with you, your projects, and your skills. This evolutionary approach, facilitated by Git and Jekyll's simplicity, allows you to maintain an always current and engaging showcase.

**Recommended next steps:** Start by creating your first site with a simple theme, progressively add your most representative projects, then customize the design according to your visual identity. Don't hesitate to experiment, the beauty of this solution lies in its capacity to grow with your ambitions.
