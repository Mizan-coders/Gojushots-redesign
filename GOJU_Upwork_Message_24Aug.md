# Upwork message to Tom — 24 August 2026

Reply to Tom's portal-check results and his proposed Tuesday window.

Paste-ready plain text below the line. No markdown, no hard wrapping — Upwork shows
`**` literally, and wrapped text fuses words across the line break on paste.

Covers: the portal checks closing the last open item, the timing problem with a
07:00 NZST window, the exact sequence needing confirmation, the one-time plan on the
live product, and the four places the threshold is read.

---

Hi Tom,

That closes the last open item on my side — thank you for running those.

The Browse All result is the one that settles it. Because the portal offered the 6-pack and showed it as one-time only at $42, we know it was visible and simply cannot be subscribed to. Had it just been missing, the result would have been ambiguous. So the one-time-only guarantee is now confirmed from both directions: the storefront and the customer portal.

Your checkout figures also match what I measured on staging exactly — $42 plus $8, $75.60 with free shipping, and the 6-pack to 12-pack switch staying on one-time.

ONE PROBLEM WITH THE WINDOW

07:00 NZST is 01:00 my time. The Wednesday backup is the same. I can do it if that is genuinely the best slot for the store, but I would rather flag it than have you find out at 2am that the person running a six-step live change has been awake all night. The step where we create the 6-pack lands around 02:30 my time, and that is the step with the least margin for error.

Could we look at 10:00–12:00 NZST on Tuesday 25 August instead? That is 04:00–06:00 for me, which is workable, and it is still ahead of your lunchtime and evening ordering peaks. If you would rather hold 07:00, tell me and I will be there.

RECHARGE CONFIRMATION

Understood, and I agree it should be written rather than verbal. One suggestion in case it does not arrive in time: the sequence splits cleanly in two.

Steps 1 to 3 — publishing the theme, moving the checkout threshold to $70, and updating the threshold wording on the site — touch no subscriptions at all and do not depend on Recharge. In the gap, the 12-pack is still $85, which is above $70, so it keeps free shipping and nothing is inconsistent for customers.

Steps 4 and 5 — repricing the 12-pack to $84 and creating the 6-pack — are the ones that need the Recharge answer. We could run 1 to 3 in the window and hold 4 and 5 for a short second session once the confirmation lands, rather than lose the whole slot. Your call entirely.

TWO THINGS TO CONFIRM BEFORE WE START

First, the order. It matters more than it looks:

1. Publish the approved theme, 12-pack still $85, threshold still $85
2. Change the checkout threshold to $70 and test at exactly $70
3. Update the theme threshold and the public $85 wording
4. Change the 12-pack to $84
5. Create the 6-pack at $42
6. Full live testing, including a real one-time add to cart on both packs

The threshold has to move to $70 before the 12-pack drops to $84. The other way round, the $84 12-pack sits below the old $85 threshold and quietly loses its free shipping — the dependency you spotted originally. Also worth confirming that publishing the theme at step 1 is inside what you are authorising, since it is itself a live change.

Second, and this is the one I would most like acknowledged: when the 6-pack is created on the live product at step 5, it needs a one-time plan added in Recharge, and the product must not be set to subscription-only.

That is what went wrong on staging. Subscription-only is a product-wide switch, so it did not just restrict the 6-pack — it stopped one-time purchases of the 12-pack as well, and nothing on the product could be bought outright. On the live product that would take out the path all the current revenue runs through. Creating the variant on its own is not enough.

THE THRESHOLD IS FOUR CHANGES, NOT ONE

Flagging again because it is easy to treat as a single switch:

1. The checkout shipping rule
2. The announcement bar
3. The Action Shot product template
4. The cart drawer's free-shipping progress bar

The cart drawer has its own separate setting and will not follow the others. Its built-in fallback is $80 rather than $85, so it has to be set to $70 explicitly rather than cleared.

So: Tuesday 25 August provisionally reserved, Wednesday 26 held as backup. Let me know on the timing and I will confirm.

Thanks,
Mizan
