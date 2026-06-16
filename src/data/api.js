// API console — endpoints + code samples (content lifted from console-ui).

export const baseUrl = 'https://api.darkbloom.dev/v1'

export const endpoints = [
  {
    method: 'POST',
    path: '/v1/chat/completions',
    desc: 'Stream or generate chat completions (OpenAI-compatible)',
    auth: true,
    request: `{
  "model": "gpt-oss-20b",
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Hello!" }
  ],
  "stream": true,
  "max_tokens": 1024
}`,
    response: `{
  "id": "chatcmpl-…",
  "object": "chat.completion.chunk",
  "model": "gpt-oss-20b",
  "choices": [{ "index": 0, "delta": { "role": "assistant", "content": "Hello" }, "finish_reason": null }]
}`,
    note: 'Streaming (SSE) and non-streaming supported. Response headers carry provider attestation (x-provider-attested, x-provider-trust-level, x-provider-chip).',
  },
  {
    method: 'POST',
    path: '/v1/responses',
    desc: 'Create a model response (OpenAI Responses API)',
    auth: true,
    request: `{
  "model": "gpt-oss-20b",
  "input": "Explain attestation in one sentence."
}`,
    response: `{ "id": "resp_…", "output": [{ "type": "message", "content": [{ "type": "output_text", "text": "…" }] }] }`,
    note: "Accepts 'input' (string or array) instead of 'messages'.",
  },
  {
    method: 'GET',
    path: '/v1/models',
    desc: 'List models with provider coverage and pricing',
    auth: true,
    response: `{
  "object": "list",
  "data": [{
    "id": "gpt-oss-20b",
    "context_length": 131072,
    "quantization": "fp8",
    "pricing": { "prompt": 50000, "completion": 200000 },
    "metadata": { "trust_level": "hardware", "provider_count": 101 }
  }]
}`,
    note: 'Darkbloom-native fields (trust_level, provider_count) live under metadata.',
  },
  {
    method: 'GET',
    path: '/v1/stats',
    desc: 'Platform statistics: providers, models, request counts',
    auth: false,
    response: `{
  "providers_online": 160,
  "providers_total": 198,
  "models_available": 5,
  "requests_24h": 420200,
  "tokens_24h": 1624500000,
  "attested_providers": 144
}`,
  },
  {
    method: 'GET',
    path: '/v1/providers/attestation',
    desc: 'Full attestation chain for all online providers',
    auth: false,
    response: `[{
  "id": "78970bc9…",
  "chip": "Apple M3 Ultra",
  "trust_level": "hardware",
  "secure_enclave": true,
  "mda_verified": true,
  "attestation_cert_chain": ["-----BEGIN CERTIFICATE-----", "…"]
}]`,
    note: 'Public — no auth. Independently verify genuine Apple hardware + Secure Enclave attestation.',
  },
  {
    method: 'GET',
    path: '/v1/pricing',
    desc: 'Current pricing for all models (per million tokens)',
    auth: false,
    response: `{ "prices": [{ "model": "gpt-oss-20b", "input_usd": "$0.05", "output_usd": "$0.20" }] }`,
  },
  {
    method: 'GET',
    path: '/v1/payments/balance',
    desc: 'Check your account balance',
    auth: true,
    response: `{ "balance_micro_usd": 5000000, "balance_usd": 5.00 }`,
  },
  {
    method: 'GET',
    path: '/v1/payments/usage',
    desc: 'Per-request usage and cost history',
    auth: true,
    response: `{ "usage": [{ "request_id": "req_…", "model": "gpt-oss-20b", "prompt_tokens": 12, "completion_tokens": 240, "cost_micro_usd": 52 }] }`,
  },
]

export const quickStart = [
  {
    label: 'cURL',
    filename: 'request.sh',
    code: `curl https://api.darkbloom.dev/v1/chat/completions \\
  -H "Authorization: Bearer $DARKBLOOM_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-oss-20b",
    "messages": [{ "role": "user", "content": "Hello, verified world" }],
    "stream": true
  }'`,
  },
  {
    label: 'Python',
    filename: 'main.py',
    code: `# pip install openai
from openai import OpenAI

client = OpenAI(
    base_url="https://api.darkbloom.dev/v1",
    api_key="<your-key>",
)
stream = client.chat.completions.create(
    model="gpt-oss-20b",
    messages=[{"role": "user", "content": "Hello, verified world"}],
    stream=True,
)
for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="")`,
  },
  {
    label: 'TypeScript',
    filename: 'index.ts',
    code: `// npm install openai
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.darkbloom.dev/v1",
  apiKey: process.env.DARKBLOOM_KEY,
});

const stream = await client.chat.completions.create({
  model: "gpt-oss-20b",
  messages: [{ role: "user", content: "Hello, verified world" }],
  stream: true,
});
for await (const part of stream) process.stdout.write(part.choices[0]?.delta?.content ?? "");`,
  },
  {
    label: 'Vercel AI SDK',
    filename: 'route.ts',
    code: `// npm install ai @ai-sdk/openai-compatible
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { streamText } from "ai";

const darkbloom = createOpenAICompatible({
  name: "darkbloom",
  baseURL: "https://api.darkbloom.dev/v1",
  apiKey: process.env.DARKBLOOM_KEY,
});

const { textStream } = await streamText({
  model: darkbloom("gpt-oss-20b"),
  prompt: "Hello, verified world",
});`,
  },
]
