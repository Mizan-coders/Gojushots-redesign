# GOJU Action Shot — cutover runbook

**Window:** to be confirmed. Times below are relative (T+0 = window opens), so the
sheet works whichever slot Tom picks. Fill the wall-clock column once he confirms.

**Theme to publish:** `155130822824` "Subscription Update Aug 2026"
**Current live theme:** "With Bundle Update April 2026" — `152550834344`. This is the
rollback target. Do not delete it.

**Gate:** steps 4 and 5 must not start without Recharge's written confirmation that
repricing the 12-pack leaves the 11 existing subscriptions, their queued charges and
their discounts untouched. Steps 1–3 do not depend on it.

---

## The order changed — read this first

The sequence Tom has been working to opens by publishing the theme. **Do not.**
Publish the theme *after* the checkout threshold moves.

Verified 24 August: the approved theme's Action Shot FAQ already reads *"Free
shipping on orders of $70 or more"*, while its announcement bar, cart drawer and
product page all still say $85. The live theme contains no `$70` anywhere.

So publishing first creates a live page promising free shipping at $70 while
checkout still charges below $85 — promising more than checkout honours, which is
the failure mode the original sequence was written to avoid.

Moving the checkout change first inverts it safely: the old theme says $85
everywhere while checkout already gives free shipping at $70, so customers get
**better** than promised for a few minutes rather than worse.

| | Old order | This runbook |
|---|---|---|
| 1 | Publish theme | **Checkout threshold → $70** |
| 2 | Checkout threshold → $70 | **Publish theme** |
| 3–6 | unchanged | unchanged |

---

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

## Step 2 — Publish the theme

**Owner:** Mizan · **Where:** Online Store → Themes → **"Subscription Update Aug 2026"**
(`155130822824`) → Publish.

**Verify.** Run the snippet — `Shopify.theme.id` should read `155130822824` and role
`main`. Then load `/products/action-shot` and confirm: pack card renders, buy box
opens **One-time**, sticky bar also reads One-time at the same price, FAQ reads $70.

**Rollback:** publish **"With Bundle Update April 2026"** (`152550834344`) again. Under a minute, and the only loss is the
time spent. This is the cheapest rollback in the whole sequence — take it early
rather than debugging live.

**State after:** FAQ $70 is now truthful. Announcement bar, cart drawer and product
page still say $85 — still the safe direction.

---

## Step 3 — Move the threshold wording to $70, all four places

**Owner:** Mizan. All four, or the site contradicts itself.

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

**Verify.** Reload the homepage: announcement bar reads $70. Add anything to the
cart: the drawer's progress bar counts towards $70, not $85. Open Action Shot and a
60 ml product: shipping lines reference $70 on both.

**Rollback:** reverse each setting; re-push the file with 85.

---

## Step 4 — 12-pack $85 → $84  ⚠ GATED

**Do not start without the Recharge confirmation (P1).** This is the only step in
the sequence that cannot be cleanly undone — it touches live subscription pricing.

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

- Draft or delete `action-shot-duplicate` and `Immune Guard Copy`
- Update the tracker with what was done, what was skipped and anything found
- Send Tom a short confirmation with the step-6 results
- Watch the first day's orders for a one-time line that carries a selling plan, or a
  subscription line at $84 — either would mean something in step 5 is wrong

## Deferred, not part of this window

The sticky bar hardcodes "Subscribe & Save 10%" in four places, and the subscription
perk text types the discount rather than reading `discount_percent`. Harmless while
every product is on 10%. Phase 2.
