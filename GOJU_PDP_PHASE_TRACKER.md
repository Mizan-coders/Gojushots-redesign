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
| Action Shot 6-pack $42 exists | ✅ | Created live 26 Aug, first position, zero selling plans |
| 12-pack $85 → $84 | ✅ | Done at cutover 26 Aug. Subscription $75.60, existing subscribers unchanged |
| Free-shipping threshold $85 → $70 | ✅ | Checkout rates and all four theme locations changed 26 Aug |
| Core 60ml prices / 9-pack selling plans | ⬜ | Phase 3 |

### B. Buy box and pack selector

| Item | Status | Commit |
|---|---|---|
| Pack cards: badge, price, per-unit, shipping line | ✅ | `5547c6f` |
| Per-bottle price from variant price (both packs $7) | ✅ | `5547c6f` |
| Default first visit → smallest pack + one-time | ✅ | `b31c645` — selection follows Shopify's first variant. Client chose to reorder the variants rather than select by price; proved on the duplicate 16 Aug, page now opens on the 6-pack at $42, one-time. The live product must have its 6-pack **created first, then moved to first position** |
| Subscribe on non-subscribable pack → switches + confirms | ✅ | `7bc9ecc` |
| Return to one-time keeps larger pack | ✅ | by design |
| Toggle names the subscribable pack | ✅ | `775603b` |
| Sold-out card: badge only, greyed, no strikethrough | ✅ | `7bc9ecc`, `51d708e` |
| Subscription-blocked state + messaging | 🟡 | Built; **never tested** — needs a sold-out *subscribable* variant. The duplicate product cannot test it: duplicating drops Recharge selling plans |
| Sold-out deep link → auto-select + approved message | ✅ | `5e05fd1` — verified against a real sold-out variant |
| Everything-sold-out message | 🟡 | `5e05fd1` — built, no product has all variants unavailable |
| Direct variant / selling_plan deep links | ✅ | `b31c645` |
| Subscription terms visible before add-to-cart | ✅ | pre-existing |
| Sticky cart synchronised | ✅ | Defect fixed 19 Aug; verified in production 26 Aug in both purchase modes |
| Buy box compact on mobile | 🚫 | Mizan — cannot measure; browser won't drop below 1272px |
| 6-pack cannot be subscribed anywhere (incl. Recharge swap) | 🟡 | Storefront half verified 14 Aug on the staging duplicate: 6-pack holds zero selling plans, Subscribe moves to the 12-pack, and a deep link carrying a 12-pack plan falls back to one-time. Recharge portal half — swap, add-product, change-variant — still to run |

### C. Default storefront behaviour

| Item | Status | Commit |
|---|---|---|
| Clean URL, no `selling_plan` appended | ✅ | `b31c645` |
| Opens smallest pack + one-time | ✅ | `b31c645` — via variant order, proved on the duplicate 16 Aug. See section B |
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

### Carried into Phase 2 — deferred 14 August 2026

**The sticky bar hardcodes the discount.** The buy box takes its percentage from
the `discount_percent` setting, but the sticky add-to-cart button has
"Subscribe & Save 10%" written into the section in four places — one in markup,
three in script. Every product is set to 10% today, so nothing is wrong on the
storefront. The moment one product's Recharge discount differs, the two bars
will state different numbers on the same page. Fix is to read the same setting
the buy box reads.

**Subscription perks are free text.** "Save 10% on every order." is typed into a
perk field, so it will not follow `discount_percent` either. Worth deciding in
Phase 2 whether perks should support a `[discount]` placeholder the way messages
support `[pack]`.

**How the three copy mechanisms differ** — recorded because it governs what has
to be checked when each product is migrated:

- *Pack names* are automatic. `[pack]` resolves from the variants that actually
  hold selling plans, so no product-level editing is required and a template
  copied from another product cannot carry the wrong pack name.
- *Unit nouns* (`/ bottle` versus `/ shot`) are per-product settings. Audited
  14 August — correct on all 12 templates.
- *Per-unit prices* are computed by parsing the leading number from the variant
  title. "12 pack" and "15 Shots" both work; a title that does not start with a
  count yields zero and the per-unit line is omitted rather than shown wrong.
  Any new pack should keep the "&lt;count&gt; &lt;noun&gt;" naming.

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
| 6 | Does repricing the 12-pack affect existing Recharge subscriptions? | Verify before cutover — Tom has now instructed that the 11 existing subscriptions, their prices and queued charges stay unchanged |

## Publish gates

- ~~**"Skip it. Pause it. Cancel it. Anytime."**~~ — **cleared 18 August 2026.** Tom confirmed Skip, Pause and Cancel in the Recharge portal
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
| Sticky cart after the card change | Pack label and price re-checked. Opening mode fixed 18 Aug; needs a storefront run |
| Mobile at ~390px | Browser here won't render below 1272px |
| ~~Cart and checkout end to end~~ | Add-to-cart **passed in both modes 19 August** — see below. Completing a real order at checkout is still Tom's side |

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
| 26 Aug | Recharge, live | Removing the new 6-pack from the three selling plans also removed the **4-week plan** (`2724724904`) from the product entirely. Storefront left offering 2- and 3-week only. The grid showed the 12-pack still ticked for 4-week at the moment of saving, so the plan should have been retained | 6-pack availability held off, variant reorder and remaining QA paused, detail and IDs supplied to the client who raised it with Recharge support. Not rebuilt locally — a new plan would carry a new ID and most of the 11 subscribers are bound to the original | ~1h, contingency |
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
| Cart and checkout, both purchase types | Cart verified in production 26 Aug across all three paths. Checkout completion remains the client's |
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
5. Create the 6-pack at $42 with no selling plan, then **add a one-time plan in
   Recharge against the product** and leave the product's subscription-only
   restriction **off** — see the 19 August defect. Restricting the product rather
   than the plan allocations makes the 6-pack unbuyable and stops one-time
   purchases of the 12-pack too. Verify afterwards that the 6-pack still holds zero
   *subscription* plans: the one-time plan must not publish a selling plan onto it,
   which is what was confirmed on the duplicate
