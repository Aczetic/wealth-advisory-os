# Data Availability under ULI, OCEN and Account Aggregator (AA)
*Research compiled 8 July 2026 — for Financial Health Score (NTB/NTC) project*

## TL;DR

| | AA (Account Aggregator) | OCEN 4.0 | ULI (Unified Lending Interface) |
|---|---|---|---|
| **What it is** | Consent-based rail for a customer's **raw financial data** | A **transaction protocol** for loan origination (application → offer → grant → repay) | RBIH's **aggregation platform**: one API into 136+ data services incl. AA, public registries, verification |
| **Who provides data** | FIPs: banks, NBFCs, RTAs (CAMS/KFintech), depositories, insurers, CRAs (NPS), GSTN | No data store of its own — data flows via AA + Derived Data Providers (DDPs) in a Product Network | State land-record depts, credit bureaus, NSDL/UIDAI/DigiLocker, satellite/agri providers, dairy co-ops, GSTN, AA network |
| **Format** | XML or JSON per ReBIT schemas, encrypted end-to-end | JSON (JSON Schema draft-07, open on GitHub) | REST/JSON, OpenAPI specs; JWT + OAuth2 + mTLS |
| **Frequency** | Consent-defined: ONETIME or PERIODIC (up to hourly) | Event-driven per loan application | On-demand pull at loan decision time |
| **Public field-level JSON?** | ✅ Yes — specifications.rebit.org.in | ✅ Yes — GitHub / ocen.dev | ⚠️ Gated — OpenAPI docs on rbih.tech require onboarding |

---

## 1. Account Aggregator (AA) — the richest raw-data source

**Governance:** RBI Master Direction (NBFC-AA, 2016); technical standards by **ReBIT**; SRO **Sahamati**. Licensed AAs include Finvu, OneMoney, CAMS Finserv, Anumati (Perfios), Setu AA, NADL, etc. The AA is **data-blind** — it transports encrypted data from FIP → FIU and stores nothing.

### FI types (23 notified; live vs proposed)

| Regulator | Live | Proposed / not yet live |
|---|---|---|
| RBI | DEPOSIT, TERM_DEPOSIT, RECURRING_DEPOSIT | Commercial Paper, Certificates of Deposit, Govt Securities |
| SEBI | MUTUAL_FUNDS, SIP, EQUITIES, ETF, IDR, CIS, AIF, REIT, INVIT (via RTAs & depositories) | Bonds, Debentures |
| IRDAI | GENERAL_INSURANCE, LIFE_INSURANCE (Insurance Policies/ULIP withdrawn as separate types) | — |
| PFRDA | NPS balances (via CRAs) | — |
| DoR/MoF | **GSTR1_3B** (GST returns via GSTN as FIP) | — |
| EPFO/others | — | EPF, PPF |

### Universal 3-block structure (every FI type)
- **Profile** → Holders: `name, dob, mobile, email, pan, nominee, ckycCompliance, address, landline`, holding type SINGLE/JOINT
- **Summary** → e.g. deposit: `type (SAVINGS/CURRENT), currentBalance, balanceDateTime, branch, ifscCode, micrCode, openingDate, status, facility (OD/CC), drawingLimit, currentODLimit, currency, exchgeRate, Pending{amount, transactionType}`
- **Transactions** → `startDate, endDate` + repeating Transaction: `txnId, type (CREDIT/DEBIT), mode (CASH/ATM/CARD/UPI/FT/OTHERS), amount, currentBalance, transactionTimestamp, valueDate, narration, reference`
- Account wrapper: `maskedAccNumber, linkedAccRef, type, version`

Full XSD + JSON schema per FI type: https://specifications.rebit.org.in/ (e.g. `/api_schema/account_aggregator/documentation/deposit.html`, `mutual_funds.html`)

