import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, AlertCircle, Check, Clock } from 'lucide-react';
import { Button } from './Button';

interface QuoteFormProps {
  sourceName: string; // e.g. "Downtown Austin", "Same-Day Courier", "Austin Main Page"
  routeId: string;    // e.g. "downtown-austin", "same-day-courier", ""
  pageType: 'main' | 'location' | 'service';
  defaultPickup?: string; // prefilled pickup zip/address (useful for location pages)
}

interface FormState {
  fullName: string;
  phone: string;
  itemDescription: string;
  deliveryNeeded: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  itemDescription?: string;
  deliveryNeeded?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ 
  sourceName, 
  routeId, 
  pageType,
  defaultPickup = ''
}) => {
  const [formState, setFormState] = useState<FormState>({
    fullName: '',
    phone: '',
    itemDescription: defaultPickup ? `Pickup: ${defaultPickup}\nDelivery: ` : '',
    deliveryNeeded: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Focus reference for validation accessibility
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  // Sync state if defaultPickup changes
  useEffect(() => {
    if (defaultPickup) {
      setFormState(prev => {
        if (!prev.itemDescription || prev.itemDescription.startsWith('Pickup:')) {
          return {
            ...prev,
            itemDescription: `Pickup: ${defaultPickup}\nDelivery: `
          };
        }
        return prev;
      });
    }
  }, [defaultPickup]);

  // Validation function
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full Name is required';
        return '';
      case 'phone': {
        const val = value.trim();
        if (!val) return 'Phone Number is required';
        const digits = val.replace(/\D/g, '');
        if (digits.length < 10) return 'Please enter a valid 10-digit phone number';
        return '';
      }
      case 'itemDescription':
        if (!value.trim()) return 'Please describe what you are shipping and where';
        return '';
      case 'deliveryNeeded':
        // Optional field
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'phone') {
      const x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      if (x) {
        formattedValue = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
      }
    }

    setFormState(prev => ({ ...prev, [name]: formattedValue }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const errorMsg = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: errorMsg || undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const newErrors: FormErrors = {};
    Object.keys(formState).forEach(key => {
      const errorMsg = validateField(key, formState[key as keyof FormState]);
      if (errorMsg) {
        newErrors[key as keyof FormErrors] = errorMsg;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const allTouched: Record<string, boolean> = {};
      Object.keys(formState).forEach(key => { allTouched[key] = true; });
      setTouched(allTouched);

      setTimeout(() => {
        errorSummaryRef.current?.focus();
        errorSummaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }

    setIsSubmitting(true);

    try {
      const messageBody = `DISPATCH Request from ${formState.fullName}\nPhone: ${formState.phone}\nCargo/Details: ${formState.itemDescription}${formState.deliveryNeeded ? `\nTiming: ${formState.deliveryNeeded}` : ''}`;

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "4d84c98a-eb94-4f22-8a55-a7e4a80855ec",
          name: formState.fullName,
          fullName: formState.fullName,
          email: "quick-request@speedybat.com",
          phone: formState.phone,
          pickupAddress: 'N/A (Quick Dispatch)',
          deliveryAddress: 'N/A (Quick Dispatch)',
          itemDescription: formState.itemDescription,
          deliveryNeeded: formState.deliveryNeeded,
          message: messageBody,
          subject: `New Lead - ${sourceName} Quote Request`
        })
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setFormState({
          fullName: '',
          phone: '',
          itemDescription: defaultPickup ? `Pickup: ${defaultPickup}\nDelivery: ` : '',
          deliveryNeeded: ''
        });
        setErrors({});
        setTouched({});
      } else {
        throw new Error(result.message || "Form submission failed");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitError("There was a connection issue submitting your request. Please call or text dispatch directly at (512) 910-4938.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (hasError: boolean) => `w-full glass-input text-slate-200 px-4 py-3 rounded-xl outline-none placeholder:text-slate-600 text-sm md:text-base border transition-all duration-300 font-sans ${
    hasError 
      ? 'border-red-500 bg-red-950/10 focus:border-red-400 focus:shadow-[0_0_12px_rgba(239,68,68,0.15)]' 
      : 'border-white/[0.04] focus:border-red-500/50'
  }`;

  const labelClasses = "block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-display";

  return (
    <div className="glass-panel-elevated p-4 sm:p-5 lg:p-6 rounded-3xl shadow-2xl relative border border-white/[0.05]">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      
      {isSubmitted ? (
        <div className="text-center py-10 space-y-4 font-sans" role="alert" aria-live="polite">
          <div className="w-16 h-16 bg-red-950/20 border border-red-500/30 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-md">
            <Check className="h-8 w-8 animate-[scaleUp_0.3s_ease]" />
          </div>
          <h3 className="text-lg font-bold text-white uppercase font-display tracking-wider">Thank you, we'll be in touch.</h3>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
            If this is extremely urgent, please text <a href="sms:5129104938" className="text-red-500 hover:text-red-400 font-bold underline transition-colors">512-910-4938</a>.
          </p>
          <Button 
            variant="secondary" 
            onClick={() => setIsSubmitted(false)}
            className="mt-6"
          >
            Send Another Request
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Web3Forms Access Key HTML Input */}
          <input type="hidden" name="access_key" value="4d84c98a-eb94-4f22-8a55-a7e4a80855ec" />
          
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
                {errors.fullName && <li>{errors.fullName}</li>}
                {errors.phone && <li>{errors.phone}</li>}
                {errors.itemDescription && <li>{errors.itemDescription}</li>}
              </ul>
            </div>
          )}

          {submitError && (
            <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-start space-x-2" role="alert">
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <span className="font-sans leading-relaxed">{submitError}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className={labelClasses}>Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              className={inputClasses(!!errors.fullName)}
              placeholder="John Doe"
              value={formState.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="name"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "err-fullName" : undefined}
            />
            {errors.fullName && touched.fullName && (
              <span id="err-fullName" className="text-red-400 text-xs mt-1 block font-sans" aria-live="polite">
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className={labelClasses}>Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className={inputClasses(!!errors.phone)}
              placeholder="(512) 910-4938"
              value={formState.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "err-phone" : undefined}
            />
            {errors.phone && touched.phone && (
              <span id="err-phone" className="text-red-400 text-xs mt-1 block font-sans" aria-live="polite">
                {errors.phone}
              </span>
            )}
          </div>

          {/* What are you shipping and where? */}
          <div>
            <label htmlFor="itemDescription" className={labelClasses}>What are you shipping and where?</label>
            <textarea
              id="itemDescription"
              name="itemDescription"
              required
              rows={3}
              className={`${inputClasses(!!errors.itemDescription)} resize-none`}
              placeholder="e.g. Medical kit from St. David's Main to Round Rock Clinic, or parts to Samsung Taylor fab"
              value={formState.itemDescription}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.itemDescription}
              aria-describedby={errors.itemDescription ? "err-itemDescription" : undefined}
            />
            {errors.itemDescription && touched.itemDescription && (
              <span id="err-itemDescription" className="text-red-400 text-xs mt-1 block font-sans" aria-live="polite">
                {errors.itemDescription}
              </span>
            )}
          </div>

          {/* Timing */}
          <div>
            <label htmlFor="deliveryNeeded" className={labelClasses}>
              Timing <span className="text-slate-500 font-light font-sans lowercase italic">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <Clock className="h-4.5 w-4.5" />
              </div>
              <input
                id="deliveryNeeded"
                name="deliveryNeeded"
                type="text"
                className={`${inputClasses(!!errors.deliveryNeeded)} pl-11`}
                placeholder="ASAP or Date/Time"
                value={formState.deliveryNeeded}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.deliveryNeeded}
                aria-describedby={errors.deliveryNeeded ? "err-deliveryNeeded" : undefined}
              />
            </div>
          </div>

          {/* Submission Button */}
          <div className="pt-1">
            <Button
              variant="alert"
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-3 py-3 text-base rounded-full shadow-lg hover:shadow-red-900/10 transition-all cursor-pointer font-display font-bold uppercase tracking-wider"
            >
              {isSubmitting ? (
                <span>PROCESSING REQUEST...</span>
              ) : (
                <span>DISPATCH REQUEST →</span>
              )}
            </Button>
            <p className="text-center text-slate-500 text-xs mt-3 leading-relaxed">
              By clicking Request, you agree to our service terms. Immediate availability is subject to confirmation.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};
