---
name: Speedy Bat Couriers
description: Cinematic Austin transport editorial built for fast, qualified dispatch requests.
colors:
  paper: "#ffffff"
  cream: "#f1f2f4"
  parchment: "#dfe2e8"
  ink: "#101116"
  ink-deep: "#090a0d"
  ink-soft: "#565b64"
  signal: "#244ce8"
  signal-strong: "#1738bd"
  field-stroke: "#c9cdd5"
  field-placeholder: "#676c75"
  error: "#b42318"
typography:
  display:
    fontFamily: "Archivo, Arial Black, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.2rem, 7vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.84
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Archivo, Arial Black, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.8rem, 6vw, 5.5rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.045em"
  title:
    fontFamily: "Archivo, Arial Black, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 2.4vw, 2.25rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.045em"
  body:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body-large:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  control:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  label:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0.18em"
rounded:
  square: "0px"
  control: "5px"
  round: "999px"
spacing:
  unit: "4px"
  compact: "12px"
  body: "16px"
  gutter-mobile: "20px"
  control-x: "24px"
  gutter-tablet: "32px"
  gutter-desktop: "40px"
  section-mobile: "64px"
  section: "80px"
  section-desktop: "112px"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.paper}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.signal-strong}"
    textColor: "{colors.paper}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
    height: "48px"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
    height: "48px"
  button-inverse:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
    height: "48px"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
    height: "48px"
  editorial-module:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "0px"
  accordion-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "20px 0px"
    height: "80px"
---

# Design System: Speedy Bat Couriers

## Overview

**Creative North Star: "The Cinematic Dispatch Board"**

Speedy Bat treats a small Austin courier with the scale and confidence of transport editorial: broad photographic fields, compressed headlines, decisive color bands, and direct operational language. The visual world feels fast and assured without imitating logistics software or wrapping every idea in a card.

Contrast carries the hierarchy. True white, near-black ink, cool soft gray, and cobalt alternate in full-width bands while fine rules organize detail inside an open 12-column frame. Operational photography supplies atmosphere; typography and space keep the composition legible and businesslike.

The drama always resolves into a clear request path. Controls stay compact, near-square, and accessible; body copy remains calm; movement reveals rather than distracts. This supports the product's central truth: a request begins a dispatch review rather than guaranteeing a booking.

**Key Characteristics:**

- A four-color visual core: true white, near-black ink, cool soft gray, and decisive cobalt.
- Self-hosted expanded Archivo in compressed uppercase display lines; DM Sans for everything read or acted on.
- Open 12-column bands capped at 1536px, with rules and tonal sections instead of card shells.
- Near-square 5px controls with 44–48px touch targets and always-visible focus.
- Clipped, purposeful entry motion with a complete reduced-motion fallback.

## Colors

The palette is intentionally sparse: neutral editorial fields carry most of the page, while cobalt creates a fast, unmistakable action signal.

### Primary

- **Dispatch Cobalt** (`signal`): Primary quote actions, step numbers, section markers, hover emphasis, selection, and focus.
- **Pressed Cobalt** (`signal-strong`): The darker action state for primary submission controls and any cobalt-on-white control that needs a clear hover change.

### Tertiary

- **Error Red** (`error`): Validation borders and their restrained translucent focus halo. It is semantic only, never decorative.

### Neutral

- **True Paper** (`paper`): The default page, form, and inverse-button surface.
- **Cool Soft Gray** (`cream`): Alternate editorial bands that separate long sequences without creating floating cards.
- **Rule Gray** (`parchment`): Image placeholders, quiet borders, and the scrolled-header divider.
- **Night Ink** (`ink`): Primary text, dark bands, navigation CTAs, and the mobile contact rail.
- **Blacktop** (`ink-deep`): The deepest divider and hover tone where ordinary ink needs additional separation.
- **Dispatch Gray** (`ink-soft`): Supporting copy and secondary labels on light surfaces.
- **Field Wire** (`field-stroke`): The default 1px form-control edge.
- **Placeholder Gray** (`field-placeholder`): Legible but clearly subordinate placeholder copy.

### Named Rules

**The Cobalt Means Action Rule.** Use cobalt for primary actions, selected emphasis, small markers, and numbered steps; never wash an ordinary content surface in accent unless it is a deliberate CTA band.

**The Solid Field Rule.** Build contrast with solid white, gray, ink, or cobalt bands. Gradients and tinted glass are outside this visual world.

## Typography

**Display Font:** Archivo, using the self-hosted expanded cut registered at weights 800–900 and 125% stretch, with Arial Black and sans-serif fallbacks.

**Body Font:** DM Sans, using the self-hosted variable file across weights 300–700, with system sans-serif fallbacks.

**Character:** Archivo makes the service feel immediate, physical, and large-scale; its tight spacing and compressed line height turn headings into editorial blocks. DM Sans keeps forms, explanations, navigation, and qualifications human and easy to scan.

### Hierarchy