6. Full live testing, including a real one-time add to cart for both packs

### Threshold change — every place $85 is read

Confirmed 14 August. The theme only controls what the page *says*; checkout is
changed separately and first. Three places, not one:

1. **Announcement bar** — `config/settings_data.json`, "Free shipping on all
   orders over $85". Global, affects every page.
2. **Action Shot template** — `free_ship_threshold`, currently 85.
3. **The schema default** — the other eleven cro templates carry no value and
   fall back to the default in the section. Since the script now reads this
   setting, leaving it at 85 would keep the line beneath the price saying $85 on
   every unmigrated product while checkout charged $70.

Already carrying $70: the FAQ shipping answer. Publish-gated, correct after
cutover, deliberately inconsistent with the staging page before it.

### Display after the threshold moves to $70

Confirmed against the code, with the 12-pack at $84:

| | Shown |
|---|---|
| 6-pack | $42 · $7.00 / bottle · + $8 shipping |
| 12-pack | $84 · $7.00 / bottle · delivered, ships free |
| 12-pack subscription | $75.60 |
| Subscription saving | $8.40 per order |

The per-unit prices are computed, not typed: $42 ÷ 6 and $84 ÷ 12 both give
$7.00. The saving is the product-price difference only, $84 − $75.60, with
shipping stated separately.

### Variant reordering and Recharge

Selling plans are allocated per variant **ID**; ordering is a separate position
field. Reordering changes which variant Shopify treats as first — and so which
pack the page opens on — without touching IDs or allocations.

**Proved on the staging duplicate, 16 August 2026.** Variants reordered in
Shopify admin, storefront data captured either side:

| | Before | After |
|---|---|---|
| Variant order | 12 pack, 6 pack | 6 pack, 12 pack |
| 6-pack ID | 55868212412584 | unchanged |
| 12-pack ID | 55868202582184 | unchanged |
| 12-pack plan IDs | 2931228840, 2931261608, 2931294376 | identical |
| 12-pack subscription | $75.60 | $75.60 |
| 6-pack plans | 0 | 0 |
| Page opens on | 12 pack, $84 | 6 pack, $42 |

The subscribe path was re-run from the new default with a real click: Subscribe
on the 6-pack moves to the 12-pack, shows the confirmation, and prices at $75.60
with a $8.40 saving. Badges kept their packs, since they follow price rather than
order.

**What this does not prove.** The duplicate has no subscribers, so it cannot show
anything about existing subscriptions. It establishes that plan allocations are
bound to variant IDs and survive a reorder; whether live subscribers are
unaffected is the client's existing-subscriber check, run separately.

Two sequencing points for cutover:

- The 6-pack does not exist on the live product yet. Shopify appends new variants
  last, so it must be **created first, then moved to first position**.
- Collection cards and the product feed show the lowest variant price regardless
  of order — `card-product.liquid` renders the price from the product, not from
  the first variant. Verified on Immune Guard, whose card reads "From $50.00"
  against variants at $50 and $75. "From $42" therefore follows from the 6-pack
  existing, not from the reorder. The reorder is what changes the pack the
  product page opens on.

### Before any live cutover

- Staging QA results and any open defects sent to the client
- Staging product's practical visibility and direct-URL exposure confirmed —
  **checked 19 August, and it is exposed.** See below
- The five one-time-only checks completed
- Cutover window and exact sequence agreed
- Client confirmation on Recharge impact to existing subscribers and queued charges

No changes to existing subscribers, and no cutover, without the client's approval.

---

## Client Recharge sign-off — 18 August 2026

Tom confirmed the Recharge portal round by email. Run by the client, not
reproducible here, and recorded as his result rather than ours:

| Check | Result |
|---|---|
| Real subscription order at $75.60 | Pass — free subscriber shipping applied |
| 4-week frequency carried through | Pass |
| Skip | Pass |
| Pause — 2 weeks, 1 month, 2 months | Pass |
| Immediate cancellation after first order | Pass — no minimum-order restriction |
| Cancelled subscription → inactive, reactivable | Pass |
| Public cancellation policy | Pass — no early-cancellation chargeback wording |

The test order and subscription were cancelled; the $75.60 refund is processing.

**Publish gate cleared.** "Skip it. Pause it. Cancel it. Anytime." is approved for
publication. The remaining publish gate — $70 shipping copy — is unchanged and
still tied to the checkout threshold.

**Still open, and not covered by this round.** The verification debt row "6-pack
cannot be subscribed anywhere (incl. Recharge swap)" asks for three portal
actions — swap, add-product, change-variant. Tom's list covers the subscription
lifecycle, not those three. The one-time-only guarantee rests on the 6-pack
holding zero selling plans, and the customer portal is the one surface that could
put a 6-pack onto a subscription without touching the storefront. Row stays 🟡.

### New cutover constraint — existing subscribers

