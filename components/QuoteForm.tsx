import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Check,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  Package,
  Phone,
  Scale,
  ShieldAlert,
  User
} from 'lucide-react';
import { Button } from './Button';
import { getAnalyticsContext, trackGenerateLead } from '../utils/analytics';

interface QuoteFormProps {
  sourceName: string;
  routeId: string;
  pageType: 'main' | 'location' | 'service';
  defaultPickup?: string;
}

type PreferredContact = 'call' | 'text' | 'email';

interface FormState {
  fullName: string;
  preferredContact: PreferredContact;
  contactValue: string;
  pickupZip: string;
  destinationZip: string;
  deadline: string;
  cargoCategory: string;
  sizeWeight: string;
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

const CONTACT_OPTIONS: Array<{ value: PreferredContact; label: string }> = [
  { value: 'text', label: 'Text' },
  { value: 'call', label: 'Call' },
  { value: 'email', label: 'Email' }
];

const CARGO_OPTIONS = [
  { value: 'business-documents', label: 'Business or legal documents' },
  { value: 'manufacturing-parts', label: 'Manufacturing parts or tools' },
  { value: 'aviation-parts', label: 'Aviation or AOG parts' },
  { value: 'packaged-goods', label: 'Packaged goods' },
  { value: 'airport-cargo', label: 'Airport cargo pickup or tender' },
  { value: 'high-value-item', label: 'High-value item (no details here)' },
  { value: 'other-review', label: 'Other cargo for dispatch review' }
];

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
  'cargoCategory',
  'fullName',
  'preferredContact',
  'contactValue'
];

const initialFormState = (defaultPickup: string): FormState => ({
  fullName: '',
  preferredContact: 'text',
  contactValue: '',
  pickupZip: defaultPickup,
  destinationZip: '',
  deadline: '',
  cargoCategory: '',
  sizeWeight: ''
});

