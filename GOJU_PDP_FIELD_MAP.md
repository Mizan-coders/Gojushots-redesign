# Action Shot PDP — Editable Field Map

For GOJU. Covers the fields added for the new purchase experience: where each one
lives, whether it applies to one product or the whole site, what a blank value
does, and which fields need retesting if changed.

**Theme:** `155130822824` "Subscription Update Aug 2026" (unpublished)
**Where to edit:** Online Store → Themes → Customize → open a product page → **CRO Product Page** section
**Last updated:** 13 August 2026

---

## The one rule worth knowing

**Clearing a text field does not hide it — it restores the built-in wording.**

Almost every text field falls back to a default when empty, so an empty box brings
back the original words rather than removing the line. The handful of fields that
genuinely hide something are marked **HIDES** below.

---

## Scope: what changes what

| Scope | Meaning |
|---|---|
| **Per product** | Set on that product's template. Changing it affects only that product. |
| **All products** | One setting shared by every product using this page type. |

Almost everything here is **per product**, which is deliberate — the range is
migrated one product at a time.

---

## 1. Purchase experience switch

| Field | Where | Scope | Blank / off |
|---|---|---|---|
| **Use new purchase experience** | CRO Product Page → *Purchase Experience* | Per product | Off = that product keeps its previous behaviour |

**On** = pack cards, one-time selected first, sold-out messaging, Sample Pack link.
**Off** = the older pill selector and subscribe-first default.

Currently **on for Action Shot only**. Every other product is off until GOJU
approves its migration.

> ⚠️ **Retest if changed.** Turning this on for another product changes how it opens
> for customers — including whether it starts on subscription. Check the pack
> selector, price, CTA and sticky bar afterwards.

---

## 2. Pack cards

Section → **Variant Picker** block. All per product.

| Field | Default | Blank behaviour |
|---|---|---|
| Show packs as cards | on | Off = old pill selector |
| Badge on smallest pack | `Start here` | Restores "Start here" |
| Badge on largest pack | `Best value` | Restores "Best value" |
| Sold out badge | `Sold out` | Restores "Sold out" |
| Selected label | `Selected` | Restores "Selected" |
| Unselected label | `Select` | Restores "Select" |
| Per-unit wording | `/ bottle` | Restores "/ bottle" |
| Free shipping wording | `delivered, ships free` | Restores default |
| Paid shipping wording | `shipping` | Restores default |

**Per-unit wording is intentionally different per product** — Action Shot uses
"bottle", the 60 ml range uses "shot". Keep it matching the product.

### Shipping figures — handle with care

| Field | Default |
|---|---|
| Free shipping threshold | `$85` |
| Standard shipping cost | `$8` |

> ⚠️ **These must match what checkout actually charges.** They only control what the
> page *says*. Setting the threshold to $70 before checkout is changed would promise
> free shipping the customer does not receive. Change them together, and test a real
> order at exactly the threshold.

---

## 3. Subscription messages

Section → **Purchase Widget** block. All per product.

| Field | Default | Blank behaviour |
|---|---|---|
| Subscribe button — single pack suffix | `— [pack] only` | Restores default |
| Subscribe button suffix (unavailable) | `unavailable` | Restores default |
| Subscription blocked hint | `Subscription is unavailable while the [pack] is out of stock.` | Restores default |
| Pack switched confirmation | `Subscriptions are available on the [pack]. We've updated your selection.` | Restores default |
| Sold-out pack switched | `The [pack] is sold out. We've selected the [available].` | Restores default |
| Everything sold out | `[product] is currently sold out.` | Restores default |

### Placeholders

`[pack]`, `[available]` and `[product]` are filled in automatically with the real
pack and product names. **Keep them in the sentence** — remove one and the message
loses the name it was meant to carry.

The "single pack suffix" only appears when exactly one pack can be subscribed to,
and only when the product has more than one pack. On Action Shot today it reads
"Subscribe & save 10% — 12-pack only".

---

## 4. Sample Pack link

Section → **Buy Buttons** block. All per product.

| Field | Default | Blank behaviour |
|---|---|---|
| Lead-in text | `New to GOJU?` | **HIDES** the lead-in; the link still shows |
| Link text | `Try the Sample Pack.` | Restores default wording |
| Link URL | *(empty)* | Falls back to the Sample Pack product automatically |

**To hide the link entirely**, there is no single switch — it is hidden automatically
on the Sample Pack's own page, and turning off the purchase experience switch
removes it with everything else.

---

## 5. Sold-out notice under the button

Section → **Buy Buttons** block. All per product.

| Field | Default |
|---|---|
| Notice when subscription is blocked | `The [pack] is currently sold out, so new subscriptions are temporarily unavailable. Your selection hasn't changed.` |
| Notice when other packs still available | `[pack] is currently sold out. Other pack sizes are still available.` |

Which one appears is automatic: the first when no subscribable pack is in stock,
the second when other packs can still be bought.

---

## 6. Content already editable before this work

Not new, but part of maintaining the page:

| Content | Where | Scope |
|---|---|---|
| Buy-box pills (the proof strip) | Variant area → *Benefit Pills* block, or product metafields | Per product |
| Trust line under the button | *Mini Trust* block | Per product |
| Subscription benefits and terms | *Purchase Widget* block | Per product |
| Accordions (How to Take, Ingredients, Shipping) | *Accordion* blocks | Per product |
| Green stats band | Stats Band section, including its height | Per product |
| Story section, ingredient cards | Their own sections | Per product |

Product metafields take priority over these settings where both exist. If editing a
field has no effect, the value is coming from the product's metafields instead.

---

## Fields that need retesting when changed

| Field | Why |
|---|---|
| Use new purchase experience | Changes the opening state for customers |
| Free shipping threshold | Must match checkout, or the page misleads |
| Standard shipping cost | Same |
| Any message containing `[pack]` / `[available]` / `[product]` | Losing a placeholder loses the pack name |
| Per-unit wording | Should match the product's format — bottles vs shots |

Everything else is wording only and safe to edit.

---

## Publish gates

Two items are built but **must not go live yet**:

1. **"Skip it. Pause it. Cancel it. Anytime."** — hold until Skip, Pause and Cancel
   have been tested in the Recharge customer portal and all public subscription
   wording matches.
2. **Any $70 free-shipping wording** — hold until the checkout threshold is actually
   changed to $70 and tested.
