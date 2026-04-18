# GOJU Homepage Redesign — Build Plan & Tracker

> Living document. Update status as each item completes.  
> Last updated: 2026-04-11

---

## Design Reference
File: `goju-homepage-updated-newly.html` (in Downloads)

---

## Naming Conventions

Consistent across every `hp-*` section. Follow Dawn's own patterns so everything reads the same way.

### Section files — `kebab-case`, descriptive full words (no abbreviations)

| Old name (dropped) | Correct name |
|--------------------|--------------|
| `hp-hero.liquid` | `homepage-hero.liquid` |
| `hp-trust-marquee.liquid` | `homepage-marquee.liquid` |
| `hp-press.liquid` | `homepage-press.liquid` |
| `hp-products.liquid` | `homepage-products.liquid` |
| `hp-compare.liquid` | `homepage-compare.liquid` |
| `hp-bundles.liquid` | `homepage-bundles.liquid` |
| `hp-reviews.liquid` | `homepage-reviews.liquid` |
| `hp-when-to-use.liquid` | `homepage-routine.liquid` |
| `hp-blog.liquid` | `homepage-blog.liquid` |
| `hp-subscribe.liquid` | `homepage-subscribe.liquid` |

### CSS classes — BEM-style: `block__element--modifier`

- **Block** = section name: `.homepage-hero`, `.homepage-marquee`, `.homepage-products`
- **Element** = `__` double underscore: `.homepage-hero__heading`, `.homepage-hero__image`, `.homepage-products__grid`
- **Modifier** = `--` double dash: `.homepage-hero__badge--bestseller`, `.homepage-products__filter-btn--active`
- Keep classes **single-responsibility** — one job per class
- Never use IDs for styling

```
/* Good */
.homepage-hero__heading { ... }
.homepage-hero__cta--primary { ... }

/* Bad */
.hp-hero-heading-big { ... }   /* abbreviated, vague */
#hero-title { ... }            /* ID — not reusable */
```

### Schema settings — `snake_case` for IDs

```json
{ "id": "heading", "id": "button_label", "id": "button_url", "id": "bg_color" }
```

### Schema block types — `kebab-case`

```json
{ "type": "trust-item" }
{ "type": "press-logo" }
{ "type": "bundle-product" }
{ "type": "review-card" }
```

### Section IDs in `index.json` — match the filename without `.liquid`

```json
"homepage-hero": { "type": "homepage-hero" }
"homepage-marquee": { "type": "homepage-marquee" }
```

### Liquid variable names — `snake_case`, descriptive

```liquid
{% assign section_heading = section.settings.heading %}   {%- comment -%} good {%- endcomment -%}
{% assign h = section.settings.h %}                       {%- comment -%} bad {%- endcomment -%}
```

---

## Core Engineering Constraint — Dawn-First CSS

**We are on Dawn theme. Reuse Dawn's existing classes, variables, and snippets wherever possible.**  
Only write custom CSS for things Dawn doesn't already provide. This keeps page weight down and avoids style conflicts.

### Dawn utilities to reuse (do NOT duplicate these)

