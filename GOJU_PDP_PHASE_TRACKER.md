# GOJU PDP — Phase Tracker

**Theme:** `155130822824` "Subscription Update Aug 2026" (unpublished) · **Live `152550834344` never touched**
**Sources:** `GOJU_PDP_System_Developer_Brief.docx` · `GOJU_Action_Shot_Phase1_Build.docx` · `GOJU_Action_Shot_Approved_Copy.docx`
**Last updated:** 13 August 2026 (rev 3)

## Legend

| | Meaning |
|---|---|
| ✅ | Done and verified on the preview |
| 🟡 | Built but **not** verified — do not report as done |
| ⬜ | Not started |
| 🚫 | Blocked — owner named |

---

## Phase 1 — Finish Action Shot

### A. Commercial configuration

| Item | Status | Note |
|---|---|---|
| Action Shot 6-pack $42 exists | 🚫 | Client — variant not created. Blocks most acceptance checks |
| 12-pack $85 → $84 | 🚫 | Client — deferred to cutover, per Tom |
| Free-shipping threshold $85 → $70 | 🚫 | Client — checkout change at cutover. Theme setting built, left at 85 |
| Core 60ml prices / 9-pack selling plans | ⬜ | Phase 3 |

### B. Buy box and pack selector

| Item | Status | Commit |
|---|---|---|
| Pack cards: badge, price, per-unit, shipping line | ✅ | `5547c6f` |
| Per-bottle price from variant price (both packs $7) | ✅ | `5547c6f` |
| Default first visit → smallest pack + one-time | ✅ | `b31c645` |
| Subscribe on non-subscribable pack → switches + confirms | ✅ | `7bc9ecc` |
| Return to one-time keeps larger pack | ✅ | by design |
| Toggle names the subscribable pack | ✅ | `775603b` |
| Sold-out card: badge only, greyed, no strikethrough | ✅ | `7bc9ecc`, `51d708e` |
| Subscription-blocked state + messaging | 🟡 | Built; **never tested** — needs a sold-out *subscribable* variant. The duplicate product cannot test it: duplicating drops Recharge selling plans |
| Sold-out deep link → auto-select + approved message | ✅ | `5e05fd1` — verified against a real sold-out variant |
| Everything-sold-out message | 🟡 | `5e05fd1` — built, no product has all variants unavailable |
| Direct variant / selling_plan deep links | ✅ | `b31c645` |
| Subscription terms visible before add-to-cart | ✅ | pre-existing |
| Sticky cart synchronised | 🟡 | Mode sync verified; pack label + price not re-verified since cards |
| Buy box compact on mobile | 🚫 | Mizan — cannot measure; browser won't drop below 1272px |
| 6-pack cannot be subscribed anywhere (incl. Recharge swap) | 🚫 | Needs the variant + Recharge portal QA |

### C. Default storefront behaviour

| Item | Status | Commit |
|---|---|---|
| Clean URL, no `selling_plan` appended | ✅ | `b31c645` |
| Opens smallest pack + one-time | ✅ | `b31c645` |
| Empty `selling_plan` input on one-time | ✅ | `b31c645` |

### D. Existing-page refinements

