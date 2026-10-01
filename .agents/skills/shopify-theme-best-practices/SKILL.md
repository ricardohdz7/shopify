---
name: shopify-theme-best-practices
description: Best practices, code optimization, performance, SEO, and deployment guidelines for Shopify Liquid themes.
---

# Shopify Theme Development Best Practices & Workflow

## Overview
This skill provides automated guidelines and workflows for developing high-performance, mobile-optimized, and SEO-friendly Shopify Liquid themes (Online Store 2.0 architecture).

## Core Principles

### 1. Section & Snippet Architecture
- **Sections**: Place all customizable UI components in `sections/` with a clean `{% schema %}` JSON schema.
- **Snippets**: Keep reusable HTML/Liquid fragments in `snippets/` and render them using `{% render 'snippet-name', param: value %}` (avoid using deprecated `{% include %}`).

### 2. Image Optimization & CLS Prevention
- Always specify `width` and `height` attributes on `<img>` tags or use Shopify's built-in `image_tag`:
  ```liquid
  {{ image | image_url: width: 800 | image_tag: loading: 'lazy', widths: '300, 600, 800', sizes: '(min-width: 768px) 50vw, 100vw', class: 'img-fluid' }}
  ```

### 3. SEO & Structured Data
- Include JSON-LD schemas in product templates:
  ```json
  {
    "@context": "http://schema.org/",
    "@type": "Product",
    "name": {{ product.title | json }},
    "url": {{ canonical_url | json }},
    "image": [{{ product.featured_media | image_url: width: 1024 | prepend: "https:" | json }}],
    "description": {{ product.description | strip_html | json }},
    "offers": {
      "@type": "Offer",
      "price": {{ product.price | divided_by: 100.0 | json }},
      "priceCurrency": {{ cart.currency.iso_code | json }},
      "availability": "http://schema.org/{% if product.available %}InStock{% else %}OutOfStock{% endif %}"
    }
  }
  ```

### 4. Git to Shopify Deployment Workflow
- After creating or editing files, verify syntax, stage, commit, and push:
  ```bash
  git add .
  git commit -m "feat/fix: description of change"
  git push origin main
  ```
