---
version: alpha
name: legacy brand
description: A playful, high-contrast print-tech brand with bright accents, rounded cards, and confident editorial typography.
colors:
  primary: "#ff2e63"
  secondary: "#6f35ff"
  tertiary: "#17171b"
  neutral: "#fffdf8"
  surface: "#ffffff"
  on-surface: "#16162e"
  text-muted: "#66627a"
  border: "#ece3d2"
  success: "#2dd4bf"
  warning: "#ffca28"
  error: "#ef4444"
  accent: "#ff2e63"
  background: "#fffdf8"
  text: "#16162e"
  ink: "#111114"
  overlay: "#17171b"
typography:
  headline-display:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "48px"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-1.5px"
  headline-lg:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "32px"
    fontWeight: 800
    lineHeight: "33.6px"
    letterSpacing: "-1.5px"
  headline-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "27px"
    fontWeight: 800
    lineHeight: "32px"
    letterSpacing: "-0.6px"
  headline-sm:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "23px"
    fontWeight: 800
    lineHeight: "28px"
    letterSpacing: "1.75px"
  headline-xs:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "19px"
    fontWeight: 800
    lineHeight: "25.65px"
    letterSpacing: "0.3px"
  body-lg:
    fontFamily: "Inter"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0px"
  body-md:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "23.22px"
    letterSpacing: "0px"
  body-sm:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0px"
  label-lg:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "16px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0px"
  label-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "13.5px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0px"
  label-sm:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0px"
rounded:
  none: 0px
  sm: 8px
  md: 14px
  lg: 18px
  xl: 28px
  full: 9999px
spacing:
  xs: 6px
  sm: 14px
  md: 22px
  lg: 32px
  xl: 92px
  gutter: 24px
  margin: 32px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "13px"
    height: "43px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "13px"
    height: "43px"
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px 18px"
  card-soft:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "18px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "8px 12px"
  badge:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
---

# legacy brand

## Overview
legacy brand feels energetic, modern, and highly approachable, with a strong startup-like personality built for small business owners and print-shop operators. The visual language combines a clean light canvas with vivid pink-to-purple accents, making the brand feel tech-forward without becoming cold or overly corporate. Overall density is moderate: the page uses generous whitespace for clarity, but key sections are packed with informative, conversion-oriented content.

