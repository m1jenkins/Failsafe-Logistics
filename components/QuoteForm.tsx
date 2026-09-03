import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Check,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  Phone,
  Scale,
  User
} from 'lucide-react';
import { getAnalyticsContext, trackGenerateLead } from '../utils/analytics';

interface QuoteFormProps {
  sourceName: string;
  routeId: string;
  pageType: 'main' | 'location' | 'service';
  defaultPickup?: string;
}

interface FormState {
  fullName: string;
  contactValue: string;
  pickupZip: string;
  destinationZip: string;
  deadline: string;
  sizeWeight: string;
  additionalDetails: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const setFieldError = (
  previous: FormErrors,
  field: keyof FormState,
  message: string
): FormErrors => {
  const next = { ...previous };
  if (message) {
    next[field] = message;
  } else {
    delete next[field];
  }
  return next;
};

const SIZE_WEIGHT_OPTIONS = [
  { value: 'envelope-under-2lb', label: 'Envelope or small parcel — under 2 lb' },
  { value: 'small-under-20lb', label: 'Small box — under 20 lb' },
  { value: 'medium-20-50lb', label: 'Medium item — 20–50 lb' },
  { value: 'large-over-50lb', label: 'Large item — over 50 lb' },
  { value: 'unsure', label: 'Not sure — dispatch must confirm' }
];

const requiredFieldOrder: Array<keyof FormState> = [
  'pickupZip',
  'destinationZip',
  'deadline',
  'fullName',
  'contactValue'
];

const initialFormState = (defaultPickup: string): FormState => ({
  fullName: '',
  contactValue: '',
  pickupZip: defaultPickup,
  destinationZip: '',
  deadline: '',
  sizeWeight: '',
  additionalDetails: ''
});

const validateField = (name: keyof FormState, state: FormState): string => {
  const value = state[name].trim();

  switch (name) {
    case 'fullName':
      if (!value) return 'Name or company is required';
      if (value.length > 120) return 'Name or company must be 120 characters or fewer';
      return '';
    case 'contactValue': {
      if (!value) return 'Phone number or email address is required';

      if (value.includes('@')) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ''
          : 'Enter a valid email address';
      }

      const digits = value.replace(/\D/g, '');
      return digits.length >= 10 && digits.length <= 15
        ? ''
        : 'Enter a valid phone number';
    }
    case 'pickupZip':
      return /^\d{5}(?:-\d{4})?$/.test(value)
        ? ''
        : 'Enter a valid pickup ZIP code';
    case 'destinationZip':
      return /^\d{5}(?:-\d{4})?$/.test(value)
        ? ''
        : 'Enter a valid destination ZIP code';
    case 'deadline':
      return value ? '' : 'Delivery deadline is required';
    case 'sizeWeight':
    case 'additionalDetails':
      return '';
    default:
      return '';
  }
};

