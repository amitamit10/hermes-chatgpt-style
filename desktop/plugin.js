import { THEMES_AREA, PALETTE_AREA, requestTheme } from '@hermes/plugin-sdk'

// ChatGPT / Codex-style skin for Hermes Desktop.
// Every selector below targets a data-slot / data-* hook that exists in the app source
// (apps/desktop/src), not internal class names, except where noted.

const FONT = '"Söhne", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"'
const MONO = '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace'
const BLUE = '#3b82f6'

const light = {
  background: '#ffffff', foreground: '#0d0d0d',
  card: '#ffffff', cardForeground: '#0d0d0d',
  muted: '#f4f4f4', mutedForeground: '#6b6b6b',
  popover: '#ffffff', popoverForeground: '#0d0d0d',
  primary: '#0d0d0d', primaryForeground: '#ffffff',
  secondary: '#f4f4f4', secondaryForeground: '#0d0d0d',
  accent: '#ececec', accentForeground: '#0d0d0d',
  border: '#e5e5e5', input: '#e5e5e5', ring: BLUE,
  midground: BLUE, composerRing: '#d9d9d9',
  destructive: '#e02e2a', destructiveForeground: '#ffffff',
  sidebarBackground: '#f9f9f9', sidebarBorder: 'transparent',
  userBubble: '#2563eb', userBubbleBorder: '#2563eb'
}

const dark = {
  background: '#181818', foreground: '#ececec',
  card: '#232323', cardForeground: '#ececec',
  muted: '#262626', mutedForeground: '#9b9b9b',
  popover: '#2a2a2a', popoverForeground: '#ececec',
  primary: '#ececec', primaryForeground: '#212121',
  secondary: '#2f2f2f', secondaryForeground: '#ececec',
  accent: '#303030', accentForeground: '#ececec',
  border: '#383838', input: '#383838', ring: BLUE,
  midground: BLUE, composerRing: '#424242',
  destructive: '#f4645f', destructiveForeground: '#ffffff',
  sidebarBackground: '#1c1c1c', sidebarBorder: 'transparent',
  userBubble: '#1f4b99', userBubbleBorder: '#1f4b99'
}

const T = ':root[data-hermes-theme="chatgpt"]'
const HAIR = 'color-mix(in srgb, var(--dt-foreground) 9%, transparent)'
const HOVER = 'color-mix(in srgb, var(--dt-foreground) 8%, transparent)'

