# Upwork message to Tom — 19 August 2026

Paste-ready plain text below the line. Deliberately written with **no markdown**
and **no hard line wrapping**: Upwork shows `**` as literal asterisks, and wrapped
text joins words together when the line breaks are stripped on paste (`queued` +
`charges` becoming `queuedcharges`). Each paragraph is one long line — let the
message box do the wrapping.

The fuller email version is in `GOJU_Reply_To_Tom_19Aug.md`; the evidence behind
every claim is in `GOJU_PDP_PHASE_TRACKER.md`.

---

Hi Tom,

Thanks for running the Recharge checks — all passed, so I've cleared the "Skip it. Pause it. Cancel it. Anytime." wording for publication.

PURCHASE-TYPE FIX — DONE AND VERIFIED

All three of your cases now work, tested with real clicks on the staging product:

- One-time 6-pack, select 12-pack: stays one-time, $84
- One-time 12-pack, select 6-pack: stays one-time, $42
- Subscribe on the 6-pack: moves to the 12-pack at $75.60 with the explanatory message

Cause: Recharge adds a "selling_plan" parameter to the page URL about a second after load, even when the customer is in one-time. The page was reading that as the customer choosing to subscribe. Fixed, including the follow-on where refreshing or sharing that URL reopened in Subscribe.

THREE FURTHER FAULTS FOUND AND FIXED WHILE TESTING

1. The sticky bar showed "Subscribe & Save — $76.50" over a one-time buy box at $85, but added to cart at $85. Shown one price, charged another. Reachable by any customer who scrolled.

2. A subscription added while the 6-pack was on screen was silently dropped to a full-price one-time purchase. The page was checking the pack being looked at, not the pack being added.

3. One-time purchasing was switched off entirely on the staging product. That is a product-wide setting, so it blocked the 12-pack too. It came from the 14 August work restricting plans to the 12-pack. Fixed by adding a one-time plan in Recharge.

Important for cutover: the live product will need that same one-time plan when the 6-pack is created, and must not be set subscription-only, or one-time purchases of the 12-pack stop working.

Add to cart is now verified in both modes: 6-pack one-time at $42, 12-pack subscription at $75.60. Completing a real order through checkout is still yours to run.

FREE-SHIPPING THRESHOLD

The cart drawer has its own separate setting and will not follow the product page. It is on $85 now and needs changing by hand at cutover. That is four places to update, not the three I listed on 14 August.

EXISTING SUBSCRIBERS

Understood. The 11 existing subscriptions, their prices and their queued charges stay untouched, and $75.60 applies to new subscriptions only.

STILL OPEN

Your checks covered the subscription lifecycle but not swap, add-product and change-variant in the customer portal. Those are the only ways a 6-pack could end up on a subscription, and that is what the whole one-time-only design rests on. Short check, but I would like it done before we go live.

SUGGESTED WINDOW

Wednesday 26 August, 07:00–09:00 NZST, with Tuesday 25th as backup. Allow about 90 minutes. Early enough to stay ahead of the ordering peaks — worth sanity-checking against your traffic data.

TO PROCEED I NEED

1. Recharge confirmation that repricing the 12-pack to $84 will not affect the 11 existing subscriptions or their queued charges
2. The three portal checks above
3. The window confirmed

Thanks,
Mizan