- **Display** (Archivo, weight 900, 3.2rem–6rem, line-height 0.84, letter-spacing -0.045em, uppercase): Hero and page-title statements. Keep line breaks intentional, and allow four-line compositions when the image can support them.
- **Headline** (Archivo, weight 900, 2.8rem–5.5rem, line-height 0.88, letter-spacing -0.045em, uppercase): Major editorial band headings and conversion closers. It may wrap, but it should read as one decisive thought.
- **Title** (Archivo, weight 900, 1.4rem–2.25rem, line-height 0.95, letter-spacing -0.045em, uppercase): Service modules and compact editorial units. Keep these labels short.
- **Body** (DM Sans, weight 400, 16px, line-height 1.625): Standard explanation and supporting copy. Most marketing paragraphs stay within roughly 40–48rem; narrow supporting copy often stays closer to 28–36rem.
- **Lead Body** (DM Sans, weight 400, 18px, line-height 1.625): Page descriptions and primary supporting statements.
- **Control** (DM Sans, weight 700, 14px, line-height 1.25): Buttons, navigation actions, and form labels that need directness without display theatrics.
- **Label** (DM Sans, weight 700, 11px, line-height 1.25, letter-spacing 0.18em, uppercase): Eyebrows, categories, captions, and compact metadata. Image captions tighten further to 9–10px with 0.14em tracking.

### Named Rules

**The Compressed Headline Rule.** Set Archivo in uppercase, short editorial lines; never use it for paragraph copy or dense controls.

**The Calm Copy Rule.** Let DM Sans carry every qualification, instruction, and field label at comfortable line height; urgency comes from hierarchy, not cramped prose.

## Layout

The primary canvas is a fluid 12-column grid capped at 1536px. Page gutters step from 20px by default to 32px at 640px and 40px at 1024px. Major sections typically use 64–80px vertical padding on small screens and 80–112px from 768px upward; editorial modules use open gaps of 20–48px rather than boxed spacing.

The fixed header is 76px tall below 1024px and 84px at 1024px and above. The home hero begins directly below it, uses 68svh with a 620px minimum on smaller screens, and becomes 75svh with a 650px minimum and 780px maximum on large screens. Page heroes use an 8/4 column split; service and policy sections commonly use 4/7 or 5/6 asymmetric splits. Policy reading width narrows to 1200px.

Service imagery intentionally breaks uniformity through 3-, 4-, 5-, 7-, and 8-column spans and varied square, 3:4, 4:3, 5:4, and 16:9 crops. At small widths, the system collapses to one column and preserves generous separation instead of shrinking modules into a dense dashboard.

The homepage has an intentional responsive conversion order. Below 1024px it reads Hero → Quote → Services → Process and coverage. At 1024px and wider it reads Hero → Services → Quote → Process and coverage. The mobile quote must remain directly after the hero, before the longer service gallery. A fixed 56px-high Call/Text rail stays at the bottom on mobile, and the footer reserves space for it.

### Named Rules

**The Open Band Rule.** Build hierarchy with full-width tonal bands and a 12-column inner grid, not isolated card stacks.

**The Quote Comes Early Rule.** On screens below 1024px, place the quote band immediately after the hero; from 1024px upward, place the service gallery before the quote band.

## Elevation & Depth

The system is flat by default. Depth comes from scale, image cropping, solid tonal changes, and 1px rules—not from floating content surfaces. The fixed header gains a low, long shadow only after scrolling, and the narrow service ticker uses one similarly restrained structural shadow. Forms, cards, quote panels, media modules, and CTA bands remain shadowless at rest.

### Shadow Vocabulary

- **Scrolled Header** (`0 18px 45px -32px rgba(16, 17, 22, 0.65)`): Separates the fixed white header from content only after the page moves.
- **Ticker Edge** (`0 18px 36px -24px rgba(22, 24, 29, 0.55)`): Grounds the dark service strip against adjacent photography or paper.

### Named Rules

**The Flat-by-Default Rule.** Resting surfaces do not float. Use a tonal band or hairline rule first; reserve shadow for sticky or overlapping structure.

## Shapes

The form language is rectilinear. Content surfaces, photography, forms, quote panels, editorial modules, and accordion rows use square corners. Interactive controls use one restrained 5px radius, enough to clarify tactility without becoming soft or app-like. Fully round geometry is reserved for micro-elements such as the 6px eyebrow dot, success icon badge, and scrollbar thumb.

Borders are generally 1px and low contrast: ink at roughly 15–30% on light fields, white at roughly 20–50% on dark fields. The global keyboard focus treatment is a 3px cobalt outline with 3px offset and a 4px focus-corner radius. Form fields use a cobalt border plus a 3px translucent cobalt halo instead.

### Named Rules

**The Five-Pixel Control Rule.** Buttons, menu triggers, and fields use the same near-square 5px radius; do not turn primary actions into pills.

## Components

### Buttons

Buttons are compact, blunt, and unmistakable rather than pill-shaped or ornamental.

