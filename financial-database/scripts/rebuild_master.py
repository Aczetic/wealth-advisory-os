#!/usr/bin/env python3
"""Regenerate the full field inventory: AA + OCEN parsers, then merge with ULI into the master CSV."""
import csv
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
INV = os.path.join(ROOT, "field-inventory")

subprocess.run([sys.executable, os.path.join(HERE, "parse_fi_schemas.py")], check=True)
subprocess.run([sys.executable, os.path.join(HERE, "parse_ocen_schemas.py")], check=True)

SOURCES = [
    ("aa_fields.csv", "Sahamati/account-aggregator-standards + specifications.rebit.org.in"),
    ("ocen_fields.csv", "github.com/karthikiyerks/OCEN (iSPIRT spec mirror)"),
    ("uli_fields.csv", "rbih.tech/docs (indicative; spec gated behind onboarding)"),
]
COLS = ["rail", "source_schema", "section_path", "field", "kind", "data_type",
        "allowed_values", "pattern", "required", "description", "spec_source"]

rows = []
for fn, src in SOURCES:
    with open(os.path.join(INV, fn)) as f:
        for r in csv.DictReader(f):
            r["spec_source"] = src
            rows.append(r)

out = os.path.join(INV, "MASTER_field_inventory.csv")
with open(out, "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=COLS)
    w.writeheader()
    w.writerows(rows)
print(f"{len(rows)} rows -> {out}")
