# Upwork message to Tom — 19 August 2026

Single-message version for Upwork. The fuller email version is in
`GOJU_Reply_To_Tom_19Aug.md`; the evidence behind every claim here is in
`GOJU_PDP_PHASE_TRACKER.md`.

---

Hi Tom,

Thanks for running the Recharge checks — all passed, so I've cleared the "Skip it. Pause it. Cancel it. Anytime." wording for publication.

**Purchase-type fix — done and verified**

All three of your cases now work, tested with real clicks on the staging product:
• One-time 6-pack → select 12-pack → stays one-time, $84
• One-time 12-pack → select 6-pack → stays one-time, $42
• Subscribe on the 6-pack → moves to the 12-pack at $75.60 with the explanatory message

Cause: Recharge adds a "selling_plan" parameter to the page URL about a second after load, even when the customer is in one-time. The page was reading that as the customer choosing to subscribe. Fixed, including the follow-on where refreshing or sharing that URL reopened in Subscribe.

**Three further faults found and fixed while testing**

1. The sticky bar showed "Subscribe & Save — $76.50" over a one-time buy box at $85, but added to cart at $85. Shown one price, charged another. Reachable by any customer who scrolled.
2. A subscription added while the 6-pack was on screen was silently dropped to a full-price one-time purchase — the page checked the pack being *looked at*, not the pack being *added*.
3. One-time purchasing was switched off entirely on the staging product. That's a product-wide setting, so it blocked the 12-pack too. It came from the 14 August work restricting plans to the 12-pack. Fixed by adding a one-time plan in Recharge.

**Important for cutover:** the live product will need that same one-time plan when the 6-pack is created, and must not be set subscription-only — otherwise one-time purchases of the 12-pack stop working.

Add to cart is now verified in both modes: 6-pack one-time at $42, 12-pack subscription at $75.60. Completing a real order at checkout is still yours to run.

**Free-shipping threshold**

The cart drawer has its own separate setting and won't follow the product page. It's on $85 now and needs changing by hand at cutover. That's four places to update, not the three I listed on 14 August.

**Existing subscribers** — understood. The 11 existing subscriptions, their prices and queued charges stay untouched; $75.60 applies to new subscriptions only.

**Still open:** your checks covered the subscription lifecycle but not swap, add-product and change-variant in the customer portal. Those are the only ways a 6-pack could end up on a subscription, and that's what the whole one-time-only design rests on. Short check, but I'd like it done before we go live.

**Suggested window:** Wednesday 26 August, 07:00–09:00 NZST (Tuesday 25th as backup). Allow ~90 minutes. Early enough to stay ahead of the ordering peaks — worth sanity-checking against your traffic data.

To proceed I need:

1. Recharge confirmation that repricing the 12-pack to $84 won't affect the 11 existing subscriptions or queued charges
2. The three portal checks above
3. The window confirmed

Thanks,
Mizan
