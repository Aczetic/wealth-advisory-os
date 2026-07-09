# ui/

Design references and prototypes for the customer-facing **Converse** screen (the heart of
the product — the moment a customer is talking to their wealth companion).

## Files
- `design-brief.md` — context brief: what the product is, who it's for, the feeling to aim for.
- `design_handoff_wealth_companion/` — the **high-fidelity design handoff** (tokens, layout,
  the two signature animations, the SIP calc). See its own `README.md`. The `.dc.html` is a
  design reference; `support.js` / `image-slot.js` are prototype runtime — not to be ported.
- `wealth-companion-mock.html` — **interactive mock** (self-contained, opens in any browser).
  The design handoff brought to life with the real conversation script: the "why I'm
  suggesting this" working-notes strip (ticking checklist → collapsible ✓ pill), live invest
  simulator (slider + term pills recompute), card carousel, and voice mode (reactive wave).

## Note
Entrance animations and the voice wave run via CSS animation / `requestAnimationFrame` — open
`wealth-companion-mock.html` in a **real browser** to see them; embedded preview panels that
background the tab freeze animations at frame 0 (the logic still runs).
