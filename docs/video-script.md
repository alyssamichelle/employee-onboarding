Video Script (3–5 min)
Hi everyone, this is a walkthrough of my Employee Onboarding Form project built with Angular and Kendo UI for Angular.  
[Show code: `src/app/onboarding/onboarding-wizard.component.ts` lines 39-58]

This app is a multi-step onboarding wizard for HR or internal operations. It guides a new hire through six steps: Personal Information, Job Details, Tax/Payroll placeholders, Equipment and Access Requests, Policies and Agreements, and Review and Submit. The experience is intentionally guided and safe, with validation, progress indicators, clean error messaging, local draft saving, and a success screen after submission. It is frontend-only right now, so there is no real backend submission yet.  
[Show app: Launch the wizard and click through the six step labels in the stepper]

To generate this, I used the Kendo UI Generator MCP server with Cursor. The prompt started with: "Build a modern web app called Employee Onboarding Form... create a multi-step employee onboarding flow with progress, validation, local save, accessible labels, reusable components, and a review/submit step."  
[Show code/docs: `README.md` prompt section, then `docs/cursor_employee_onboarding_form_structu.md`]

That exact prompt is documented in both `README.md` and `docs/cursor_employee_onboarding_form_structu.md`.  
[Show code/docs: `README.md` and `docs/cursor_employee_onboarding_form_structu.md`]

What the MCP server did for us was accelerate the UI architecture and component composition. It helped scaffold the flow using Kendo components like Stepper, ProgressBar, FormField patterns, DatePicker, DropDownList, MultiSelect, and checkbox agreements. It also guided styling and accessibility-oriented structure so the generated baseline was production-minded instead of just a visual mock.  
[Show code: `src/app/onboarding/onboarding-wizard.component.html` lines 39-57 and lines 89-108]

For generation time, I would say initial generation and scaffolding took about 10 minutes, then refinement and debugging took additional time, but still under 30 total.  
[Show app: Quick pan across completed UI and form steps]

Now for a quick walkthrough of the app behavior.  
[Show app: Start from step 1 with empty form]

On launch, users land in the onboarding wizard. They cannot skip ahead if earlier required fields are invalid. There is a visible stepper and an overall progress bar so completion feels clear. Each step focuses on one concern: personal details, role details, payroll placeholders, equipment/access needs, policy acknowledgements, and final review.  
[Show code: `src/app/onboarding/onboarding-wizard.component.ts` lines 145-185 and `src/app/onboarding/onboarding-wizard.component.html` lines 39-57]

A key feature is draft persistence. The form state is saved locally, so if the user refreshes or navigates away, progress can be restored. The tax/payroll step is clearly marked as mock/demo for safe handling during prototyping.  
[Show code: `src/app/onboarding/onboarding-wizard.component.ts` lines 127-143 and lines 336-345, then `src/app/onboarding/onboarding-storage.service.ts` lines 15-42]

For demo applications like this one, it is handy to move through fields quickly to test the rest of the wizard. That is why I added a Populate this step button in the footer that fills only the step currently on screen with placeholder values. You can move through the flow quickly and still see validation, dropdowns, and multiselect behavior, because sample values come from the same option lists used by the form.  
[Show code: `src/app/onboarding/onboarding-wizard.component.html` lines 123-131, `src/app/onboarding/onboarding-wizard.component.ts` lines 200-253, and `src/app/onboarding/onboarding-options.ts` lines 1-40]

On submit, the app shows a success state and clears the local draft. The README also calls out where to integrate real APIs later, especially in the submit handler and for secure payroll data flows.  
[Show code: `src/app/onboarding/onboarding-wizard.component.ts` lines 187-198 and `src/app/onboarding/onboarding-wizard.component.html` lines 1-24; then show `README.md` API integration notes]

I also validated implementation standards using the Angular MCP server output in `docs/angular-best-practices.md`. Best practices applied and checked include standalone Angular architecture and lazy loading, reactive forms, strong typing guidance with minimal any usage, accessibility requirements aligned with WCAG/AXE expectations, and maintainable component/service structure.  
[Show code/docs: `docs/angular-best-practices.md`, plus `src/app/onboarding/onboarding-wizard.component.ts` lines 90-125]

So overall, this project demonstrates two things: what the onboarding app does from an end-user perspective, and how AI-assisted generation with MCP servers can speed up high-quality Angular UI development while still keeping best-practice guardrails in place. Thanks for watching.  
[Show app: Final pass from first step to success screen]