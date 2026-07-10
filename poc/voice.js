/* Voice layer — browser Web Speech API.
   TTS: speechSynthesis with hi-IN/en-IN preference (Hinglish reads fine).
   STT: webkitSpeechRecognition if available; UI hides mic otherwise.
   Voice-note interaction model per research-avatar-spec-patterns.md:
   short spoken replies (~15-30s), text carries the detail. */
const Voice = {
  enabled: true, voice: null, rec: null, onResult: null,

  init() {
    if (!('speechSynthesis' in window)) { this.enabled = false; return; }
    const pick = () => {
      const vs = speechSynthesis.getVoices();
      this.voice = vs.find(v => v.lang === 'hi-IN') ||
                   vs.find(v => v.lang === 'en-IN') ||
                   vs.find(v => v.lang.startsWith('en')) || vs[0] || null;
    };
    pick(); speechSynthesis.onvoiceschanged = pick;

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      this.rec = new SR();
      this.rec.lang = 'en-IN'; this.rec.interimResults = false;
      this.rec.onresult = e => this.onResult && this.onResult(e.results[0][0].transcript);
      this.rec.onend = () => document.getElementById('mic')?.classList.remove('active');
    }
  },

  speak(text) {
    if (!this.enabled || !('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (this.voice) u.voice = this.voice;
    u.rate = 1.02; u.pitch = 1.05;
    u.onstart = () => Avatar.setTalking(true);
    u.onend = () => Avatar.setTalking(false);
    u.onerror = () => Avatar.setTalking(false);
    speechSynthesis.speak(u);
  },

  stop() { if ('speechSynthesis' in window) speechSynthesis.cancel(); Avatar.setTalking(false); },

  listen() {
    if (!this.rec) return alert('Voice input not supported in this browser — use chips/text.');
    document.getElementById('mic')?.classList.add('active');
    this.rec.start();
  },
};
