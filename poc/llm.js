/* Pluggable LLM interface — STUB by design.
   Production architecture (D4/SEBI AI-ML): the LLM explains and converses;
   it NEVER computes advice. All numbers come from engine.js tool calls.
   In this keyless PoC every flow is scripted; wire an endpoint here later.

   async generate({system, messages, tools}) -> string|null
   Returning null tells app.js to use the scripted response. */
const LLM = {
  endpoint: null,   // e.g. bank-VPC Claude/Bedrock endpoint later
  async generate(_req) {
    if (!this.endpoint) return null;      // PoC: scripted flows
    // fetch(this.endpoint, ...) — deliberately not implemented in keyless PoC
    return null;
  },
};
