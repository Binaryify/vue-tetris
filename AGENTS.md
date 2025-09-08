# Repository Guidelines

## Project Structure & Module Organization
- Source code: `src/` (entry `main.js`, root `App.vue`).
- UI components: `src/components/<feature>/{index.vue,index.js,index.less}` (kebab‑case dirs).
- State: `src/vuex/` (`store.js`, `mutations.js`).
- Game logic/utilities: `src/control/`, `src/unit/`.
- Assets: `src/assets/` (bundled) and `static/` (copied as‑is).
- Build config: `build/`, `config/`. Docs site in `docs/`.

## Build, Test, and Development Commands
- `npm install` — install dependencies.
- `npm run dev` (or `npm start`) — start webpack dev server with HMR at `http://localhost:8080`.
- `npm run build` — production build to `dist/` with minification and hashed assets.
Tips: Change dev port, public paths, or gzip in `config/index.js`.

## Coding Style & Naming Conventions
- EditorConfig enforced: 2‑space indent, LF endings, trim trailing whitespace.
- Vue SFCs use `<script>` ES2015 modules and Less styles.
- Components live in kebab‑case directories, use `index.vue|js|less` pattern (e.g., `src/components/matrix/index.vue`).
- Prefer small, focused components; keep render‑only logic in components and game/state logic in `control/`, `unit/`, or Vuex.

## Testing Guidelines
- No automated test runner is configured. Perform manual QA:
  - Run `npm run dev`, verify keyboard/touch controls, pause/resume, line clears, level/speed changes, and audio.
  - Check Vuex state via Vue DevTools; ensure no console errors.
- If adding tests, propose tooling (e.g., Jest + vue-jest) in a separate PR.

## Commit & Pull Request Guidelines
- Commits: concise, imperative mood (e.g., "fix keyboard repeat on iOS").
  - Optional scope: `components/matrix`, `vuex`, `control`, etc.
- PRs should include:
  - Clear description, rationale, and affected areas.
  - Repro steps and before/after screenshots or GIFs for UI changes.
  - Linked issue(s), if any. Ensure `npm run build` succeeds.

## Security & Configuration Tips
- Do not commit secrets. Environment/build switches live in `config/*.js`.
- Large binaries belong in releases, not `src/` or `static/`.
- Keep bundle size reasonable; prefer `src/assets/` for processed assets.

## Agent-Specific Instructions
- Follow this guide and `.editorconfig`. Keep changes minimal and scoped. Match existing file patterns and naming.