export const QuoteForm: React.FC<QuoteFormProps> = ({
  sourceName,
  routeId,
  pageType,
  defaultPickup = ''
}) => {
  const [formState, setFormState] = useState<FormState>(() => initialFormState(defaultPickup));
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const submissionInFlightRef = useRef(false);

  useEffect(() => {
    if (!defaultPickup) return;
    setFormState(previous => previous.pickupZip
      ? previous
      : { ...previous, pickupZip: defaultPickup });
  }, [defaultPickup]);

  const setField = (name: keyof FormState, value: string) => {
    setFormState(previous => ({ ...previous, [name]: value }));
    setErrors(previous => setFieldError(previous, name, ''));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = event.target.name as keyof FormState;
    setField(name, event.target.value);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = event.target.name as keyof FormState;
    const nextState = { ...formState, [name]: event.target.value };
    setTouched(previous => ({ ...previous, [name]: true }));
    setErrors(previous => setFieldError(previous, name, validateField(name, nextState)));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionInFlightRef.current) return;

    setSubmitError(null);
    const nextErrors: FormErrors = {};

    for (const field of requiredFieldOrder) {
      const message = validateField(field, formState);
      if (message) nextErrors[field] = message;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setTouched(Object.fromEntries(requiredFieldOrder.map(field => [field, true])) as Record<keyof FormState, boolean>);
      window.setTimeout(() => {
        errorSummaryRef.current?.focus();
        errorSummaryRef.current?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'center'
        });
      }, 50);
      return;
    }

    submissionInFlightRef.current = true;
    setIsSubmitting(true);

    const serviceId = pageType === 'service' ? routeId : '';
    const analyticsContext = getAnalyticsContext({ routeId, pageType, serviceId });
    const isEmail = formState.contactValue.includes('@');
    const message = [
      'DISPATCH REQUEST',
      `Name/company: ${formState.fullName}`,
      `Contact: ${formState.contactValue}`,
      `Pickup ZIP: ${formState.pickupZip}`,
      `Destination ZIP: ${formState.destinationZip}`,
      `Deadline: ${formState.deadline}`,
      `Approximate size/weight: ${formState.sizeWeight || 'Not provided'}`,
      `Additional details: ${formState.additionalDetails || 'Not provided'}`
    ].join('\n');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '4d84c98a-eb94-4f22-8a55-a7e4a80855ec',
          subject: `New Lead - ${sourceName} Quote Request`,
          name: formState.fullName,
          fullName: formState.fullName,
          contactValue: formState.contactValue,
          email: isEmail ? formState.contactValue : 'quick-request@speedybat.com',
          phone: isEmail ? '' : formState.contactValue,
          pickupZip: formState.pickupZip,
          destinationZip: formState.destinationZip,
          deadline: formState.deadline,
          sizeWeight: formState.sizeWeight,
          additionalDetails: formState.additionalDetails,
          message,
          ...analyticsContext
        })
      });

      const result = await response.json() as { success?: boolean; message?: string };
      if (result.success !== true) {
        throw new Error(result.message || 'Form submission failed');
      }

      trackGenerateLead(analyticsContext);
      setIsSubmitted(true);
      setFormState(initialFormState(defaultPickup));
      setErrors({});
      setTouched({});
    } catch {
      setSubmitError('We could not submit this request. Call or text dispatch at (512) 910-4938.');
    } finally {
      submissionInFlightRef.current = false;
      setIsSubmitting(false);
    }
  };

  const inputClasses = (hasError: boolean) => `w-full min-h-11 field-input text-ink px-4 py-2.5 rounded-xl placeholder:text-ink/35 text-sm md:text-base font-sans ${
    hasError ? '[&+*]:text-red-600' : ''
  }`;
  const labelClasses = 'block text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft mb-1.5 font-display';
  const contactIsEmail = formState.contactValue.includes('@');
  const ContactIcon = contactIsEmail ? Mail : Phone;

  const inlineError = (field: keyof FormState) => errors[field] && touched[field] ? (
    <span id={`err-${field}`} className="text-red-600 text-xs mt-1 block font-sans" aria-live="polite">
      {errors[field]}
    </span>
  ) : null;

  return (
    <div className="quote-card rounded-3xl group/form">
      <div className="relative z-10 p-5 sm:p-6 lg:p-7">
        {isSubmitted ? (
          <div className="text-center py-12 space-y-4 font-sans" role="status" aria-live="polite">
            <div className="w-16 h-16 bg-moss/10 border border-moss/25 text-moss rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Check className="h-8 w-8 animate-[scaleUp_0.3s_ease]" />
            </div>
            <h3 className="text-xl font-bold text-ink font-display tracking-tight">Request received</h3>
            <p className="text-ink-soft text-sm leading-relaxed max-w-xs mx-auto">
              Dispatch will review the job details and confirm availability. For urgent follow-up,{' '}
              <a href="sms:+15129104938" className="text-signal hover:text-signal-strong font-bold underline underline-offset-2 transition-colors">
                text (512) 910-4938
              </a>.
            </p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="mt-6 inline-flex min-h-11 items-center justify-center px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-full border border-ink/12 bg-white hover:border-ink/30 transition-colors font-display"
            >
              Send another request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
            <input type="hidden" name="access_key" value="4d84c98a-eb94-4f22-8a55-a7e4a80855ec" />

            <div className="pb-1">
              <h2 className="font-display text-xl font-extrabold tracking-tight text-ink">Start your request</h2>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">Send the essentials now. Dispatch will follow up to confirm the job.</p>
            </div>

            {Object.keys(errors).length > 0 && (
              <div
                ref={errorSummaryRef}
                tabIndex={-1}
                className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 space-y-1 focus:outline-none focus:border-red-400"
                role="alert"
                aria-labelledby="err-summary-title"
              >
                <h3 id="err-summary-title" className="font-bold font-display uppercase tracking-wider flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1.5 shrink-0" />
                  Please correct the following errors:
                </h3>
                <ul className="list-disc pl-5 font-sans space-y-0.5">
                  {requiredFieldOrder.map(field => errors[field] ? <li key={field}>{errors[field]}</li> : null)}
                </ul>
              </div>
            )}

            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start space-x-2" role="alert">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="font-sans leading-relaxed">{submitError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3.5 min-[360px]:grid-cols-2">
              <div>
                <label htmlFor="pickupZip" className={labelClasses}>Pickup ZIP</label>
                <div className="relative group/input">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/35 pointer-events-none group-focus-within/input:text-signal transition-colors" />
                  <input
                    id="pickupZip"
                    name="pickupZip"
                    type="text"
                    required
                    inputMode="numeric"
                    maxLength={10}
                    className={`${inputClasses(!!errors.pickupZip)} pl-11`}
                    placeholder="78701"
                    value={formState.pickupZip}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="postal-code"
                    aria-invalid={!!errors.pickupZip}
                    aria-describedby={errors.pickupZip ? 'err-pickupZip' : undefined}
                  />
                </div>
                {inlineError('pickupZip')}
              </div>

              <div>
                <label htmlFor="destinationZip" className={labelClasses}>Destination ZIP</label>
                <div className="relative group/input">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/35 pointer-events-none group-focus-within/input:text-signal transition-colors" />
                  <input
                    id="destinationZip"
                    name="destinationZip"
                    type="text"
                    required
                    inputMode="numeric"
                    maxLength={10}
                    className={`${inputClasses(!!errors.destinationZip)} pl-11`}
                    placeholder="75001"
                    value={formState.destinationZip}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="postal-code"
                    aria-invalid={!!errors.destinationZip}
                    aria-describedby={errors.destinationZip ? 'err-destinationZip' : undefined}
                  />
                </div>
                {inlineError('destinationZip')}
              </div>
            </div>

            <div>
              <label htmlFor="deadline" className={labelClasses}>Delivery deadline</label>
              <div className="relative group/input">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/35 pointer-events-none group-focus-within/input:text-signal transition-colors" />
                <input
                  id="deadline"
                  name="deadline"
                  type="datetime-local"
                  required
                  className={`${inputClasses(!!errors.deadline)} pl-11`}
                  value={formState.deadline}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.deadline}
                  aria-describedby={errors.deadline ? 'err-deadline deadline-help' : 'deadline-help'}
                />
              </div>
              <span id="deadline-help" className="text-ink-soft/70 text-[11px] mt-1 block font-sans">
                Enter your local time. Dispatch confirms all timing and availability.
              </span>
              {inlineError('deadline')}
            </div>

            <div className="grid grid-cols-1 gap-3.5 min-[360px]:grid-cols-2">
              <div>
                <label htmlFor="fullName" className={labelClasses}>Name or company</label>
                <div className="relative group/input">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/35 pointer-events-none group-focus-within/input:text-signal transition-colors" />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    maxLength={120}
                    className={`${inputClasses(!!errors.fullName)} pl-11`}
                    placeholder="Your name or company"
                    value={formState.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="name"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'err-fullName' : undefined}
                  />
                </div>
                {inlineError('fullName')}
              </div>

              <div>
                <label htmlFor="contactValue" className={labelClasses}>
                  Phone number or email address
                </label>
                <div className="relative group/input">
                  <ContactIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/35 pointer-events-none group-focus-within/input:text-signal transition-colors" />
                  <input
                    id="contactValue"
                    name="contactValue"
                    type={contactIsEmail ? 'email' : 'tel'}
                    required
                    className={`${inputClasses(!!errors.contactValue)} pl-11`}
                    placeholder={contactIsEmail ? 'name@company.com' : '(512) 555-0123'}
                    value={formState.contactValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete={contactIsEmail ? 'email' : 'tel'}
                    inputMode={contactIsEmail ? 'email' : 'tel'}
                    aria-invalid={!!errors.contactValue}
                    aria-describedby={errors.contactValue ? 'err-contactValue' : undefined}
                  />
                </div>
                {inlineError('contactValue')}
              </div>
            </div>

            <details className="group rounded-xl border border-ink/10 bg-paper/60 open:bg-white transition-colors">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ink font-display [&::-webkit-details-marker]:hidden">
                <span>Size &amp; weight <span className="font-sans font-normal normal-case tracking-normal text-ink-soft">(optional)</span></span>
                <ChevronDown className="h-4 w-4 text-signal transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="px-4 pb-4 pt-1">
                <label htmlFor="sizeWeight" className={labelClasses}>Approximate size and weight</label>
                <div className="relative group/input">
                  <Scale className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/35 pointer-events-none group-focus-within/input:text-signal transition-colors" />
                  <select
                    id="sizeWeight"
                    name="sizeWeight"
                    className={`${inputClasses(false)} pl-11 pr-10`}
                    value={formState.sizeWeight}
                    onChange={handleChange}
                  >
                    <option value="">Skip for now</option>
                    {SIZE_WEIGHT_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </div>
              </div>
            </details>

            <div>
              <label htmlFor="additionalDetails" className={labelClasses}>
                Additional details <span className="font-sans font-normal normal-case tracking-normal text-ink-soft">(optional)</span>
              </label>
              <textarea
                id="additionalDetails"
                name="additionalDetails"
                rows={4}
                maxLength={2000}
                className={`${inputClasses(false)} resize-y`}
                placeholder="Anything dispatch should know about the request?"
                value={formState.additionalDetails}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="pt-1.5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group/btn relative w-full inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full bg-signal py-3.5 text-base font-bold uppercase tracking-wider text-white font-display shadow-[0_18px_34px_-14px_rgba(232,73,15,0.65)] transition-all duration-300 hover:bg-signal-strong hover:-translate-y-px disabled:cursor-wait disabled:opacity-60 cursor-pointer"
              >
                {/* Shimmer sweep */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full motion-reduce:hidden"
                />
                <span>{isSubmitting ? 'Processing request…' : 'Dispatch request →'}</span>
              </button>
              <p className="mt-3 text-center text-xs leading-relaxed text-ink-soft">
                By submitting, you agree to the{' '}
                <a href="/terms" className="inline-flex min-h-11 items-center font-bold underline underline-offset-2 hover:text-signal md:min-h-0">Service Terms</a>{' '}
                and acknowledge the{' '}
                <a href="/privacy" className="inline-flex min-h-11 items-center font-bold underline underline-offset-2 hover:text-signal md:min-h-0">Privacy Notice</a>.
                Availability and job details require dispatch confirmation.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
