# TIGOY.com ProfitSuite — Design Brief

## Tone & Purpose
Professional financial calculator. Clean, purposeful interface where input and output create visual clarity. Premium, refined, not playful.

## Color Palette

| Token | OKLCH | Usage |
|-------|-------|-------|
| **Primary (Indigo)** | 0.55 0.16 263 | Buttons, active states, accents, navbar icon |
| **Background (White)** | 0.99 0 0 | Main canvas, input panel card |
| **Dark Panel (Indigo-950)** | 0.14 0.01 263 | Output metrics section, high contrast |
| **Border (Slate)** | 0.9 0.01 238 | Card borders, input underlines |
| **Muted (Slate-100)** | 0.92 0.01 238 | Inactive button backgrounds |
| **Success (Green)** | 0.60 0.16 134 | Profit metrics, positive indicators |
| **Destructive (Red)** | 0.65 0.19 22 | Fee costs, warnings |
| **Foreground (Slate-900)** | 0.15 0.02 238 | Body text, headings |

## Typography

| Role | Font | Scale | Weight |
|------|------|-------|--------|
| Display | Plus Jakarta Sans | 1.875rem–3rem | 700–800 |
| Body | Plus Jakarta Sans | 0.875rem–1.125rem | 400–600 |
| Mono | System | 0.875rem | 400 |

## Elevation & Depth

- **Navbar**: bg-white, border-b border-slate-100, fixed or sticky shadow-sm
- **Input panel**: rounded-3xl, border border-slate-100, shadow-card-light (indigo tint)
- **Output panel**: bg-indigo-950, rounded-3xl, shadow-dark-subtle
- **Sub-cards**: bg-indigo-900/50, border-indigo-800, rounded-2xl (inside output panel)
- **Inputs**: rounded-xl, border-2 border-slate-200, focus:ring-4 ring-indigo-100, outline-none

## Structural Zones

| Zone | Treatment | Detail |
|------|-----------|--------|
| Navbar | White card with bottom border | Logo + "TIGOY.com ProfitSuite" + version badge |
| Header | White background, slate text | H1 title + descriptive subtitle |
| Content Grid | Grid 1 col mobile, 3 col desktop (2+1) | Left = input form, Right = output metrics |
| Input Panel | Rounded-3xl white card | Section "01" label, inputs, toggles |
| Output Panel | Rounded-3xl indigo-950 dark | Section "02" label, price display, metrics, button |
| Footer | Implicit (content ends naturally) | None visible on calculator |

## Spacing & Rhythm

- Gap between columns: `gap-8` (lg breakpoint)
- Card padding: `p-8` (main sections), `p-6` (sub-cards), `p-5` (metric boxes)
- Input spacing: `space-y-6` (vertical stack in form)
- Responsive: single column stack on mobile, 3-column grid on lg+ breakpoint

## Component Patterns

- **Section Numbers**: "01" / "02" in indigo-500, font-bold, opacity-60
- **Button States**: Active = bg-indigo-600 text-white, Inactive = bg-slate-100 text-slate-600, hover states via bg-slate-200
- **Input Fields**: border-2 border-slate-200, focus:border-indigo-500, focus:ring-4 ring-indigo-100/50, rounded-xl, py-4
- **Metric Display**: Large heading (5xl), green-400/green-300 for profit, red-300 for fees, indigo-300 for subdued labels on dark panel
- **Toggles**: Consider as mode switchers (Margin vs Markup), styled as button pairs

## Motion
- **Default transitions**: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) on interactive elements
- **Button interaction**: active:scale-95 for press feedback
- **Focus ring**: smooth transition on input focus

## Signature Detail
Two-column visual contrast (white + dark indigo) creates instant input/output clarity. Section numbers ("01" "02") anchor hierarchy without clutter.

## Responsive Breakpoints
- **Mobile (< 640px)**: Single column, full-width panels stack vertically
- **Tablet (640px–1024px)**: Single or two-column depending on content
- **Desktop (lg, 1024px+)**: Three-column grid (2-col input panel, 1-col output)

## Constraints
- No floating gradients or glassmorphic effects; flat color blocks maintain clarity
- Max width 1280px (7xl) for content centering
- Font exclusively Plus Jakarta Sans (no system fallbacks in display hierarchy)
- Profit amounts always in green, fees in red, tax in indigo-300 (no ambiguity)

