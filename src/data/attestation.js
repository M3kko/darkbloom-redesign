// Mock attestation / verification content (strings lifted from console-ui).

export const guarantees = [
  {
    key: 'identity',
    title: 'Hardware Identity',
    body: 'A P-256 key generated inside the Secure Enclave proves this is a genuine Apple Silicon Mac — the key can never leave the chip.',
    glyph: '⚿',
  },
  {
    key: 'integrity',
    title: 'Software Integrity',
    body: "The inference software hasn't been modified. SIP, Secure Boot and an authenticated root volume are enforced and attested.",
    glyph: '✓',
  },
  {
    key: 'data',
    title: 'Data Protection',
    body: 'Your prompts are encrypted end-to-end and only decrypted inside the verified provider — the operator never sees plaintext.',
    glyph: '⚷',
  },
  {
    key: 'tamper',
    title: 'Anti-Tampering',
    body: 'No process can attach to or inspect memory during inference. Hardened Runtime and PT_DENY_ATTACH are active.',
    glyph: '∎',
  },
]

export const explainerSteps = [
  {
    title: 'Apple Hardware',
    body: 'Your request is processed on a real Apple Silicon Mac, verified by Apple.',
    detail: 'The device presents a Managed Device Attestation (MDA) certificate chaining to the Apple Root CA, proving genuine hardware.',
  },
  {
    title: 'Secure Enclave',
    body: "The machine's identity key is sealed in a tamper-proof chip and can't be extracted.",
    detail: 'A P-256 keypair is generated inside the Secure Enclave (kSecAttrTokenIDSecureEnclave). The private key never exists outside the SE.',
  },
  {
    title: 'Apple Certificate',
    body: "Apple's certificate authority confirms this specific device's identity.",
    detail: 'The MDA leaf certificate is verified against Apple Enterprise Attestation Root CA (OID 1.2.840.113635.100.8.x).',
  },
  {
    title: 'End-to-End Encryption',
    body: 'Your prompts are encrypted before leaving your browser and only decrypted on verified hardware.',
    detail: 'X25519 NaCl Box seals each request to the provider Secure Enclave public key. The coordinator re-seals inside its TEE.',
  },
  {
    title: 'Continuous Verification',
    body: 'The machine is re-verified every 5 minutes — stale providers stop receiving traffic.',
    detail: 'A signed challenge/response refreshes the attestation. challenge_max_age_seconds gates routing.',
  },
]

// Technical attestation receipt for a sample provider.
export const receipt = {
  chip: 'Apple M3 Ultra',
  machine: 'Mac15,14',
  serial: 'F7K…3J',
  serialFull: 'F7KQW2X9LM3J',
  macos: '15.2 (24C101)',
  sepos: '15.2',
  trust: 'Hardware',
  secureEnclave: true,
  sip: true,
  secureBoot: true,
  authRoot: true,
  ptDenyAttach: true,
  hardenedRuntime: true,
  certCount: 3,
  challenge: '2m ago',
  sePublicKey: '04:a1:e7:22:bd:9f:3c:c4:1b:88:0d:6e:f2:34:5a:91:…',
  seSignature: '30:45:02:21:00:9f:3c:a1:e7:22:bd:4f:…:02:20:6e',
  responseHash: 'sha256:9f3c·a1e7·22bd·c41b·880d·6ef2·345a·9100',
  volumeHash: 'sha256:1f8e·77ac·b3d2·…',
}

export const verifySteps = [
  'Fetching attestation chain…',
  'Parsing MDA leaf certificate…',
  'Verifying chain to Apple Root CA…',
  'Checking Secure Enclave key binding…',
  'Validating challenge freshness…',
  'Attestation verified ✶',
]