### Consent artefact controls frequency & scope (JSON)
```json
{
  "consentDetail": {
    "consentStart": "2026-07-08T00:00:00Z",
    "consentExpiry": "2027-07-08T00:00:00Z",
    "consentMode": "VIEW",
    "fetchType": "PERIODIC",
    "consentTypes": ["PROFILE", "SUMMARY", "TRANSACTIONS"],
    "fiTypes": ["DEPOSIT", "MUTUAL_FUNDS", "GSTR1_3B"],
    "dataRange": { "from": "2025-07-01T00:00:00Z", "to": "2026-07-08T00:00:00Z" },
    "dataLife": { "unit": "MONTH", "value": 6 },
    "frequency": { "unit": "HOUR", "value": 1 },
    "purpose": "103"
  }
}
```
- `fetchType`: ONETIME | PERIODIC. Periodic max typically **1/hour** (FIU-side caps apply).
- `dataRange`: how far back transactions go (FIPs commonly serve 12–24+ months; varies by FIP).
- `dataLife`: how long the FIU may retain (DAY/MONTH/YEAR/INF).
- Purpose codes 101–105 (101 wealth mgmt, 102 spend analysis, 103 statement aggregation, 104 monitoring, 105 one-time check).

### Illustrative post-consent FI payload (deposit, per ReBIT schema)
```json
{
  "account": {
    "type": "deposit", "maskedAccNumber": "XXXXXXXX4321",
    "version": "1.2", "linkedAccRef": "REF-001",
    "profile": { "holders": { "type": "SINGLE", "holder": {
      "name": "Ravi Kumar", "dob": "1994-03-12", "mobile": 9199999999,
      "pan": "ABCDE1234F", "email": "ravi@x.com",
      "nominee": "REGISTERED", "ckycCompliance": true } } },
    "summary": {
      "type": "SAVINGS", "currentBalance": "54210.75",
      "balanceDateTime": "2026-07-08T09:30:00+05:30",
      "branch": "MG Road", "ifscCode": "HDFC0000123", "micrCode": "560240002",
      "openingDate": "2021-04-15", "status": "ACTIVE",
      "facility": "OD", "drawingLimit": "0", "currency": "INR",
      "pending": { "amount": 0 } },
    "transactions": { "startDate": "2025-07-01", "endDate": "2026-07-08",
      "transaction": [{
        "txnId": "TXN123", "type": "CREDIT", "mode": "UPI",
        "amount": 25000.0, "currentBalance": "54210.75",
        "transactionTimestamp": "2026-07-05T18:22:10+05:30",
        "valueDate": "2026-07-05", "narration": "UPI/SALARY/JUL", "reference": "" }] }
  }
}
```
Delivery mechanics: FIU raises `FI/request` against the consent → FIP encrypts data end-to-end (Diffie-Hellman key exchange per ReBIT crypto spec) → FIU pulls via `FI/fetch` and decrypts. XML or JSON per the same schema (e.g. Setu FIP offers both; format chosen in the data-session call).

---

## 2. OCEN 4.0 — protocol, not a data warehouse

OCEN (ocen.dev, iSPIRT) standardises the **LSP/Loan-Agent ↔ Lender** interaction for cash-flow lending. It does not itself hold borrower financial data; underwriting data arrives via **AA** and **Derived Data Providers (DDPs)**.

**4.0 roles:** Borrower, **Loan Agent (LA)** (creates/manages Product Networks), Lender (creates Products), DDP (derived data for underwriting), Disbursement Partner, Collections Partner, KYC partners; **Participant Registry + Product Registry** maintained by SROs.

**Open JSON Schemas (draft-07)** — repo mirrors of the iSPIRT spec (e.g. github.com/karthikiyerks/OCEN → `Core/schema/Version 0.0.1/`): `borrower.json, applicant.json, loanApplication.json, offer.json, loanOffer.json, loanterms.json, kyc.json, consent.json, disbursement.json, repayment.json, collateral.json, guarantor.json, document.json, address.json, contactdetails.json, creditscoretype.json, extensibleData.json …`

