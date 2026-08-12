# GOJU PDP — Phase Tracker

**Theme:** `155130822824` "Subscription Update Aug 2026" (unpublished) · **Live `152550834344` never touched**
**Sources:** `GOJU_PDP_System_Developer_Brief.docx` · `GOJU_Action_Shot_Phase1_Build.docx` · `GOJU_Action_Shot_Approved_Copy.docx`
**Last updated:** 12 August 2026 (rev 2)

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
| Separate stats band — remove or keep? | 🚫 | Tom — duplicates the pills, wording not approved |
| Per-product phase gate | ✅ | `f4cec46` — new experience on for Action Shot, off for the range |
| Loox removed / Growave only | 🚫 | Tom — Loox is the only rating on product cards |
| Growave rating live, never hardcoded | 🟡 | Widget present; not audited for hardcoded values |
| Tighten Growave spacing | ⬜ | |
| Sticky cart desktop footprint reduced | ⬜ | Hover aligned only (`ac20aa6`) |
| FAQ limited to unresolved objections | ⬜ | |
| Complete Your Routine: 3 products, exclude self, live data | ⬜ | Not verified |
| Alt text on product images | ⬜ | |

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
