import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Check, LoaderCircle } from 'lucide-react';
import { getAnalyticsContext, trackGenerateLead } from '../utils/analytics';

interface QuoteFormProps {
  sourceName: string;
  routeId: string;
  pageType: 'main' | 'location' | 'service';
  defaultPickup?: string;
}

interface FormState {
  pickupZip: string;
  destinationZip: string;
  deadline: string;
  cargoCategory: string;
  sizeWeight: string;
  fullName: string;
  contactValue: string;
  additionalDetails: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const requiredFieldOrder: Array<keyof FormState> = [
  'pickupZip',
  'destinationZip',
  'deadline',
  'cargoCategory',
  'sizeWeight',
  'fullName',
  'contactValue'
];

const cargoOptions = ['Documents', 'Parcel', 'Parts', 'Freight', 'Other'];

const sizeWeightOptions = [
  'Envelope or small parcel — under 2 lb',
  'Small box — under 20 lb',
  'Medium item — 20–50 lb',
  'Large item — over 50 lb',
  'Not sure yet'
];

const initialFormState = (defaultPickup: string): FormState => ({
  pickupZip: defaultPickup,
  destinationZip: '',
  deadline: '',
  cargoCategory: '',
  sizeWeight: '',
  fullName: '',
  contactValue: '',
  additionalDetails: ''
});

const validateField = (name: keyof FormState, state: FormState): string => {
  const value = state[name].trim();
  if (name === 'pickupZip' || name === 'destinationZip') {
    if (!/^\d{5}(?:-\d{4})?$/.test(value)) return `Enter a valid ${name === 'pickupZip' ? 'pickup' : 'destination'} ZIP code`;
    return '';
  }
  if (name === 'deadline') return value ? '' : 'Delivery deadline is required';
  if (name === 'cargoCategory') return value ? '' : 'Choose what you are sending';
  if (name === 'sizeWeight') return value ? '' : 'Choose an approximate size and weight';
  if (name === 'fullName') {
    if (!value) return 'Name or company is required';
    return value.length <= 120 ? '' : 'Name or company must be 120 characters or fewer';
  }
  if (name === 'contactValue') {
    if (!value) return 'Phone or email is required';
    if (value.includes('@')) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address';
    const digits = value.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15 ? '' : 'Enter a valid phone number';
  }
  return '';
};

export const QuoteForm: React.FC<QuoteFormProps> = ({ sourceName, routeId, pageType, defaultPickup = '' }) => {
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
    setFormState(previous => previous.pickupZip ? previous : { ...previous, pickupZip: defaultPickup });
  }, [defaultPickup]);

  const setField = (name: keyof FormState, value: string) => {
    setFormState(previous => ({ ...previous, [name]: value }));
    setErrors(previous => {
      const next = { ...previous };
      delete next[name];
      return next;
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setField(event.target.name as keyof FormState, event.target.value);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = event.target.name as keyof FormState;
    const nextState = { ...formState, [name]: event.target.value };
    setTouched(previous => ({ ...previous, [name]: true }));
    setErrors(previous => {
      const next = { ...previous };
      const message = validateField(name, nextState);
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });
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

    if (Object.keys(nextErrors).length) {
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
      'COURIER QUOTE REQUEST',
      `Pickup ZIP: ${formState.pickupZip}`,
      `Destination ZIP: ${formState.destinationZip}`,
      `Delivery deadline: ${formState.deadline}`,
      `Cargo category: ${formState.cargoCategory}`,
      `Approximate size/weight: ${formState.sizeWeight}`,
      `Name/company: ${formState.fullName}`,
      `Contact: ${formState.contactValue}`,
      `Additional details: ${formState.additionalDetails || 'Not provided'}`
    ].join('\n');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
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
          cargoCategory: formState.cargoCategory,
          sizeWeight: formState.sizeWeight,
          additionalDetails: formState.additionalDetails,
          message,
          ...analyticsContext
        })
      });
      const result = await response.json() as { success?: boolean; message?: string };
      if (result.success !== true) throw new Error(result.message || 'Form submission failed');

      trackGenerateLead(analyticsContext);
      setIsSubmitted(true);
      setFormState(initialFormState(defaultPickup));
      setErrors({});
      setTouched({});
    } catch {
      setSubmitError("We couldn't send your request. Call or text (512) 910-4938.");
    } finally {
      submissionInFlightRef.current = false;
      setIsSubmitting(false);
    }
  };

  const inputClasses = (hasError: boolean) => `field-input px-3.5 py-3 text-[16px] ${hasError ? 'border-red-700' : ''}`;
  const labelClasses = 'mb-2 block text-sm font-bold text-ink';
  const inlineError = (field: keyof FormState) => errors[field] && touched[field] ? (
    <span id={`err-${field}`} className="mt-1.5 block text-sm font-semibold text-red-700" aria-live="polite">{errors[field]}</span>
  ) : null;

  if (isSubmitted) {
    return (
      <div className="flex min-h-[440px] flex-col items-start justify-center bg-white p-7 sm:p-10" role="status" aria-live="polite">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-signal text-white"><Check className="h-6 w-6" /></span>
        <h3 className="display-face mt-6 text-3xl uppercase leading-none text-ink">Request received.</h3>
        <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink-soft">Dispatch will contact you using the phone number or email you provided.</p>
        <button type="button" onClick={() => setIsSubmitted(false)} className="mt-7 min-h-11 rounded-[5px] border border-ink/25 px-5 py-2.5 text-sm font-bold text-ink hover:border-signal hover:text-signal">Send another request</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 sm:p-7 lg:p-9" noValidate>
      <input type="hidden" name="access_key" value="4d84c98a-eb94-4f22-8a55-a7e4a80855ec" />

      {Object.keys(errors).length > 0 && (
        <div ref={errorSummaryRef} tabIndex={-1} className="mb-6 border border-red-300 bg-red-50 p-4 text-sm text-red-800 focus:outline-none" role="alert" aria-labelledby="quote-errors-heading">
          <h3 id="quote-errors-heading" className="flex items-center gap-2 font-bold"><AlertCircle className="h-4 w-4" />Please correct these fields</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {requiredFieldOrder.map(field => errors[field] ? <li key={field}>{errors[field]}</li> : null)}
          </ul>
        </div>
      )}

      {submitError && (
        <div className="mb-6 flex items-start gap-2 border border-red-300 bg-red-50 p-4 text-sm font-semibold text-red-800" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
        <div>
          <label htmlFor="pickupZip" className={labelClasses}>Pickup ZIP</label>
          <input id="pickupZip" name="pickupZip" type="text" required inputMode="numeric" maxLength={10} className={inputClasses(!!errors.pickupZip)} placeholder="78701" value={formState.pickupZip} onChange={handleChange} onBlur={handleBlur} autoComplete="postal-code" aria-invalid={!!errors.pickupZip} aria-describedby={errors.pickupZip ? 'err-pickupZip' : undefined} />
          {inlineError('pickupZip')}
        </div>
        <div>
          <label htmlFor="destinationZip" className={labelClasses}>Destination ZIP</label>
          <input id="destinationZip" name="destinationZip" type="text" required inputMode="numeric" maxLength={10} className={inputClasses(!!errors.destinationZip)} placeholder="75001" value={formState.destinationZip} onChange={handleChange} onBlur={handleBlur} autoComplete="postal-code" aria-invalid={!!errors.destinationZip} aria-describedby={errors.destinationZip ? 'err-destinationZip' : undefined} />
          {inlineError('destinationZip')}
        </div>
        <div>
          <label htmlFor="deadline" className={labelClasses}>Delivery deadline</label>
          <input id="deadline" name="deadline" type="datetime-local" required className={inputClasses(!!errors.deadline)} value={formState.deadline} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.deadline} aria-describedby={errors.deadline ? 'err-deadline' : undefined} />
          {inlineError('deadline')}
        </div>
        <div>
          <label htmlFor="cargoCategory" className={labelClasses}>What are you sending?</label>
          <select id="cargoCategory" name="cargoCategory" required className={inputClasses(!!errors.cargoCategory)} value={formState.cargoCategory} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.cargoCategory} aria-describedby={errors.cargoCategory ? 'err-cargoCategory' : undefined}>
            <option value="">Choose one</option>
            {cargoOptions.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
          {inlineError('cargoCategory')}
        </div>
        <div>
          <label htmlFor="sizeWeight" className={labelClasses}>Approximate size and weight</label>
          <select id="sizeWeight" name="sizeWeight" required className={inputClasses(!!errors.sizeWeight)} value={formState.sizeWeight} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.sizeWeight} aria-describedby={errors.sizeWeight ? 'err-sizeWeight' : undefined}>
            <option value="">Choose one</option>
            {sizeWeightOptions.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
          {inlineError('sizeWeight')}
        </div>
        <div>
          <label htmlFor="fullName" className={labelClasses}>Name or company</label>
          <input id="fullName" name="fullName" type="text" required maxLength={120} className={inputClasses(!!errors.fullName)} placeholder="Your name or company" value={formState.fullName} onChange={handleChange} onBlur={handleBlur} autoComplete="name" aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? 'err-fullName' : undefined} />
          {inlineError('fullName')}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="contactValue" className={labelClasses}>Phone or email</label>
          <input id="contactValue" name="contactValue" type={formState.contactValue.includes('@') ? 'email' : 'text'} required className={inputClasses(!!errors.contactValue)} placeholder="(512) 555-0123 or name@company.com" value={formState.contactValue} onChange={handleChange} onBlur={handleBlur} autoComplete="email" aria-invalid={!!errors.contactValue} aria-describedby={errors.contactValue ? 'err-contactValue' : undefined} />
          {inlineError('contactValue')}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="additionalDetails" className={labelClasses}>Anything else? <span className="font-normal text-ink-soft">Optional</span></label>
          <textarea id="additionalDetails" name="additionalDetails" rows={4} maxLength={2000} className={`${inputClasses(false)} resize-y`} placeholder="Anything else dispatch should know?" value={formState.additionalDetails} onChange={handleChange} onBlur={handleBlur} aria-describedby="details-privacy" />
          <p id="details-privacy" className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">Keep health information, account numbers, IDs, access codes, and detailed descriptions of valuables out of this form and text messages.</p>
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[5px] bg-signal px-6 py-3 text-base font-bold text-white transition-colors hover:bg-signal-strong disabled:cursor-wait disabled:opacity-60">
        {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {isSubmitting ? 'Sending request…' : 'Request a quote'}
      </button>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">Sending a request does not book a courier. Dispatch confirms availability, price, and service details first.</p>
      <p className="mt-4 text-sm text-ink-soft">By sending this form, you agree to the <a href="/terms" className="font-bold underline hover:text-signal">Service Terms</a> and acknowledge the <a href="/privacy" className="font-bold underline hover:text-signal">Privacy Notice</a>.</p>
    </form>
  );
};