- **Shape:** Near-square corners (5px), normally 48px high, never below 44px.
- **Primary:** Dispatch Cobalt with white text and 12px × 24px padding; the form submit fills its available width.
- **Ink:** Night Ink with white text for actions on paper; hover may shift to cobalt.
- **Inverse:** White with ink text on photography, ink, or cobalt; hover swaps to the local high-contrast color pair.
- **Outline:** Transparent with a low-opacity contextual border for secondary Call/Text actions. Keep one filled action visually dominant in each cluster.
- **Hover / Focus:** Color transitions use the standard 150ms state curve. Keyboard focus always retains the global 3px cobalt outline and offset; active targets must never lose their 44px minimum.

### Cards / Containers

Service modules are editorial plates, not software cards. A square-cropped operational image sits above a rule, compact display title, supporting sentence, and underlined action. There is no rounded shell, internal background inset, or resting shadow. Asymmetric grid spans and crop ratios create rhythm across the collection.

White quote forms sit directly on cobalt bands as square panels. Gray and ink sections are also full-width bands, with internal rules separating items rather than individual elevated boxes.

### Inputs / Fields

Fields are white, at least 48px high, and use a 1px Field Wire border, 5px radius, 14px horizontal padding, and 12px vertical padding. Labels are 14px bold DM Sans above the control; entered text stays 16px on every viewport to prevent mobile zoom.

Focus changes the border to Dispatch Cobalt and adds a 3px translucent cobalt halo. Invalid fields move to Error Red with a matching restrained halo; inline messages are bold and positioned directly below the affected control. Error summaries remain square, bordered blocks rather than floating toasts.

### Navigation

The desktop header is a fixed white band with the wordmark at left, four restrained links, direct phone/text access, and a single ink quote button. Links reveal a 2px cobalt underline from the left over 220ms. Once scrolled, a quiet bottom rule and structural shadow separate the header from content.

Below 1024px, navigation becomes a 44px square menu trigger and a full-height white sheet beneath the 76px header. Links expand into large uppercase Archivo rows with hairline separators; Quote, Call, and Text controls follow. A separate fixed ink Call/Text rail keeps direct contact available at the bottom.

### Accordions

FAQ rows are at least 80px high with square edges and 1px separators. The question is 17px bold DM Sans; a simple plus/minus icon aligns opposite. Answers open through a 0fr-to-1fr grid transition over 280ms using the expressive entry curve. Light accordions use ink on paper; service accordions reverse to white on ink. Hover shifts the question to cobalt.

### Quote Band

The signature conversion component is a full-width cobalt band. Its heading and short qualification occupy five columns; the square white form occupies seven columns at 1024px and above. On smaller screens the two stack, the contextual detail list disappears, and the entire band moves ahead of the service gallery.

### Motion

The hero photograph settles in over 1200ms by clipping upward from the bottom while scaling from 1.04 to 1. The headline follows over 900ms after a 120ms delay, rising 30px as an 8px blur clears. General reveals begin 18px low with a 14% bottom clip; opacity runs 620ms and transform/clip run 720ms using `cubic-bezier(0.16, 1, 0.3, 1)`.

Images scale only to 1.025 on hover over 700ms. Header, field, nav, and accordion transitions stay between 180ms and 280ms. Under `prefers-reduced-motion: reduce`, scrolling becomes immediate, animations and transitions collapse to 0.01ms, and reveal content remains fully visible.

### Named Rules

**The One Primary Action Rule.** In an action cluster, use one filled button and let Call, Text, or navigation alternatives use outlines or underlined text.

**The Reveal, Don't Perform Rule.** Motion may uncover content, confirm hover, or clarify expansion; it must not compete with the route and quote tasks.

## Do's and Don'ts

### Do:

- **Do** alternate solid paper, soft-gray, ink, and cobalt bands to create a clear editorial sequence.
- **Do** keep expanded Archivo headlines short, uppercase, tightly tracked, and intentionally wrapped.
- **Do** use DM Sans for body copy, form content, navigation, and every qualification that must be read carefully.
- **Do** preserve the 1536px open canvas, 12-column desktop splits, and 20px/32px/40px responsive gutters.
- **Do** keep primary controls at a 5px radius with 44–48px minimum height and a visible cobalt focus treatment.
- **Do** place the quote band directly after the hero on mobile and after the service gallery on large screens.
- **Do** use operational photography in square-edged editorial crops and label illustrative imagery honestly.

### Don't:

- **Don't** convert service modules, quote panels, or content bands into rounded software cards.
- **Don't** use pill buttons, large corner radii, glass effects, gradients, or decorative shadows.
- **Don't** spread cobalt across ordinary content; reserve it for actions, markers, numbering, focus, and deliberate CTA bands.
- **Don't** use Archivo for paragraph copy or DM Sans as a substitute for the expanded display voice.
- **Don't** remove the mobile Call/Text rail or push the mobile quote below the full service gallery.
- **Don't** hide keyboard focus or let entry motion override the reduced-motion fallback.