| Item | Status | Commit |
|---|---|---|
| Founder quote removed | ✅ | `d9ce7c2` |
| Story pill row removed | ✅ | `48cc972` |
| Buy-box pills → client-supplied proof strip | ✅ | `48cc972` |
| Trust line → approved wording | ✅ | `d9ce7c2` |
| Subscription perks → approved wording | ✅ | `d9ce7c2` — **publish-gated** |
| "Recommended use: 1 bottle (200 mL) daily." | ✅ | `d9ce7c2` |
| Standalone How-to-Use hidden, control retained | ✅ | `d9ce7c2` |
| Savings = product-price difference only | ✅ | `c78e4fb` |
| Stats band — new content + height | ✅ | `9a8b274` — client's 3 items, 60→44px (26.7%). Type weight: awaiting his call |
| Per-product phase gate | ✅ | `f4cec46` — new experience on for Action Shot, off for the range |
| Loox removed / Growave only | 🚫 | Tom — Loox is the only rating on product cards |
| Growave rating live, never hardcoded | ✅ | Audited `7564d47` — the section's rating_score/review_count_text settings exist but are never rendered |
| Tighten Growave spacing | ✅ | `7564d47` — 80/120 → 56/72px, 36% less chrome |
| Sticky cart desktop footprint reduced | ⬜ | Hover aligned only (`ac20aa6`) |
| FAQ limited to unresolved objections | ⬜ | |
| Complete Your Routine: 3 products, exclude self, live data | ✅ | `7564d47` — was showing 9 incl. itself and the test duplicate |
| Alt text on product images | 🟡 | `03a4a4c` — theme fallback distinguishes images; real descriptions drafted, Mizan entering in admin |

### E. Tracking

| Event | Status | Commit |
|---|---|---|
| `pack_selected` | 🟡 | `f03013b` — guard verified; **positive case needs a real click** |
| `purchase_type_selected` | ✅ | `f03013b` |
| `add_to_cart` | ✅ | `f03013b` |
| `sample_pack_click` | ✅ | `f2c6cde` |
| Checkout / purchase by landing product | 🚫 | Tom — needs a decision: line-item properties vs Web Pixels |

---

## Phase 2 — Reusable PDP system

**Delivered early as a by-product of Phase 1.** Billable.

| Phase 2 item | State |
|---|---|
| 2. Pack selector, purchase type, CTA — reusable | **Effectively complete.** Built data-driven from variants + selling plans; renders any product's packs with no code change |
| Editable content for the above | **Partly complete.** 24 new settings: badges, state labels, per-unit wording, shipping threshold, shipping cost, sample link, and every state message |
| Per-product enable/disable | **Complete.** The gate makes each product's migration a theme-editor toggle rather than code |
| 6. Trust badges | Already metafield-driven before this work (pre-existing) |
| 1, 3, 4, 5, 7, 8, 9, 10, 11, 12 | Not started |

**Why it happened:** hardcoding Action Shot's two packs would have made the "— 15 Shots only" label and per-product units impossible without per-product code. Generalising was the cheaper route to Phase 1 — and it happens to satisfy Phase 2 item 2.

---

## Phase 3 — Range migration

**Not started, and no longer triggered by accident.**

All 12 product templates share `sections/main-product-cro.liquid`, so the new
behaviour was initially live across the whole range on the dev theme. The
commercially material part was the purchase-type default — the 60ml PDPs would
have moved from subscribe-first to one-time-first, which was approved as a test
on Action Shot only.

**Contained** by a per-product gate (`f4cec46`): section setting *"Use new
purchase experience"*, default off, enabled on Action Shot alone. It gates the
pack cards, one-time-first default, subscribable-pack suffix, sold-out and
subscription-unavailable messaging, and the Sample Pack link.

Verified: Immune Guard renders 0 pack cards, 2 pills, no sample link, and opens
on 15 Shots + Subscribe. Action Shot renders the full new experience.

Deliberately left range-wide, being corrections rather than redesign:

- savings calculation (was adding shipping into the discount figure)
- duplicated arrow on the upsell line
- primary button hover colour
- sentence-case subscription wording

**Migration per product is now:** tick the box, QA, approve — no code.

## Handover deliverables

| Item | Status |
|---|---|
| `GOJU_PDP_FIELD_MAP.md` — 23 editable fields | ✅ `461ec0e` |
| `GOJU_PDP_PHASE_TRACKER.md` | ✅ this file |
| 60 ml parity confirmation | ⬜ — behaviour identical; savings figure differs by design, disclose it |
| Final walkthrough vs build doc §6 | ⬜ |

## Open decisions

