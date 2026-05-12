# UpSqill Design System

This file documents the reusable design language extracted from the current UpSqill landing page. Use it with `variable.css`, `theme.css`, and `tokens.json` when building new routes.

## File Roles

- `tokens.json` is the source token map for design tools, build scripts, or future Style Dictionary output.
- `variable.css` exposes the same system as CSS custom properties. It also includes compatibility aliases that match the current `styles.css` names.
- `theme.css` provides reusable base styles, layout helpers, and prefixed components for new pages.
- `styles.css` remains the current landing page implementation. The new files do not replace it yet.

Recommended route import order from the site root:

```html
<link rel="stylesheet" href="/design-system/theme.css">
<link rel="stylesheet" href="/routes/example.css">
```

`theme.css` imports `variable.css` automatically. Import `variable.css` directly only when a route or tool needs tokens without the reusable classes.

## Design Summary

UpSqill should feel clear, intelligent, calm, and progress-oriented. The product is about reducing confusion for Thai high school students and parents, so the interface uses bright space, precise data cards, restrained motion, and warm reassurance instead of heavy academic or gamified visuals.

The landing page is built around these patterns:

- White canvas with soft blue and warm mist atmosphere.
- Large editorial display typography for high-confidence narrative moments.
- Compact dashboard cards for diagnostics, roadmaps, skill gaps, and parent insight.
- Blue and navy as the AI, data, and progress signal.
- Terracotta and warm mist as the human, parent, support, and emphasis signal.
- Pill CTAs, glass panels, rounded cards, subtle shadows, and animated metrics.
- Bilingual English and Thai support with separate Thai typography behavior.

## Page Inventory

The current landing page contains:

- Fixed glass header with logo, section nav, language toggle, and primary CTA.
- Hero with editorial headline, two CTAs, trust pills, floating dashboard panels, canvas node animation, and geometric learning visuals.
- Dark stats banner with four outcome metrics.
- Problem cards with illustrated pain points.
- Solution section with check-list benefits and diagnostic report preview.
- Insight dashboard with orbit model, score gap, payoff map, trend chart, and radar chart.
- Five-step "how it works" flow.
- Feature card grid with one wide parent insight feature.
- Comparison table showing UpSqill against tutoring and generic apps.
- Student journey track.
- Parent insight section with warm background and report card.
- Dark trust and vision sections.
- FAQ accordion.
- Final CTA with waitlist form.
- Dark footer with brand mark and links.

## Brand Tokens

### Color Roles

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Canvas | `--upsqill-color-canvas` | `#ffffff` | Page background and primary surfaces |
| Ink | `--upsqill-color-text` | `#17191c` | Main text, primary buttons |
| Fog | `--upsqill-color-surface-muted` | `#f7f7f8` | Muted sections, tracks, icon backgrounds |
| Blue | `--upsqill-color-brand-primary` | `#20aeea` | AI, progress, active states |
| Navy | `--upsqill-color-brand-secondary` | `#24529b` | Data depth, trust, chart contrast |
| Terracotta | `--upsqill-color-brand-warm` | `#5d2a1a` | Human emphasis, parents, editorial accents |
| Warm mist | `--upsqill-color-surface-warm` | `#fbe1d1` | Badges, support sections, soft warmth |
| Muted text | `--upsqill-color-text-muted` | `#4c4c4c` | Supporting copy |
| Subtle text | `--upsqill-color-text-subtle` | `#777b86` | Labels, metadata, axes |

Use brand blue for progress and intelligence. Use terracotta sparingly for eyebrow labels, emphasized words, parent/support moments, and warm section cues. Avoid building whole pages from only blue tones or only warm tones.

### Gradients

- `--upsqill-gradient-brand`: blue to navy, used for progress, active indicators, score rings, charts, and brand CTA variants.
- `--upsqill-gradient-brand-dark`: ink to charcoal, used for the default primary CTA.
- `--upsqill-gradient-warm`: warm mist to peach, used for parent glows and warm feedback.
- `--upsqill-gradient-mesh`: low-opacity background atmosphere, used inside dashboard surfaces and dark sections.

## Typography

Primary type behavior:

- Display: `--upsqill-font-serif`, currently `"Signifier", Georgia, "Times New Roman", serif`.
- Body/UI: `--upsqill-font-sans`, currently `"Sohne", system-ui fallback`.
- Thai: `--upsqill-font-thai`, currently `"Sarabun", "Noto Sans Thai", "Th Sarabun New", system fallback`.

