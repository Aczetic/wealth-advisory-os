#!/usr/bin/env python3
"""Flatten OCEN JSON Schemas (local clone of iSPIRT spec mirror) into a field inventory CSV."""
import csv
import glob
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = os.path.join(ROOT, "source-specs", "ocen-spec", "Core", "schema", "Version 0.0.1")
OUT = os.path.join(ROOT, "field-inventory", "ocen_fields.csv")


def flatten(obj_name, schema, rows):
    req = set(schema.get("required", []))
    for fname, spec in (schema.get("properties") or {}).items():
        ref = spec.get("$ref", "")
        ftype = spec.get("type", "")
        enums = spec.get("enum", [])
        if ftype == "array":
            items = spec.get("items", {})
            ref = items.get("$ref", ref)
            enums = items.get("enum", enums)
            inner = items.get("type") or (ref.rsplit("/", 1)[-1].replace(".json", "") if ref else "object")
            ftype = f"array<{inner}>"
        elif ref:
            ftype = f"object:{ref.rsplit('/', 1)[-1].replace('.json', '')}"
        rows.append({
            "rail": "OCEN 4.0",
            "source_schema": obj_name,
            "section_path": obj_name,
            "field": fname,
            "kind": "property",
            "data_type": ftype,
            "allowed_values": "|".join(map(str, enums)),
            "pattern": "",
            "required": "yes" if fname in req else "no",
            "description": " / ".join(map(str, spec.get("examples", [])))[:120],
        })


def main():
    rows = []
    for fp in sorted(glob.glob(os.path.join(BASE, "*.json"))):
        name = os.path.basename(fp).replace(".json", "")
        try:
            schema = json.load(open(fp))
        except Exception as e:
            print(f"skip {name}: {e}")
            continue
        flatten(name, schema, rows)
    with open(OUT, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)
    print(f"{len(rows)} fields -> {OUT}")


if __name__ == "__main__":
    main()
