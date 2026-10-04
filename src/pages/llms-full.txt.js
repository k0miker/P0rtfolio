import { buildLlmsFullTxt } from "../data/llms.js";

export const GET = () =>
  new Response(buildLlmsFullTxt("v1"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
