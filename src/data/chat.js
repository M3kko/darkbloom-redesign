// Chat mock data — models for the selector, suggested prompts, canned replies.

export const chatModels = [
  { id: 'gpt-oss-20b', name: 'gpt-oss 20b', quant: 'fp8', vision: false },
  { id: 'gemma-4-26b', name: 'gemma 4 26b', quant: '4bit', vision: true },
  { id: 'qwen-2.5-32b', name: 'qwen 2.5 32b', quant: '4bit', vision: false },
  { id: 'llama-3.1-8b', name: 'llama 3.1 8b', quant: 'fp16', vision: false },
]

export const suggestedPrompts = [
  'Explain zero-knowledge proofs',
  'Write a Python script to tail a log',
  'Compare ML inference frameworks',
  'How does Secure Enclave attestation work?',
]

// A canned thinking trace + answer, streamed token-by-token.
export const cannedReply = {
  thinking:
    "The user is asking about how Darkbloom keeps prompts private. I should explain the trust chain at a high level: Secure Enclave identity, MDA attestation to Apple Root CA, end-to-end encryption, and continuous re-verification. Keep it concrete and avoid crypto-jargon overload.",
  answer: `Your prompt never leaves your device as plaintext. Here's the path it takes:

1. **Sealed on your machine** — the request is encrypted with the provider's Secure Enclave public key (X25519 NaCl box) before it leaves your browser.
2. **Routed by the coordinator** — running inside a TEE, it picks an online, attested provider and re-seals to that node.
3. **Decrypted only on verified hardware** — the provider proves it's a genuine Apple Silicon Mac via a Managed Device Attestation chain to the Apple Root CA.

\`\`\`python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.darkbloom.dev/v1",
    api_key="<your-key>",
)
resp = client.chat.completions.create(
    model="gpt-oss-20b",
    messages=[{"role": "user", "content": "Hello, verified world"}],
    stream=True,
)
\`\`\`

Every response header carries the provider's attestation metadata, so you can independently verify the hardware that served you. ∎`,
}