| # | Question | Owner |
|---|---|---|
| 1 | Remove the separate stats band? | Tom |
| 2 | Loox removal — also wire Growave into product cards? | Tom |
| 3 | Checkout attribution: line-item properties or Web Pixels? | Tom |
| 4 | Build the Phase 1/3 gate, or accept range-wide change? | Mizan → Tom |
| 5 | Safest 6-pack creation — staging product recommended | Tom |
| 6 | Does repricing the 12-pack affect existing Recharge subscriptions? | Verify before cutover |

## Publish gates

- **"Skip it. Pause it. Cancel it. Anytime."** — built, must not go live until Tom confirms Skip/Pause/Cancel tested in the Recharge portal
- **$70 shipping copy** — must not go live before the checkout threshold changes
- **Nothing publishes without Tom's approval**

## Cutover sequence (recommended)

1. Publish approved theme — PDP correct, 12-pack still $85
2. 12-pack $85 → $84 — subscription recalculates to $75.60
3. Create 6-pack $42, **no selling plan**
4. Checkout threshold → $70, test at exactly $70
5. Theme threshold setting + all public $85 references → $70
6. Full path testing

Steps 4 before 5 deliberately: in the gap the site says $85 while checkout gives free at $70 — customers get better than promised. Reversed, we promise free shipping checkout won't honour.

## Out of scope

60ml PDP migration · replacing standalone How-to-Use · Why People Choose / Is this right for you? · the separate live *About Subscriptions* content source (separate ticket) · anything beyond the agreed Phase 1 ceiling without prior approval

---

## Verification debt

Built but never exercised against real data. These must not be reported as done:

| Item | What it needs |
|---|---|
| Subscription-blocked state | A sold-out *subscribable* variant. The duplicate product can't test it — duplicating a product drops its Recharge selling plans |
| Everything-sold-out message | A product with no purchasable variant |
| `pack_selected` event | One real click on a pack card (synthetic events are rejected by design) |
| Sticky cart after the card change | Pack label and price re-checked |
| Mobile at ~390px | Browser here won't render below 1272px |
| Cart and checkout end to end | A real add-to-cart in both purchase types |

## Working notes

- **Shopify puts `blocks` before `settings`** in both the section schema and template JSON. Inserting at the first `"settings"` match lands inside a block. Hit twice; anchor past `block_order`.
- **The buy box re-renders on variant change.** Anything shown after a switch needs a `sessionStorage` handoff, not a direct DOM write.
- **Scripts run before `variant-radios` upgrades.** Setting `checked` at parse time changes the radio without Dawn noticing — the card switches while price and CTA go stale. Defer to `DOMContentLoaded` and dispatch a bubbling `change`.
- **Programmatic clicks must never move the customer's pack.** The 800ms Recharge sync clicks Subscribe on every load; auto-switch and analytics are both guarded on `isTrusted`.

---

## Close-out allowance — approved 14 August 2026

Phase 1 ceiling raised from 18 to **24.5 billed hours**. Up to 6.5 additional:

- **1.5h** staging setup, threshold configuration, remaining public $85 updates
- **3.5h** staging QA, one-time-only checks, cutover, live verification
- **1.5h** contingency for functional defects found during staging or cutover

Log only time actually used. The three reusable-component hours remain outside
this, unbilled, credited to any future approved phase.

### Defect log

Defects found during staging or cutover, and the correction made. Required by
the client when contingency time is used.

| Date | Where | Defect | Correction | Time |
|---|---|---|---|---|
| 14 Aug | Recharge | 6-pack carried all three selling plans; no discount applied; frequencies 1/2/3 weeks all shipping weekly | Plans rebuilt at 2/3/4 weeks with 10%, then restricted to the 12-pack via Recharge support guidance | client-side |
| 14 Aug | `main-product-cro.liquid` | Pack badges assigned by variant order, not price. "Start here" landed on the 12-pack and "Best value" on the 6-pack. Shopify appends new variants last, so the live Action Shot would have inverted the same way once its 6-pack was added | Badges now derive from price — cheapest takes the starter badge, dearest the value badge. Neither shows when all packs cost the same | `966d4de` |
| 14 Aug | `product.cro.json` | Buy box read "Subscription available on 15 packs only" and "15 Shots with Subscribe & Save" — 60 ml wording inherited when the template was copied. Never seen before because both lines only render when the selected pack has no plan, and the live product has one variant | Both lines take `[pack]` and fill it from the pack that holds the selling plans. Schema defaults use the placeholder so the next migrated product cannot inherit another product's pack name | `d839df0` |

