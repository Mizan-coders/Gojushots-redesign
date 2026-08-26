# GOJU Action Shot — cutover runbook

**Window:** Thursday 27 August 2026 — 10:00–12:00 London · **15:00–17:00 Dhaka** ·
21:00–23:00 NZST. Two hours, all three the same window from 09:00 UTC.

**Theme to publish:** `155130822824` "Subscription Update Aug 2026"
**Current live theme:** "With Bundle Update April 2026" — `152550834344`. This is the
rollback target. Do not delete it.

**Gate: cleared 26 August.** Recharge confirmed in writing that repricing the variant
does not alter the 11 existing subscriptions, queued charges, upcoming orders or
discounts. Steps 4 and 5 are unblocked. Existing subscriptions and queued charges
still must not be touched during the window.

---

## The sequence, and the one trap in it

Seven steps, as the client set them out on 26 August. His order is better than the
one this runbook first carried: the site wording moves to $70 on the theme *before*
it publishes, so publishing flips everything at once onto a checkout that already
matches. There is no interval where the storefront and the checkout disagree.

| | |
|---|---|
| 1 | Checkout free-shipping threshold → $70, and test it |
| 2 | Announcement bar, cart drawer, product template **and the schema default** → $70 |
| 3 | Publish the approved theme |
| 4 | Reprice the live 12-pack to $84 |
| 5 | Create the live 6-pack at $42 |
| 6 | Immediate live QA |
| 7 | Archive the staging duplicate |

**The trap is step 2.** Those values are *theme settings*. Change them on the current
live theme and they are discarded the moment the approved theme publishes at step 3.
They must be made on **"Subscription Update Aug 2026"** while it is still unpublished.

The client's step 2 also names three places. There are **four** — the schema default
covering the eleven unmigrated products is a code change, and it goes to the same
unpublished theme in the same pass.

Why the checkout moves first: the approved theme's FAQ already reads *"Free shipping
on orders of $70 or more"*, while the live theme says $85 everywhere. Publishing
ahead of the checkout change would promise free shipping the checkout would not
honour. This way round, the live theme says $85 while checkout already gives $70 —
customers get better than promised for the few minutes in between.

## Before the window

| # | Item | Owner |
|---|---|---|
| P1 | Recharge written confirmation received, or accept that steps 4–5 are held | Tom |
| P2 | Republish `action-shot-duplicate` if anything needs re-testing first, else leave drafted | Mizan |
| P3 | `git status` clean, `main` pushed | Mizan |
| P4 | ~~Locate the shipping rate~~ — **done**: profile `59411497128`, zone New Zealand Customers, **two** rates. Still to confirm no second profile exists | Mizan |
| P5 | ~~Prepare the schema-default edit~~ — **done**, staged on branch `cutover/threshold-70` | Mizan |
| P6 | Both parties on a call or chat for the window | Both |

**P5 is done.** Branch `cutover/threshold-70` moves both literals in
`sections/main-product-cro.liquid` — the Liquid assign at line 533 and the
`free_ship_threshold` schema default. They have to move together, or the eleven
unmigrated products disagree with checkout. Nothing is pushed to the theme.

---

## The verification snippet

Paste into the browser console on `gojushots.com` at every checkpoint below.

```js
(async () => {
  const p = await (await fetch('/products/action-shot.js?t='+Date.now())).json();
  const c = await (await fetch('/cart.js')).json();
  console.table(p.variants.map(v => ({
    variant: v.title, price: v.price/100, sku: v.sku,
    position: v.position,
    requires_plan: v.requires_selling_plan,
    sub_plans: (v.selling_plan_allocations||[]).length,
    sub_price: (v.selling_plan_allocations||[])[0]
      ? (v.selling_plan_allocations[0].per_delivery_price/100) : '—'
  })));
  console.log('product requires_selling_plan:', p.requires_selling_plan,
              '| theme:', Shopify.theme.id, Shopify.theme.role,
              '| cart items:', c.item_count);
})()
```

**What good looks like at the end:** 6 pack first at $42, `requires_plan` false,
`sub_plans` 0. 12 pack second at $84, `requires_plan` false, `sub_plans` 3,
`sub_price` 75.6. Product `requires_selling_plan` false.

---

## Step 1 — Checkout threshold $85 → $70

**Owner:** Tom · **Where:** Settings → Shipping and delivery → profile
`59411497128` ("All products not in other profiles") → zone **New Zealand Customers**.

**Two rates, not one.** Confirmed from the admin on 24 August:

