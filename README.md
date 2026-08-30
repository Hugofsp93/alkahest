# <img src="./docs/assets/icon.png" alt="" width="42" valign="middle"> Alkahest

**A lean, opinionated VS Code fork — built to be read, not just run.**

<p>
  <img src="https://img.shields.io/badge/status-work_in_progress-orange?style=for-the-badge" alt="Work in progress">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="MIT License"></a>
  <img src="https://img.shields.io/badge/built_with-Tauri_2-FFC131?style=for-the-badge&logo=tauri&logoColor=white" alt="Built with Tauri">
</p>

---

> **🚧 Work in progress.** Alkahest is a personal fork, actively being cut down from its upstream base. Nothing below is a promise about what exists in this repo *today* — it's the plan. See [Status](#status) for where things actually stand.

## What this is

Alkahest is a fork of [SideX](https://github.com/Sidenai/sidex) — itself a port of Visual Studio Code that swaps Electron for [Tauri](https://tauri.app/) — trimmed down to only the features actually used day to day.

It's not a performance project. Removing panels doesn't meaningfully change RAM or startup time — the weight was always the webview and the workbench, and that doesn't go away by cutting features. The point is **less code to read, review, and maintain alone.** A solo portfolio project needs a small, understandable surface far more than it needs another FPS counter.

## Why fork instead of just configuring VS Code / VSCodium?

Because the current setup already *is* VSCodium plus a pile of `settings.json` tweaks and styling extensions layered on top — a debugger that's never opened, a marketplace for extensions only ever used for theming, Git panels for actions already done faster in a terminal. Folding what's actually used into the fork itself, as fixed defaults instead of configuration, means less surface area to carry around and re-set-up.

## Scope

**Stays:**

| Area | What it does |
|---|---|
| Explorer | Open a folder, create / rename / delete files |
| Search | In-file and full-text search |
| Editor | Monaco, with per-extension language detection and syntax highlighting — no IntelliSense beyond what the language grammar already provides |
| Source Control | **Read-only** — status, diff, log. Seeing what changed, nothing more |
| Theme & icons | One opinionated color theme, file-icon theme, and product icon, built into the fork — not configurable, not a marketplace extension |

**Goes:**

- **Debugger** — never used; unfinished upstream anyway
- **Full extension host / marketplace** — the only "extensions" in real use today are styling, and those become fixed parts of the fork instead of installable plugins
- **Git write actions in the UI** — commit, push, pull, stash, branch, publish. Upstream's implementation is solid; this fork just doesn't surface it. Git stays a terminal tool

**Not now, maybe later:**

- Matching this theme to the OS shell theme (Omarchy / Hyprland) — separate idea, not evaluated yet
- Zed/Lapce-style GPU rendering — out of scope for a fork; would be a rewrite, not an evolution of this one

## Status

Actively being cut down from the upstream checkout. Nothing is stripped yet — Explorer, Search, editor, full Source Control (including the write actions being removed), the extension host, and the debugger are all still present as inherited from upstream. Follow the commit history for what's actually landed.

## Built on

Alkahest → fork of [SideX](https://github.com/Sidenai/sidex) → a Tauri port of [Visual Studio Code](https://github.com/microsoft/vscode).

Same stack throughout: Tauri (Rust) + the OS's native webview (WebKitGTK on Linux, WKWebView on macOS, WebView2 on Windows) + the VS Code TypeScript workbench.

## Getting Started

```bash
git clone https://github.com/Hugofsp93/alkahest.git
cd alkahest
npm install
npm run tauri dev
```

### Build from source

```bash
npm install
npx tauri build
```

First build takes 5–10 minutes (Rust compile time). No pre-built binaries are distributed.

## License

MIT. Alkahest carries forward the license chain from [Visual Studio Code (Code - OSS)](https://github.com/microsoft/vscode) and [SideX](https://github.com/Sidenai/sidex) — see [LICENSE](./LICENSE).
