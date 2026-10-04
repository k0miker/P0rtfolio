import { buildLlmsTxt } from "../data/llms.js";

export const GET = () =>
  new Response(buildLlmsTxt("v1"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