| Rate | Now | Change to |
|---|---|---|
| Free Shipping | Orders **$85.00 and up** → Free | Orders **$70.00 and up** → Free |
| Standard Shipping | Orders **$0.00–$84.00** → $8.00 | Orders **$0.00–$69.99** → $8.00 |

Change **both**. Moving only the free rate leaves Standard covering $0–$84, so
everything from $70 to $84 matches both rules and the customer is offered a paid
option alongside the free one.

**Use $69.99, not $69.00.** Shopify's price bands are inclusive at both ends, so a
maximum of $69.00 leaves $69.01–$69.99 matching *no* rate — and a cart in that band
gets "no shipping rates available" and cannot check out. The current setup has
exactly this hole between $84.01 and $84.99; it has gone unnoticed because the
product prices are whole dollars. Do not carry it forward.

**Before changing anything, confirm this is the only profile.** The page header reads
"All products not in other profiles" — if a second profile exists, it carries its own
rates and needs the same edit.

**Verify before moving on.**

- Cart at **exactly $70.00** → free shipping, and no $8 option offered alongside it
- Cart at **$69.99** → $8.00
- Cart at **$69.50** → $8.00, not an empty rate list

The boundary is the whole point; a $100 cart proves nothing.

**Subscriptions are separate.** Tom's test order took free subscriber shipping at
$75.60, which does not come from these rates. Re-check a subscription checkout after
the change to confirm it is unaffected.

**Rollback:** restore $85.00-and-up and $0.00–$84.00. Instant, no side effects.

**State after:** site says $85, checkout gives free at $70. Customers get better
than promised. Safe to sit here indefinitely.

---

## Step 2 — Threshold wording to $70, all four places, on the UNPUBLISHED theme

**Owner:** Mizan. All four, or the site contradicts itself.

> **Every one of these goes on "Subscription Update Aug 2026" while it is still
> unpublished.** Applied to the live theme they are thrown away at step 3.

**3a. Announcement bar** — Customize → Announcement bar → text
"Free shipping on all orders over $85" → **$70**.

**3b. Cart drawer** — Customize → Cart drawer section → *Free shipping threshold ($)*
`85` → **70**. Separate setting from the product page; it will not follow.
Its built-in fallback is **80**, so set it explicitly — never clear it.

**3c. Action Shot template** — Customize → open Action Shot → CRO Product Page →
variant picker block → *Free shipping threshold* `85` → **70**.

**3d. Schema default, for the eleven products not yet migrated** — already staged on
the branch `cutover/threshold-70`. `main` still carries 85, so it cannot reach the
theme by accident.

```
cd "/Volumes/Mac Working/Shopify/Gojushots"
git checkout cutover/threshold-70
shopify theme push --store goju-shots.myshopify.com --theme 155130822824 \
  --only sections/main-product-cro.liquid --nodelete
```

After the window closes successfully, fold it back in:

```
git checkout main && git merge cutover/threshold-70 && git push
```

If the cutover is abandoned, stay on `main` and re-push that file to restore 85.

**Verify — in the theme preview, not on the live site.** The theme is still
unpublished, so open it from Online Store → Themes → Preview. Check: announcement bar
reads $70; add anything to the cart and the drawer counts towards $70; Action Shot
and a 60 ml product both reference $70. The live storefront should still say $85
throughout — if it has changed, the edits went to the wrong theme.

**Rollback:** reverse each setting; re-push the file with 85.

---

## Step 3 — Publish the theme

**Owner:** Mizan · **Where:** Online Store → Themes → **"Subscription Update Aug 2026"**
(`155130822824`) → Publish.

**Verify.** Run the snippet — `Shopify.theme.id` should read `155130822824` and role
`main`. Then load `/products/action-shot` and confirm: pack card renders, buy box
opens **One-time**, sticky bar also reads One-time at the same price, FAQ reads $70,
announcement bar reads $70, and the cart drawer counts towards $70.

**Rollback:** publish **"With Bundle Update April 2026"** (`152550834344`) again. Under a minute, and the only loss is the
time spent. This is the cheapest rollback in the whole sequence — take it early
rather than debugging live.

**State after:** the whole storefront reads $70 and checkout already gives $70. This
is the moment everything becomes consistent — which is why step 2 comes first.

---

## Step 4 — 12-pack $85 → $84  ⚠ GATED

**Gate cleared 26 August** — Recharge confirmed in writing. Still the only step in
the sequence that cannot be cleanly undone, because it touches live subscription
pricing, so the verification below is not optional.

**Owner:** Tom · **Where:** Products → Action Shot → 12 pack variant → price → 84.

**Verify.** Run the snippet: 12 pack price `84`, `sub_price` **75.6**. Then check in
Recharge that the 11 existing subscriptions still show their original price and
their queued charges are unchanged. **If any existing subscription has moved, stop
and do not proceed to step 5.**