## Colors
- **Primary (#ff2e63):** A vivid hot pink used for calls to action, emphasis, icons, and attention-grabbing highlights. It carries most of the brand’s emotional warmth and energy.
- **Secondary (#6f35ff):** A saturated violet used as a supporting accent in gradients, iconography, and feature highlights. It helps extend the brand beyond a single neon tone.
- **Tertiary (#17171b):** A near-black ink tone used for dark buttons, navigation emphasis, and high-contrast UI surfaces. It anchors the bright palette and gives the interface weight.
- **Neutral (#fffdf8):** A soft warm off-white background that keeps the layout airy and reduces the harshness of pure white.
- **Surface (#ffffff):** Pure white surfaces for cards, controls, and inset content areas that need to separate from the background.
- **On-surface (#16162e):** The main text color, a deep navy-black that reads clearly while feeling slightly softer than pure black.
- **Text-muted (#66627a):** A subdued lavender-gray for secondary labels, descriptions, and supporting metadata.
- **Border (#ece3d2):** A pale beige border tone used for cards, dividers, and soft containment.
- **Success (#2dd4bf):** A bright teal used sparingly for positive states and informational highlights.
- **Warning (#ffca28):** A warm yellow used for status chips and utility accents.
- **Error (#ef4444):** A direct red reserved for destructive or invalid states.
- **Accent (#ff2e63):** Mirrors the primary brand pink and should be used wherever the strongest brand signal is needed.
- **Background (#fffdf8):** The default page canvas color; it should stay understated so the accent colors can lead.
- **Text (#16162e):** The default reading color for most interface copy.
- **Ink (#111114):** A deeper near-black used for dense content or components needing stronger contrast.
- **Overlay (#17171b):** A dark overlay tone for elevated panels and dark UI blocks.

## Typography
The system uses two distinct fonts: Plus Jakarta Sans for headlines, labels, and UI emphasis, and Inter for paragraphs and supporting copy. Plus Jakarta Sans brings the brand’s confident, rounded editorial feel, while Inter keeps body text compact and highly readable. Headings are extremely bold, with tight tracking and a noticeable negative letter-spacing on larger sizes, which gives the page a compact, poster-like headline rhythm.

Use `headline-display`, `headline-lg`, and `headline-md` for major hero statements and section titles. `headline-sm` and `headline-xs` are suitable for utility titles, feature headings, and small promotional blocks. `body-md` is the default paragraph size, with `body-sm` for captions, helper text, and secondary metadata. `label-lg`, `label-md`, and `label-sm` support buttons, chips, badges, and other UI controls; labels should generally feel punchy and compact rather than airy. Uppercase treatment appears in small utility text and badges, so use sparingly with generous spacing when the brand needs a technical or system-like tone.

## Layout
The layout is built around a wide, centered hero composition with generous outer margins and strong horizontal alignment. Content feels mostly fixed-max-width rather than fluid edge-to-edge, with ample breathing room around the central marketing narrative and the product illustration cluster. Spacing follows a simple stepped rhythm using `xs` through `xl`, with the biggest jumps reserved for section separation and the mid-scale values used for intra-component gaps.

Cards and panels use comfortable internal padding rather than dense grids: content blocks typically sit around 18px to 20px padding, while buttons use compact but substantial padding for quick scanning and tap comfort. Sections should maintain clear vertical separation, especially between hero, proof points, and metric bands. The overall rhythm should feel organized and conversion-driven, not editorially sprawling.

## Elevation & Depth
Depth is created with soft shadows, layered panels, and color contrast rather than heavy glassmorphism or realistic material effects. The interface relies on subtle shadows like the `sm`, `md`, and `lg` levels to float cards above the warm background, while dark components use tonal separation and glow-like contrast to stand out. Borders are light and warm, which reinforces the soft, friendly tone without flattening the page completely.

The strongest hierarchy comes from contrast between the near-black UI blocks and the bright brand accents. Small inset shadows and soft edge radii help interactive pieces feel tactile, but the system should remain restrained and clean rather than highly embossed.

## Shapes
The shape language is rounded and friendly, with a clear preference for medium radii over sharp corners. Buttons and interactive controls use `rounded.md` at 14px, which gives the brand a soft but still disciplined feel. Cards use `rounded.lg` at 18px for a more spacious, premium presentation, while pills and status chips can move to `rounded.full` for a playful, modern look.

Avoid aggressive sharpness unless it is serving a technical diagram or a specialized icon container. The overall shape system should feel approachable, not bubble-like.

## Components
Buttons are the most expressive component family in the system. `button-primary` should use the dark tertiary background, white text, bold Plus Jakarta Sans labeling, and compact 43px height for strong CTA visibility. `button-secondary` should reverse that energy with a white surface and brand-colored text, maintaining the same size and radius for visual consistency. `button-tertiary` is text-only and should stay visually light, used for inline navigation or low-emphasis actions. Button states should preserve the same bold typographic voice; hover states may intensify contrast or add a subtle shadow, but should not introduce heavy motion.

Cards should use a white surface, `rounded.lg`, a thin `border` tone, and a soft shadow to lift content from the background. Use `card` for primary information blocks and `card-soft` for quieter feature summaries or secondary panels. Internal spacing should stay balanced and generous, with enough room for icons, text, and small supporting metadata.

Inputs should be clean, white, and compact, with modest padding and a clear border or inset separation from surrounding content. The field styling should prioritize clarity over decoration, using `body-md` for entered text and avoiding overly large corner radii. Focus states should feel crisp and brand-aligned, ideally using the primary pink as an accent outline or glow.

Chips and badges should be pill-shaped and compact. `chip` is suitable for lightweight filters, tags, or feature labels, while `badge` is best for high-visibility states such as status indicators or small notifications. Keep their typography small, bold, and legible.

Icons and feature markers should be simple, high-contrast, and mostly line-based or minimally filled. The icon containers visible in the design are circular or pill-like and rely on brand colors to separate feature steps. Lists and stat blocks should use restrained dividers and plenty of whitespace so the content remains scannable.

## Do's and Don'ts
- Do use `Plus Jakarta Sans` for headlines, labels, and buttons to preserve the brand’s energetic voice.
- Do keep body copy in `Inter` so longer marketing text remains readable and neutral.
- Do lean on the pink `primary` color for emphasis, but pair it with `tertiary` or white for contrast.
- Do keep cards and panels softly rounded with subtle shadows and warm borders.
- Do use compact, confident button sizing rather than oversized pill CTAs everywhere.
- Don't introduce cool corporate blues as dominant UI colors; they would dilute the brand personality.
- Don't use sharp corners or heavy borders as the default treatment for interactive elements.
- Don't overcomplicate the layout with dense columns or excessive visual noise; the page should stay clear and conversion-focused.