| What | Dawn class / variable |
|------|-----------------------|
| Max-width container | `.page-width` |
| Section padding | `.section-full-width`, `padding-top/bottom` via schema range settings |
| Responsive grid | `.grid`, `.grid__item`, `--grid-mobile-up`, `--grid-tablet-up` |
| Buttons | `.button`, `.button--primary`, `.button--secondary` |
| Product cards | `{% render 'card-product' %}` snippet |
| Images / lazy loading | `{% render 'image' %}` or `{{ image | image_url | image_tag }}` with `loading: 'lazy'` |
| Rating stars | `.rating`, `.rating__stars` |
| Badge | `.badge`, `.badge--bottom-left` |
| Visually hidden | `.visually-hidden` |
| Icon sprites | `{% render 'icon-arrow' %}`, `{% render 'icon-close' %}` etc. |
| Color tokens | `--color-foreground`, `--color-background`, `--color-base-accent-1` etc. |
| Typography scale | `--font-heading-family`, `--font-body-family`, `--font-body-size` |
| Animation / fade-in | `.animate--slide-in`, `.scroll-trigger` (Dawn's built-in intersection observer) |
| Breakpoints | `@media screen and (min-width: 750px)` (tablet), `(min-width: 990px)` (desktop) |

### Rules
- **Each `hp-*` section loads its own scoped `<style>` block** — no separate `.css` asset file unless the section is large. Keeps HTTP requests at zero for section styles.
- **Never re-declare** a Dawn variable or utility class. Extend, don't replace.
- **Use `{% render 'card-product' %}` for the product grid** — it already handles lazy images, badges, prices, sale, sold-out states, and quick-add.

---

## Decisions Locked In

| Topic | Decision |
|-------|----------|
| **Font** | Keep site default `"Ratch", sans-serif` throughout. Evaluate at the end whether to keep or switch. Do NOT import Bebas Neue / DM Serif / Plus Jakarta Sans. |
| **Hero image** | Client has lifestyle photo ready — upload to Shopify and wire in. |
| **Press logos** | Client has all logos ready — upload and wire in. |
| **Compare section** | Build as designed. No specific competitor brand names — keep it generic (e.g. "Others", "Typical Supplements"). |
| **Bundles** | No bundle products set up yet. Need to create a Shopify bundle mechanism (recommended: use a dedicated `bundle` collection or metafields per bundle). Must be editable per-bundle from the theme customizer. |
| **Goal filter tags** | Tags to add in Shopify admin: `goal:sleep`, `goal:energy`, `goal:immunity`, `goal:recovery`, `goal:performance` (or similar — confirm before tagging). Filter reads these tags client-side. |
| **Email signup** | Klaviyo form already exists. Section will embed the Klaviyo form embed code; design styled to match mockup. |
| **Existing sections** | All existing active sections remain untouched until we switch the homepage template. New sections built alongside, then `index.json` updated to use them. |

---

## Section Build Plan

Each section = one new `.liquid` file in `/sections/` + CSS in `/assets/`.  
All new sections prefixed `hp-` to keep them grouped and separate from existing sections.

### Phase 1 — Hero + Trust Strip
| # | Section file | Status | Notes |
|---|---|---|---|
| 1.1 | `homepage-hero.liquid` | `[ ] TODO` | Dark black bg, lifestyle photo (left), heading + rating + urgency (right). Fully customiser-editable. |
| 1.2 | `homepage-marquee.liquid` | `[ ] TODO` | Green bg, scrolling marquee of trust items. Items editable in customiser. |

### Phase 2 — Press + Product Grid
| # | Section file | Status | Notes |
|---|---|---|---|
| 2.1 | `homepage-press.liquid` | `[ ] TODO` | "As seen in" logo strip. Up to 8 logos, each with optional link. Logos uploaded to Shopify. |
| 2.2 | `homepage-products.liquid` | `[ ] TODO` | Goal filter pill buttons + 4-col product grid. Reads `goal:*` tags. Hover shows "Quick Add" button. Collection selectable in customiser. |

### Phase 3 — Compare + Bundles
| # | Section file | Status | Notes |
|---|---|---|---|
| 3.1 | `homepage-compare.liquid` | `[ ] TODO` | Comparison table: GOJU column vs 2 generic "Others" columns. Rows editable in customiser. |
| 3.2 | `homepage-bundles.liquid` | `[ ] TODO` | Featured bundle card (image left, product list + price right). Bundle products need creating in Shopify first (see Bundle Setup below). |

### Phase 4 — Reviews + Routine + Blog + Subscribe
| # | Section file | Status | Notes |
|---|---|---|---|
| 4.1 | `homepage-reviews.liquid` | `[ ] TODO` | Dark bg. Big score + star rating + count (editable). Up to 6 review cards (editable in customiser). |
| 4.2 | `homepage-routine.liquid` | `[ ] TODO` | 4 time-of-day cards (Morning / Pre-Workout / Afternoon / Evening). Each card: icon, time label, title, description, product tags. All editable. |
| 4.3 | `homepage-blog.liquid` | `[ ] TODO` | 3-col blog post cards. Pulls from a selected blog. |
| 4.4 | `homepage-subscribe.liquid` | `[ ] TODO` | Green bg. Left: headline + perks list. Right: Klaviyo embed block + styled form wrapper. |

### Phase 5 — Wire Up & QA
| # | Task | Status | Notes |
|---|---|---|---|
| 5.1 | Update `templates/index.json` | `[ ] TODO` | Add all new `hp-*` sections to order, disable/remove old ones. Do this on dev theme first. |
| 5.2 | Mobile QA | `[ ] TODO` | Test all sections at 375px, 768px, 1280px. |
| 5.3 | Font review | `[ ] TODO` | Review full page with Ratch font. Decide if any heading sizes need adjusting. |
| 5.4 | Push to live | `[ ] TODO` | Only after full QA on dev theme. |

---

## Bundle Setup (Pre-requisite for Phase 3.2)

Before building `hp-bundles.liquid`, the bundles need to exist in Shopify.

**Recommended approach:** Create a `bundle` metaobject (or use a dedicated collection) with:
- Bundle name
- Bundle image (lifestyle photo)
- Up to 4 product references
- Bundle price / saving text
- CTA URL (can link to a pre-filled cart or a bundle product page)

**Bundles to create:**
| Bundle | Products | 
|--------|----------|
| Defence Pack | Immune Guard + Good Night + Vital Sunshine |
| *(Add more here as needed)* | |

> **Action needed:** Decide whether bundles are sold as a single Shopify product (with a fixed variant) or as a "add all to cart" multi-product link. This affects how the ATC button works.

---

## Goal Filter Tags — Shopify Admin Checklist

Before Phase 2.2 can go live, tag products in Shopify admin:

| Tag | Products to tag |
|-----|----------------|
| `goal:sleep` | Good Night |
| `goal:energy` | Action Shot, Vital Sunshine |
| `goal:immunity` | Immune Guard |
| `goal:recovery` | *(TBC)* |
| `goal:performance` | Action Shot |

> Confirm exact tag values with client before tagging — tags are case-sensitive.

---

## Assets Needed from Client

| Asset | Status |
|-------|--------|
| Hero lifestyle photo | `[ ] Needs uploading to Shopify` |
| Press logos (SVG or PNG, transparent bg) | `[ ] Needs uploading to Shopify` |
| Bundle lifestyle photo (for Defence Pack card) | `[ ] TBC` |

---

## Status Key
- `[ ] TODO` — not started  
- `[~] IN PROGRESS` — actively being built  
- `[x] DONE` — complete and pushed to dev  
- `[✓] LIVE` — pushed to live theme  
