# Health Hub — Decision Rules & Source Mapping (MVP v5)

This document lists **every rule** that can raise the urgency of a Health Hub result, and the
Mayo Clinic guidance each one is meant to come from. It is the PRD v3 deliverable
"Mayo Clinic–mapped rule documentation".

> ⚠️ **Review status: NOT YET VERIFIED.** The rules were written from general knowledge of
> Mayo Clinic's public guidance, not copied from the pages. Before user testing, a reviewer
> should open each Mayo Clinic page, confirm (or correct) the rule, paste the page URL into the
> **Verified URL** column, and tick **OK**. Rules marked **Product rule** are Health Hub policy
> from the PRD, not Mayo Clinic thresholds, and should be labelled that way in the app.

All rules live in `index.html` (search for the rule's text or config ID). Changing a threshold
here means changing it in the code too.

---

## How the engine works

1. **Urgency tiers** (lowest → highest), each shown with an *assessed severity*:

   | Tier | Shown as | Severity |
   |---|---|---|
   | `monitor` | Monitor at Home | Mild |
   | `provider` | Contact a Provider Today | Moderate |
   | `urgent` | Seek Care Now | Severe |
   | `emergency` | Call 911 Now | Critical |

2. Every answer can **raise** the tier; nothing lowers it. The final result is the highest tier
   any rule triggered ("when uncertain → escalate").
3. **Red flags override everything.** If any warning sign is selected, the flow stops and goes
   straight to the result. No "monitor" output is possible (PRD v2 hard safety ceiling).
4. **Age groups:** Newborn (< 3 months), Baby (3 months – 2 years), Child (2–17), Adult (18–64),
   Older adult (65+). They come from a preset, a saved profile's date of birth, or an exact age.

---

## 1. Red flags (warning-sign screen)

Shown only when relevant to the selected symptoms and age. Any selection = immediate escalation.

| ID | Warning sign | Shown when | Tier | Mayo Clinic source | Verified URL | OK |
|---|---|---|---|---|---|---|
| `breathing` | Severe trouble breathing | Always | emergency | Shortness of breath — When to see a doctor | | ☐ |
| `blue` | Blue or gray lips, face or nails | Always | emergency | Shortness of breath — When to see a doctor | | ☐ |
| `confused` | Confused, very hard to wake, or not responding normally | Always | emergency | Fever — When to see a doctor | | ☐ |
| `chestpain` | New chest pain or pressure (esp. spreading to arm/jaw/neck/back) | Chest *not* selected as a symptom | emergency | Heart attack — Symptoms | | ☐ |
| `stroke` | Sudden numbness/weakness/drooping on one side, or trouble speaking | Headache, dizziness, or older adult | emergency | Stroke — Symptoms | | ☐ |
| `worst` | Sudden, severe "worst ever" headache | Headache | emergency | Headache — When to see a doctor | | ☐ |
| `headinj` | Headache or dizziness after a head injury | Headache or dizziness | emergency | Headache — When to see a doctor | | ☐ |
| `stiffneck` | Stiff neck / pain bending head forward | Fever or headache | emergency | Fever — When to see a doctor | | ☐ |
| `seizure` | Seizure | Fever, headache or dizziness | emergency | Fever — When to see a doctor | | ☐ |
| `fainted` | Fainted or passed out | Dizziness or chest | emergency | Dizziness — When to see a doctor | | ☐ |
| `hotcar` | Fever after being left in a hot car | Fever + child/baby/newborn | emergency | Fever — When to see a doctor | | ☐ |
| `vomitblood` | Vomiting blood / coffee-ground vomit | Stomach | urgent | Abdominal pain — When to see a doctor | | ☐ |
| `bloodstool` | Bloody, black or tar-like stool | Stomach | urgent | Abdominal pain — When to see a doctor | | ☐ |
| `severebelly` | Belly pain so bad they can't sit still | Stomach | urgent | Abdominal pain — When to see a doctor | | ☐ |
| `dehydrated` | Signs of dehydration (no wet diaper/pee, no tears, sunken eyes/soft spot) | Child/baby/newborn | urgent | Dehydration — When to see a doctor | | ☐ |

## 2. Daily function (replaces self-rated severity)

| Answer | Tier | Mayo Clinic source | Verified URL | OK |
|---|---|---|---|---|
| Mostly normal / Tired, resting more | — | — | | |
| Can't do usual activities, or unusually fussy/irritable/sluggish | provider | Fever — When to see a doctor (listless/irritable child) | | ☐ |
| Can't keep fluids down, or barely able to get up | urgent | Dehydration — When to see a doctor | | ☐ |
| Not sure | counts as 1 unknown (see §8) | Product rule | | |

## 3. Duration

| Rule | Tier | Mayo Clinic source | Verified URL | OK |
|---|---|---|---|---|
| Fever + 4 days or longer ("more than 3 days") | provider | Fever — When to see a doctor | | ☐ |
| Cold/flu + 10 days or longer | provider | Common cold — When to see a doctor | | ☐ |
| Stomach + 4 days or longer *(conservative vs. Mayo's "a week or longer"; check)* | provider | Abdominal pain — When to see a doctor | | ☐ |
| Dizziness + 4 days or longer ("prolonged") | provider | Dizziness — When to see a doctor | | ☐ |
| "Not sure" | counts as 1 unknown | Product rule | | |

## 4. Temperature (fever selected)

Fever line: **100.4 °F (38 °C)** for all groups except older adults (**100.0 °F**, product rule).

| Age group | Rule | Tier | Source | Verified URL | OK |
|---|---|---|---|---|---|
| Newborn (< 3 mo) | ≥ 100.4 °F | urgent | Mayo Clinic — Fever (infants under 3 months: call doctor) | | ☐ |
| Newborn (< 3 mo) | Temperature unknown/skipped | provider ("take a rectal temperature and call") | Mayo Clinic — Fever | | ☐ |
| Baby (3 mo – 2 yr) | > 102 °F | provider | Mayo Clinic — Fever | | ☐ |
| Child (2–17) | ≥ 103 °F *(Mayo's teen/adult number applied to the whole child preset; confirm child guidance)* | provider | Mayo Clinic — Fever | | ☐ |
| Adult (18–64) | ≥ 103 °F | provider | Mayo Clinic — Fever | | ☐ |
| Older adult (65+) | ≥ 100.0 °F | provider | **Product rule** (PRD v2: lower senior threshold) | n/a | |
| Any, with weakened immune system | ≥ fever line | provider | **Product rule** (narrower tolerance for higher-risk profiles) | n/a | |

Readings outside 93–110 °F are rejected as likely errors. Unknown/skipped counts as 1 unknown.

## 5. Heart rate (dizziness, adults and older adults only)

| Rule | Tier | Source | Verified URL | OK |
|---|---|---|---|---|
| Resting HR > 100 or < 60 bpm | provider | Mayo Clinic — What's a normal resting heart rate? (60–100) | | ☐ |

## 6. Symptom checklists

| Symptom | Option | Tier | Mayo Clinic source | Verified URL | OK |
|---|---|---|---|---|---|
| Chest | *(chest selected at all)* | urgent (baseline) | Chest pain — When to see a doctor | | ☐ |
| Chest | Pressure, squeezing, fullness or tightness | emergency | Heart attack — Symptoms | | ☐ |
| Chest | Spreads to shoulder, arm, jaw, neck or back | emergency | Heart attack — Symptoms | | ☐ |
| Chest | With sweating, nausea, shortness of breath or lightheadedness | emergency | Heart attack — Symptoms | | ☐ |
| Chest | Lasts more than a few minutes, or comes and goes | emergency | Heart attack — Symptoms | | ☐ |
| Chest | "Not sure" | emergency | Chest pain — When to see a doctor ("when in doubt") | | ☐ |
| Cold/flu | Wheezing, or breathing faster/harder than normal | provider | Common cold — When to see a doctor | | ☐ |
| Cold/flu | Severe sore throat, headache or sinus pain | provider | Common cold — When to see a doctor | | ☐ |
| Cold/flu | Ear pain | provider | Common cold (children) — When to see a doctor | | ☐ |
| Cold/flu | Fever went away, then came back | provider | Common cold — When to see a doctor | | ☐ |
| Cold/flu | Getting worse instead of better | provider | Common cold — When to see a doctor | | ☐ |
| Headache | Double vision or sudden vision loss | emergency | Headache — When to see a doctor | | ☐ |
| Headache | Not helped by OTC pain medicine | provider | Headache — When to see a doctor | | ☐ |
| Headache | More often than usual, or a new kind | provider | Headache — When to see a doctor | | ☐ |
| Headache | Keeps them from working, sleeping or usual activities | provider | Headache — When to see a doctor | | ☐ |
| Stomach | Belly swollen and very tender | urgent | Abdominal pain — When to see a doctor | | ☐ |
| Stomach | Not improving after 1–2 days, or getting worse | provider | Abdominal pain — When to see a doctor | | ☐ |
| Stomach | Fever together with belly pain | provider | Abdominal pain — When to see a doctor | | ☐ |
| Stomach | Diarrhea not improving after 2 days (1 day for a child) | provider | Diarrhea — When to see a doctor | | ☐ |
| Stomach | Bloating > 2 days | provider | Abdominal pain — When to see a doctor | | ☐ |
| Stomach | Burning or pain when peeing | provider | Abdominal pain — When to see a doctor | | ☐ |
| Dizziness | Racing, pounding or irregular heartbeat | emergency | Dizziness — When to see a doctor | | ☐ |
| Dizziness | Stumbling or trouble walking | emergency | Dizziness — When to see a doctor | | ☐ |
| Dizziness | Vomiting that won't stop | emergency | Dizziness — When to see a doctor | | ☐ |
| Dizziness | Sudden change in hearing | emergency | Dizziness — When to see a doctor | | ☐ |
| Dizziness | Keeps coming back, or lasts a long time | provider | Dizziness — When to see a doctor | | ☐ |
| Dizziness | Came on suddenly or is severe, with no clear reason | provider | Dizziness — When to see a doctor | | ☐ |
| Dizziness | Only when standing up quickly, passes in seconds | — (informational) | — | | |

"Not sure" on any checklist except chest counts as 1 unknown.

## 7. Profile risk factors

| Rule | Tier | Source | Verified URL | OK |
|---|---|---|---|---|
| Cold/flu + asthma, COPD, heart disease, diabetes, kidney disease, weakened immune system, or pregnancy | provider | Influenza (flu) — When to see a doctor (high risk of complications → see provider right away) | | ☐ |
| Cold/flu + older adult (65+) | provider | Influenza (flu) — risk factors | | ☐ |
| Cold/flu + baby or newborn (under 2) | provider | Influenza (flu) — risk factors | | ☐ |

## 8. Uncertainty bias (PRD v3)

| Rule | Tier | Source |
|---|---|---|
| 2 or more answers were "Not sure", "Don't know" or "Skip", and the result would otherwise be Monitor | provider | **Product rule** (PRD v3: skip / don't know shifts escalation upward) |
| Exactly 1 unknown answer | no change; result shows a note suggesting a measurement | Product rule |

---

## Non-rule content to review

These texts are shown to users but don't change the tier. They should also be checked against
Mayo Clinic: **home-care tips** (`HOME_CARE`), **"get help sooner if"** lists (`WATCH_FOR`) and
**tier action lists** (`TIER`) in `index.html`.

## Reviewer checklist

- [ ] Every ☐ in sections 1–7 ticked, with a URL
- [ ] Any corrected threshold also changed in `index.html`
- [ ] Product rules accepted by the team (senior 100.0 °F, immune-system fever rule, uncertainty bias)
- [ ] Home care / watch-for / action texts checked
