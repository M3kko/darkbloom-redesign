# Darkbloom Design System

**v1.2 · Eigen Labs · 2026**

The visual language for Darkbloom — private inference on hardware-verified Apple Silicon. The system is built on one idea: **encrypted in, verified out.** A request enters as ciphertext the operator can't read and leaves as a hardware-attested result. That moment of verification is the only thing the design celebrates — everything else stays quiet.

Three influences are fused deliberately: the **editorial type and flat electric blue** of the Nous / Hermes world, the **structural discipline** of the Vercel console (hairline borders, generous space, sharp focus), and the **refined data surfaces** of Resend (logs, IDs, status rows in monospace).

This document is the canonical reference. An interactive version of every token, state and component ships as the companion React artifact.

---

## 1. Principles

1. **One blue, nothing else.** A single ultramarine is the only chromatic accent in the entire system. No gradients, no green/amber/red. Status and severity are carried by neutral weight, not by hue.
2. **Editorial headline, machine body.** A thin high-contrast serif handles display; a monospace handles every label, number, ID and line of body. The tension between the two is the personality.
3. **Flat, not glowing.** Surfaces are crisp and flat. The only blue "spread" allowed is a focus ring and a single restrained verify highlight.
4. **Structure is information.** Numbered sections, eyebrows and diagnostic strings (`SEED:`, `OUTPUT`, `sha256:…`) are real artifacts of attestation, not decoration.
5. **Spend boldness once.** The bloom — the verified moment — is the one expressive element. Everything around it is disciplined.

---

## 2. Color

Darkbloom is monochrome-blue. The palette is **four blues plus a cool-neutral scale**. The blue never doubles as a neutral, and neutrals never tint toward warm.

### 2.1 The blue ramp

Four stops only. `blue-600` is primary and appears on every accent: buttons, links, focus rings, the bloom, verified status.

| Token | Hex | Role |
|---|---|---|
| `blue-100` | `#DBE1FF` | Tint fills — badge backgrounds, avatars, soft surfaces |
| `blue-400` | `#4F66F2` | Light accent — primary on dark theme, hover lifts |
| `blue-600` ★ | `#1C39D6` | **Primary** — buttons, links, focus, the bloom |
| `blue-800` | `#142BA8` | Hover / active / text-on-tint |

> `blue-600` sits in the same family as the Nous / Hermes electric blue, tuned deeper so it reads premium rather than neon.

### 2.2 Surfaces (light — default)

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F5F6F8` | Page background |
| `--bg-1` | `#EEF0F3` | Recessed background |
| `--surface` | `#FFFFFF` | Cards, panels, inputs |
| `--surface-2` | `#FAFBFC` | Headers, code chrome |
| `--surface-3` | `#F1F3F6` | Inset wells, segmented track |
| `--hover` | `#F0F2F6` | Hover surface |
| `--press` | `#E7EAF0` | Pressed surface |

Borders are alpha-on-ink, never solid gray: `--line` `rgba(17,24,39,.10)` · `--line-2` `.15` · `--line-3` `.26`.

### 2.3 Text

| Token | Hex | Use |
|---|---|---|
| `--text-hi` | `#0E1117` | Primary readout, headings |
| `--text` | `#2B2F3A` | Body, values |
| `--text-mid` | `#5A6172` | Labels, secondary |
| `--text-dim` | `#8A91A1` | Captions, meta |
| `--text-faint` | `#C2C7D2` | Disabled, ghost, placeholders |

### 2.4 Status model — blue + neutral

There are **no semantic colors.** Positive states are blue; everything else is expressed through a neutral severity ladder.

| State | Treatment | Token |
|---|---|---|
| Verified / online / active | Filled blue dot, blue label | `--blue` |
| Degraded | Mid-neutral dot | `--text-mid` |
| Offline / idle | Faint-neutral dot | `--text-dim` |
| Fault / error | Strong-neutral dot, bold label | `--text-hi` |

> **Tradeoff to note:** because the system bans non-blue accents, error and destructive states do not use red. They rely on neutral weight, an outline, and explicit labels. This is intentional and on-brand; if a conventional red error affordance is ever needed for usability, it would be the single permitted exception and should be added as one functional token (`--danger`) rather than a full semantic set.

### 2.5 Dark theme

