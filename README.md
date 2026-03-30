# Employee Onboarding Form

A multi-step **Employee Onboarding Form** for HR or internal operations, built with [Angular](https://angular.dev) and [Kendo UI for Angular](https://www.telerik.com/kendo-angular-ui). The flow includes validation, step navigation, local draft persistence, and a success screen after submit (demo only — no backend).

## Prerequisites

- Node.js (LTS recommended)
- npm (project uses npm 11+)

## Setup

```bash
npm install
```

## Run locally

```bash
npm start
```

Open `http://localhost:4200/`. The default route loads the onboarding wizard.

## Build

```bash
npm run build
```

Output is written to `dist/employee-onboarding-form`.

## Tests

```bash
npm test
```

This project uses the Angular CLI’s **Vitest** integration. If the CLI reports missing browser packages for your environment, install the suggested `@vitest/browser-*` package from the error message, or run tests in the IDE using the configured test target.

## Kendo UI license

Kendo UI is a commercial product. For development, follow [Kendo UI licensing](https://www.telerik.com/kendo-angular-ui/my-license/): install a license key or use trial terms as documented by Progress. You can call `setLicenseKey` from `@progress/kendo-licensing` in `main.ts` when you have a key.

## Integrating real APIs later

| Area | Where to integrate |
|------|-------------------|
| **Submit handler** | `OnboardingWizardComponent.submit()` in `src/app/onboarding/onboarding-wizard.component.ts` — replace the demo `storage.clear()` + `submitted.set(true)` with an HTTP call (e.g. `HttpClient.post`) to your HRIS or workflow API. |
| **Sensitive payroll data** | `TaxPayrollStepComponent` uses placeholder fields on purpose. In production, collect tax and banking details through your payroll provider’s secure flow or tokenized fields, not plain text in a generic form. |
| **Auth** | Add `HttpClient` interceptors (or `provideHttpClient(withInterceptors(...))`) for tokens and correlate submissions with the signed-in user. |
| **Draft sync** | `OnboardingStorageService` (`src/app/onboarding/onboarding-storage.service.ts`) persists to `localStorage`. Swap or extend this with server-backed drafts (user id + version) if users switch devices. |

Storage key: `employee-onboarding-form-draft-v1` (see `ONBOARDING_STORAGE_KEY`).

## Project structure (high level)

- `src/app/onboarding/onboarding-wizard.component.*` — shell: stepper, progress bar, navigation, submit, success screen, autosave.
- `src/app/onboarding/steps/` — one component per step (personal, job, tax, equipment, policies, review).
- `src/app/onboarding/onboarding-storage.service.ts` — load/save/clear draft JSON.
- `src/app/onboarding/onboarding-options.ts` — shared dropdown/multiselect option lists.
- `src/styles.css` — Kendo Default theme, theme utils, and app-level CSS variables.

## Security note

This app is intentionally **frontend-only**. Do not paste real tax IDs, bank account numbers, or other regulated data unless the app is wired to secure, approved endpoints and meets your organization’s compliance requirements.
