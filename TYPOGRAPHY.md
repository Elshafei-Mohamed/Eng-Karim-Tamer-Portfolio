# Typography System

The typography spec for the Karim Tamer portfolio. Any new UI text should
map to one of the voices below instead of introducing a bespoke size /
tracking / color combination.

## The two faces

| Role | Face | Loading | Token |
| --- | --- | --- | --- |
| Prose + headlines | Archivo (variable, 100–900) | `next/font/google` | `--font-archivo` |
| System voice (labels, data, status, wordmark) | JetBrains Mono (variable, 100–800) | **self-hosted** `next/font/local` | `--font-jetbrains-mono` |

`src/app/layout.tsx` wires both into CSS variables; `globals.css`
(`@theme inline`) maps `--font-mono` → JetBrains Mono.

## Why JetBrains Mono, and why self-hosted

The system voice uses mono glyphs for a terminal / operations-readout
character. Two problems made that look "broken" at 100% zoom and "fine"
when zoomed:

1. **Missing glyphs → mixed faces.** Google Fonts serves IBM Plex Mono and
   JetBrains Mono as `unicode-range` subsets that stop well before U+2500.
   The site's status marks (`● ◐ ✔ ◆`) and arrows (`→ ↗ ↓ ✕`) are pushed
   outside the loaded subset, so the browser renders them with a *fallback*
   mono face (Consolas / Courier New) whose advance width is ~1.003× the
   real face. Every label containing one of those characters alternated
   between two fonts with different metrics = the uneven, "shimmering"
   letters. Zooming changed the rasterization of the fallback, which is why
   the text looked better at 100%+ zoom.
2. **Subpixel spacing at 13–14px.** IBM Plex Mono's lighter strokes plus
   `0.05em` letter-spacing at fractional pixel sizes produced ragged
   edges on Windows.

The full JetBrains Mono family carries all needed glyphs at a uniform
600/1000 em advance, so **the full face is self-hosted** (
`public/fonts/JetBrainsMono[wght].woff2`, SIL OFL 1.1 license in
`public/fonts/OFL-JetBrainsMono.txt`) rather than fetched from the
Google Fonts CDN subsets.

Notes:
- JetBrains Mono does **not** include `◐` (U+25D0) or `✔` (U+2714). Those
  two status marks were swapped to `◔` and `✓` (both present in the face)
  in `status-stamp.tsx`. Additive glyphs beyond the current set should be
  verified against the JetBrains Mono character list before use.
- Do not change the `--font-mono` token back to a Google Fonts mono family
  without also fixing glyph coverage — see "Adding a new mono glyph".

## Voices and recipes

### 1a · Headlines (Archivo)

- `text-display` — hero statement.
- `text-h1` — page + big section titles.
- `text-h2` — section titles (`SectionHeader`).
- `text-h3` — card / list titles.
- `headline-h3-normal` — h3 scale at normal weight; used for job titles in
  the operation log (`experience-section.tsx`) so they read as metadata,
  not top-level headings.

### 1b · Monument figures (Archivo numerals)

Proof-of-record metrics. Line height 1, tight track, semibold. Three
sizes exist so the metrics scale with their container:

- `text-metric-2xl` — `clamp(4rem, 9vw, 7rem)` (teaching counts).
- `text-metric-xl` — `clamp(3.5rem, 7vw, 5.5rem)` (proof row).
- `text-metric-md` — `clamp(1.75rem, 3vw, 2.5rem)` (fact values).

Always pair with `text-primary`.

### 2 · Prose (Archivo)

- `text-body-lg` — lede / mission copy (body paragraphs).
- `text-sm` / `text-base` — default body (inherited from `body`: 16px,
  line-height 1.7).

### 3 · Mono labels (JetBrains Mono) — the terminal voice

Uppercase, medium weight, modest `0.025em` tracking so letterforms raster
cleanly at 100% zoom.

- `.label-accent` — signpost captions in accent: section indices,
  `05 · CONTACT`, `ACT I / TRAINEE`, project-archive intro. (14px / 500.)
- `.label` — supportive captions in muted: `SYSTEM REGISTRY`, section
  headings like `MORE PROJECTS`, form labels, footers. (13px / 500.)
- `.label-primary` — emphasized captions in primary: `CURRICULUM / NTI`.
- `.status` — status stamps; color comes from the status utility
  (`text-live` / `text-building` / `text-delivered` / `text-curriculum`).
- `.wordmark` — the owner's name (brand). 16px / semibold / `0.05em`
  track; used in the navbar, mobile menu header, and footer. The hero name
  is the same treatment scaled up to `text-xl` (`font-mono text-xl
  font-semibold leading-tight tracking-wide`).
- `.mono-note` — auxiliary notes: captions, sources, stack lines, URLs.
  13px / muted, relaxed leading, lowercase-as-authored.
- `.mono-data` — data records: tech lists, skill inventories, `FactRow`.
  14px / secondary, relaxed leading.

### 4 · Actions

- `.btn` / `.btn-solid` / `.btn-outline` — mono, 13px / 500, `0.04em`
  track, 44px min-height. Direction arrows (`→ ↗ ↓`) are part of the
  labels; they render in the same face because JetBrains Mono ships them.
- `.link` — underlined text action; underline turns accent on hover.

## Decision flow for new text

1. Is it the name or a headline? → voice 1 (Archivo), or `.wordmark` if
   it is the owner's name.
2. Is it a data figure? → voice 1b (`text-metric-*`).
3. Is it prose? → voice 2 (`text-body-lg` / default body).
4. Is it a caption, status, label, or source note in the system voice? →
   voice 3: choose `.label-accent` / `.label` / `.label-primary` / `.status`
   / `.wordmark` / `.mono-note` / `.mono-data` by the *color role*:
   accent = signpost, primary = emphasized, muted/secondary = supportive.
5. Is it an action? → voice 4 (`.btn` / `.link`).

## Adding a new mono glyph

Check it exists in JetBrains Mono first (the official character list).
If it doesn't:

- Prefer a glyph that does exist (see the `◐ → ◔`, `✔ → ✓` precedent).
- If the glyph is unavoidable, it will render in a fallback face with
  different metrics — the original "broken letter" bug. Either self-host a
  font covering it, or style it separately and accept the mismatch.

## Change log

- Replaced IBM Plex Mono with self-hosted JetBrains Mono (variable).
  Root cause of the broken mono rendering: Google Fonts subsets omit the
  status marks and arrows → cross-face fallback with mismatched metrics.
- `tracking-wider` (0.05em) and `tracking-widest` (0.1em) on mono labels
  reduced to `0.025em` (via the label classes) and `0.04em` (buttons).
- Body fixed at 16px / 1.7; `--text-body-lg` and `--text-xs` (13px /
  500) tokens added so nothing silently falls back to a non-existent
  token.
- Owner's name is now a proper wordmark: hero block (name at `text-xl`
  next to the portrait), navbar brand, footer.
- Status marks `◐`/`✔` replaced with `◔`/`✓` to stay inside the face.
- Ad-hoc mono class strings formalized into the semantic classes above;
  monument figures moved to `text-metric-*` tokens.