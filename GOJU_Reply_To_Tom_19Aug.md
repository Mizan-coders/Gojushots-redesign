Hi Tom,

Thanks — that's the Recharge round closed, and I've cleared the "Skip it. Pause it. Cancel it. Anytime." wording for publication on the back of it.

**The purchase-type fix — done and verified**

All three of your cases now behave as you asked, tested with real clicks on the staging duplicate:

- One-time 6-pack → select 12-pack → stays One-time, $84, no subscription attached.
- One-time 12-pack → select 6-pack → stays One-time, $42.
- Subscribe while on the 6-pack → moves to the 12-pack at $75.60 with the message "Subscriptions are available on the 12 pack. We've updated your selection."

I also checked the combination you didn't list — subscribed on the 12-pack, then selecting the 6-pack. That drops to One-time, which is the only correct outcome given the 6-pack carries no plans, and the subscription is cleared cleanly.

**What was actually causing it.** ReCharge writes a `selling_plan` parameter into the address bar about a second after the page loads, even when the customer is sitting in One-time. The page was reading that parameter as the customer asking to subscribe. So: you select the 12-pack, the page reloads, and a moment later it switched itself to Subscribe on the strength of a parameter ReCharge had added, not anything you did.

That also meant the bad state stuck — refreshing or sharing that URL reopened the page in Subscribe at $75.60. Both are fixed: the page now decides from the URL as it was when the customer arrived, and it won't let a subscription be written into the address bar while the buy box says One-time. I've re-tested the refresh case specifically and it stays One-time.

**What I did find, and it matters more**

While checking, I found a live defect on the Action Shot page that needs no pack change to trigger. The sticky bar at the bottom of the page opened showing "Subscribe & Save 10%" at $76.50 while the buy box above it showed One-time at $85. The sticky button doesn't attach a subscription — it submits the same form as the main button — so a customer who saw $76.50 and tapped it would have been added to cart **one-time at $85**. Shown one price, charged another.

That's fixed and verified: both bars now open One-time at $85, and both move to $76.50 together when Subscribe is clicked. I'd treat this as the more important of the two, since it was reachable by any customer who scrolled.

**One-time purchasing was switched off on the staging product — and this affects the live cutover**

Separately, we hit an error adding the 6-pack to cart: *"Variant can only be purchased with a selling plan."* The staging product had been set subscription-only, which is a **product-wide** switch — so it took out one-time purchasing on the 12-pack as well, not just the 6-pack.

It came from the 14 August remediation, when the plans were restricted to the 12-pack. The restriction we actually want lives in the plan allocations — the 6-pack simply holds no subscription plans — not in a product-level flag.

Fixed by adding a **one-time plan** in Recharge against the product. I've checked what that did, and it's clean: one-time purchasing works again, and the 6-pack still holds zero subscription plans, so it remains one-time-only exactly as designed.

**The bit to carry into the cutover:** when the 6-pack is created on the live Action Shot, it will need the same one-time plan in Recharge, and the product must **not** be set subscription-only. If that switch gets applied to live, it would stop one-time purchases of the 12-pack too — the path all the current revenue runs through. I've added it to the cutover steps.

**A related fault this uncovered, now fixed**

With one-time working again I could finally run a real add-to-cart, and it exposed something worth telling you about. If a customer had the 6-pack on screen and a subscription was added from somewhere else on the page — an upsell, a cross-sell, the cart drawer — the subscription was being silently dropped and the item added as a one-time purchase at full price. Same request: $75.60 with the plan when tested directly, $84 with no plan through the page.

The page was deciding whether a subscription was allowed based on the pack being *looked at* rather than the pack being *added*. Corrected, and re-tested.

Add to cart is now verified in both modes with the real buttons: 6-pack one-time at $42 with no subscription, and the 12-pack subscription at $75.60 on the 2-week plan. That closes the last item on my list. Completing an actual order through checkout is still yours to run whenever you'd like to see it end to end.

**The cart drawer's free-shipping bar**

It does use a setting, but not the same one — it has its own, separate from the product page's. So it will **not** follow the product-page change automatically. It's currently set to $85 — confirmed on the storefront, where a $42 cart reads "You're $43.00 away from FREE SHIPPING" — and it will need changing to $70 by hand at cutover. That makes four places, not the three I listed on 14 August:

1. Announcement bar
2. Action Shot product template
3. The built-in default that covers the eleven products not yet migrated — this is two values in the theme code, not one, and both have to change together
4. The cart drawer

Worth noting the cart drawer's built-in fallback is $80, not $85, so it must be set explicitly rather than left blank. Merging the two settings into one is a sensible tidy-up but it's a Phase 2 change, not something I'd do inside a cutover.

**Existing subscribers**

Understood — the 11 existing subscriptions, their prices and queued charges stay as they are, and $75.60 applies to new subscriptions only.

That lands on the step where we drop the 12-pack to $84, which is the one irreversible move in the sequence. **Before the window, could you confirm in Recharge that repricing the variant won't rewrite existing subscriptions or queued charges?** If it would, we need a Recharge-side exclusion rather than a plain price edit, and I'd want that sorted beforehand rather than discovered on the day.

**One check still open**

Your list covers the subscription lifecycle — order, frequency, skip, pause, cancel, reactivate — and all of it passed. What it doesn't cover is the three portal actions that could put a 6-pack onto a subscription from the customer's side: swap, add product, and change variant.

I'm not being pedantic about it: the entire "6-pack is one-time only" guarantee rests on that variant holding zero selling plans, and the customer portal is the one surface that could bypass the storefront. It's a short check and I'd like it done before we go live.

**Recommended cutover window**

**Wednesday 26 August, 07:00–09:00 NZST** (Tuesday 25th as the alternative).

Midweek and early enough to sit ahead of the lunchtime and evening ordering peaks, which keeps the gap short where the site still says $85 while checkout is already giving free shipping at $70. That gap favours the customer, but there's no reason to leave it open across a busy period. It's a working morning rather than the small hours because the sequence has six steps with testing between each, and you'll need to be reachable for the Recharge ones. Please sanity-check it against your own traffic — you'll have better numbers than I do.

Allow about 90 minutes. Testing the threshold at exactly $70, and creating the 6-pack and moving it to first position, are the slow parts.

So, to go ahead I need from you:

1. Recharge confirmation on the 12-pack reprice vs existing subscriptions
2. The three portal checks on the 6-pack
3. The window confirmed

Thanks for putting the duplicate back — that's what let me verify the above properly rather than reasoning about it.

Thanks, Mizan
