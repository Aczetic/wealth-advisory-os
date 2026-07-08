# Financial Database

Shared reference for **all projects**: every data field available on India's open-finance rails —
**AA (Account Aggregator)**, **OCEN 4.0**, and **ULI (RBIH)** — with source, schema path, type,
allowed values and description.

*Built 8 July 2026 from official specs (ReBIT/Sahamati XSDs, iSPIRT OCEN JSON Schemas, RBIH service catalogue).*

## Layout

| Folder | Contents |
|---|---|
| `field-inventory/` | **`MASTER_field_inventory.csv`** — 1,731 fields, one row each (rail, source_schema, section_path, field, data_type, allowed_values, pattern, required, description, spec_source). Plus per-rail CSVs: `aa_fields.csv` (1,318), `ocen_fields.csv` (299), `uli_fields.csv` (114). |
| `source-specs/sahamati-aa-standards/` | Clone of github.com/Sahamati/account-aggregator-standards — official ReBIT XSD schema + **sample XML payload** for every FI type (what actually arrives post-consent), plus AA/FIP/FIU OpenAPI specs (`specs/*.yaml`). Extra XSDs (gstr1_3b, life/general insurance) downloaded from specifications.rebit.org.in into `schemas/`. |
| `source-specs/ocen-spec/` | Clone of the iSPIRT OCEN spec mirror — 47 JSON Schema files (borrower, loanApplication, offer, kyc, repayment, …) under `Core/schema/`. |
| `scripts/` | `rebuild_master.py` regenerates everything (runs the AA XSD parser + OCEN JSON parser, merges with ULI into the master CSV). |
| `docs/` | `ULI-OCEN-AA-data-availability.md` — full research note: who provides what data, formats, consent mechanics, frequency, sources. |

## Caveats

- **ULI rows are indicative**: RBIH gates field-level API specs behind lender onboarding
  (rbih.tech / joinuli.rbihub.in). Fields reflect the underlying source systems (UIDAI, VAHAN,
  Sarathi, state land records, GSTN…) and are flagged with a NOTE in the CSV.
- **Schema existence ≠ live availability** on AA: credit_card, EPF, PPF, bonds, CP, CD, govt
  securities have published schemas but FIPs are not live yet. Check
  https://sahamati.org.in/data-fi-types-available-on-aa/ for current status.
- AA schemas versioned ~1.x/2.0; rerun `scripts/rebuild_master.py` when specs update.
- **Note (repo hygiene):** `source-specs/*` are **vendored snapshots** — their inner `.git`
  dirs were removed so the files actually live in this repo for collaborators. To refresh,
  re-clone upstream and re-run the rebuild script:
  - https://github.com/Sahamati/account-aggregator-standards
  - iSPIRT OCEN spec mirror (as cloned on 2026-07-08) + specifications.rebit.org.in extras
