/* Asha — 2D SVG avatar (lightweight rig per D3: no photoreal, no heavy deps).
   States: idle (blink + float via CSS), talking (mouth animates). */
const Avatar = {
  svg() {
    return `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" id="asha">
  <!-- hair back -->
  <ellipse cx="100" cy="96" rx="62" ry="66" fill="#2a1e16"/>
  <!-- face -->
  <ellipse cx="100" cy="100" rx="50" ry="56" fill="#e8b98a"/>
  <!-- hair front -->
  <path d="M50 92 Q52 38 100 36 Q148 38 150 92 Q140 62 100 58 Q60 62 50 92Z" fill="#2a1e16"/>
  <!-- bun -->
  <circle cx="100" cy="34" r="14" fill="#2a1e16"/>
  <!-- ears + earrings -->
  <circle cx="50" cy="104" r="7" fill="#e8b98a"/><circle cx="150" cy="104" r="7" fill="#e8b98a"/>
  <circle cx="50" cy="113" r="3" fill="#f5c542"/><circle cx="150" cy="113" r="3" fill="#f5c542"/>
  <!-- brows -->
  <path d="M70 88 Q79 84 88 88" stroke="#3a2a1d" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M112 88 Q121 84 130 88" stroke="#3a2a1d" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- eyes -->
  <g class="eye" style="transform-origin:79px 99px"><ellipse cx="79" cy="99" rx="6.5" ry="7.5" fill="#fff"/>
    <circle cx="79" cy="100" r="3.6" fill="#33231a"/><circle cx="80.5" cy="98.5" r="1.2" fill="#fff"/></g>
  <g class="eye" style="transform-origin:121px 99px"><ellipse cx="121" cy="99" rx="6.5" ry="7.5" fill="#fff"/>
    <circle cx="121" cy="100" r="3.6" fill="#33231a"/><circle cx="122.5" cy="98.5" r="1.2" fill="#fff"/></g>
  <!-- bindi + nose -->
  <circle cx="100" cy="86" r="2.4" fill="#b3382c"/>
  <path d="M100 104 Q97 112 101 114" stroke="#c99b6d" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- mouth -->
  <ellipse class="mouth" cx="100" cy="128" rx="11" ry="4" fill="#a3442f"/>
  <!-- blush -->
  <ellipse cx="70" cy="115" rx="7" ry="4" fill="#e59a76" opacity=".5"/>
  <ellipse cx="130" cy="115" rx="7" ry="4" fill="#e59a76" opacity=".5"/>
  <!-- saree collar -->
  <path d="M58 158 Q100 138 142 158 L142 200 L58 200 Z" fill="#00836c"/>
  <path d="M92 150 L100 168 L108 150" fill="#f5821f"/>
</svg>`;
  },
  setTalking(on) {
    const stage = document.querySelector('.avatar-stage');
    const panel = document.querySelector('.avatar-panel');
    if (!stage) return;
    stage.classList.toggle('talking', on);
    panel.classList.toggle('speaking', on);
  },
};