### Staging QA — 14 August 2026

Run against `action-shot-duplicate` on theme 155130822824.

| Check | Result |
|---|---|
| 6-pack holds zero selling plans | Pass — `planCount 0` |
| 12-pack subscription price | Pass — $84 → $75.60, exactly 10% |
| Plan frequencies and naming | Pass — 2, 3 and 4 weeks, matching production |
| Clean URL opens one-time | Pass |
| Subscribe names the only subscribable pack | Pass — "Subscribe & save 10% — 12 pack only" |
| Warning before the pack moves | Pass — "Selecting Subscribe switches to the 12 pack" |
| Subscribe on the 6-pack switches packs | Pass — moves to 12-pack with confirmation |
| Savings figure | Pass — "Save $8.40 per order", product price difference only |
| Deep link to 6-pack carrying a 12-pack plan | Pass — falls back to one-time at $42, plan cleared |
| Clean URL opens on the smallest pack | **Fail** — opens on the 12-pack; see below |
| 6-pack blocked in the Recharge customer portal | Not yet run — needs portal access |
| Cart and checkout, both purchase types | Not yet run — needs a real order |
| Sold-out states | Not yet run — needs a pack taken out of stock |

**Open defect — default pack.** A clean product URL opens on the 12-pack rather
than the smallest pack. The selection follows Shopify's first variant, and the
duplicate lists 12-pack first because the 6-pack was added afterwards. The 60 ml
products list smallest first, which is why this never appeared before. Two ways
to correct it, and the choice is the client's:

- **Reorder the variants in Shopify** so the 6-pack sits first. Consistent with
  the rest of the range, no code. Side effect: collection cards, search and the
  product feed would show the product from $42 rather than $84.
- **Select the cheapest pack in the theme** on a clean visit. Robust to variant
  order, but overrides Shopify's canonical variant and leaves the collection
  price showing whichever variant is first.

**SKU format.** Resolved 14 August. Both packs now follow one convention —
`AS 200ml 12-pack` and `AS 200ml 6-pack` — so they group together in exports.

### Staging commercial configuration — signed off 14 August 2026

| | 12 pack | 6 pack |
|---|---|---|
| Price | $84 | $42 |
| SKU | `AS 200ml 12-pack` | `AS 200ml 6-pack` |
| Selling plans | 3, at 2/3/4 weeks | **none** |
| Subscription price | $75.60 | not applicable |

This is the configuration the range migration should be measured against. The
6-pack holding zero selling plans is the data rule the whole one-time-only
guarantee rests on — it is not enforced by wording or by the theme.

### Corrected cutover sequence

The client identified a dependency the earlier sequence missed: dropping the
12-pack to $84 before the threshold moved to $70 would have put it below the old
$85 threshold and removed its free shipping.

1. Publish the approved theme — 12-pack still $85, threshold still $85
2. Change the checkout threshold to $70 and test at exactly $70
3. Update the theme threshold setting and public $85 wording
4. Change the 12-pack to $84 — now safely above $70
5. Create the 6-pack at $42 with no selling plan
6. Full live testing

### Before any live cutover

- Staging QA results and any open defects sent to the client
- Staging product's practical visibility and direct-URL exposure confirmed
- The five one-time-only checks completed
- Cutover window and exact sequence agreed
- Client confirmation on Recharge impact to existing subscribers and queued charges

No changes to existing subscribers, and no cutover, without the client's approval.
