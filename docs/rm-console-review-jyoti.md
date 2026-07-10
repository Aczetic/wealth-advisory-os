# RM Console Design Review

Lead prioritisation considerations for `poc/rm.html`, based on an RM managing a large customer book.

## Missing

1. **Lead prioritization.** Queue is a flat list today (verified: no priority
   concept in rm.html). RM needs high/low priority on each lead, driven by:
   - **wait time** — how long the customer has been waiting / promised call-back SLA
   - **problem type** — distress (panic-sell, cash crunch) outranks curiosity
     (stock question); maps to the escalation triggers in
     `brainstorm-prep-jyoti.md` §4
   - **customer value / tier** — affluent-tier leads surface first (lead-gen logic)
   - **vulnerability flag** — pensioner + large decision jumps the queue
   Simple v1: three bands (🔴 now / 🟡 today / ⚪ this week), queue sorted by band
   then wait time.
