# IMPORT REPORT — Nafis Fuad Tanvir Portfolio

**Generated:** 2026-10-27  
**Agent:** Antigravity (Milestone 1 — Data ingestion)  
**Status:** LinkedIn / BDJobs CSVs not yet dropped into `/content/import/`

---

## Summary

No LinkedIn CSV or BDJobs PDF were found in `/content/import/linkedin/` or `/content/import/bdjobs/` at the time of generation. Profile data has been populated from:

1. The PRD §4.4 baseline (manually specified facts)
2. Public GitHub profile (`NafisFuadTanvir`) — live API + snapshot cache

The file `/content/profile.json` is the current single source of truth.

---

## Items Requiring Manual Verification

The following fields are marked **(verify)** in the PRD and have been entered with placeholder or best-guess values. **Do not publish until these are confirmed against your LinkedIn and BDJobs profiles.**

| Field | Value in `profile.json` | Action required |
|---|---|---|
| Education CGPA | 3.54 | Verify against official transcript |
| Education dates | 2019 – 2023 | Verify start/end year |
| Role at MGH Group | MIS Officer | Verify exact job title |
| MGH Group start date | 2023-01 | Verify month/year |
| Robo Tech Valley title | Software Engineer Intern | Verify exact title |
| Robo Tech Valley dates | 2022-06 to 2022-12 | Verify months |
| Certification year | 2024 | Verify issue year |
| IEEE role title | Leadership Role | Replace with exact title |
| IEEE years | 2021 – present | Verify start/end year |
| Publication title | VERIFY | Add actual title |
| Publication venue | VERIFY | Add journal name |
| Publication year | 2023 | Verify year |
| Publication URL/DOI | missing | Add Elsevier link + DOI |
| Contact email | nafisfuadtanvir@example.com | Replace with real email |

---

## Privacy Compliance Check (PRD §4.3)

The following fields were **excluded** from `profile.json` per PRD §4.3:

| Excluded field | Status |
|---|---|
| Phone number | Not present |
| Home address | Not present — location is "Chattogram, Bangladesh" only |
| Date of birth | Not present |
| National ID / Passport | Not present |
| Father / mother names | Not present |
| Religion | Not present |
| Marital status | Not present |
| Photo metadata | Not present — photo path only (if added) |

---

## Conflicts

No conflicts were detected (no import files provided to compare against). Once LinkedIn CSV and BDJobs PDF are added:

1. Drop LinkedIn CSVs into `/content/import/linkedin/`
2. Drop BDJobs CV PDF into `/content/import/bdjobs/`
3. Re-run the agent import task — conflicts will be listed here with the differing values from each source.

---

## Next Steps

1. **You provide:** Drop LinkedIn export CSVs and BDJobs PDF into the import folders above.
2. **You verify:** Check every row in the "Items Requiring Manual Verification" table above.
3. **Agent will:** Re-process imports, detect conflicts, update `profile.json`, regenerate this report.
4. Confirm the contact email and replace `nafisfuadtanvir@example.com`.
5. Add the Elsevier paper title, venue, year, URL, and DOI to `profile.json → publications[0]`.
6. Add the IEEE CS role title and years to `profile.json → leadership[0]`.
