# Upwork message to Tom — 31 August 2026

Closes Phase 1 and responds to the Phase 2 scope request. Availability line needs
filling in before sending. Estimate is indicative pending the four questions.

---

Hi Tom,

Good to hear the duplicate is archived. Phase 1 close-out below, then Phase 2.

MONITORING

Friday's check was clean. No one-time order carrying a selling plan, no subscription charged at $84, and no mismatch between advertised and charged shipping.

POST-LAUNCH AUDIT, RUN TODAY

Five days after go-live, everything is holding:

- Action Shot: 6-pack first at $42 with zero subscription plans, 12-pack at $84 with all three frequencies at $75.60
- The page opens on the 6-pack, One-time, with no subscription attached
- Free shipping reads $70 in all four places — announcement bar, cart drawer, the Action Shot template, and the built-in default covering the other products. I checked all seven of those individually rather than assuming
- Cart tested live across four paths and cleared afterwards: 6-pack $42 no plan, 12-pack $84 no plan, 12-pack subscription $75.60 with the plan named, and a 60 mL one-time at $50
- Both test products are gone from the storefront

No regressions. The one approved 60 mL change has landed as expected: the 15 Shots saving now reads $7.50 rather than $15.50, because $75 clears the $70 threshold so there is no longer $8 of avoided shipping folded into the figure.

HANDOVER

Sending the completed tracker separately. It records what was built, what was verified and how, the two defects found during cutover and their resolutions, and the decisions taken along the way. The editable field map from earlier in the phase still applies and is unchanged.

Still open, for the record rather than as blockers:

- Customer portal checks against the live 6-pack. You ran these on the staging product and they passed; they have not been repeated on the live variant
- A completed checkout on the three purchase paths, and the $70.00 / $69.99 boundary. The cart side is verified; no real order has been placed
- The pack_selected analytics event firing on a genuine card click has never been observed, only its guard
- Two display states remain untested because the stock conditions have never existed: a sold-out subscribable variant, and a product with nothing purchasable
- Mobile buy box at around 390px, and the alt text entry, are both mine to finish
- Two decisions from earlier in the phase were never resolved: Loox versus Growave on product cards, and checkout attribution by line-item properties or Web Pixels

PHASE 2

Happy to take it on. Good news on cost: most of what you have listed is already built and now proven in production.

Once a product's switch is turned on, the existing code already delivers opening on the smallest pack in One-time, preserving purchase type when switching packs, per-shot prices and savings calculated from that pack's real prices, and your exact shipping wording — the 9-pack shows "+ $8 shipping" because $50 sits under $70, and the 15-pack shows "delivered, ships free". Respecting explicit variant and subscription links is already there too. No redesign, as you say.

The actual work is Recharge, not the theme. All six products currently have zero subscription plans on the 9 Shots variant, so adding 10% at $45 is new configuration on six products.

FOUR QUESTIONS BEFORE I CAP THE ESTIMATE

1. Will a $45 subscription actually get free shipping? This is the one I would most like settled. The free shipping rule is $70 and above. Your 15 Shots subscription at $67.50 is already below it, and $45 is well below. Subscribers currently get free shipping from something other than the shipping rates — we saw that when your $75.60 test order shipped free. Could you confirm what grants that and that it applies regardless of order value? If it is conditional, the requirement needs shipping configuration that is not in anyone's estimate yet.

2. Who does the Recharge work? You handled the plan and pricing side on Action Shot. If the 9-pack plans are mine across six products, that is a meaningful part of the estimate, and it carries the risk we hit last week when the variant-plan grid removed a live plan. If it is yours, my number comes down.

3. Which review source is authoritative? You have asked for genuine reviews only, with no rating shown where there are none. Loox is on product cards and Growave on the product pages, and choosing between them was left open in Phase 1. I need that decided before I can quote the review work.

4. Restore Pack and Defend Pack are bundles. If listing bundle contents needs a new field, that is a new build item rather than reuse. Will the existing fields do?

One coordination point: you have asked me to build on an unpublished theme, but Action Shot is live on the current one and Belle will be editing copy there. Those edits will not carry across automatically — that is the same trap we avoided at cutover. Simplest is that I take a copy at the point we start, and we agree either that copy edits pause during the build, or that I re-apply hers before publishing.

INDICATIVE ESTIMATE

Subject to the four answers above, particularly who does the Recharge work:

- Immune Guard first, end to end, including one round of your review and any changes: 4 hours
- The remaining five, configuration and full testing: 1.5 hours each, so 7.5 hours
- Recharge: adding and verifying the 9-pack plans across six products: 3.5 hours
- Documenting which fields and metafields you and Belle edit directly, and which live in the theme editor: 1.5 hours
- Review audit across the six, including hiding ratings where there are none: 1.5 hours
- Publishing and immediate live QA: 2 hours
- Final walkthrough and handover: 1 hour

That is about 21 hours gross. Less the three reusable-component hours already delivered, I would cap it at 18 billable hours.

Two notes on how I have arrived at that, since it is higher than a straight "reuse what exists" reading might suggest.

The Recharge line is priced on experience rather than optimism. Last week a single plan change on one product removed a live selling plan and cost about an hour to diagnose, escalate and put right. Phase 2 repeats that operation on six products, and each one needs verifying afterwards rather than assumed. I would rather carry that as a real line than discover it mid-rollout.

Publishing is its own event. The work sits on an unpublished theme, so going live is a coordinated change with checks afterwards, in the same shape as last week even if much smaller. It was not in my first rough cut and it should have been.

The per-product hour and a half covers turning the switch on, confirming it opens on the 9-pack in One-time, checking the per-shot maths and shipping lines against that product's real prices, the subscribe-switch behaviour, the sticky bar, and cart adds in both purchase types. That is the same list we worked through on Action Shot, and it is what gives you the confidence that six pages went live without surprises.

If the Recharge configuration turns out to be yours rather than mine, take 3.5 hours off that figure.

Availability: [MIZAN — fill in your start date and hours per day here]

Approach as you set out: build on an unpublished theme, Immune Guard reviewed and approved first, then the remaining five in one pass, and no live product, Recharge or publication changes without you.

Thanks,
Mizan