Key objects:
- **borrower**: `primaryId` + `primaryIdType (PAN|MOBILE|AADHAAR)`, `category (INDIVIDUAL|ORGANIZATION)`, `contactDetails[]`, `additionalIdentifiers[]`, `documents[]`, `extensibleData`
- **loanApplication**: `loanApplicationId`, `loanApplicationStatus (PROCESSING|OFFERED|OFFER_ACCEPTED|GRANTED|REJECTED)`, `offers`, `actionRequired`, `rejectionDetails`
- API groups in the spec: Consent, KYC, Loan Application, Offers, Loan Acceptance, Grant Loan, Disbursement, Repayment, Dispute Management, Meta APIs.

---

## 3. ULI — RBIH's "one pipe" into 136+ data services

**Operator:** Reserve Bank Innovation Hub (RBIH). Scale as of **12 Dec 2025**: **64 lenders** (41 banks + 23 NBFCs), **136+ data services**, **12 loan journeys** (up from ~50 services / 36 lenders a year earlier).

**Service catalogue (rbih.tech developer portal):**
| Category | Services / providers |
|---|---|
| Identity & KYC | Aadhaar eKYC (UIDAI/NPCI), PAN validation (NSDL/ITD), Driving Licence, Voter ID, Vehicle RC, Facematch, CKYC |
| Documents | DigiLocker pull, e-Sign, e-Stamp |
| Land & property | Digitised land records from ~8–12 states (owner details, survey/parcel, **lien marking**), property search reports across multiple sources |
| Agri & rural | Satellite/geospatial analytics (farm/crop, irrigation reports), **dairy insights** (milk-pouring data, e.g. Aavin) for cattle/dairy loans |
| Financial | Account Aggregator gateway, GSTN, credit bureaus, BBPS, credit-guarantee (e.g. CGTMSE) |
| Utility | Transliteration (vernacular records → lender language) |

**Delivery:** standardised REST APIs (OpenAPI), JSON responses; OAuth2 + mTLS; JWT tokens (6h sandbox / 12h production); parallel fan-out to sources with sub-second aggregated response. Access is **restricted to onboarded regulated lenders** (joinuli.rbihub.in) — the field-level API specs are behind the portal login, unlike ReBIT/OCEN which are fully public.

---

## Relevance to NTB/NTC Financial Health Score

1. **AA is the primary signal source**: bank deposit transactions (income proxy, cash-flow features), GSTR1_3B (small-business income), MF/equity/NPS/insurance holdings (asset side) — all consented, all schema-stable JSON/XML.
2. **NTC users often have no bureau file but do have a bank account** → AA DEPOSIT transactions + UPI narrations are the workable substrate.
3. **PERIODIC consent (hourly/daily)** enables ongoing score refresh, bounded by `consentExpiry` and `dataLife`.
4. **ULI matters if you partner with a lender** — it bundles the verification + alternate data (land, dairy, satellite) that pure-AA can't give, but it isn't publicly integrable.
5. **OCEN matters at distribution time** — package the score as a DDP (Derived Data Provider) inside an OCEN Product Network.

## Sources
- Sahamati — FI types live on AA: https://sahamati.org.in/data-fi-types-available-on-aa/
- Sahamati — GSTN schema announcement: https://sahamati.org.in/rebit-publishes-gstn-data-schema-for-the-account-aggregator-framework/
- ReBIT AA schema portal: https://specifications.rebit.org.in/ (deposit: /api_schema/account_aggregator/documentation/deposit.html)
- Setu AA docs (FI data types, consent object): https://docs.setu.co/data/account-aggregator/fi-data-types
- OCEN 4.0: https://ocen.dev/docs/ocen_4_0/ ; roles: https://ocen.dev/docs/participant_roles/
- OCEN JSON schemas (spec mirror): https://github.com/karthikiyerks/OCEN
- RBIH ULI docs: https://docs.rbihub.in/unified-lending-interface ; dev portal: https://rbih.tech/docs/intro
- Medianama (ULI scale, Dec 2025): https://www.medianama.com/2026/01/223-unified-lending-interface-64-lenders-136-data-services/
- Business Standard (ULI lender count): https://www.business-standard.com/finance/news/lenders-onboarded-on-uli-rises-to-64-from-36-last-year-125122900906_1.html
