import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@progress/kendo-angular-buttons';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { KENDO_CARD, KENDO_STEPPER, StepperActivateEvent } from '@progress/kendo-angular-layout';
import { KENDO_PROGRESSBAR } from '@progress/kendo-angular-progressbar';
import { debounceTime } from 'rxjs';
import {
  OnboardingFormSnapshot,
  OnboardingStorageService
} from './onboarding-storage.service';
import { EquipmentStepComponent } from './steps/equipment-step.component';
import { JobDetailsStepComponent } from './steps/job-details-step.component';
import { PersonalInfoStepComponent } from './steps/personal-info-step.component';
import { PoliciesStepComponent } from './steps/policies-step.component';
import { ReviewStepComponent } from './steps/review-step.component';
import { TaxPayrollStepComponent } from './steps/tax-payroll-step.component';

const PHONE_PATTERN = /^\+?[0-9][0-9\s\-().]{7,20}$/;
const STEP_GROUP_KEYS = ['personal', 'job', 'tax', 'equipment', 'policies'] as const;
const TOTAL_STEPS = 6;

@Component({
  selector: 'app-onboarding-wizard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    ...KENDO_INPUTS,
    ...KENDO_STEPPER,
    ...KENDO_CARD,
    ...KENDO_PROGRESSBAR,
    ButtonComponent,
    PersonalInfoStepComponent,
    JobDetailsStepComponent,
    TaxPayrollStepComponent,
    EquipmentStepComponent,
    PoliciesStepComponent,
    ReviewStepComponent
  ],
  templateUrl: './onboarding-wizard.component.html',
  styleUrl: './onboarding-wizard.component.css'
})
export class OnboardingWizardComponent {
  private readonly fb = inject(FormBuilder);
  private readonly storage = inject(OnboardingStorageService);

  readonly submitted = signal(false);
  readonly currentStep = signal(0);
  readonly stepMessage = signal<string | null>(null);

  readonly stepperSteps = [
    { label: 'Personal' },
    { label: 'Job' },
    { label: 'Tax' },
    { label: 'Equipment' },
    { label: 'Policies' },
    { label: 'Review' }
  ];

  readonly progressValue = computed(() =>
    Math.round(((this.currentStep() + 1) / TOTAL_STEPS) * 100)
  );

  readonly form = this.fb.group({
    personal: this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
      address: ['', Validators.required],
      emergencyContact: ['', Validators.required]
    }),
    job: this.fb.group({
      department: ['', Validators.required],
      jobTitle: ['', Validators.required],
      manager: ['', Validators.required],
      startDate: [null as Date | null, Validators.required],
      employmentType: ['', Validators.required],
      workMode: ['', Validators.required]
    }),
    tax: this.fb.group({
      taxIdPlaceholder: [''],
      bankNamePlaceholder: [''],
      accountNumberPlaceholder: [''],
      routingPlaceholder: [''],
      paymentPreference: ['Direct deposit']
    }),
    equipment: this.fb.group({
      laptop: ['', Validators.required],
      accessories: [[] as string[]],
      softwareAccess: [[] as string[]],
      systemsNeeded: ['']
    }),
    policies: this.fb.group({
      handbook: [false, Validators.requiredTrue],
      securityPolicy: [false, Validators.requiredTrue],
      codeOfConduct: [false, Validators.requiredTrue],
      accurateInfo: [false, Validators.requiredTrue]
    })
  });

  constructor() {
    const draft = this.storage.load();
    if (draft) {
      this.form.patchValue(draft.formValue as object);
      const raw = draft.formValue as { job?: { startDate?: string } };
      if (raw.job?.startDate) {
        this.form.get('job.startDate')?.patchValue(new Date(raw.job.startDate));
      }
      this.currentStep.set(
        Math.min(Math.max(0, draft.currentStep), TOTAL_STEPS - 1)
      );
    }

    this.form.valueChanges
      .pipe(debounceTime(450), takeUntilDestroyed())
      .subscribe(() => this.persistDraft());
  }

  protected onStepActivate(event: StepperActivateEvent): void {
    const from = event.sender.currentStep;
    const to = event.index;
    if (to > from && !this.canAdvance(from, to)) {
      event.preventDefault();
      this.stepMessage.set(
        'Some required fields are missing or invalid. Review the messages below, then try again.'
      );
    } else {
      this.stepMessage.set(null);
    }
  }

  protected onStepIndexChange(index: number): void {
    this.currentStep.set(index);
    this.persistDraft();
  }

  protected previous(): void {
    const i = this.currentStep();
    if (i > 0) {
      this.currentStep.set(i - 1);
      this.stepMessage.set(null);
      this.persistDraft();
    }
  }

  protected next(): void {
    const i = this.currentStep();
    if (!this.validateStepGroup(i)) {
      this.stepMessage.set(
        'Please complete the required fields on this step before continuing.'
      );
      return;
    }
    this.stepMessage.set(null);
    if (i < TOTAL_STEPS - 1) {
      this.currentStep.set(i + 1);
      this.persistDraft();
    }
  }

  protected submit(): void {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      this.stepMessage.set(
        'The form can’t be submitted yet. Review the sections with errors and try again.'
      );
      return;
    }
    this.stepMessage.set(null);
    this.storage.clear();
    this.submitted.set(true);
  }

  protected editSection(step: number): void {
    this.currentStep.set(step);
    this.stepMessage.set(null);
    this.persistDraft();
  }

  protected newApplication(): void {
    this.form.reset({
      personal: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        emergencyContact: ''
      },
      job: {
        department: '',
        jobTitle: '',
        manager: '',
        startDate: null,
        employmentType: '',
        workMode: ''
      },
      tax: {
        taxIdPlaceholder: '',
        bankNamePlaceholder: '',
        accountNumberPlaceholder: '',
        routingPlaceholder: '',
        paymentPreference: 'Direct deposit'
      },
      equipment: {
        laptop: '',
        accessories: [],
        softwareAccess: [],
        systemsNeeded: ''
      },
      policies: {
        handbook: false,
        securityPolicy: false,
        codeOfConduct: false,
        accurateInfo: false
      }
    });
    this.currentStep.set(0);
    this.submitted.set(false);
    this.stepMessage.set(null);
    this.storage.clear();
  }

  private canAdvance(from: number, to: number): boolean {
    for (let s = from; s < to; s++) {
      if (!this.validateStepGroup(s)) {
        return false;
      }
    }
    return true;
  }

  private validateStepGroup(stepIndex: number): boolean {
    if (stepIndex < 0 || stepIndex > STEP_GROUP_KEYS.length - 1) {
      return true;
    }
    const key = STEP_GROUP_KEYS[stepIndex];
    const group = this.form.get(key);
    if (!group) {
      return true;
    }
    group.markAllAsTouched();
    return group.valid;
  }

  private persistDraft(): void {
    if (this.submitted()) {
      return;
    }
    const formValue = this.form.getRawValue() as OnboardingFormSnapshot;
    this.storage.save({
      currentStep: this.currentStep(),
      formValue
    });
  }
}
