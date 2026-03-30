Video Script (3–5 min)
Hi everyone, this is a walkthrough of my Employee Onboarding Form project built with Angular and Kendo UI for Angular.

This app is a multi-step onboarding wizard for HR or internal operations. It guides a new hire through six steps:

Personal Information,
Job Details,
Tax/Payroll placeholders,
Equipment and Access Requests,
Policies and Agreements, and
Review and Submit.
The experience is intentionally guided and safe. It includes step validation, progress indicators, clean error messaging, local draft saving, and a success screen after submission. It’s frontend-only right now, so there’s no real backend submission yet.

To generate this, I used the Kendo UI Generator MCP server with Cursor.
The prompt started with:

“Build a modern web app called Employee Onboarding Form… create a multi-step employee onboarding flow with progress, validation, local save, accessible labels, reusable components, and a review/submit step.”

That exact prompt is documented in both README.md and docs/cursor_employee_onboarding_form_structu.md.

What the MCP server did for us was accelerate the UI architecture and component composition. It helped scaffold the flow using Kendo components like Stepper, ProgressBar, FormField patterns, DatePicker, DropDownList, MultiSelect, and checkbox agreements. It also guided styling and accessibility-oriented structure so the generated baseline was production-minded instead of just a visual mock.

For generation time, I’d say:
Initial generation and scaffolding took about 10 minutes then refinement/debugging took additional time, but all under 30.

Now for a quick walkthrough of the app behavior.

On launch, users land in the onboarding wizard. They can’t skip ahead if earlier required fields are invalid. There’s a visible stepper and an overall progress bar so completion feels clear. Each step focuses on one concern: personal details, role details, payroll placeholders, equipment/access needs, policy acknowledgements, and final review.

A key feature is draft persistence. The form state is saved locally, so if the user refreshes or navigates away, progress can be restored. The tax/payroll step is clearly marked as mock/demo for safe handling during prototyping.

On submit, the app shows a success state and clears the local draft. The README also calls out where to integrate real APIs later, especially in the submit handler and for secure payroll data flows.

I also validated implementation standards using the Angular MCP server output in docs/angular-best-practices.md.
Best practices applied and checked include:

standalone Angular architecture and lazy loading,
reactive forms,
strong typing guidance and minimizing any,
accessibility requirements aligned with WCAG/AXE expectations,
and maintainable component/service structure.
So overall, this project demonstrates two things:

what the onboarding app does from an end-user perspective, and
how AI-assisted generation with MCP servers can speed up high-quality Angular UI development while still keeping best-practice guardrails in place.
Thanks for watching.