Tom: leave the 11 existing Action Shot subscriptions, their prices and their
queued charges unchanged. $75.60 applies to **new** subscriptions only.

This lands directly on step 4 of the corrected sequence, changing the 12-pack to
$84 — repricing a variant is exactly the operation that can propagate to queued
charges. Open decision 6 now has a client instruction attached to it: confirm in
Recharge, before the cutover window, that the reprice does not rewrite existing
subscriptions or queued charges. If it would, the price change needs a Recharge-side
exclusion rather than a plain variant edit.

## Purchase type must survive a pack change — 18 August 2026

Tom's rule, in his words:

- One-time 6-pack → select 12-pack → remain on one-time.
- One-time 12-pack → select 6-pack → remain on one-time.
- Explicit Subscribe while on the 6-pack → still move to the 12-pack with the message.

### What a pack change actually does

Worth recording, because it governs every fix in this area and it is not what the
code appeared to assume. `VariantSelects.updateVariantInput` in `assets/global.js`
ends in `location.reload()`. **Every pack change is a full page load** at
`?variant=<id>`. Proved on the storefront 18 August: a marker set on `window`
before clicking a pack is gone afterwards, and the URL carries the new variant.

Two consequences:

- No JavaScript state survives a pack change. Anything that has to persist across
  one needs `sessionStorage`, which is why the switch note and the sold-out note
  already work that way.
- The `variant:change` handler's "moved to a pack with plans" branch never runs
  for a pack-card click — the page is gone before it matters. Instrumented on a
  live two-variant PDP: zero `variant:change` events for a non-initial variant.

### Measured against Tom's three rules

Rules 1 and 2 already hold on the reload path and were confirmed on the storefront:
a clean URL and `?variant=<a variant that has plans>` both open **one-time** under
the new experience. Rule 3 holds through the existing `croPackSwitched-` handoff.

So Tom's exact sequence could not be reproduced here — and the product it was
reported against no longer exists. `/products.json` now lists 9 products;
`action-shot-duplicate` is gone and `action-shot` still has one variant at $85.
Re-running the 6-pack paths needs the staging duplicate restored.

### Two defects found while checking, both fixed

**1. Sticky bar advertised a subscription over a one-time buy box.** Reproduced on
the live Action Shot PDP on theme 155130822824, clean URL, no pack change needed:

| | Buy box | Sticky bar |
|---|---|---|
| Purchase type | One-time | Subscribe |
| Price | $85 | $76.50 |

`stickyMode` initialised to `'sub'` for any subscribable product, which was correct
while every product opened subscribe-first and became wrong when the new experience
opened one-time. This is commercial, not cosmetic: the sticky button only clicks the
product form's own submit, and `selling_plan` was empty, so a customer shown
"Subscribe & Save 10% — $76.50" would have been **added to cart one-time at $85**.
The bar now derives its opening mode from the buy box's resolved state, and re-states
the mode classes and the button label at init rather than only the price. It follows
the buy box and never mirrors back into it.

**2. Landing on a subscribable pack forced Subscribe.** The `variant:change`
handler set `currentMode = 'sub'` whenever the new variant had plans. Latent today
because nothing dispatches that event for a non-initial variant — the dispatcher is
an app, not the theme — but it is Tom's rule stated in reverse, so it is corrected
rather than left. The branch now keeps the customer's mode and only renders the
subscribe panels when they were already subscribing.

**Also added: purchase type carried across the reload.** Rules 1 and 2 hold today
by accident of Action Shot having exactly one subscribable pack — a customer who is
subscribing and changes pack has nowhere to keep subscribing to. On any product with
two subscribable packs the reload would drop them to one-time, which is the same rule
broken the other way. The chosen mode is now written on a trusted pack-card change
and read once on the next load, deleted on read so it cannot pin a later clean visit
into Subscribe. Explicit Subscribe still wins: `croWantsSub` reads the auto-switch
key first.

### Verified on the staging theme — 18 August 2026

Pushed to `155130822824` (remote checked for drift first, none) and run against the
live Action Shot PDP:

| Check | Result |
|---|---|
| Clean URL — buy box | Pass — One-time, $85 |
| Clean URL — sticky bar | Pass — One-time, "Add to Cart", $85 |
| `selling_plan` on load | Pass — empty |
| Explicit Subscribe click — buy box | Pass — Subscribe, $76.50, "Save $8.50 per order" |
| Explicit Subscribe click — sticky bar | Pass — Subscribe, $76.50 |
| `selling_plan` after Subscribe | Pass — set |
| The two bars agreeing in both modes | Pass — the defect above is gone |

**Verified in full on 19 August** once the duplicate was restored — see below.

Changed in `sections/main-product-cro.liquid`.

### Free-shipping threshold — the surface is four places, not three

The earlier "Threshold change — every place $85 is read" section is wrong. The cart
drawer's progress bar does **not** read the PDP's `free_ship_threshold`. It has its
own section setting:

- `sections/cart-drawer.liquid` reads `section.settings.free_shipping_dollars`
- currently `85` in `config/settings_data.json`
- **schema fallback is 80, not 85** — any theme where the setting is unset shows $80

So it will not follow the PDP change, and it is a fourth manual edit at cutover:

1. Announcement bar — `config/settings_data.json`, the "$85" wording
2. Action Shot template — `free_ship_threshold` in `templates/product.cro.json`
3. The fallback for the eleven unmigrated cro templates, which is **two literals,
   not one**, and both must change together:
   - `sections/main-product-cro.liquid:533` — `| default: 85` on the Liquid assign
   - the same file's schema, `"id": "free_ship_threshold"` → `"default": 85`