Scale:

- Hero display: `72px`, line-height `1.08`.
- Section heading: `48px`, line-height `1.08`.
- Mobile hero: `34px`, Thai mobile hero `32px`.
- Body: `16px`, line-height `1.5`.
- Section copy: `17px`, line-height `1.6`.
- Hero copy: `19px`, line-height `1.55`.
- Labels and chart metadata: `11px` to `13px`.

Rules:

- Keep letter spacing at `0`.
- Use serif display type only for page-level narrative headings and major dashboard scores.
- Use sans type for UI, buttons, forms, navigation, labels, and charts.
- For Thai pages, switch both body and heading families to the Thai stack and use the larger Thai line height.

## Layout

Core layout tokens:

- Page max width: `1280px`.
- Default desktop section padding: `96px`.
- Mobile section padding: `72px`.
- Desktop page gutter: `24px`.
- Mobile page gutter: `16px`.
- Primary card/grid gap: `18px`.
- Two-column feature/report gap: `56px`.

Breakpoints:

- `1120px`: reduce heading sizes, convert dense grids from 4 or 3 columns to 2 columns.
- `900px`: collapse major two-column layouts, use horizontal scroll for comparison tables.
- `640px`: single-column layout, full-width buttons, smaller display type, hide decorative hero panels.

## Shape And Elevation

Shape tokens:

- Cards and major panels: `24px`.
- Forms and compact inputs: `16px`.
- Small tiles: `10px` to `16px`.
- Pills and buttons: `999px`.
- Icon circles: `50%`.

Elevation tokens:

- `--upsqill-shadow-subtle`: default cards, glass panels, comparison table.
- `--upsqill-shadow-elevated`: stats banner, waitlist form, hovered cards.
- `--upsqill-shadow-glow-blue`: active brand icon or gradient CTA.
- `--upsqill-shadow-header`: fixed glass header.

Use shadows to communicate useful layers: header, floating panels, active cards, and modal-like form surfaces. Avoid stacking shadows on nested cards.

## Component Patterns

### Buttons

Use `.uq-button` plus one variant:

```html
<a class="uq-button uq-button--primary" href="/diagnostic">Start Free Diagnostic</a>
<a class="uq-button uq-button--secondary" href="/how-it-works">See How It Works</a>
```

Rules:

- Primary CTAs use dark ink by default.
- Brand-gradient buttons are reserved for strong product actions inside app-like routes.
- Buttons keep a `44px` minimum height.
- On mobile, `.uq-button` becomes full width.

### Cards

Use `.uq-card` for solid surfaces and `.uq-glass-card` for floating/hero diagnostic panels.

```html
<article class="uq-card uq-card--interactive">
  <div class="uq-icon-tile">...</div>
  <h3 class="uq-title">AI Diagnostic Engine</h3>
  <p class="uq-copy">Know exactly where you are weak before studying more.</p>
</article>
```

Rules:

- Use one card layer only. Do not place cards inside cards.
- Use `.uq-card--mesh` only for data-heavy insight surfaces.
- Interactive cards move up `6px` on hover.

### Section Heading

```html
<header class="uq-section-heading">
  <span class="uq-eyebrow">Learning insight dashboard</span>
  <h2 class="uq-heading">See the <em>next best move</em></h2>
  <p>Turn diagnostic results into practical study decisions.</p>
</header>
```

Use the eyebrow for category context. The heading carries the main idea. The paragraph explains the decision or outcome.

### Metrics And Progress

Use score rings, meters, bars, and compact KPI pills for diagnostics. Data visuals should explain a next action, not just decorate a number.

```html
<div class="uq-meter" aria-label="Readiness 72%">
  <span style="--meter-value: 72%"></span>
</div>
```

Rules:

- Blue/navy indicates progress or current ability.
- Warm hatching or terracotta indicates remaining gap, warning, or family/support context.
- Always pair a chart with an insight sentence.

### Forms

```html
<form class="uq-form">
  <label class="uq-field">
    <span>Email</span>
    <input class="uq-input" type="email" autocomplete="email">
  </label>
  <button class="uq-button uq-button--primary" type="submit">Join the Waitlist</button>
</form>
```

Rules:

- Fields use `52px` minimum height.
- Focus state uses brand blue border and a soft blue ring.
- Helper text is muted, success text uses navy.