const validateField = (name: keyof FormState, state: FormState): string => {
  const value = state[name].trim();

  switch (name) {
    case 'fullName':
      if (!value) return 'Name or company is required';
      if (value.length > 120) return 'Name or company must be 120 characters or fewer';
      return '';
    case 'preferredContact':
      return value ? '' : 'Choose how dispatch should contact you';
    case 'contactValue': {
      if (!value) return state.preferredContact === 'email'
        ? 'Email address is required'
        : 'Phone number is required';

      if (state.preferredContact === 'email') {
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
    case 'cargoCategory':
      return value ? '' : 'Choose a cargo category';
    case 'sizeWeight':
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = event.target.name as keyof FormState;
    setField(name, event.target.value);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    const isEmail = formState.preferredContact === 'email';
    const message = [
      'DISPATCH REQUEST',
      `Name/company: ${formState.fullName}`,
      `Preferred contact: ${formState.preferredContact}`,
      `Contact: ${formState.contactValue}`,
      `Pickup ZIP: ${formState.pickupZip}`,
      `Destination ZIP: ${formState.destinationZip}`,
      `Deadline: ${formState.deadline}`,
      `Cargo category: ${formState.cargoCategory}`,
      `Approximate size/weight: ${formState.sizeWeight || 'Not provided'}`
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
          preferredContact: formState.preferredContact,
          contactValue: formState.contactValue,
          email: isEmail ? formState.contactValue : 'quick-request@speedybat.com',
          phone: isEmail ? '' : formState.contactValue,
          pickupZip: formState.pickupZip,
          destinationZip: formState.destinationZip,
          deadline: formState.deadline,
          cargoCategory: formState.cargoCategory,
          sizeWeight: formState.sizeWeight,
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

  const inputClasses = (hasError: boolean) => `w-full min-h-11 glass-input text-slate-200 px-4 py-2.5 rounded-xl outline-none placeholder:text-slate-500 text-sm md:text-base border transition-all duration-300 font-sans ${
    hasError
      ? 'border-red-500 bg-red-950/10 focus:border-red-400 focus:shadow-[0_0_12px_rgba(239,68,68,0.15)]'
      : 'border-white/[0.04] focus:border-red-500/50'
  }`;
  const labelClasses = 'block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-display';
  const contactIsEmail = formState.preferredContact === 'email';
  const ContactIcon = contactIsEmail ? Mail : Phone;

  const inlineError = (field: keyof FormState) => errors[field] && touched[field] ? (
    <span id={`err-${field}`} className="text-red-400 text-xs mt-1 block font-sans" aria-live="polite">
      {errors[field]}
    </span>
  ) : null;

  return (
    <div className="form-premium-glow relative rounded-3xl group/form">
      <div className="form-glow-backdrop" />
      <div className="glass-panel-elevated relative z-10 rounded-3xl border border-white/[0.05] p-4 shadow-2xl sm:p-5 lg:p-6">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        {isSubmitted ? (
          <div className="text-center py-10 space-y-4 font-sans" role="status" aria-live="polite">
            <div className="w-16 h-16 bg-red-950/20 border border-red-500/30 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-md">
              <Check className="h-8 w-8 animate-[scaleUp_0.3s_ease]" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase font-display tracking-wider">Request received</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
              Dispatch will review the job details and confirm availability. For urgent follow-up,{' '}
              <a href="sms:+15129104938" className="text-red-500 hover:text-red-400 font-bold underline transition-colors">
                text (512) 910-4938
              </a>.
            </p>
            <Button variant="secondary" onClick={() => setIsSubmitted(false)} className="mt-6">
              Send Another Request
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3" noValidate>
            <input type="hidden" name="access_key" value="4d84c98a-eb94-4f22-8a55-a7e4a80855ec" />

            <div>
              <h2 className="font-display text-lg font-bold uppercase tracking-wider text-white">Start your request</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">Send the essentials now. Dispatch will follow up to confirm the job.</p>
            </div>

            <details className="group rounded-xl border border-amber-500/30 bg-amber-950/20 text-xs text-amber-100" role="note">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3 py-2.5 font-bold [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 shrink-0 text-amber-400" />
                  Privacy first: use broad categories only
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-amber-400 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="px-3 pb-3 font-sans leading-relaxed">
                <strong>Do not submit sensitive information.</strong> Do not include patient information, IDs, financial or account data, access codes, credentials, or detailed descriptions of valuables. Use categories only. See our{' '}
                <a href="/privacy" className="inline-flex min-h-11 items-center font-bold underline underline-offset-2 hover:text-white">Privacy Notice</a>.
              </p>
            </details>

            {Object.keys(errors).length > 0 && (
              <div
                ref={errorSummaryRef}
                tabIndex={-1}
                className="p-4 bg-red-950/20 border border-red-500/20 rounded-xl text-xs text-red-400 space-y-1 focus:outline-none focus:border-red-400"
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
              <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-start space-x-2" role="alert">
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span className="font-sans leading-relaxed">{submitError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2">
              <div>
                <label htmlFor="pickupZip" className={labelClasses}>Pickup ZIP</label>
                <div className="relative group/input">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none group-focus-within/input:text-red-500" />
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
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none group-focus-within/input:text-red-500" />
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

            <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2">
              <div>
              <label htmlFor="deadline" className={labelClasses}>Delivery deadline</label>
              <div className="relative group/input">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none group-focus-within/input:text-red-500" />
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
              <span id="deadline-help" className="text-slate-500 text-[11px] mt-1 block font-sans">
                Enter your local time. Dispatch confirms all timing and availability.
              </span>
              {inlineError('deadline')}
              </div>

              <div>
              <label htmlFor="cargoCategory" className={labelClasses}>Cargo category</label>
              <div className="relative group/input">
                <Package className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none group-focus-within/input:text-red-500" />
                <select
                  id="cargoCategory"
                  name="cargoCategory"
                  required
                  className={`${inputClasses(!!errors.cargoCategory)} pl-11 pr-10`}
                  value={formState.cargoCategory}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.cargoCategory}
                  aria-describedby={errors.cargoCategory ? 'err-cargoCategory' : undefined}
                >
                  <option value="">Select a category</option>
                  {CARGO_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </div>
              {inlineError('cargoCategory')}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2">
              <fieldset className="min-[360px]:col-span-2">
                <legend className={labelClasses}>Preferred contact method</legend>
                <div className="grid grid-cols-3 gap-2">
                  {CONTACT_OPTIONS.map(option => (
                    <label
                      key={option.value}
                      className={`flex min-h-11 cursor-pointer items-center justify-center rounded-xl border px-3 py-2 text-center text-xs font-bold uppercase tracking-wider font-display transition-colors ${
                        formState.preferredContact === option.value
                          ? 'border-red-500/60 bg-red-950/30 text-white'
                          : 'border-white/[0.05] bg-white/[0.02] text-slate-400 hover:text-white'
                      }`}
                    >
                      <input
                        className="mr-2 h-4 w-4 accent-red-600"
                        type="radio"
                        name="preferredContact"
                        value={option.value}
                        checked={formState.preferredContact === option.value}
                        onChange={handleChange}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="fullName" className={labelClasses}>Name or company</label>
                <div className="relative group/input">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none group-focus-within/input:text-red-500" />
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
                  {contactIsEmail ? 'Email address' : 'Phone number'}
                </label>
                <div className="relative group/input">
                  <ContactIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none group-focus-within/input:text-red-500" />
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

            <details className="group rounded-xl border border-white/[0.05] bg-white/[0.02]">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-300 font-display [&::-webkit-details-marker]:hidden">
                <span>Size &amp; weight <span className="font-sans font-normal normal-case tracking-normal text-slate-400">(optional)</span></span>
                <ChevronDown className="h-4 w-4 text-red-500 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="px-4 pb-4 pt-1">
                <label htmlFor="sizeWeight" className={labelClasses}>Approximate size and weight</label>
                <div className="relative group/input">
                  <Scale className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none group-focus-within/input:text-red-500" />
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

            <div className="pt-1">
              <Button
                variant="alert"
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-3 py-3 text-base rounded-full shadow-lg hover:shadow-red-900/10 transition-all cursor-pointer font-display font-bold uppercase tracking-wider disabled:cursor-wait disabled:opacity-60"
              >
                <span>{isSubmitting ? 'PROCESSING REQUEST...' : 'DISPATCH REQUEST →'}</span>
              </Button>
              <p className="mt-3 text-center text-xs leading-relaxed text-slate-400">
                By submitting, you agree to the{' '}
                <a href="/terms" className="inline-flex min-h-11 items-center font-bold underline underline-offset-2 hover:text-slate-300">Service Terms</a>{' '}
                and acknowledge the{' '}
                <a href="/privacy" className="inline-flex min-h-11 items-center font-bold underline underline-offset-2 hover:text-slate-300">Privacy Notice</a>.
                Availability and job details require dispatch confirmation.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