**Rollback:** set the price back to $85 — but any subscription already rewritten is
not undone by that. Hence the gate.

---

## Step 5 — Create the 6-pack  ⚠ THE STEP THAT BROKE STAGING

**Owner:** Tom, with Mizan verifying. Four parts, in order.

**5a.** Products → Action Shot → add variant: **6 pack**, price **42.00**,
SKU **`AS 200ml 6-pack`**. Assign **no selling plan**.

**5b.** Recharge → Products → Action Shot → **add a one-time plan**, and confirm the
product is **not** set subscription-only.

> This is the part that is easy to miss. Subscription-only is a *product-wide*
> switch. On staging it did not merely restrict the 6-pack — it stopped one-time
> purchases of the **12-pack** as well, and nothing on the product could be bought
> outright at all. On the live product that removes the path all current revenue
> runs through. Creating the variant on its own is not enough.

**5c.** Shopify appends new variants last, so **reorder** the 6 pack to first
position. This is what makes the page open on the 6-pack at $42, one-time.

**5d. Verify with the snippet — all six must be true:**

1. 6 pack `position` 1, 12 pack `position` 2
2. 6 pack price 42, 12 pack price 84
3. 6 pack `sub_plans` **0** — the whole one-time-only guarantee rests on this
4. 12 pack `sub_plans` 3, `sub_price` 75.6
5. `requires_plan` **false** on both variants
6. product `requires_selling_plan` **false**

If 5 or 6 come back true, 5b was missed or applied wrongly. Fix before continuing —
one-time purchasing is broken across the whole product until it is.

**Rollback:** delete the 6-pack variant. Collection cards revert to "From $84".

---

## Step 6 — Live testing

**Owner:** both. Clear the cart first.

| # | Check | Expected |
|---|---|---|
| 1 | Clean `/products/action-shot` | Opens 6 pack, $42, **One-time** |
| 2 | Sticky bar after scrolling | One-time, $42 — must match the buy box |
| 3 | Select 12 pack | Stays One-time, $84 |
| 4 | Refresh that page | Still One-time |
| 5 | Select 6 pack again | Stays One-time, $42 |
| 6 | Click Subscribe on the 6-pack | Moves to 12 pack, $75.60, message shown |
| 7 | Add to cart one-time, 6 pack | $42, no plan on the line |
| 8 | Add to cart one-time, 12 pack | $84, no plan |
| 9 | Add to cart subscription, 12 pack | $75.60, plan named |
| 10 | Cart drawer progress bar | Counts towards $70 |
| 11 | Checkout, one-time 6 pack | $42 + $8 shipping |
| 12 | Checkout, 12 pack one-time | $84, **free** shipping |
| 13 | Checkout, subscription | $75.60, free shipping |
| 14 | A 60 ml product | Unchanged behaviour, $70 shipping wording |
| 15 | Collection card for Action Shot | "From $42" |

Empty the cart afterwards. Do not complete an order unless the intention is a real
refundable test.

---

## Step 7 — Archive the staging duplicate

**Owner:** Tom · Archive `action-shot-duplicate`, and `Immune Guard Copy` with it.

Only after step 6 passes. While anything is still unresolved, the duplicate is the
one place a fix can be tested without touching live.

---

## Abort criteria

Stop and roll back if any of these appear:

- Any existing subscription's price or queued charge changes at step 4
- One-time purchasing fails on either pack after step 5
- The buy box and sticky bar disagree on price or purchase type
- Checkout charges shipping on the 12-pack after step 3
- Anything unexplained in the first ten minutes — the theme rollback is a minute,
  and diagnosing on the live storefront is the expensive option

Rolling back the theme (step 2) does not undo steps 1, 4 or 5. Reverse in the order
5 → 4 → 3 → 2 → 1.

---

## After the window

- Update the tracker with what was done, what was skipped and anything found
- Send Tom a short confirmation with the step-6 results
- **Friday cover, agreed with the client.** The window ends at 23:00 NZST, so the
  first full New Zealand trading day is Friday — which is the middle of the night in
  Dhaka and late Thursday evening in London. Mizan checks around 13:00 NZST Friday
  (mid-morning Dhaka); Tom looks during his Friday morning.
- What to look for: a one-time order carrying a selling plan, or a subscription order
  at $84 rather than $75.60. Either means step 5 needs correcting quickly.

## Deferred, not part of this window

The sticky bar hardcodes "Subscribe & Save 10%" in four places, and the subscription
perk text types the discount rather than reading `discount_percent`. Harmless while
every product is on 10%. Phase 2.