### Dark Surfaces

Use dark surfaces for trust, footer, or high-contrast metric moments. Pair dark sections with either white copy at `72%` opacity or blue gradient accents.

```html
<section class="uq-section uq-section--full uq-section--dark">
  ...
</section>
```

## Motion

Current motion language:

- Reveal on scroll: `800ms` ease-out, `40px` upward movement.
- Hover lift: `200ms` to `400ms`.
- Data animation: `1400ms` to `1600ms`.
- Background drift: slow, atmospheric, and non-essential.
- Canvas nodes: low-opacity learning network animation.

Rules:

- Motion should clarify progress, depth, or interactivity.
- Respect `prefers-reduced-motion`.
- Do not depend on motion for comprehension.
- Decorative motion can be hidden on mobile.

## Accessibility

Baseline standards for new routes:

- Keep semantic landmarks: `header`, `main`, `section`, `footer`.
- Every section with a title should use `aria-labelledby`.
- Interactive icons need accessible names.
- Preserve visible focus rings.
- Keep text contrast strong on glass and dark surfaces.
- Do not use color alone to explain chart status.
- Use `body[data-lang="th"]` and `document.documentElement.lang` for language switching.
- Form inputs need labels, autocomplete where applicable, and useful helper or error text.

## Reusable CSS Classes

Layout:

- `.uq-page`
- `.uq-container`
- `.uq-container--narrow`
- `.uq-section`
- `.uq-section--full`
- `.uq-section--muted`
- `.uq-section--warm`
- `.uq-section--dark`
- `.uq-layout-2`
- `.uq-grid`, `.uq-grid--2`, `.uq-grid--3`, `.uq-grid--4`
- `.uq-stack`
- `.uq-cluster`
- `.uq-split`

Typography:

- `.uq-display`
- `.uq-heading`
- `.uq-title`
- `.uq-copy`
- `.uq-eyebrow`
- `.uq-eyebrow--pill`
- `.uq-text-gradient`

Components:

- `.uq-button`
- `.uq-button--primary`
- `.uq-button--secondary`
- `.uq-button--brand`
- `.uq-link-arrow`
- `.uq-card`
- `.uq-card--interactive`
- `.uq-card--mesh`
- `.uq-glass-card`
- `.uq-icon-tile`
- `.uq-icon-tile--navy`
- `.uq-icon-tile--warm`
- `.uq-badge`
- `.uq-pill`
- `.uq-meter`
- `.uq-stat-band`
- `.uq-stat`
- `.uq-check-list`
- `.uq-form`
- `.uq-field`
- `.uq-input`
- `.uq-select`
- `.uq-textarea`
- `.uq-comparison`
- `.uq-comparison-row`
- `.uq-comparison-row--head`
- `.uq-comparison-cell--brand`

Utilities:

- `.uq-sr-only`
- `.uq-muted`
- `.uq-subtle`
- `.uq-dark-copy`
- `.uq-center`
- `.uq-balance`
- `.uq-shadow-subtle`
- `.uq-shadow-elevated`
- `.uq-reveal`

## New Route Starter

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>UpSqill Route</title>
    <link rel="stylesheet" href="/design-system/theme.css">
  </head>
  <body>
    <main class="uq-page">
      <section class="uq-section">
        <header class="uq-section-heading">
          <span class="uq-eyebrow">Route category</span>
          <h1 class="uq-display uq-balance">Route headline with clear outcome</h1>
          <p>Explain the user decision this route helps with.</p>
        </header>

        <div class="uq-grid uq-grid--3">
          <article class="uq-card uq-card--interactive">
            <div class="uq-icon-tile">...</div>
            <h2 class="uq-title">Reusable module</h2>
            <p class="uq-copy">Short, action-oriented copy.</p>
          </article>
        </div>
      </section>
    </main>
  </body>
</html>
```

## Production Notes

- Keep `tokens.json` and `variable.css` synchronized when token values change.
- Prefer semantic tokens in route CSS, for example `--upsqill-color-text`, not raw hex values.
- Use raw primitives only when defining new semantic tokens.
- Keep route-specific CSS focused on composition and exceptions.
- Do not duplicate landing-page-only selectors in new route files.
- Audit each new route at desktop, tablet, and mobile breakpoints.
- Verify Thai copy in the `body[data-lang="th"]` state before shipping.
