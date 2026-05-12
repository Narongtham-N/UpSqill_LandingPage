# UpSqill Landing Page

Static landing page prototype for UpSqill, an AI-powered personalized learning platform for Thai high school students preparing for university admission.

## Overview

This landing page is designed as a bilingual English/Thai product introduction and early-access conversion page. It explains the student preparation problem, the UpSqill roadmap approach, diagnostic insights, product features, parent reporting value, credibility signals, innovation partners, FAQ, and waitlist signup.

The current page is a front-end prototype only. The waitlist form stores submissions in the browser's `localStorage` and does not send data to a backend.

## Files

- `index.html` - page content, semantic section structure, partner logos, footer address, and waitlist form markup
- `styles.css` - visual system, responsive layout, animations, comparison table styling, partner section styling, and footer styling
- `script.js` - mobile navigation, language switching, persisted language preference, waitlist prototype capture, counters, scroll reveal, parallax, and hero canvas animation
- `assets/logos/` - UpSqill logo assets and partner logo assets
- `preview-desktop.png` and `preview-mobile.png` - earlier rendered QA screenshots
- `design-system/` - supporting design tokens and theme references

## Run

Open `index.html` directly in a browser, or serve the folder with any static web server.

Example:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/index.html
```

## Landing Page Sections

- Header - UpSqill brand, anchor navigation, bilingual toggle, and primary diagnostic CTA
- Hero - AI-powered university roadmap positioning with animated background, trust pills, and main CTAs
- Stats banner - quick credibility metrics for focus, practice efficiency, score improvement, and personalization
- Problem - common pain points students face when preparing for university admission
- Solution - UpSqill's personalized roadmap approach and sample diagnostic report card
- Insights - learning dashboard visuals, score gap model, skill payoff map, learning momentum, and readiness radar
- How it works - five-step flow from goal discovery to progress tracking
- Features - diagnostic engine, goal mapping, study plans, adaptive practice, AI feedback, progress dashboard, and parent insight report
- Comparison - table comparing traditional tutoring, generic learning apps, and UpSqill
- Student journey - visual path from uncertainty to confidence
- Parent section - parent-facing value proposition and weekly insight preview
- Trust and vision - educational research, AI innovation, methodology, and parent analytics credibility points
- Innovation partners - TUiPi and TED Fund partner logos with ecosystem support statement
- Future vision - long-term product direction for personalized education
- FAQ - common questions for students and parents
- Final CTA - waitlist form and early-access call to action
- Footer - company summary, navigation links, headquarters address, and copyright

## Version History

### v1.0.0 - Initial Static Landing Page Prototype

- Built the first complete static landing page using `index.html`, `styles.css`, and `script.js`.
- Added a premium product landing page structure covering hero, problem, solution, insights, how-it-works, features, comparison, journey, parent, trust, vision, FAQ, final CTA, and footer sections.
- Added bilingual English/Thai support through `data-i18n`, `data-i18n-html`, and `data-i18n-placeholder` keys in `script.js`.
- Added language preference persistence using `localStorage`.
- Added mobile navigation behavior and responsive layout rules for desktop, tablet, and mobile.
- Added animated hero scene, counters, reveal-on-scroll effects, card tilt interactions, and dashboard-style visual elements.
- Added prototype waitlist capture that stores submissions locally in the browser.

### v1.1.0 - Partner Credibility and Company Address Update

- Added an innovation partner band inside the Trust and Vision section.
- Added partner logos for TUiPi and TED Fund under `assets/logos/`.
- Added English partner statement: "Backed by Trusted Innovation Partners".
- Added Thai partner statement: "ได้รับการสนับสนุนจากหน่วยงานด้านนวัตกรรมและการบ่มเพาะธุรกิจ".
- Added longer English and Thai credibility statements explaining mentorship, incubation support, workspace facilitation, ecosystem access, and strategic guidance.
- Added bilingual headquarters address in the footer.
- Added footer address label switching between "Headquarters" and "สำนักงานใหญ่".
- Optimized the TED Fund source image into a smaller web asset for faster page loading.
- Added responsive partner logo cards so both partner logos remain readable across screen sizes.

### v1.2.0 - Comparison Table Heading Refinement

- Improved the comparison table header so it stands out from the table body.
- Changed competitor column headers to a darker, stronger header treatment with clearer contrast.
- Kept the UpSqill column as the primary visual anchor using the brand gradient.
- Increased header height, font weight, and visual separation from body rows.
- Added a top accent line and stronger bottom boundary to make the header row easier to scan.
- Verified the updated comparison heading in both English and Thai layouts.

### v1.3.0 - Demo Report Donut Chart Enhancement

- Reworked the demo report donut chart center content so the readiness number and label sit clearly in the middle.
- Added a visible percentage marker next to the readiness score.
- Added a compact goal-gap note inside the donut chart.
- Added a report summary panel under the donut with the next best focus recommendation.
- Added KPI tiles for points-to-target and priority skills.
- Added English and Thai copy for the new donut note and report summary details.
- Added responsive rules so the new summary panel stacks cleanly on small screens.

### v1.4.0 - Learning Insight Dashboard Visual Upgrade

- Upgraded the Learning Insight Dashboard hero visual from a simple AI orbit into a richer AI insight cockpit.
- Added a dashboard frame, grid mesh, scan line, and additional orbit plane to create more depth.
- Added readiness, priority skill, weekly practice, skill signal, and AI recommendation HUD elements around the AI core.
- Added bilingual English and Thai copy for the new insight visual labels.
- Improved layering so the visual detail cards remain readable over the orbit nodes.
- Added responsive adjustments for tablet and mobile layouts.

### v1.5.0 - Learning Insight Chart Card Enhancement

- Upgraded the four Learning Insight chart cards with richer dashboard-style details.
- Added score markers, target coverage, fast-route points, and key-blocker KPI tiles to the score gap model.
- Added priority and maintain zones, skill metadata, highlighted impact areas, and focus recommendation tiles to the skill payoff map.
- Added animated chart area reveal, stronger line depth, chart-grid styling, and weekly insight KPI tiles to the learning momentum chart.
- Added readiness score tiles and a highlighted transfer-skill alert to the radar chart.
- Added subtle 3D hover depth, chart shine/sweep animation, and stronger card layering for a more premium visual feel.
- Added responsive rules so the new chart details stack cleanly on mobile.

## Notes

- This is currently a static prototype; no production backend, authentication, analytics, or database integration is included.
- The waitlist form is for UX demonstration only.
- The language toggle affects page copy, placeholders, metadata title, and metadata description.
- Partner and address content is maintained in `script.js` so English and Thai versions stay synchronized.
