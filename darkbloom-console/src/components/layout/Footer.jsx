export default function Footer() {
  return (
    <footer className="ftr">
      <div className="ftr__inner shell">
        <div className="ftr__brand">
          <span className="brand__mark" aria-hidden>✶</span>
          <span className="ftr__word">DARKBLOOM</span>
        </div>
        <p className="ftr__tag mono dim">
          Private inference on hardware-verified Apple Silicon. Encrypted in, verified out.
        </p>
        <div className="ftr__attest mono dim tnum">
          <span>SEED: 3573860127</span>
          <span className="ftr__sep" aria-hidden>·</span>
          <span className="blue">ATTEST OK</span>
          <span className="ftr__sep" aria-hidden>·</span>
          <span>sha256:9f3c·a1e7·22bd·…</span>
          <span className="ftr__end" aria-hidden>∎</span>
        </div>
      </div>
    </footer>
  )
}
