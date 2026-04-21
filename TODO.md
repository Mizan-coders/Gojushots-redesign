# GOJU Design System Overhaul — Task Tracker

**Brief:** Premium brand refresh — remove discount-ecom signals, simplify colour/type, editorial feel.
**Theme:** Dev theme `152550834344` (With Bundle Update April 2026)
**Last updated:** 2026-04-20

---

## Status Key
- [ ] To do
- [~] In progress
- [x] Done
- [!] Blocked

---

## Phase 1 — Colour & Type (No blockers)

- [x] **1. Button / CTA colour system (sitewide)**
  - Fill `#1F1A17`, text `#F7F1E4`, hover `#6B5E52`
  - One consistent button — no green, no outlined alternates
  - Files: `settings_data.json`, `component-goju-btn.css`, `base.css`

- [x] **2. Purge lime/green accent**
  - Remove `#d4f24a`, `#fffd66`, `#1d7a3f` from all section CSS
  - Files: `homepage-bundle.liquid`, `homepage-bundle-v2.liquid`, `collection-goju.liquid`, `homepage-reviews.liquid`

- [x] **3. Kill dark/black sections**
  - Replace `#0a0a0a` section backgrounds with `#EDE4D1` (clay), black text on top
  - Files: `homepage-bundle.liquid`, `homepage-bundle-v2.liquid`

- [x] **4. Font weight reduction**
  - Cap all Ratch usage at 700 — remove all 800 and 900 weights
  - Files: `homepage-bundle.liquid`, `homepage-bundle-v2.liquid` + audit all other sections

---

## Phase 2 — Section Rebuilds

- [x] **5. Trust ticker rebuild**
  - Moon Juice-style horizontal scrolling marquee
  - New content: Made in New Zealand · Cold-Pressed · 100% Natural · No Sugar · No Preservatives · HPP Preserved
  - Remove: "30-Day Guarantee", "Free Shipping" type signals
  - File: `homepage-trust-ticker.liquid`

- [x] **6. Hero banner**
  - Full-bleed lifestyle image, 100vh desktop
  - Mobile: gradient overlay `rgba(31,26,23,0.5)` bottom → transparent top
  - Headline + CTA left-aligned with breathing room
  - Heading font size / text-transform / colour now customizer-controlled
  - File: `homepage-hero.liquid`

- [ ] **7. "When to take" cards — consistent system**
  - Same aspect ratio (3:4 or square) across all cards
  - Natural-light photography on cream, consistent image treatment
  - Type hierarchy: eyebrow caps + Ratch headline + short body
  - Soft flavour-colour tint as card background (not saturated)
  - Same hover state across all cards
  - File: `homepage-when-to-take.liquid`

---

## Phase 3 — Blocked (waiting on client)

- [x] **8. Emoji → Custom SVG icons**
  - Updated by client directly in the customizer

---

## Notes
- Always `shopify theme pull --theme 152550834344 --only <file>` before editing any file
- Never bulk push — always use `--only <file>`
- Client is actively customising on dev theme — pull first, every time