The system ships a dark theme on the same roles. Blue lifts for legibility on ink.

| Role | Light | Dark |
|---|---|---|
| `--bg` | `#F5F6F8` | `#0A0C12` |
| `--surface` | `#FFFFFF` | `#111521` |
| `--surface-2` | `#FAFBFC` | `#161B29` |
| `--blue` (primary) | `#1C39D6` | `#5470FF` |
| `--blue-hover` | `#142BA8` | `#6E86FF` |
| `--blue-tint` | `#DBE1FF` | `rgba(84,112,255,.14)` |
| `--text-hi` | `#0E1117` | `#EEF1FA` |
| `--text` | `#2B2F3A` | `#C5CBDA` |

Light is the default surface.

---

## 3. Typography

A two-face system: a thin, high-contrast serif for display and a plain monospace for everything technical.

### 3.1 Faces

| Role | Face | Notes |
|---|---|---|
| Display | **Fraunces**, weight 300, high optical size | Hero, section titles, wordmark, KPI numbers, type specimens. Set in **all caps** with light positive tracking. |
| Body · labels · data · code | **Geist Mono**, 400–600 | Eyebrows, labels, values, IDs, code, buttons, body copy. |

Fraunces is the freely-available stand-in for the licensed editorial serif used on the Hermes site (Editorial New / Reckless family). If the licensed face is available, it is a one-line swap at the `--serif` token. Geist Mono is Vercel's monospace, the same lineage the Hermes site runs on.

```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..600&family=Geist+Mono:wght@400;500;600&display=swap');

--serif: 'Fraunces', Georgia, 'Times New Roman', serif;
--mono:  'Geist Mono', ui-monospace, 'SF Mono', Menlo, monospace;
```

### 3.2 Display scale (Fraunces, uppercase)

| Step | Size | Weight | Tracking |
|---|---|---|---|
| Hero | `clamp(46px, 7.4vw, 94px)` | 300 | `+0.004em` |
| Section | `clamp(30px, 4.4vw, 52px)` | 300 | `+0.005em` |
| Card title | `24px` | 400 | `+0.01em` |
| Display number (KPI) | `42px` | 300 | `0` |

Caps require slight positive tracking; never apply negative tracking to the serif.

### 3.3 Mono scale (Geist Mono)

| Use | Size | Weight | Treatment |
|---|---|---|---|
| Eyebrow / section label | `11px` | 500 | uppercase, `+0.1em`, blue |
| Body / description | `13px` | 400 | sentence case, line-height 1.6–1.8 |
| Label (form, card) | `10px` | 500 | uppercase, `+0.06em`, `--text-mid` |
| Data / value | `11.5–13px` | 400–600 | `tabular-nums` for aligned figures |
| Button | `11px` | 500 | uppercase, `+0.07em` |

---

## 4. The Bloom — signature

The bloom marks the moment an encrypted request becomes a verified result.

- **Mark.** A generative 12-petal SVG bloom rendered in solid `--blue` with stepped petal opacity. Flat — no drop-shadow glow.
- **Focus ring.** Focus is always the blue, as a crisp 3px ring (`--blueglow`), never a generic outline.
- **Verify highlight.** When something is attested, it gets `--bloom-glow`: a 1px blue ring plus a subtle elevation lift — a quiet flag, not neon.
- **Rule: verification blooms.** The bloom and the verify highlight are reserved for genuine attestation/verification moments. Routine success does not bloom; it simply turns blue.

```css
--blueglow:  0 0 0 3px rgba(28,57,214,.18);                              /* focus ring */
--bloom-glow: 0 0 0 1px rgba(28,57,214,.6), 0 10px 28px -12px rgba(28,57,214,.30); /* verify */
```

---

## 5. Glyphs — diagnostic language

Borrowed from the instrument world the Nous tools live in. ASCII strings, status marks and real attestation artifacts double as ornament.

```
/\-_=+|<   ~:*-/   [ ATTEST ✶ OK ]   >_   sha256:9f3c·a1e7·22bd·…   ∎
```

| Glyph | Meaning |
|---|---|
| `✶` | bloom / verified moment |
| `✓` | verified |
| `●` `◐` `○` | online · degraded · offline |
| `⌘` | command |
| `↗` | external link |
| `∎` | end of record |
| `>_` | terminal |
| `≈` | stream |
| `⟶` | route |
| `⚿` | key |

