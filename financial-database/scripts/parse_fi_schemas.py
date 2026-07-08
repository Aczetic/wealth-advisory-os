#!/usr/bin/env python3
"""Parse ReBIT AA FI-type XSD schemas into a flat field inventory CSV."""
import csv
import glob
import os
import re
import xml.etree.ElementTree as ET

XS = "{http://www.w3.org/2001/XMLSchema}"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = os.path.join(ROOT, "source-specs", "sahamati-aa-standards", "schemas")
OUT = os.path.join(ROOT, "field-inventory", "aa_fields.csv")


def doc_of(node):
    d = node.find(f"{XS}annotation/{XS}documentation")
    if d is not None and d.text:
        return re.sub(r"\s+", " ", d.text).strip()
    return ""


def parse_xsd(path, fi_type, rows):
    tree = ET.parse(path)
    root = tree.getroot()

    # index global simpleTypes -> enum/pattern info
    simple = {}
    for st in root.findall(f"{XS}simpleType"):
        name = st.get("name")
        r = st.find(f"{XS}restriction")
        info = {"base": "", "enums": [], "pattern": ""}
        if r is not None:
            info["base"] = (r.get("base") or "").replace("xs:", "")
            info["enums"] = [e.get("value") for e in r.findall(f"{XS}enumeration")]
            p = r.find(f"{XS}pattern")
            if p is not None:
                info["pattern"] = p.get("value") or ""
        simple[name] = info

    # index global elements
    gelems = {e.get("name"): e for e in root.findall(f"{XS}element")}

    def type_info(tname):
        if not tname:
            return "", "", ""
        short = tname.split(":")[-1]
        if short in simple:
            s = simple[short]
            base = s["base"] or short
            return base, "|".join(s["enums"]), s["pattern"]
        return short, "", ""

    def emit(path_str, name, kind, tname, required, description):
        dtype, enums, pattern = type_info(tname)
        rows.append({
            "rail": "AA (Account Aggregator)",
            "source_schema": fi_type,
            "section_path": path_str,
            "field": name,
            "kind": kind,
            "data_type": dtype,
            "allowed_values": enums,
            "pattern": pattern,
            "required": required,
            "description": description,
        })

    def walk(elem, path_str, depth, seen):
        if depth > 8:
            return
        ct = elem.find(f"{XS}complexType")
        if ct is None:
            return
        # attributes = leaf fields (own attributes only — stop at nested xs:element)
        def own_attributes(node):
            found = []
            for child in node:
                if child.tag == f"{XS}element":
                    continue
                if child.tag == f"{XS}attribute":
                    found.append(child)
                else:
                    found.extend(own_attributes(child))
            return found

        for att in own_attributes(ct):
            req = "yes" if att.get("use") == "required" else "no"
            emit(path_str, att.get("name"), "attribute", att.get("type"),
                 req, doc_of(att))
        # child elements
        for seq in ct.findall(f"{XS}sequence") + ct.findall(f".//{XS}choice"):
            for ch in seq.findall(f"{XS}element"):
                ref = ch.get("ref")
                if ref:
                    rname = ref.split(":")[-1]
                    tgt = gelems.get(rname)
                    if tgt is None or rname in seen:
                        continue
                    child_path = f"{path_str}.{rname}"
                    if tgt.find(f"{XS}complexType") is not None:
                        walk(tgt, child_path, depth + 1, seen | {rname})
                    else:
                        emit(path_str, rname, "element", tgt.get("type"),
                             "yes" if ch.get("minOccurs", "1") != "0" else "no",
                             doc_of(tgt) or doc_of(ch))
                else:
                    name = ch.get("name")
                    req = "yes" if ch.get("minOccurs", "1") != "0" else "no"
                    if ch.find(f"{XS}complexType") is not None:
                        walk(ch, f"{path_str}.{name}", depth + 1, seen)
                    else:
                        emit(path_str, name, "element", ch.get("type"), req, doc_of(ch))

    root_elem = gelems.get("Account") or next(iter(gelems.values()), None)
    if root_elem is None:
        return
    walk(root_elem, "Account", 0, {"Account"})


def main():
    rows = []
    for xsd in sorted(glob.glob(os.path.join(BASE, "*", "*.xsd"))):
        fi_type = os.path.basename(os.path.dirname(xsd))
        parse_xsd(xsd, fi_type, rows)
    with open(OUT, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)
    print(f"{len(rows)} fields -> {OUT}")
    # quick per-type counts
    from collections import Counter
    for t, c in sorted(Counter(r["source_schema"] for r in rows).items()):
        print(f"  {t:35} {c}")


if __name__ == "__main__":
    main()
