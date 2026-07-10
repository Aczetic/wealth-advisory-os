/* Language-model integration interface — external generation not implemented.
   Production architecture (D4/SEBI AI-ML): the LLM explains and converses;
   it NEVER computes advice. All numbers come from engine.js tool calls.
   The current application uses predefined conversation workflows.

   async generate({system, messages, tools}) -> string|null
   Returning null tells app.js to use the scripted response. */
const LLM = {
  endpoint: null,   // e.g. bank-VPC Claude/Bedrock endpoint later
  async generate(_req) {
    if (!this.endpoint) return null;      // PoC: scripted flows
    // fetch(this.endpoint, ...) — external endpoint integration not implemented
    return null;
  },
};