---

## 6. Components

Every interactive surface ships five states: **default · hover · active · focus · disabled.** Focus is the blue ring; hover lifts or shifts surface; active presses; disabled drops to ~45% opacity.

### Buttons
Mono, uppercase, `+0.07em`, 38px tall, radius 6px.

| Variant | Default | Hover | Active |
|---|---|---|---|
| Primary | `--blue` fill, white text | `--blue-hover` + elevation lift | `--blue-hover`, scale 0.985 |
| Secondary | `--surface`, `--line-2` border | `--line-3` border, `--hover` bg | `--press` bg |
| Ghost | transparent, `--text-mid` | `--text-hi`, `--hover` bg | — |
| Destructive | transparent, neutral outline + label | `--hover` bg | — |

Loading uses a 13px spinner; destructive relies on label + outline (no red, per the blue-only rule).

### Fields
40px tall, mono 13px. Hover raises border to `--line-3`. Focus = `--blue` border + 3px blue ring. Error = `--text-hi` border + ring, error hint in `--text-hi`. Helper text in `--text-dim`.

### API key
Masked value + reveal + copy icon buttons; icon buttons go blue on hover.

### Toggles, checkbox, radio
All "on" states fill with solid `--blue` (no glow). Off states use `--surface-3` / `--line-3`.

### Tabs & segmented
Tabs: active label blue with a 2px solid blue underline. Segmented: active pill is `--surface` on a `--surface-3` track with `--sh1`.

### Status badges
Pill, mono uppercase, dot + label. Verified = blue tint bg + blue. Online = blue dot. Degraded / offline / fault use the neutral ladder (mid → faint → strong). Dots are flat.

### Code block
Header chrome (`--surface-2`) with file name and copy; body mono 12px / line-height 1.7. Syntax: keywords `--blue`, strings `--ok` (blue), function names `--text-hi` bold, comments `--text-dim`.

### Log / table row
Grid row, mono 11.5px, hover `--hover`. Latency in blue; verified hash prefixed `✓` in blue. Timestamp and token count in dim/mid neutral.

### Node row
Avatar tile (`--blue-tint`), id + meta, status badge, right-aligned tok/s in mono tabular.

### KPI
Mono uppercase label, large **serif** number (Fraunces 300), delta line (up = blue, down = neutral), inline sparkline stroked in `--blue`.

### Tooltip / toast / command palette
Tooltip: `--surface` + `--line-3` + `--sh2`. Toasts: neutral surface + `--sh3`; success mark blue, error mark neutral. Command palette: `--surface` panel, selected item on `--hover`, `⌘K` and shortcut chips in mono.

---

## 7. Motion

Restrained everywhere except the verify moment.

| Token | Curve | Use |
|---|---|---|
| `--ease` | `cubic-bezier(.2,.8,.2,1)` | Default UI transitions |
| `--ease-out` | `cubic-bezier(.16,1,.3,1)` | Reveals, entrances |
| `linear` | `linear` | Spinners only |

| Duration | Value | Use |
|---|---|---|
| `--d1` | 90ms | Micro (press, toggle knob) |
| `--d2` | 150ms | Standard (hover, color) |
| `--d3` | 240ms | Surface / theme change |
| `--d4` | 420ms | Bloom / reveal |

`prefers-reduced-motion` is honored — all animation and transition collapse to ~0ms.

---

## 8. Elevation

Flat-first. Four levels; light values shown.

| Level | Shadow | Use |
|---|---|---|
| `e0` | none | Inline, in-flow |
| `--sh1` | `0 1px 2px rgba(17,24,39,.07)` | Rows, knobs, segmented pill |
| `--sh2` | `0 6px 20px -8px rgba(17,24,39,.14)` | Cards, panels, hover lift |
| `--sh3` | `0 18px 48px -16px rgba(17,24,39,.20)` | Overlays, toasts, command palette |

---

## 9. Radius & spacing

**Radius** — tight and instrument-like. Pills are reserved for badges.

| Token | Value |
|---|---|
| `--r1` | 4px |
| `--r2` | 6px (buttons, inputs) |
| `--r3` | 8px (rows, wells) |
| `--r4` | 12px (cards) |
| `--r5` | 16px |
| `--r-pill` | 999px (badges only) |

