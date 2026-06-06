import React, { useState, useRef } from 'react';
import { 
  ArrowRight, Navigation, MapPin, 
  AlertCircle, ChevronDown, Check, Building, Phone, Clock
} from 'lucide-react';
import { Button } from './Button';

interface QuoteFormProps {
  sourceName: string; // e.g. "Downtown Austin", "Same-Day Courier", "Austin Main Page"
  routeId: string;    // e.g. "downtown-austin", "same-day-courier", ""
  pageType: 'main' | 'location' | 'service';
  defaultPickup?: string; // prefilled pickup zip/address (useful for location pages)
}

interface FormState {
  senderName: string;
  phone: string;
  pickupLocation: string;
  deliveryLocation: string;
  packageType: string;
  deliveryNeeded: string;
}

interface FormErrors {
  senderName?: string;
  phone?: string;
  pickupLocation?: string;
  deliveryLocation?: string;
  deliveryNeeded?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ 
  sourceName, 
  routeId, 
  pageType,
  defaultPickup = ''
}) => {
  const [formState, setFormState] = useState<FormState>({
    senderName: '',
    phone: '',
    pickupLocation: defaultPickup,
    deliveryLocation: '',
    packageType: 'Documents',
    deliveryNeeded: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Focus reference for validation accessibility
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  // Validation function
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'senderName':
        if (!value.trim()) return 'Company or Sender Name is required';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const digits = value.replace(/\D/g, '');
        if (digits.length < 10) return 'Please enter a valid 10-digit phone number';
        return '';
      case 'pickupLocation':
        if (!value.trim()) return 'Pickup location is required';
        return '';
      case 'deliveryLocation':
        if (!value.trim()) return 'Delivery location is required';
        return '';
      case 'deliveryNeeded':
        if (!value.trim()) return 'Delivery timing / urgency is required';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      const messageBody = `
        QUOTE REQUEST (${sourceName})
        ------------------------------------
        Sender/Company: ${formState.senderName}
        Phone: ${formState.phone}
        Pickup: ${formState.pickupLocation}
        Delivery: ${formState.deliveryLocation}
        Package Type: ${formState.packageType}
        Delivery Needed: ${formState.deliveryNeeded}
        ------------------------------------
        Originating Route: /${routeId}
      `;

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "9f904ee4-4752-46ac-bfe9-8ef9dab95cae",
          name: formState.senderName,
          email: "leads@speedybat.com",
          phone: formState.phone,
          message: messageBody,
          subject: `New Lead - ${sourceName} Quote Request`
        })
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setFormState({
          senderName: '',
          phone: '',
          pickupLocation: defaultPickup,
          deliveryLocation: '',
          packageType: 'Documents',
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

  const inputClasses = (hasError: boolean) => `w-full glass-input text-slate-200 px-5 py-4 rounded-xl outline-none placeholder:text-slate-600 text-sm md:text-base border transition-all duration-300 font-sans ${
    hasError 
      ? 'border-red-500 bg-red-950/10 focus:border-red-400 focus:shadow-[0_0_12px_rgba(239,68,68,0.15)]' 
      : 'border-white/[0.04] focus:border-red-500/50'
  }`;

  const labelClasses = "block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-display";

  return (
    <div className="glass-panel-elevated p-8 rounded-3xl shadow-2xl relative border border-white/[0.05]">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white uppercase tracking-wider font-display flex items-center">
          <span className="w-1.5 h-6 bg-red-600 mr-3 rounded-full"></span>
          Request Quote
        </h2>
        <p className="text-slate-400 text-xs mt-1 font-light leading-relaxed">
          Enter route details to dispatch a vehicle or receive an immediate quote.
        </p>
      </div>

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
                {errors.senderName && <li>{errors.senderName}</li>}
                {errors.phone && <li>{errors.phone}</li>}
                {errors.pickupLocation && <li>{errors.pickupLocation}</li>}
                {errors.deliveryLocation && <li>{errors.deliveryLocation}</li>}
                {errors.deliveryNeeded && <li>{errors.deliveryNeeded}</li>}
              </ul>
            </div>
          )}

          {submitError && (
            <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-start space-x-2" role="alert">
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <span className="font-sans leading-relaxed">{submitError}</span>
            </div>
          )}

          {/* Company / Sender Name */}
          <div>
            <label htmlFor="senderName" className={labelClasses}>
              Company / Sender Name <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <Building className="h-4 w-4" />
              </div>
              <input
                id="senderName"
                name="senderName"
                type="text"
                required
                className={`${inputClasses(!!errors.senderName)} pl-11`}
                placeholder="Company or contact name"
                value={formState.senderName}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="organization"
                aria-invalid={!!errors.senderName}
                aria-describedby={errors.senderName ? "err-senderName" : undefined}
              />
            </div>
            {errors.senderName && touched.senderName && (
              <span id="err-senderName" className="text-red-400 text-xs mt-1 block font-sans" aria-live="polite">
                {errors.senderName}
              </span>
            )}
          </div>

          {/* Contact Phone */}
          <div>
            <label htmlFor="phone" className={labelClasses}>
              Contact Phone Number <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <Phone className="h-4 w-4" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className={`${inputClasses(!!errors.phone)} pl-11`}
                placeholder="(512) 910-4938"
                value={formState.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "err-phone" : undefined}
              />
            </div>
            {errors.phone && touched.phone && (
              <span id="err-phone" className="text-red-400 text-xs mt-1 block font-sans" aria-live="polite">
                {errors.phone}
              </span>
            )}
          </div>

          {/* Pickup Address or Zip */}
          <div>
            <label htmlFor="pickupLocation" className={labelClasses}>
              Pickup (Zip or Address) <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <MapPin className="h-4 w-4" />
              </div>
              <input
                id="pickupLocation"
                name="pickupLocation"
                type="text"
                required
                className={`${inputClasses(!!errors.pickupLocation)} pl-11`}
                placeholder="Street address or zip code"
                value={formState.pickupLocation}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.pickupLocation}
                aria-describedby={errors.pickupLocation ? "err-pickupLocation" : undefined}
              />
            </div>
            {errors.pickupLocation && touched.pickupLocation && (
              <span id="err-pickupLocation" className="text-red-400 text-xs mt-1 block font-sans" aria-live="polite">
                {errors.pickupLocation}
              </span>
            )}
          </div>

          {/* Delivery Address or Zip */}
          <div>
            <label htmlFor="deliveryLocation" className={labelClasses}>
              Delivery (Zip or Address) <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <Navigation className="h-4 w-4" />
              </div>
              <input
                id="deliveryLocation"
                name="deliveryLocation"
                type="text"
                required
                className={`${inputClasses(!!errors.deliveryLocation)} pl-11`}
                placeholder="Street address or zip code"
                value={formState.deliveryLocation}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.deliveryLocation}
                aria-describedby={errors.deliveryLocation ? "err-deliveryLocation" : undefined}
              />
            </div>
            {errors.deliveryLocation && touched.deliveryLocation && (
              <span id="err-deliveryLocation" className="text-red-400 text-xs mt-1 block font-sans" aria-live="polite">
                {errors.deliveryLocation}
              </span>
            )}
          </div>

          {/* Package Type */}
          <div>
            <label htmlFor="packageType" className={labelClasses}>Package Type</label>
            <div className="relative">
              <select
                id="packageType"
                name="packageType"
                className="w-full glass-input text-slate-200 px-5 py-4 rounded-xl outline-none border border-white/[0.04] appearance-none text-sm md:text-base focus:border-red-500/50 cursor-pointer pr-12 font-sans"
                value={formState.packageType}
                onChange={handleChange}
              >
                <option value="Documents" className="bg-obsidian text-slate-200">Documents / Legal Filings</option>
                <option value="Small Parcel" className="bg-obsidian text-slate-200">Small Parcel / Package</option>
                <option value="Large Box" className="bg-obsidian text-slate-200">Large Box / Cargo Case</option>
                <option value="Pallet" className="bg-obsidian text-slate-200">Pallet / Expedited Freight</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* When do you need delivered */}
          <div>
            <label htmlFor="deliveryNeeded" className={labelClasses}>
              When do you need delivered? <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <Clock className="h-4 w-4" />
              </div>
              <input
                id="deliveryNeeded"
                name="deliveryNeeded"
                type="text"
                required
                className={`${inputClasses(!!errors.deliveryNeeded)} pl-11`}
                placeholder="e.g. ASAP, within the next 1-3 hours, June 4th 5am"
                value={formState.deliveryNeeded}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.deliveryNeeded}
                aria-describedby={errors.deliveryNeeded ? "err-deliveryNeeded" : undefined}
              />
            </div>
            {errors.deliveryNeeded && touched.deliveryNeeded && (
              <span id="err-deliveryNeeded" className="text-red-400 text-xs mt-1 block font-sans" aria-live="polite">
                {errors.deliveryNeeded}
              </span>
            )}
          </div>

          {/* Submission Button */}
          <div className="pt-4">
            <Button
              variant="alert"
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-3 py-4 text-sm md:text-base rounded-full shadow-lg hover:shadow-red-900/10 transition-all duration-300 font-display cursor-pointer"
            >
              {isSubmitting ? (
                <span>Processing Quote Request...</span>
              ) : (
                <>
                  <span>Request Courier Quote</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
            <p className="text-center text-slate-600 text-[10px] mt-3 leading-relaxed font-sans font-light">
              By submitting, you agree to priority routing terms. Drivers route instantly upon dispatch telephone confirmation.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};