const customCSS = `
/* ========== 1. Surfaces + tokens ========== */
${T} {
  --ui-bg-chrome: #f9f9f9; --ui-bg-sidebar: #f9f9f9; --ui-bg-editor: #ffffff;
  --ui-bg-elevated: #ffffff; --ui-bg-input: #f4f4f4;
  --radius: .875rem; --radius-scalar: .5;
  --conversation-text-base-size: .9rem;
  --conversation-tool-base-size: .8125rem;
  --conversation-caption-base-size: .8125rem;
  --conversation-base-line-height: 1.5rem;
  --conversation-turn-gap: 1rem;
  --turn-block-gap: 1rem;
  --paragraph-gap: .875rem;
  --message-text-indent: 0;
  --composer-width: 46rem;
  --composer-surface-pad-x: .875rem;
  --composer-surface-pad-y: .625rem;
  --composer-input-min-height: 2.25rem;
  --composer-control-size: 2rem;
  --composer-control-primary-size: 2rem;
  --composer-shell-pad-block-end: 1.25rem;
  --composer-fill: var(--dt-card);
  --shadow-composer: none;
}
${T}.dark {
  --ui-bg-chrome: #1c1c1c; --ui-bg-sidebar: #1c1c1c; --ui-bg-editor: #181818;
  --ui-bg-elevated: #262626; --ui-bg-input: #262626;
}
${T}, ${T} body, ${T} #root { background-color: var(--ui-bg-editor); }
${T} body { -webkit-font-smoothing: antialiased; }
${T} * { scrollbar-width: thin; scrollbar-color: color-mix(in srgb, var(--dt-foreground) 18%, transparent) transparent; }
${T} ::selection { background: color-mix(in srgb, ${BLUE} 28%, transparent); }
${T} button, ${T} a { transition: background-color .12s ease, color .12s ease, opacity .12s ease; }

/* No ALL-CAPS tracked labels and no monospace UI text (code keeps its font). */
${T} :is([class*="uppercase"], [role="tab"], [data-slot="pane-tab"], [data-panel-header], [data-slot="statusbar"]) {
  text-transform: none !important; letter-spacing: 0 !important;
}
${T} [class*="tracking-"] { letter-spacing: 0 !important; }
${T} [class*="font-mono"]:not(code):not(pre):not(pre *):not(kbd) { font-family: var(--dt-font-sans) !important; }

/* ========== 2. Sidebar ========== */
${T} [data-slot="sidebar"] { box-shadow: none; border: 0; }
${T} [data-slot="sidebar"] input { background: transparent; border: 0; }
${T} [data-slot="sidebar"] :is(a, button, [role="button"]) { border-radius: .625rem; }
${T} [data-slot="sidebar"] :is(a, button, [role="button"]):hover { background: ${HOVER}; }

/* nav: "New session" is the one prominent button, the rest are quiet rows */
${T} [data-slot="sidebar"] [data-sidebar="menu-button"] {
  height: 1.75rem; padding-inline: .625rem; gap: .625rem;
  font-size: .8125rem; font-weight: 450; color: var(--dt-muted-foreground);
  border-color: transparent;
}
${T} [data-slot="sidebar"] [data-sidebar="menu-button"]:hover { color: var(--dt-foreground); }
${T} [data-slot="sidebar"] [data-sidebar="menu-button"] svg { opacity: .7; }
${T} [data-slot="sidebar"] [data-sidebar="menu"] > :first-child [data-sidebar="menu-button"] {
  height: 2.5rem; font-size: .875rem; font-weight: 500; color: var(--dt-foreground);
  background: color-mix(in srgb, var(--dt-foreground) 7%, transparent);
  border-radius: .75rem; margin-bottom: .5rem;
}
${T} [data-slot="sidebar"] [data-sidebar="menu"] > :first-child [data-sidebar="menu-button"]:hover {
  background: color-mix(in srgb, var(--dt-foreground) 12%, transparent);
}
${T} [data-slot="sidebar"] [data-sidebar="menu-button"][data-active="true"] {
  background: color-mix(in srgb, var(--dt-foreground) 9%, transparent) !important;
  color: var(--dt-foreground) !important; box-shadow: none !important; outline: 0 !important;
}
${T} [data-slot="sidebar"] kbd { opacity: 0; }
${T} [data-slot="sidebar"] [data-sidebar="menu-button"]:hover kbd { opacity: .6; }

/* section headings ("Pinned", "Sessions", "Yesterday", "Cron jobs"): plain muted text */
${T} [data-slot="sidebar"] span[class*="uppercase"] {
  text-transform: none !important; letter-spacing: 0 !important; font-size: .75rem !important;
  font-weight: 500 !important; color: var(--dt-muted-foreground) !important; opacity: 1 !important;
}
${T} [data-slot="sidebar"] .dither { display: none !important; }
${T} [data-slot="sidebar"] span[aria-hidden="true"][class*="h-px"] { display: none !important; }
${T} [data-slot="sidebar"] [data-sidebar="separator"] { display: none; }

/* session rows: plain titles, age stamp only on hover */
${T} [data-slot="sidebar"] [data-sidebar="menu-item"], ${T} [data-slot="sidebar"] [data-working] { border-radius: .625rem; }
${T} [data-slot="sidebar"] time { opacity: 0; transition: opacity .12s; }
${T} [data-slot="sidebar"] [class*="group/"]:hover time { opacity: .6; }

/* running session: soft blue pulse + the status dot becomes a spinning ring */
@keyframes cgpt-spin { to { transform: rotate(360deg); } }
@keyframes cgpt-row { 0%,100% { background-color: color-mix(in srgb, ${BLUE} 6%, transparent); } 50% { background-color: color-mix(in srgb, ${BLUE} 14%, transparent); } }
${T} [data-slot="sidebar"] [data-working="true"] { animation: cgpt-row 1.8s ease-in-out infinite; color: var(--dt-foreground); }
${T} [data-slot="sidebar"] [data-working="true"] span[aria-hidden="true"].rounded-full[class*="size-1.5"] {
  width: .75rem; height: .75rem; box-sizing: border-box;
  background: transparent !important;
  border: 2px solid color-mix(in srgb, ${BLUE} 30%, transparent) !important;
  border-top-color: ${BLUE} !important; border-radius: 9999px;
  animation: cgpt-spin .8s linear infinite;
}
${T} [data-slot="sidebar"] [class*="bg-emerald"] { background-color: ${BLUE} !important; }
${T} [data-slot="sidebar"] [class*="text-emerald"] { color: ${BLUE} !important; }

/* profile rail at the bottom: quiet until hovered */
${T} [data-slot="profile-rail"] { opacity: .5; filter: saturate(.3); box-shadow: none; border: 0; transition: opacity .15s, filter .15s; }
${T} [data-slot="profile-rail"]:hover { opacity: 1; filter: none; }

/* ========== 3. Tabs (Sessions/Bots/Terminal, Files/Review, Uncommitted/Branch/Last turn) ========== */
${T} [role="tablist"] {
  background: color-mix(in srgb, var(--dt-foreground) 6%, transparent);
  border-radius: .75rem; padding: .1875rem; gap: .125rem; width: fit-content;
}
${T} [role="tab"] {
  font-size: .75rem !important; font-weight: 500; padding: .1875rem .625rem;
  border-radius: .5rem; box-shadow: none; color: var(--dt-muted-foreground);
}
${T} [role="tab"][aria-selected="true"] { color: var(--dt-foreground); background: var(--dt-background); box-shadow: 0 1px 2px rgba(0,0,0,.18); }
${T} [role="tab"]::before, ${T} [role="tab"]::after { display: none; }
${T} [data-slot="pane-tab"] { font-size: .875rem !important; font-weight: 500; max-width: 22rem; border-radius: .625rem; }
${T} [data-panel-header] { background: transparent; border: 0; }

/* ========== 4. Conversation ========== */
${T} [data-slot="aui_thread-viewport"] { scrollbar-gutter: stable both-edges; }
${T} [data-slot="aui_thread-content"] { max-width: 46rem; margin-inline: auto; padding: 2rem 1.5rem 3rem; }
${T} [data-slot="aui_turn-pair"] { margin-block: 1.25rem; }

/* assistant: plain text, no card */
${T} [data-slot="aui_assistant-message-root"] { background: transparent; border: 0; box-shadow: none; }
${T} [data-slot="aui_assistant-message-content"] { font-size: .9rem; line-height: 1.55; letter-spacing: 0; }
${T} [data-slot="aui_assistant-message-content"] > * + * { margin-top: var(--paragraph-gap); }
${T} [data-slot="aui_assistant-message-content"] strong { font-weight: 600; }
${T} [data-slot="aui_assistant-message-content"] :is(h1, h2, h3) { letter-spacing: -.01em; margin-top: 1.5rem; }
${T} [data-slot="aui_assistant-message-content"] :is(ul, ol) { padding-left: 1.25rem; }
${T} [data-slot="aui_assistant-message-content"] ul { list-style: disc; }
${T} [data-slot="aui_assistant-message-content"] ol { list-style: decimal; }
${T} [data-slot="aui_assistant-message-content"] li + li { margin-top: .375rem; }
${T} [data-slot="aui_assistant-message-content"] li::marker { color: var(--dt-muted-foreground); }
${T} [data-slot="aui_assistant-message-content"] a { text-underline-offset: 3px; }
${T} [data-slot="aui_assistant-message-content"] :is(table, th, td, li, blockquote) { font-size: .9rem; line-height: 1.5; }
${T} [data-slot="aui_assistant-message-content"] table { width: 100%; border-collapse: collapse; margin-block: .75rem; border: 1px solid ${HAIR}; border-radius: .75rem; overflow: hidden; }
${T} [data-slot="aui_assistant-message-content"] :is(th, td) { padding: .4rem .75rem; border-bottom: 1px solid ${HAIR}; }
${T} [data-slot="aui_assistant-message-content"] th { font-weight: 600; color: var(--dt-muted-foreground); text-align: left; }
${T} [data-slot="aui_assistant-message-content"] tr:last-child td { border-bottom: 0; }
${T} [data-slot="aui_assistant-message-content"] blockquote { border-left: 2px solid color-mix(in srgb, var(--dt-foreground) 20%, transparent); padding-left: .875rem; color: var(--dt-muted-foreground); }

/* user: compact blue bubble, white text, right-aligned */
${T} [data-slot="aui_user-message-root"] { align-items: flex-end; }
${T} [data-slot="aui_user-message-root"] .composer-human-message {
  width: fit-content; max-width: 80%; margin-left: auto;
  background: var(--dt-user-bubble) !important; color: #fff;
  border: 0; border-radius: 1rem; padding: .5rem .875rem; font-size: .875rem;
  box-shadow: none; backdrop-filter: none;
}
${T} [data-slot="aui_user-message-root"] .composer-human-message * { color: inherit; }
${T} [data-slot="aui_user-message-root"] [data-slot="aui_directive-chip"] {
  display: inline-flex; align-items: center; gap: .4rem;
  background: transparent; border: 0; color: inherit; font-size: .8125rem; padding: 0;
}

/* action row under a reply (time, copy, branch, retry): hidden until hover */
${T} [data-slot="aui_msg-actions"] { opacity: 0; transition: opacity .15s ease; gap: .25rem; }
${T} [data-slot="aui_msg-actions"] * { font-size: .75rem; }
${T} :is([data-slot="aui_message-group"], [data-slot="aui_assistant-message-root"]):is(:hover, :focus-within) [data-slot="aui_msg-actions"] { opacity: .8; }
${T} [data-slot="aui_turn-duration"], ${T} [data-slot="timeline-timestamp"] { opacity: .6; }

/* thinking: muted "Thought for Ns" header, body sizes to content up to ~9rem then scrolls */
${T} [data-slot="aui_thinking-disclosure"] { margin-block: .25rem; }
${T} [data-slot="aui_thinking-disclosure"] > :first-child { font-size: .875rem; color: var(--dt-muted-foreground); }
${T} [data-slot="aui_thinking-body"] {
  max-height: 9rem; overflow-y: auto; overscroll-behavior: contain;
  padding: .75rem .875rem; border-radius: .875rem;
  background: color-mix(in srgb, var(--dt-foreground) 4%, transparent);
  scrollbar-width: none;
}
${T} [data-slot="aui_thinking-body"]::-webkit-scrollbar { display: none; }
${T} [data-slot="aui_reasoning-text"] { font-size: .8125rem; line-height: 1.55; color: var(--dt-muted-foreground); }
${T} [data-slot="aui_reasoning-text"] p + p { margin-top: .5rem; }

/* activity rows ("Ran commands", "Worked for ...") */
${T} [data-slot="aui_turn-activity"] { font-size: .8125rem; color: var(--dt-muted-foreground); }
${T} [data-slot="tool-block"] { border: 0; background: transparent; box-shadow: none; padding-block: .125rem; font-size: .8125rem; color: var(--dt-muted-foreground); }

/* code, errors, diffs */
${T} [data-slot="code-card"] { border-radius: 1rem; box-shadow: none; overflow: hidden; border-color: transparent; background: var(--dt-muted); }
${T} [data-slot="aui_error-details"], ${T} [data-slot="aui_content-refused"] { border-radius: 1rem; border-color: transparent; background: var(--dt-muted); }
${T} [data-slot="file-diff-panel"] { border-radius: 1rem; }

/* timeline ticks at the right edge: nearly invisible until hovered */
${T} [data-slot="thread-timeline"] { opacity: .2; transition: opacity .2s; }
${T} [data-slot="thread-timeline"]:hover { opacity: 1; }

/* streaming reply: pulsing dot at the end; loading line shimmers */
@keyframes cgpt-pulse { 0%,100% { transform: scale(.7); opacity: .45; } 50% { transform: scale(1); opacity: 1; } }
@keyframes cgpt-ring { 0%,100% { box-shadow: 0 0 0 0 transparent; } 50% { box-shadow: 0 0 0 3px color-mix(in srgb, ${BLUE} 35%, transparent); } }
@keyframes cgpt-sweep { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
${T} [data-slot="aui_assistant-message-root"]:has([data-message-streaming="true"]) [data-slot="aui_assistant-message-content"]::after {
  content: ""; display: inline-block; width: .6rem; height: .6rem; margin-left: .35rem;
  border-radius: 9999px; background: var(--dt-foreground); vertical-align: middle;
  animation: cgpt-pulse 1.1s ease-in-out infinite;
}
${T} [data-slot="aui_response-loading"] {
  background: linear-gradient(90deg, var(--dt-muted-foreground) 0%, var(--dt-foreground) 50%, var(--dt-muted-foreground) 100%);
  background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: cgpt-sweep 2s linear infinite;
}

/* welcome screen: one centred line */
${T} [data-slot="aui_intro"] > div > * { display: none; }
${T} [data-slot="aui_intro"] > div::after {
  content: "What should we work on?"; display: block; text-align: center;
  font-size: 2rem; line-height: 1.25; font-weight: 500; letter-spacing: -.015em; color: var(--dt-foreground);
}

/* ========== 5. Composer ========== */
${T} [data-slot="composer-dock"] { padding-inline: 1.5rem; }
${T} [data-slot="composer-root"] { width: min(46rem, 100%); max-width: 46rem; margin-inline: auto; }
${T} [data-slot="composer-surface"] {
  border-radius: 1.25rem; border: 1px solid ${HAIR};
  background: var(--dt-card); box-shadow: none;
}
${T} [data-slot="composer-surface"]::before, ${T} [data-slot="composer-surface"]::after { border-radius: inherit; }
${T} [data-slot="composer-rich-input"] { font-size: .9rem; line-height: 1.6; max-height: 12rem; }
${T} [data-slot="composer-surface"] button { border-radius: 9999px; }

/* primary round button (send / voice): Codex blue; stop square stays neutral */
${T} [data-slot="composer-surface"] button[class*="bg-foreground"] { background-color: ${BLUE} !important; color: #fff !important; }
${T} [data-slot="composer-surface"] button[class*="bg-foreground"]:hover { background-color: #2f6fe0 !important; }
${T} [data-slot="composer-surface"] button[class*="bg-foreground"]:disabled { background-color: color-mix(in srgb, ${BLUE} 35%, transparent) !important; }
${T} [data-slot="composer-surface"] button[class*="bg-foreground"]:has(> span.block) {
  background-color: var(--dt-foreground) !important; color: var(--dt-background) !important;
  animation: cgpt-pulse 1.4s ease-in-out infinite;
}
/* while a turn runs (stop square visible) the composer breathes blue */
${T} [data-slot="composer-surface"]:has(button[type="submit"] > span.block) { animation: cgpt-ring 1.8s ease-in-out infinite; }

/* git / status strip above the input */
${T} [data-slot="composer-status-stack"] {
  opacity: .6; background: transparent; box-shadow: none; margin: 0;
  padding: .125rem .75rem; border: 0; border-bottom: 1px solid ${HAIR};
  transition: opacity .15s;
}
${T} [data-slot="composer-status-stack"] * { font-size: .75rem; }
${T} [data-slot="composer-dock"]:hover [data-slot="composer-status-stack"], ${T} [data-slot="composer-status-stack"]:focus-within { opacity: 1; }

/* pasted content / attachment chips */
${T} [data-slot="composer-attachments"] { padding: .625rem .75rem 0; gap: .5rem; flex-wrap: wrap; }
${T} [data-slot="composer-attachments"] > * {
  max-width: 100%; min-width: 0; padding: .375rem .625rem;
  border-radius: .875rem; border: 1px solid ${HAIR};
  background: color-mix(in srgb, var(--dt-foreground) 4%, transparent);
}
${T} [data-slot="composer-attachments"] * { min-width: 0; }
${T} [data-slot="composer-attachments"] [class*="truncate"] { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
${T} [data-slot="composer-attachments"] [class*="truncate"]:last-child { color: var(--dt-muted-foreground); font-size: .6875rem; max-width: 14rem; }

/* scroll-to-bottom: round button */
${T} [data-chat-surface] button[aria-label*="bottom" i] {
  width: 2rem; height: 2rem; border-radius: 9999px;
  background: var(--dt-foreground); color: var(--dt-background); border: 0;
  box-shadow: 0 4px 16px rgba(0,0,0,.35);
}

/* ========== 6. Right inspector: floating card (Codex "Changes / Sources") ========== */
${T} [data-tree-group="grp-files"], ${T} [data-tree-group="grp-review"] {
  margin: 3rem .5rem .5rem 0; border-radius: 1rem; overflow: hidden;
  background: var(--dt-card); border: 1px solid ${HAIR};
}
${T} [data-pane-host] :is(p, div)[class*="text-center"] { opacity: .5; font-size: .75rem; }

/* ========== 7. Footer status bar ========== */
${T} [data-slot="statusbar"] { background: transparent; border: 0; box-shadow: none; font-size: .6875rem; opacity: .6; transition: opacity .15s ease; }
${T} [data-slot="statusbar"]:hover { opacity: 1; }
${T} [data-slot="statusbar"] button { border-radius: .5rem; }
${T} [class*="hermes-newswire-ticker"] { display: none; }

/* ========== 8. Menus, popovers, dialogs, tooltips ========== */
${T} :is([data-slot="popover-content"], [data-slot="dropdown-menu-content"], [data-slot="context-menu-content"], [data-slot="dropdown-menu-sub-content"], [data-slot="composer-completion-drawer"]) {
  background: var(--dt-popover); border: 1px solid ${HAIR};
  border-radius: 1rem; padding: .25rem; font-size: .8125rem;
  box-shadow: 0 12px 40px rgba(0,0,0,.35);
}
${T} [data-slot="dropdown-menu-item"] {
  font-size: .8125rem; font-family: var(--dt-font-sans);
  padding: .4375rem .625rem; border-radius: .625rem; min-height: 2rem;
}
${T} [data-slot="dropdown-menu-item"][data-highlighted] { background: ${HOVER}; }
${T} [data-slot="dropdown-menu-item"] .codicon { opacity: .75; }
${T} [data-slot="dropdown-menu-label"] {
  font-size: .75rem !important; font-weight: 400 !important; color: var(--dt-muted-foreground) !important;
  padding: .5rem .625rem .25rem !important;
}
${T} [data-slot="dropdown-menu-separator"] { margin: .25rem 0; background: ${HAIR}; }
${T} [data-slot="dialog-content"] { border-radius: 1.5rem; box-shadow: 0 24px 70px rgba(0,0,0,.22); }
${T} [data-slot="dialog-overlay"] { backdrop-filter: blur(3px); }
${T} [data-slot="tooltip-content"] {
  background: var(--dt-popover); color: var(--dt-foreground); border: 1px solid ${HAIR};
  border-radius: .875rem; padding: .5rem .75rem; font-size: .75rem; box-shadow: 0 8px 24px rgba(0,0,0,.35);
}
${T} :is(input, textarea, [data-slot="searchable-select-trigger"]) { border-radius: .75rem; }

/* model picker (dropdown with a search field). Model rows are SUB-TRIGGERS, not items;
   effort/variant chips are plain data-slot="badge". Scoped to the picker via :has(search). */
${T} [data-slot="dropdown-menu-content"]:has([data-slot="dropdown-menu-search"]) { width: 22rem; min-width: 22rem; }
${T} [data-slot="dropdown-menu-search"] { padding: .5rem .75rem; border-bottom: 1px solid ${HAIR}; margin-bottom: .25rem; box-shadow: none !important; }
${T} [data-slot="dropdown-menu-search"] input { font-size: .8125rem; height: 1.25rem; }
${T} [data-slot="dropdown-menu-content"]:has([data-slot="dropdown-menu-search"]) :is([data-slot="dropdown-menu-sub-trigger"], [data-slot="dropdown-menu-item"]) {
  font-size: .8125rem; font-family: var(--dt-font-sans); color: var(--dt-foreground);
  padding: .3125rem .625rem; border-radius: .625rem; min-height: 1.75rem; gap: .5rem;
}
${T} [data-slot="dropdown-menu-content"]:has([data-slot="dropdown-menu-search"]) :is([data-slot="dropdown-menu-sub-trigger"], [data-slot="dropdown-menu-item"]):is(:focus, [data-highlighted], [data-state="open"], [data-kb-active]) {
  background: ${HOVER} !important; color: var(--dt-foreground) !important;
}
/* star on each row: hidden until the row is hovered, like Codex's plain list */
${T} [data-slot="dropdown-menu-sub-trigger"] > [data-slot="tooltip-trigger"]:first-child,
${T} [data-slot="dropdown-menu-sub-trigger"] > button[aria-pressed="false"]:first-child { opacity: 0; }
${T} [data-slot="dropdown-menu-sub-trigger"]:hover > :first-child { opacity: 1; }
/* provider headings ("LongCat", "Nous Portal") are items with the group/label class */
${T} [data-slot="dropdown-menu-item"][class*="group/label"] {
  font-size: .75rem !important; font-weight: 400 !important; color: var(--dt-muted-foreground) !important;
  min-height: 1.5rem !important; padding: .625rem .625rem .125rem !important; background: transparent !important;
}
${T} [data-slot="dropdown-menu-item"][class*="group/label"] * { font-size: inherit; }
/* effort / variant chips (Med, XHigh, Ultra) */
${T} [data-slot="dropdown-menu-content"] [data-slot="badge"] {
  text-transform: none !important; letter-spacing: 0 !important;
  border-radius: .5rem; font-size: .6875rem; font-weight: 400; line-height: 1.1rem; padding: 0 .4rem; height: auto;
  background: transparent; color: var(--dt-muted-foreground);
  border: 1px solid color-mix(in srgb, var(--dt-foreground) 16%, transparent);
}
${T} [data-slot="dropdown-menu-sub-trigger"] .codicon { opacity: .7; }
${T} [data-slot="dropdown-menu-item"] [class*="bg-(--ui-green)"] { background: transparent; color: var(--dt-muted-foreground); }
${T} [data-slot="dropdown-menu-content"] [class*="text-[0.62rem]"] { font-size: .6875rem !important; color: var(--dt-muted-foreground); }
${T} [data-slot="dropdown-menu-content"] [class*="rounded-full"][class*="bg-primary"] { background: ${BLUE} !important; }
/* the model's own submenu (efforts / fast) */
${T} [data-slot="dropdown-menu-sub-content"] :is([data-slot="dropdown-menu-item"], [data-slot="dropdown-menu-sub-trigger"]) { font-size: .8125rem; border-radius: .625rem; padding: .4375rem .625rem; }


/* context usage panel (composer meter popover): Codex "Usage" card */
${T} [data-slot="context-usage-panel"] { width: 17rem; gap: .625rem; padding: .75rem .875rem; font-size: .8125rem; }
${T} [data-slot="context-usage-panel"] > div:first-child > p { font-size: .75rem; font-weight: 400; color: var(--dt-muted-foreground); }
${T} [data-slot="context-usage-panel"] li { padding-block: .125rem; }
${T} [data-slot="context-usage-panel"] li span[class*="text-muted-foreground"] { color: var(--dt-foreground); }
${T} [data-slot="context-usage-panel"] li > span:last-child { color: var(--dt-muted-foreground); }
${T} [data-slot="context-usage-bar"] { height: .375rem; border-radius: 9999px; overflow: hidden; background: color-mix(in srgb, var(--dt-foreground) 10%, transparent); }
${T} [data-slot="context-compact"] { border-top: 1px solid ${HAIR}; padding-top: .625rem; }
${T} [data-slot="context-compact"] button { justify-content: flex-start; border-radius: .625rem; font-size: .8125rem; }


/* sidebar status dots: idle sessions show NO dot (Codex rows are bare titles);
   unread / working / waiting / stalled keep theirs, in Codex blue */
${T} [data-slot="sidebar"] span[aria-hidden="true"].size-1.rounded-full { visibility: hidden; }
${T} [data-slot="sidebar"] span[aria-hidden="true"][class*="bg-(--ui-success)"] { background-color: ${BLUE} !important; }

/* streaming dot sits inline at the end of the last line, not on its own row */
${T} [data-slot="aui_assistant-message-root"]:has([data-message-streaming="true"]) [data-slot="aui_assistant-message-content"] > :last-child { display: inline; }


/* ========== 9. Composer pills: model + effort (Codex "GPT-6.1 Sol Light ⌄") ========== */
/* both pills: one quiet rounded chip each, foreground text, soft hover */
${T} [data-slot="composer-surface"] :is([data-tour="model-pill"], [data-testid="reasoning-pill"]) {
  height: 1.875rem; padding-inline: .625rem; gap: .3rem; border-radius: 9999px;
  font-size: .8125rem; font-weight: 500; color: var(--dt-foreground);
  background: transparent;
}
${T} [data-slot="composer-surface"] :is([data-tour="model-pill"], [data-testid="reasoning-pill"]):hover,
${T} [data-slot="composer-surface"] :is([data-tour="model-pill"], [data-testid="reasoning-pill"])[data-state="open"] {
  background: ${HOVER}; color: var(--dt-foreground);
}
/* effort reads as the model's lighter suffix ("Sol Light"), like Codex */
${T} [data-slot="composer-surface"] [data-testid="reasoning-pill"] { color: var(--dt-muted-foreground); font-weight: 400; margin-left: -.375rem; }
${T} [data-slot="composer-surface"] :is([data-tour="model-pill"], [data-testid="reasoning-pill"]) svg { opacity: .55; }

/* effort / options menu: compact card */
${T} [data-slot="dropdown-menu-content"]:has([data-slot="dropdown-menu-radio-group"]):not(:has([data-slot="dropdown-menu-search"])) {
  width: 15rem; min-width: 15rem; padding: .375rem;
}
/* Effort levels as a segmented row (Low · Medium · High …) instead of a tall list */
${T} [data-slot="dropdown-menu-radio-group"] {
  display: flex; flex-wrap: wrap; gap: .1875rem; margin: .25rem .25rem .375rem;
  padding: .1875rem; border-radius: .75rem;
  background: color-mix(in srgb, var(--dt-foreground) 7%, transparent);
}
${T} [data-slot="dropdown-menu-radio-item"] {
  flex: 1 1 auto; justify-content: center; text-align: center;
  min-height: 1.75rem; padding: .25rem .5rem !important; border-radius: .5rem;
  font-size: .75rem; color: var(--dt-muted-foreground);
}
${T} [data-slot="dropdown-menu-radio-item"] > span:first-child { display: none; }
${T} [data-slot="dropdown-menu-radio-item"][data-state="checked"] {
  background: ${BLUE} !important; color: #fff !important; font-weight: 500;
}
${T} [data-slot="dropdown-menu-radio-item"][data-state="checked"] .codicon { display: none; }
${T} [data-slot="dropdown-menu-radio-item"][data-highlighted]:not([data-state="checked"]) { background: ${HOVER}; color: var(--dt-foreground); }
/* option rows with switches (Thinking, Fast, …) */
${T} [data-slot="dropdown-menu-content"] [data-slot="dropdown-menu-item"]:has([data-slot="switch"]) { min-height: 2rem; }
${T} [data-slot="switch"] { border: 0; box-shadow: none; background: color-mix(in srgb, var(--dt-foreground) 18%, transparent); }
${T} [data-slot="switch"][data-state="checked"] { background: ${BLUE}; }
${T} [data-slot="switch-thumb"] { background: #fff; }

/* ========== 10. Final polish ========== */
/* consistent focus ring (keyboard only) */
${T} :is(button, [role="button"], [role="menuitem"], [role="tab"], a):focus-visible {
  outline: 2px solid color-mix(in srgb, ${BLUE} 70%, transparent); outline-offset: 2px; box-shadow: none;
}
/* model / effort pinned-dot: blue */
${T} [data-testid="model-pinned-dot"] { background: ${BLUE} !important; }
/* menus open with a short, calm fade+lift */
@keyframes cgpt-pop { from { opacity: 0; transform: translateY(4px) scale(.985); } to { opacity: 1; transform: none; } }
${T} :is([data-slot="dropdown-menu-content"], [data-slot="popover-content"], [data-slot="context-menu-content"])[data-state="open"] {
  animation: cgpt-pop .14s cubic-bezier(.16,1,.3,1);
}
/* inline code in replies: soft chip, not a hard box */
${T} [data-slot="aui_assistant-message-content"] :not(pre) > code {
  font-size: .82em; padding: .1em .35em; border-radius: .375rem;
  background: color-mix(in srgb, var(--dt-foreground) 8%, transparent); border: 0;
}
/* headings rhythm */
${T} [data-slot="aui_assistant-message-content"] h1 { font-size: 1.25rem; font-weight: 600; }
${T} [data-slot="aui_assistant-message-content"] h2 { font-size: 1.0625rem; font-weight: 600; }
${T} [data-slot="aui_assistant-message-content"] h3 { font-size: .95rem; font-weight: 600; }
${T} [data-slot="aui_assistant-message-content"] hr { border: 0; height: 1px; background: ${HAIR}; margin-block: 1.25rem; }
/* light mode: the dark user bubble would be too heavy; Codex light uses a calm grey */
${T}:not(.dark) [data-slot="aui_user-message-root"] .composer-human-message { background: #f1f1f1 !important; color: #0d0d0d; }
${T}:not(.dark) [data-slot="composer-surface"] { box-shadow: 0 1px 2px rgba(0,0,0,.04), 0 4px 16px rgba(0,0,0,.05); }

@media (prefers-reduced-motion: reduce) {
  ${T} * { animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
}
`

const theme = {
  name: 'chatgpt',
  label: 'ChatGPT Style',
  description: 'Clean, minimal ChatGPT / Codex-inspired look',
  colors: light,
  darkColors: dark,
  typography: { fontSans: FONT, fontMono: MONO, baseSize: '15px', lineHeight: '1.6', letterSpacing: '0' },
  customCSS
}

export default {
  id: 'chatgpt-style',
  name: 'ChatGPT Style',
  description: 'Adds a sleek ChatGPT / Codex-inspired theme (light + dark).',
  register(ctx) {
    ctx.register({ id: 'theme', area: THEMES_AREA, data: theme })
    ctx.register({
      id: 'apply',
      area: PALETTE_AREA,
      data: {
        id: 'chatgptStyle.apply',
        label: 'Theme: switch to ChatGPT Style',
        keywords: ['chatgpt', 'codex', 'openai', 'theme', 'sleek'],
        run: () => { requestTheme('chatgpt') }
      }
    })
  }
}
