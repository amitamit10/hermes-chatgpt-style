# ChatGPT Style for Hermes Desktop

An unofficial ChatGPT / Codex-inspired theme for Hermes Desktop.
Not affiliated with, endorsed by, or sponsored by OpenAI.

## What it changes

- **Palette** — light and dark variants that follow the system appearance;
  flat greys (`#181818` / `#1c1c1c` in dark), a single blue accent `#3b82f6`.
- **Chat** — a centred 46rem reading column, plain assistant text (no card),
  compact right-aligned blue user bubbles, tidy tables, lists and inline code.
- **Composer** — a rounded card with a hairline border, a round blue send
  button, and model + effort pills that read like Codex's "GPT-6.1 Sol Light".
- **Model picker** — plain rows, muted provider headings, outlined effort
  chips, the star shown only on hover.
- **Effort menu** — the effort levels become one segmented control.
- **Sidebar** — one prominent "New session" button, quiet nav rows,
  sentence-case section headings, no idle dots or age stamps (they show on
  hover); running sessions get a pulsing row and a spinning ring.
- **Right panel** — Files / Review sit in a floating rounded card.
- **Footer & tabs** — quiet status bar, segmented tab switches.
- Respects `prefers-reduced-motion`.

## Install

Capabilities → Plugins → Install from Git, or copy `desktop/plugin.js` to
`~/.hermes/desktop-plugins/chatgpt-style/plugin.js`. Then pick **ChatGPT Style**
in Settings → Appearance (or ⌘K → "Theme: switch to ChatGPT Style").

## Disclosure

The theme registers through `THEMES_AREA` and ships its look as the theme's
`customCSS`. That stylesheet restyles native Desktop surfaces (sidebar rows,
composer, user bubbles, menus, model picker, file panel, status bar) by
selecting the app's `data-slot` / `data-sidebar` / `data-tree-group` hooks, so a
Desktop release that renames those hooks can make individual rules stop
applying. It never queries or mutates the DOM from script, makes no network
calls, stores nothing, and adds no agent tools, hooks, middleware or env vars.

## License

MIT