4. **Cart drawer — `free_shipping_dollars` in `config/settings_data.json`, plus
   `sections/cart-drawer.liquid:1` where the fallback is `default: 80`**

Unifying the two settings is a Phase 2 change, not a cutover change. Recommended,
not done.

## Recommended cutover window

**Tuesday 25 or Wednesday 26 August 2026, 07:00–09:00 NZST**, with a preference for
the Wednesday.

Reasoning, and it is reasoning rather than measurement — confirm it against GOJU's
own analytics before committing:

- Midweek avoids both the weekend and the Monday catch-up.
- Early morning NZST is ahead of the lunchtime and evening ordering peaks, so the
  window where the site says $85 while checkout gives free shipping at $70 (steps 2
  to 3 of the corrected sequence) covers as few customers as possible. That gap
  favours the customer by design, but it should still be short.
- It is a working morning, not the small hours: the sequence has six steps and
  live testing after each, and it needs Tom reachable for the Recharge steps.
- Allow 90 minutes. The threshold test at exactly $70 and the 6-pack creation
  and reposition are the slow parts.

Two things must land **before** the window opens, not inside it:

1. Confirmation that repricing the 12-pack leaves the 11 existing subscriptions and
   their queued charges untouched. This is the one step that cannot be undone by
   changing a setting back.
2. The 6-pack portal checks — swap, add-product, change-variant — since the
   one-time-only guarantee is the thing the whole pack structure rests on.

---

## Tom's three rules — verified 19 August 2026

`action-shot-duplicate` was restored to the storefront (6-pack $42 at position 1,
12-pack $84 at position 2, IDs unchanged from the 16 August record). All runs on
theme `155130822824`, with real clicks, sampled at 5–6 seconds so ReCharge's late
writes are included.

| # | Case | Pack | Mode | Price | `selling_plan` input | URL | Sticky bar |
|---|---|---|---|---|---|---|---|
| — | Clean URL | 6 pack | One-time | $42 | empty | clean | One-time $42 |
| 1 | One-time 6-pack → select 12-pack | 12 pack | **One-time** | $84 | empty | clean | One-time $84 |
| 2 | One-time 12-pack → select 6-pack | 6 pack | **One-time** | $42 | empty | clean | One-time $42 |
| 3 | Subscribe while on the 6-pack | **12 pack** | Subscribe | $75.60 | set | — | Subscribe $75.60 |
| + | Refresh while on the one-time 12-pack | 12 pack | One-time | $84 | empty | clean | One-time $84 |
| + | Subscribe on 12-pack → select 6-pack | 6 pack | One-time | $42 | empty | clean | One-time $42 |

Case 3 also shows the approved message — "Subscriptions are available on the 12
pack. We've updated your selection." — and the saving reads $8.40 per order, the
product-price difference only.

The last row is the combination Tom did not list. Dropping to one-time is the only
correct outcome, since the 6-pack holds no selling plans, and the plan is cleared
from both the form and the URL on the way.

### Third defect, found during this verification

**ReCharge writes `selling_plan` into the address bar while the customer is in
one-time**, and the theme was treating that parameter as the customer asking for a
subscription. Two ways it bit:

- `croWantsSub()` re-read `location.search` each time it was called. The 800ms
  ReCharge sync calls it — and by 800ms the parameter was there. Landing on the
  12-pack one-time and doing nothing at all flipped the page to Subscribe at
  $75.60. **This is the mechanism behind Tom's report**: the pack change reloads
  onto `?variant=<12-pack>`, and 800ms later the sync moved the customer to
  Subscribe.
- The parameter then persisted, so refreshing, bookmarking or sharing that URL
  reopened it in Subscribe.

Two corrections:

1. The URL's subscription intent is captured **once at parse time**, before ReCharge
   has run, and never re-read. A genuine campaign deep link still works; a
   parameter ReCharge adds later does not count as intent.
2. `history.pushState` / `replaceState` are wrapped so `selling_plan` cannot be
   written into the URL while the buy box is in one-time. Timed clean-up passes were
   tried first and lost the race — ReCharge re-appends at no fixed moment, and a
   re-appearance was measured after every delay tried. Guarded on the live mode, so
   it never fights a customer who has actually chosen Subscribe.

Same pattern as the existing `/cart/add` fetch interception: the write is
intercepted rather than cleaned up afterwards.

---

## Blocking defect — the duplicate is set subscription-only — 19 August 2026

Reported from the storefront: adding the 6-pack to cart returns Shopify's
**"Variant can only be purchased with a selling plan."**

Not a theme fault. `action-shot-duplicate` carries `requires_selling_plan: true`
on the product and therefore on both variants — Shopify's "this product can only
be sold as a subscription" setting.

| Product | `requires_selling_plan` | 6 pack | 12 pack |
|---|---|---|---|
| `action-shot-duplicate` | **true** | req=true, **0 plans** | req=true, 3 plans |
| `action-shot` (live) | false | — | req=false, 3 plans |
| all six 60 ml products | false | — | — |

The duplicate is the only product in the catalogue with the flag set.

**What it breaks:**

- **6-pack — unbuyable in any mode.** It requires a selling plan and holds zero
  plans, so there is no combination that adds it to cart. This is the reported error.
- **12-pack — one-time is impossible.** Only the subscription path can be added.

