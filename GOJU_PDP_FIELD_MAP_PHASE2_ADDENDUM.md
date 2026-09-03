# Field map — Phase 2 addendum

The Phase 1 field map (`GOJU_PDP_FIELD_MAP.md`) remains the base documentation.
This records only what Phase 2 changes or clarifies, as the client asked.

Written 4 September 2026, against the Immune Guard pilot on theme `155631714472`.

---

## 1. Proof pills can be overridden by a product metafield

The pills block reads **product metafields first** and only falls back to the theme
editor settings when they are blank:

| Order | Source |
|---|---|
| 1st | `product.metafields.cro.pill_1_text` … `pill_4_text`, and `pill_N_icon` |
| 2nd | Block settings `pill_1_text` … `pill_4_text` in the theme editor |

**Neither Action Shot nor Immune Guard uses the metafields today**, so the theme
editor is the single place to edit and behaves as expected.

**The trap:** if a metafield is ever set on a product, it wins silently. Someone
editing the pills in the theme editor would see no change and have no indication
why. If pills stop responding to theme-editor edits, check the product's
`cro.pill_*` metafields first.

Each pill renders only when its text is non-blank; icons are optional and render
only when set. The whole row is omitted when all four are blank.

## 2. The same editing controls carry across to the remaining products

Confirmed by comparison rather than assumption. All six 60 mL products already use
the same section (`main-product-cro`) with an identical block structure — thirteen
blocks in the same order — and the same ten page sections in the same order.

So every control documented in the Phase 1 field map, plus the pilot's, applies
unchanged to Ginger Ignition, Vital Sunshine, Good Night, Restore Pack and Defend
Pack. Nothing product-specific needs building for them.

## 3. Per-unit wording is deliberately different by range

| Range | Setting `per_bottle_suffix` | Renders as |
|---|---|---|
| 60 mL products | `/ shot` | "$5.56 / shot" |
| 200 mL Action Shot | `/ bottle` | "$7.00 / bottle" |

**This is intentional and must not be standardised.** Client instruction, 3 September.

## 4. The trust row is literal, not placeholder-driven

The trust items render exactly the text entered — the `[pack]` placeholder is **not**
substituted there. Action Shot hardcodes "Free shipping on the 12-pack" and Immune
Guard now hardcodes "Free shipping on the 15 Shots" the same way.

Approved by the client on 3 September; no placeholder development required. If a pack
is ever renamed, this row must be edited by hand.

`[pack]` **is** substituted in the status line, the subscribe-toggle suffix, the
upsell line, the switch confirmation and the sold-out messages.

## 5. Empty fields do not render

Verified across the pilot. Blank proof pills, trust items, stat-band entries, story
fields, ingredient cards and FAQ entries are omitted rather than rendered as empty
space. Action Shot's fourth trust slot is blank in production and renders nothing.

A **disabled section** renders nothing at all while keeping every field editable —
which is how the Immune Guard story section is currently configured.

## 6. Known inaccuracies elsewhere, recorded not fixed

Both are outside the pilot and left untouched at the client's instruction.

**Action Shot collection card label** — reads "12 x Bottles". Inaccurate since the
product gained a 6-pack; the card price correctly reads "From $42.00".

**Sample Pack inherited wording** — `templates/product.cro-sample-pack.json`

| Line | Setting | Value |
|---|---|---|
| 60 | `nosub_hint` | "One-time purchase — subscribe & save on the **15 pack** with free shipping always" |
| 85 | `nosub_upsell` | "**15 Shots** with Subscribe & Save — save 10% with free shipping always." |

Sample Pack has a single variant and no subscription plans, so neither line ever
renders. Inherited when the template was copied from a 60 mL product.
