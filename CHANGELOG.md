### Releases

## 2026-06-22 — Transferencias auto-sync

- New Cloud Function `transferenciasInbound` (onSchedule, 5 min)
- BICE regex parser + MiniMax M3 LLM fallback
- Score-based auto-apply (≥95) + admin inbox for ambiguous matches
- New collections: `transferenciaLog`, `transferenciasSinMatch`
- New admin page: `/admin/transferencias`
- New `rut` field on `Cliente` (used for matching)
- See `docs/superpowers/specs/2026-06-21-transferencias-auto-sync-design.md`

## v3.0.0

###### _Mar 2, 2025_

- React: update to v19
- Vite: update to v6
- MUI: update to v6
- React Router: update to v7
- Jotai: replace Recoil with Jotai
- Notifications: add alert system with MUI Toolpad integration
- TypeScript: update to the latest version

## v2.3.0

###### _Dec 23, 2023_

- packages: update all packages
- env: add environmental variables
- tests: add unit tests (`vitest`) and e2e tests (`playwright`)
- github actions: add github actions

## v2.2.0

###### _Dec 23, 2023_

- packages: update all packages
  - Vite 5 ✅
- replace `Alt + /` with `Alt + k` (there was an issue with detecting `/`)

## v2.1.0

###### _Oct 29, 2022_

- packages: update all packages
  - Vite 3 ✅

## v2.0.2

###### _May 28, 2022_

- packages: update all packages
- hotkeys: fix hotkeys' names

## v2.0.1

###### _Apr 18, 2022_

- packages: update `vite-plugin-pwa` to v0.11.3
- hotkeys: fix hotkeys' handlers
- dev-tool: add welcome message in the console

## v2.0.0

###### _Apr 18, 2022_

- ✅ Vite
- ✅ React v18
- ✅ TypeScript
- ✅ React Router v6
- ✅ MUI v5
- ✅ eslint
- ✅ prettier
- ✅ husky
- ✅ lint-staged
- ✅ https localhost

## v1.1.0

###### _Dec 6, 2020_

- package.json: update `recoil` version to 0.1.2
- components:
  - Divider: add property `withoutMargins`, change margins based on `orientation`
  - Loading: add first class property `position`
  - NotFound: add 404 gif from `giphy`, move from `Box` to `Fb`
  - Link: fix `export default` style
  - Fb: create flexbox component, replace all `Box` components with `Fb`
- utils: remove single entry point, use only direct paths for utils
- store: use atom effects in theme, style corrections

## v1.0.2

###### _Sep 7, 2020_

- lint: update eslint rules (make correction according to new rules)
- checks: add husky (pre-commit -> lint)

## v1.0.1

###### _June 30, 2020_

One with delayed fallback and "minimum" loading

- utils: redesign asyncComponentLoader, add delayed fallback and "minimum" loading

## v1.0.0

###### _June 19, 2020_

It's the first stable version of the template. It's going to become a solid foundation for your next React project.

- features: add notifications 🎉
- readme: update bundle size, fix image titles, add section for notifications, add examples

## v0.1.0

###### _June 19, 2020_

🎉 First release 🎉