**Spacing** — 4px base: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64`. Section rhythm ~78px. Content max-width 1180px, 24px gutters (16px on mobile).

---

## 10. Quality floor

- Responsive to mobile; grids collapse 4→2→1, the header nav hides below 880px.
- Visible keyboard focus on every interactive element (the blue ring).
- `prefers-reduced-motion` respected.
- Body text and labels target WCAG AA on their surface; `blue-600` on white is ~7:1.

---

## 11. Voice & copy

- Name things by what people control: "API key", "spend limit", "provider node" — not internal terms.
- Active voice, sentence case for prose; the button that says **Publish** produces a toast that says **Published**.
- Errors don't apologize and aren't vague: state what happened and how to fix it. *"Node-3a dropped attestation. Routing paused."*
- Empty states are an invitation to act, not a mood.
- Diagnostic strings (`SEED:`, `OUTPUT`, `ATTEST OK`, `sha256:…`) are used as real structure, sparingly.

---

## 12. Token reference (CSS)

```css
:root[data-theme="light"] {
  /* radius */
  --r1:4px; --r2:6px; --r3:8px; --r4:12px; --r5:16px; --r-pill:999px;

  /* type */
  --serif:'Fraunces',Georgia,serif;
  --mono:'Geist Mono',ui-monospace,monospace;

  /* surfaces */
  --bg:#F5F6F8; --bg-1:#EEF0F3;
  --surface:#FFFFFF; --surface-2:#FAFBFC; --surface-3:#F1F3F6;
  --hover:#F0F2F6; --press:#E7EAF0;
  --line:rgba(17,24,39,.10); --line-2:rgba(17,24,39,.15); --line-3:rgba(17,24,39,.26);

  /* text */
  --text:#2B2F3A; --text-hi:#0E1117; --text-mid:#5A6172; --text-dim:#8A91A1; --text-faint:#C2C7D2;

  /* blue — the only accent */
  --blue:#1C39D6; --blue-hover:#142BA8; --blue-press:#142BA8;
  --blue-tint:#DBE1FF; --blue-on:#142BA8;
  --blueglow:0 0 0 3px rgba(28,57,214,.18);
  --bloom-glow:0 0 0 1px rgba(28,57,214,.6), 0 10px 28px -12px rgba(28,57,214,.30);

  /* status = blue + neutral */
  --ok:var(--blue); --warn:var(--text-mid); --danger:var(--text-hi);

  /* elevation */
  --sh1:0 1px 2px rgba(17,24,39,.07);
  --sh2:0 6px 20px -8px rgba(17,24,39,.14);
  --sh3:0 18px 48px -16px rgba(17,24,39,.20);

  /* motion */
  --ease:cubic-bezier(.2,.8,.2,1); --ease-out:cubic-bezier(.16,1,.3,1);
  --d1:90ms; --d2:150ms; --d3:240ms; --d4:420ms;
}

:root[data-theme="dark"] {
  --bg:#0A0C12; --bg-1:#0D1018;
  --surface:#111521; --surface-2:#161B29; --surface-3:#1C2233;
  --hover:#1A2030; --press:#232B40;
  --line:rgba(120,150,255,.10); --line-2:rgba(120,150,255,.17); --line-3:rgba(120,150,255,.30);
  --text:#C5CBDA; --text-hi:#EEF1FA; --text-mid:#868FA6; --text-dim:#5A627A; --text-faint:#383F52;
  --blue:#5470FF; --blue-hover:#6E86FF; --blue-press:#3E55E0;
  --blue-tint:rgba(84,112,255,.14); --blue-on:#B9C4FF;
  --blueglow:0 0 0 3px rgba(84,112,255,.28);
  --bloom-glow:0 0 0 1px rgba(84,112,255,.7), 0 10px 30px -12px rgba(84,112,255,.40);
  --ok:var(--blue); --warn:var(--text-mid); --danger:var(--text-hi);
  --sh1:0 1px 2px rgba(0,0,0,.5);
  --sh2:0 6px 22px -8px rgba(0,0,0,.7);
  --sh3:0 18px 50px -14px rgba(0,0,0,.78);
}
```

---

*Darkbloom Design System · v1.2 · `SEED: 3573860127` · `ATTEST OK` ∎*
