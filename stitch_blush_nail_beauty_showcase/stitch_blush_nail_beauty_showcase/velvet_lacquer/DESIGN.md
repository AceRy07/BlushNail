---
name: Velvet Lacquer
colors:
  surface: '#191114'
  surface-dim: '#191114'
  surface-bright: '#41373a'
  surface-container-lowest: '#140c0f'
  surface-container-low: '#22191c'
  surface-container: '#261d20'
  surface-container-high: '#31272b'
  surface-container-highest: '#3c3235'
  on-surface: '#efdee3'
  on-surface-variant: '#d6c2c3'
  inverse-surface: '#efdee3'
  inverse-on-surface: '#372e31'
  outline: '#9f8c8e'
  outline-variant: '#524344'
  surface-tint: '#feb2bb'
  primary: '#feb2bb'
  on-primary: '#522029'
  primary-container: '#df97a0'
  on-primary-container: '#632f37'
  inverse-primary: '#884d56'
  secondary: '#ebc166'
  on-secondary: '#402d00'
  secondary-container: '#765700'
  on-secondary-container: '#facf73'
  tertiary: '#ffb3b5'
  on-tertiary: '#620e1c'
  tertiary-container: '#fe878f'
  on-tertiary-container: '#761e2a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd9dd'
  primary-fixed-dim: '#feb2bb'
  on-primary-fixed: '#370c15'
  on-primary-fixed-variant: '#6d363f'
  secondary-fixed: '#ffdf9e'
  secondary-fixed-dim: '#ebc166'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5b4300'
  tertiary-fixed: '#ffdada'
  tertiary-fixed-dim: '#ffb3b5'
  on-tertiary-fixed: '#40000c'
  on-tertiary-fixed-variant: '#802631'
  background: '#191114'
  on-background: '#efdee3'
  surface-variant: '#3c3235'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '300'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-max-width: 1280px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 24px
  stack-sm: 16px
  stack-md: 32px
  stack-lg: 64px
---

## Brand & Style
The design system is crafted for an elite nail boutique experience, drawing inspiration from the tactile and visual world of high-end cosmetics. The aesthetic mimics a **"Lacquer Desk"**—a dark, moody surface where vibrant colors and metallic tools catch the light.

The personality is sophisticated, intimate, and warm. It avoids the clinical coldness of traditional salons in favor of a "private club" atmosphere. The style is a hybrid of **Modern Minimalism** and **Glassmorphism**, utilizing deep backgrounds to make accent colors and high-gloss UI elements appear as if they are resting under a soft spotlight. High negative space is mandatory to maintain a sense of exclusivity and breathing room.

## Colors
The palette is rooted in a deep, nocturnal base of **Aubergine Charcoal**, providing a canvas that feels more premium than standard black. 

- **Primary (Powder Rose):** Used for delicate accents, highlights, and soft decorative elements. It represents the "Blush" identity.
- **Secondary (Antique Gold):** Reserved for moments of prestige—icons, borders on featured cards, or "VIP" indicators.
- **Tertiary (Burgundy):** The functional "Action" color. It provides high contrast against the dark background while maintaining the tonal harmony of the lacquer theme.
- **Text (Cream White):** A warm, low-glare white that ensures readability without the harshness of pure white.

## Typography
The typography strategy leans into high-contrast editorial style. 

- **Headlines:** Use *Bodoni Moda*. For major section titles, utilize the Italic variant to evoke the flowing motion of silk or liquid polish.
- **Body:** *Manrope* is set with generous line-height and light weights to keep the interface feeling airy and modern.
- **Labels:** *Space Mono* provides a technical, "curated" feel, similar to a luxury product SKU or a treatment code. It should always be used in small sizes with increased letter spacing.

## Layout & Spacing
This design system utilizes a **Fixed Grid** layout for desktop to ensure content remains centered and prestigious, like a framed menu.

- **Desktop:** 12-column grid with ultra-wide 80px margins.
- **Mobile:** 4-column grid with 24px margins.
- **Philosophy:** "The Luxury of Space." Never crowd elements. Use `stack-lg` (64px) between distinct sections to signify a transition in service or mood. Layouts should be asymmetrical where possible to mimic the organic placement of bottles on a vanity.

## Elevation & Depth
Depth is created through **Glassmorphism** and **Specular Highlights** rather than heavy drop shadows.

- **Surface Layers:** Use semi-transparent backgrounds (Aubergine at 80% opacity) with a 20px backdrop blur for modal overlays and cards.
- **Shadows:** Use "Ambient Glows"—very soft, wide-spread shadows tinted with the primary color (#df97a0) at 10% opacity to suggest a warm light source.
- **Gloss Effect:** Interactive elements should feature a thin, 1px top-border (linear gradient from transparent to Antique Gold to transparent) to simulate the rim of a glass bottle catching the light.

## Shapes
The shape language is defined by the silhouette of premium nail lacquer bottles: soft, pill-shaped, and ergonomic. 

- **Containers:** All primary cards and containers use `rounded-2xl` or `rounded-3xl` (up to 32px) to feel organic and inviting.
- **Buttons:** Fully pill-shaped to contrast against the structured serif typography.
- **Images:** Treatment and gallery images should always have high corner radii or occasionally be clipped into arched "bottle-top" shapes.

## Components
### Buttons
- **Primary:** Deep Burgundy background, Cream White text. On hover, a "Glimmer" effect—a subtle horizontal light sweep—moves across the button.
- **Secondary:** Antique Gold outline (1px), no fill. Text in Antique Gold.

### Cards (Treatment/Service)
- Background: Surface color (#281e22) with a subtle 1px border in Powder Rose (20% opacity).
- Imagery: Large, high-quality photography with soft focus backgrounds.

### Inputs
- Bottom-border only design. When focused, the border transitions from Cream White to Antique Gold with a soft outer glow.

### Chips/Tags
- Small, pill-shaped elements using the Label typography style. Use the Powder Rose color at 15% opacity with solid Rose text for categorization (e.g., "Manicure", "Nail Art").

### Custom Component: The "Polish Selector"
- A horizontal scroll of large, circular color swatches that expand on hover, displaying the color name in the mono label font above it.