So the entire one-time path on the duplicate is blocked at the data layer. The
theme is behaving correctly and saying the true thing — "One-time purchase only ·
Subscription available on the 12 pack only" — while Shopify refuses to sell it.

**Where it came from.** Almost certainly the 14 August remediation in the defect
log: plans rebuilt, "then restricted to the 12-pack via Recharge support guidance."
Restricting a product to subscription-only sets this flag at product level, which
then applies to every variant including the one meant to stay one-time.

**Fix — client side, not theme.** Turn the subscription-only restriction off for
the product. Since Recharge manages the restriction, check whether it has to be
cleared in Recharge rather than Shopify admin, or it will be re-applied. The
correct end state is the one already signed off on 14 August: the 6-pack holds
zero selling plans and is freely purchasable one-time, and the restriction lives in
the plan allocations, not in a product-level flag.

**Why this matters more than the duplicate.** The live product is currently clean.
When the 6-pack is created on the live Action Shot at cutover, **this flag must stay
off**. Applying the same "restrict to the 12-pack" step to live would stop one-time
purchases of the 12-pack as well — the current revenue path. Added to the cutover
checks below.

**It also explains a gap.** The outstanding verification-debt row is "Cart and
checkout end to end — a real add-to-cart in both purchase types." That check has
never been run, and it is exactly the check that would have caught this. Until the
flag is cleared it cannot be run on the duplicate at all.

Not fixed in the theme, deliberately. Detecting the flag and hiding one-time would
hide a misconfiguration rather than surface it, and would leave a permanent
workaround for a setting that should simply be off.

---

## One-time restored, and the add-to-cart row closed — 19 August 2026

The client added a **one-time plan** in Recharge (Products → Action Shot Duplicate
→ One-time plan). That was the right correction, and it did exactly what was
needed without the side effect I was worried about:

| | Before | After |
|---|---|---|
| `requires_selling_plan` (product and both variants) | true | **false** |
| 6-pack selling plans | 0 | **0 — unchanged** |
| 12-pack selling plans | 3 at $75.60 | 3 at $75.60 — unchanged |

The important part is the middle row. Recharge's one-time plan is a Recharge-side
construct for the customer and merchant portals; it does **not** publish a Shopify
selling plan onto the variant. So the 6-pack still holds zero allocations and the
one-time-only guarantee is intact — the theme still reads it as unsubscribable and
still refuses to offer Subscribe on it.

Had it published a real selling plan, the pack logic would have inverted: the
6-pack would have been treated as subscribable, offered at a subscription price
that does not exist. It didn't. Worth stating plainly because the same correction
will be needed on the live product.

### Fourth defect, found by the add-to-cart test

**The `/cart/add` interception keyed off the displayed pack, not the pack being
added.** The theme strips `selling_plan` from cart adds when a variant cannot take
one — correct in itself, but the test was `pw.dataset.variantHasPlans === '0'`,
which describes the variant *on screen*.

So while the customer was looking at the 6-pack, **every** add lost its selling
plan. Measured on the duplicate, same request, same moment:

| Route | Result |
|---|---|
| Through the theme's patched `fetch` | 12-pack, **$84, no plan** |
| Through an unpatched request (XHR) | 12-pack, **$75.60, 4-week plan** |

