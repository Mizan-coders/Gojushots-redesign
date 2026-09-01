# Immune Guard — Recharge baseline before any change

Captured 1 September 2026, 20:16 UTC, read-only from the live storefront.
Step 1 of the client's six-step safeguard. Nothing has been modified.

**Product** — Immune Guard · `9323031462056` · `requires_selling_plan: false`

## Variants

| Variant | Variant ID | SKU | Price | Available | Subscription plans |
|---|---|---|---|---|---|
| 9 Shots | `55279632089256` | IG 60ml 9-pack | $50.00 | yes | **none** |
| 15 Shots | `55279632122024` | IG 60ml 15-pack | $75.00 | yes | 4, all at $67.50 |

## Plan groups and current assignments

| Frequency | Plan ID | 15 Shots | 9 Shots |
|---|---|---|---|
| 2 week, 10% | `2724495528` | **yes** | no |
| 3 week, 10% | `2724331688` | **yes** | no |
| 4 week, 10% | `2724790440` | **yes** | no |
| 6 week, 10% | `2724298920` | **yes** | no |

All four price the 15 Shots variant at **$67.50** — 10% off $75.

## The intended change

Add **9 Shots** (`55279632089256`) to all four existing plan groups. Additions only.
No plan removed, replaced or recreated. Every existing 15 Shots association retained
exactly as above.

Expected result afterwards: 9 Shots carries the same four plan IDs at **$45.00**
(10% off $50), and the 15 Shots rows above are unchanged.

## Verification after each step

Re-run this capture and compare against the table above. The pass condition is that
every "yes" in the 15 Shots column is still "yes", the four plan IDs are unchanged,
and the only difference is the 9 Shots column turning to "yes" at $45.00.

Stop immediately if any plan ID changes, any 15 Shots association is missing, or a
plan disappears from the product — the failure seen on Action Shot on 26 August.