A subscription add silently became a one-time add at full price. Reachable from
anything that adds the 12-pack while the 6-pack is displayed — an upsell, a
cross-sell (Recharge's is enabled), the cart drawer, a quick-add.

Corrected to read the variant id out of the request and check that variant's
allocations, handling FormData, URLSearchParams, JSON and the `items` array form.
Unknown variants are now left alone: stripping a plan the customer asked for is a
silent wrong charge, while leaving one on a variant that cannot take it makes
Shopify reject the add with a visible error. Loud failure beats quiet overcharge.

### Add-to-cart verified, both modes, real buttons

Cart cleared before and after; nothing left behind.

| Route | Line | Price | Plan |
|---|---|---|---|
| 6-pack, One-time, "Add to cart — $42" | 6 pack | $42 | none |
| Subscribe → 12-pack, "Subscribe — $75.60" | 12 pack | $75.60 | 2 week subscription with 10% discount |
| 12-pack subscription added while viewing the 6-pack | 12 pack | $75.60 | 4 week subscription with 10% discount |
| 6-pack sent with a plan it cannot take | 6 pack | $42 | stripped, as intended |

**Cart drawer threshold corroborated.** With $42 in the cart the drawer read
"You're $43.00 away from FREE SHIPPING" — $85, from its own setting, confirming
from the storefront what the code review found. It is the fourth place to change.

---

## Staging product exposure — checked 19 August 2026

`action-shot-duplicate` is published and reachable by real customers. Measured
from the storefront:

| Surface | Exposed? |
|---|---|
| Storefront search for "action shot" | **Yes** |
| Collection `our-range-1` | **Yes** |
| Collection `our-range-copy` | **Yes** |
| Collection `all` — linked from the homepage | **Yes** |
| XML sitemap | No — so search engines are not indexing it |

`Immune Guard Copy` sits in the same collections and carries the same risk.

So a customer can reach a test product from the homepage, and buy a 12-pack at $84
or start a real Recharge subscription against it. Not indexed, so the exposure is
to people already on the site rather than to search traffic — but it is live.

**Decision: draft both test products.** Taken 19 August. My first recommendation
was to keep the duplicate published and merely pull it from the collections, so it
stayed testable. That weighted the developer's convenience above a live commercial
risk, and the client's call went the other way — correctly. Drafting removes every
route in at once, including site search and the direct URL, rather than narrowing
them.

The cost is a round trip whenever it has to go back: republish, re-verify, draft
again. That is seconds of client time against the possibility of a real customer
starting a real Recharge subscription on a test product.

`Immune Guard Copy` carries the same exposure and should be drafted with it.

**The one dependency to watch.** Tom's outstanding portal checks — swap,
add-product, change-variant — run in the Recharge customer portal, and it is not
established here whether Recharge still offers a product whose Shopify listing is
unpublished. If those checks come back showing the 6-pack simply absent, that may
be the draft status rather than the guarantee working. Republish before running
them, or confirm the behaviour first, so an inconclusive result is not read as a
pass.

---

## Cutover order corrected again — 24 August 2026

The sequence must open with the **checkout threshold**, not with publishing the
theme. Verified from both themes on 24 August:

| | Live theme `152550834344` | Approved theme `155130822824` |
|---|---|---|
| Any `$70` on the page | **none** | FAQ: "Free shipping on orders of $70 or more" |
| Announcement bar | $85 | $85 |
| Cart drawer | $85 | $85 |
| Product page threshold | $85 | $85 |

Publishing first would put a live page promising free shipping at $70 while checkout
still charged below $85 — promising more than checkout honours, which is precisely
what the corrected sequence was written to avoid. The FAQ is the exception that
breaks the rule, because it was written with the post-cutover figure and is
publish-gated.

Moving the checkout change ahead of the publish inverts it safely: the old theme says
$85 everywhere while checkout already gives free shipping at $70, so customers get
better than promised rather than worse.

Steps 3 to 6 are unchanged. Recorded in `GOJU_Cutover_Runbook.md`, which is the sheet
to work from during the window.

---

## 60 mL parity confirmed — 26 August 2026

Tom's publish gate: does the per-product switch preserve the current customer-facing
experience on Ginger Ignition, Vital Sunshine and Good Night? Answered by comparing
the live theme `152550834344` against the approved theme `155130822824`, rendered,
product by product.

**Identical on all three:** 0 pack cards · 2 variant pills · opens on 15 Shots with
Subscribe pre-selected · $67.50 · "Free shipping included — always" · sticky bar mode
matching the buy box · no Sample Pack link. The gate holds.

**Two copy differences**, in the templates, identical across all three products and
deliberate range-wide corrections from Phase 1:

| Setting | Live | Approved |
|---|---|---|
| `label_sub` | "Subscribe & Save" | "Subscribe & save" |
| `nosub_upsell` | "→ 15 Shots with Subscribe & Save…" | "15 Shots with Subscribe & Save…" — duplicated arrow removed |

A third template difference, `per_bottle_suffix: "/ shot"`, is **inert on these
pages**: it renders only inside pack cards, at line 826, and these products render
none. Added for consistency ahead of migration.

**One figure changes at the threshold step, not at publish.** The legacy savings
calculation still adds avoided shipping — the Phase 1 correction applies only to the
new experience, so `renderSub` keeps the old formula when `newUx` is false. Moving
the threshold to $70 therefore changes what the 15 Shots subscription advertises:

| | Threshold $85 | Threshold $70 |
|---|---|---|
| 15 Shots saving | $15.50 | **$7.50** |
| 15 Shots one-time line | "$75 + $8 shipping = $83 delivered" | "$75 delivered, free shipping included" |
| 9 Shots saving | $13.00 | $13.00 — unchanged, $50 is below both |

Correct in both cases: at $85 a $75 order pays $8, so the saving genuinely was $7.50
plus the $8 avoided; at $70 it ships free either way. Leaving $15.50 on the page
after the threshold moved would be the wrong outcome, not the right one.

**Also changed on these pages, though barely reachable:** the `/cart/add` fix keys
the selling-plan strip to the variant being added rather than the one displayed. On a
60 mL product the old behaviour only bit if the customer had selected 9 Shots and a
subscription was then added from elsewhere on the page. Strictly a correction.

## Recharge confirmation received — 26 August 2026

Written confirmation that repricing the Shopify variant does not alter the 11
existing subscriptions, queued charges, upcoming orders or discounts. $75.60 applies
to new subscriptions only. **Gate on steps 4 and 5 is cleared.**

Caveat accepted by the client: an existing subscriber may move to the current
selling-plan price if they later change frequency or swap through the portal. That
is $76.50 → $75.60, ninety cents in the customer's favour.

## Agreed sequence and window — 26 August 2026

**Thursday 27 August**, 10:00–12:00 London / 15:00–17:00 Dhaka / 21:00–23:00 NZST.
Cross-checked: all three are the same two hours from 09:00 UTC.

Noted to the client, not blocking: 21:00–23:00 NZST is a weekday evening rather than
a quiet period. Acceptable because the agreed order keeps the storefront and checkout
consistent at every point.

The client's step order supersedes the runbook's, and is better. Theme settings move
to $70 on the **unpublished** theme, so publishing flips everything at once onto a
checkout that already matches — no interval where the two disagree.

**The trap in it:** those settings live in the theme. Applied to the current live
theme they would be discarded the moment the approved theme publishes. They must be
made on `155130822824` while it is still unpublished, together with the schema
default push, which is the fourth place and the one his list omits.
# CUTOVER LOG — 26 August 2026

Brought forward from the confirmed Thursday window at the client's request; he was
ready and available, so the window ran on Wednesday 26 August instead. Times in
Dhaka (UTC+6). Client in London, storefront customers in New Zealand.

## Step 1 — checkout rates · Tom · PASS

Client changed and tested the New Zealand zone himself:

| Rate | Set to |
|---|---|
| Standard Shipping | $8 for $0–$69.99 |
| Free Shipping | $70 and above |

Tested $50 → $8, and $75 → free. He did not test the exact boundary; the bands are
contiguous so no gap exists by construction, and $70.00 is covered in step 6 QA.

## Step 2 — threshold wording · Mizan · PASS

Applied to `155130822824` **while still unpublished**. Pulled first and diffed:
exactly three values changed, no customiser settings disturbed.

| Place | File | Change |
|---|---|---|
| Announcement bar | `config/settings_data.json:126` | $85 → $70 |
| Cart drawer | `config/settings_data.json:243` | 85 → 70 |
| Action Shot template | `templates/product.cro.json:62` | 85 → 70 |
| Default for 11 unmigrated | `sections/main-product-cro.liquid` | 85 → 70, both literals |

**The check that mattered:** the live theme was confirmed still reading $85 in the
announcement bar and cart drawer, proving the edits landed on the right theme.

## Step 3 — publish · Mizan · PASS

`shopify theme publish --theme 155130822824`. Live at 19:07 Dhaka.

| Check | Result |
|---|---|
| Published theme | `155130822824` main, "Subscription Update Aug 2026" |
| Announcement bar | $70 |
| Cart drawer | $50 cart reads "$20.00 away from FREE SHIPPING" |
| PDP threshold · FAQ | $70 · $70 |
| Buy box | One-time, $85, `selling_plan` empty |
| Sticky bar | One-time, $85, "Add to Cart" — matches the buy box |
| Ginger Ignition | 0 pack cards, 2 pills, no sample link — unchanged |

The sticky-bar defect found on 19 August is confirmed fixed in production: the two
bars agree, where previously the sticky bar advertised $76.50 over an $85 buy box.

Action Shot renders a single "12 pack" card, correct until the 6-pack exists.

**Note for future windows.** The verification first came back showing the *old*
theme, because the browser still held a preview cookie from checking the live theme
during step 2. Cleared with `?preview_theme_id=`. A stale preview cookie can make a
successful publish look like it failed, or worse, make a failed one look fine.

## Step 4 — 12-pack reprice · Tom · PASS

Repriced $85 → $84.

**Storefront:**

| Check | Result |
|---|---|
| 12-pack price | $84, SKU `AS 200ml 12-pack` |
| Subscription price | $75.60 — exactly 10% |
| Selling plans | 3, intact |
| Saving shown | $8.40, product-price difference only |
| Per bottle · shipping | $7.00 · "delivered, ships free" |
| Buy box · sticky bar | One-time $84, both, `selling_plan` empty |
| `requires_selling_plan` | false on product and variant |

The 12-pack reads "ships free" only because the threshold moved first. Under the old
$85 rule an $84 pack would now show "+ $8 shipping" — the reordered sequence earned
its keep here.

**Recharge — the 11 existing subscriptions, checked in the admin:**

| | Finding |
|---|---|
| Count | 11 of 11, filtered to Action Shot |
| Nine subscriptions | $76.50 — 10% off the old $85 base, unmoved |
| Two subscriptions | $71.40 — investigated, see below |
| Queued charges | Untouched, amounts and dates |

**The two at $71.40 needed resolving**, because the figure is ambiguous on its own:
16% off $85 (pre-existing) and 15% off $84 (would mean the reprice propagated) are
both exactly $71.40.

Settled by opening #684492520: the subscription carries a discount code
(`WELCOME10MQ2F3SL5`) on top of the plan, and its charge history shows $71.40 on
every order back to **March 2026** — five months before the reprice. A July charge
cannot have been caused by an August price change.

A neat corroboration in the same history: orders before March read $79.40, exactly
$8.00 more, which is the shipping charge disappearing when free subscriber shipping
came in. The line price itself never moved.

The second, #467738087, was not opened. A propagated reprice would have moved all
eleven rather than two, and would have produced $75.60 rather than $71.40.

**Noted, unrelated:** #692540491 shows no next charge date — probably paused. Worth a
look outside the window.

## Step 5 — create the 6-pack · Tom · PASS, after one defect

Created at $42, variant ID `55912476967080`. Attributes verified from the storefront:
SKU `AS 200ml 6-pack`, barcode `09421905154499`, weight 2300 g, position 1 after the
reorder, `requires_selling_plan` false.

**It inherited all three selling plans on creation** — the same thing that happened
on staging on 14 August. Shopify attaches new variants to a product's existing
selling plan groups automatically. The client contained it immediately by switching
off "sell when out of stock" while inventory was zero, so a $37.80 subscription was
never purchasable.

**Removing it from the plans then destroyed the 4-week plan.** See the defect log
entry for 26 August. Resolution: Recharge advised creating a new plan rather than
restoring the old one, and confirmed existing subscribers were unaffected. New
4-week plan `2954756264` created and attached to the 12-pack only.

| Plan | ID | Attached to |
|---|---|---|
| 2 week | `2724757672` | 12-pack only |
| 3 week | `2724692136` | 12-pack only |
| 4 week | `2954756264` — **new** | 12-pack only |

All three price at $75.60. The 6-pack holds zero subscription plans.

**Creating the plan pre-attached to the 12-pack avoided the grid that caused the
original deletion.** Worth repeating on any future product: allocate at creation
rather than by unticking afterwards.

**No theme change was required.** The frequency buttons render from
`product.selling_plan_groups` with `data-plan-id` taken from the plan itself, so the
new plan appeared unaided. The `plan_2w` / `plan_3w` / `plan_4w` settings carry stale
IDs but are never read — confirmed by grep, they appear only inside the schema block.
Vestigial; tidy in Phase 2.

## Step 6 — live QA · PASS on everything testable from the storefront

| Check | Result |
|---|---|
| Clean URL | 6 pack, $42, One-time |
| Pack cards | $42 / $84, both $7.00 per bottle |
| Shipping lines | 6-pack "+ $8 shipping", 12-pack "delivered, ships free" |
| Badges | "Start here" / "Best value" |
| Subscribe on the 6-pack | → 12 pack, $75.60, save $8.40, approved message shown |
| Frequencies | 2, 3 and 4 weeks all present |
| Sticky bar | Matches the buy box in both modes |
| Cart — 6-pack one-time | $42, no plan on the line |
| Cart — 12-pack one-time | $84, no plan |
| Cart — 12-pack, new 4-week plan | $75.60, plan named correctly |
| Sold-out pack card | Verified while the 6-pack was unavailable — greyed, badge, not selectable |

Test cart cleared after each pass.

The sold-out card row had been outstanding since 14 August as "built, never tested
against a real sold-out variant". The window closed it incidentally.

**Left with the client:** re-checking the 11 subscriptions now that Recharge have
been into the account, the customer-portal checks on the live 6-pack, checkout on the
three paths, and the $70.00 / $69.99 boundary.

## Existing subscriptions re-checked after Recharge's intervention · PASS

Compared row for row against the list captured before Recharge went into the account.
All 11 identical — prices, frequencies and next charge dates.

| | Before | After |
|---|---|---|
| Count | 11 | 11 |
| At $76.50 | 9 | 9 |
| At $71.40 | 2 | 2 |
| Moved to $75.60 | — | **none** |
| Next charge dates | Aug 28 · Sep 1, 2, 3, 4, 9, 9, 14 · Oct 26 | identical |

**The point that was worth waiting for evidence on:** the eight subscribers on the
4-week frequency still show 4 weeks, on their original dates, despite the plan they
were bound to (`2724724904`) having been deleted. Recharge holds the frequency on the
subscription record, not on the plan. Asserted as likely earlier in the day, refused
as a claim until checked, now confirmed.

`#692540491` still shows no next charge date, exactly as it did before the plan work.
Pre-existing, unrelated, probably paused.

## Step 7 — archive duplicates · Tom · pending the above

## Not a fault — Klaviyo popup, noted for Phase 2

The "$10 off your first order" popup opens over the buy box on product pages. Tested:
it is frequency-capped, fires once per visitor and does not return — a fresh load with
20 seconds of dwell did not reproduce it, and the form sits at 0×0 in the DOM
afterwards. Not a defect and not caused by the cutover. But while open it covers the
pack selector and purchase toggle, which is the area this phase optimised, so whether
it should be suppressed on PDPs is worth a decision in Phase 2.

---

# PHASE 1 — CLOSED 31 AUGUST 2026

Action Shot went live 26 August. Staging duplicate archived by the client.

## What is live

| | |
|---|---|
| Theme | `155130822824` "Subscription Update Aug 2026", published 26 Aug |
| 6-pack | $42, first position, **zero selling plans**, one-time only |
| 12-pack | $84, three plans at $75.60, all 12-pack only |
| Frequencies | 2 week `2724757672` · 3 week `2724692136` · 4 week `2954756264` |
| Free shipping | $70 at checkout and in all four theme locations |
| Existing subscribers | 11, unchanged — verified twice on cutover day |

Re-checked 31 August, five days after go-live: all of the above still correct.

## Still open, and honestly so

| Item | Owner | Note |
|---|---|---|
| Customer-portal checks on the **live** 6-pack | Tom | Passed on the staging product 19 Aug; not repeated against the live variant |
| Checkout completion, three paths + $70.00/$69.99 boundary | Tom | Cart verified; a completed order has never been placed by us |
| `pack_selected` analytics — positive case | — | Guard verified; the event firing on a real card click was never observed |
| Subscription-blocked state | — | Needs a sold-out *subscribable* variant, which has never existed |
| Everything-sold-out message | — | Needs a product with no purchasable variant |
| Buy box at ~390px | Mizan | Browser here will not render below 1272px |
| Alt text in admin | Mizan | Drafted; entry outstanding |
| Loox removal / Growave on product cards | Tom | Open decision 2, never resolved |
| Checkout attribution — line-item properties vs Web Pixels | Tom | Open decision 3, never resolved |

## Carried to Phase 2, not defects

- Sticky bar hardcodes "Subscribe & Save 10%" in four places; perk text types the
  discount rather than reading `discount_percent`. Harmless while every product is
  at 10%.
- `plan_2w` / `plan_3w` / `plan_4w` settings hold stale IDs and are never read.
  Vestigial; removing them touches twelve templates.
- Klaviyo welcome popup opens over the buy box on PDPs. Frequency-capped and not a
  defect, but it covers the area this phase optimised.
- The two threshold settings — PDP and cart drawer — remain separate and must be
  changed together.

## Hours

Ceiling 25, approved by the client on 26 August. The three reusable-component hours
remain unbilled and outside it, credited to a future approved phase.
