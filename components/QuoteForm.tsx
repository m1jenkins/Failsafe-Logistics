import React, { useState, useRef } from 'react';
import { 
  ArrowRight, Navigation, MapPin, 
  AlertCircle, ChevronDown, Check, Building, Phone, Clock, Mail
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
  email: string;
  pickupLocation: string;
  deliveryLocation: string;
  packageType: string;
  deliveryNeeded: string;
}

interface FormErrors {
  senderName?: string;
  phone?: string;
  email?: string;
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
    email: '',
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
  const validateField = (name: string, value: string, currentFormState: FormState): string => {
    switch (name) {
      case 'senderName':
        // Optional field
        return '';
      case 'phone': {
        const val = value.trim();
        const emailVal = currentFormState.email.trim();
        if (!val && !emailVal) {
          return 'Either Phone or Email is required';
        }
        if (val) {
          const digits = val.replace(/\D/g, '');
          if (digits.length < 10) return 'Please enter a valid 10-digit phone number';
        }
        return '';
      }
      case 'email': {
        const val = value.trim();
        const phoneVal = currentFormState.phone.trim();
        if (!val && !phoneVal) {
          return 'Either Phone or Email is required';
        }
        if (val) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) return 'Please enter a valid email address';
        }
        return '';
      }
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

    const updatedState = { ...formState, [name]: formattedValue };
    setFormState(updatedState);
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    // Clear cross-field validation errors for phone/email if either is now provided
    if (name === 'phone' && formattedValue.trim()) {
      if (errors.email === 'Either Phone or Email is required') {
        setErrors(prev => ({ ...prev, email: undefined }));
      }
    }
    if (name === 'email' && formattedValue.trim()) {
      if (errors.phone === 'Either Phone or Email is required') {
        setErrors(prev => ({ ...prev, phone: undefined }));
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const errorMsg = validateField(name, value, formState);
    setErrors(prev => {
      const newErrors = { ...prev, [name]: errorMsg || undefined };

      // Handle phone/email validation interaction
      if (name === 'phone') {
        if (value.trim()) {
          if (newErrors.email === 'Either Phone or Email is required') {
            newErrors.email = undefined;
          }
        } else {
          if (!formState.email.trim()) {
            newErrors.phone = 'Either Phone or Email is required';
            newErrors.email = 'Either Phone or Email is required';
          }
        }
      }
      if (name === 'email') {
        if (value.trim()) {
          if (newErrors.phone === 'Either Phone or Email is required') {
            newErrors.phone = undefined;
          }
        } else {
          if (!formState.phone.trim()) {
            newErrors.phone = 'Either Phone or Email is required';
            newErrors.email = 'Either Phone or Email is required';
          }
        }
      }

      return newErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const newErrors: FormErrors = {};
    Object.keys(formState).forEach(key => {
      const errorMsg = validateField(key, formState[key as keyof FormState], formState);
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
        Email: ${formState.email}
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
          access_key: "4d84c98a-eb94-4f22-8a55-a7e4a80855ec",
          name: formState.senderName || "Web Quote Lead",
          senderName: formState.senderName,
          email: formState.email || "no-email-provided@speedybat.com",
          phone: formState.phone,
          pickupLocation: formState.pickupLocation,
          deliveryLocation: formState.deliveryLocation,
          packageType: formState.packageType,
          deliveryNeeded: formState.deliveryNeeded,
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
          email: '',
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

  const inputClasses = (hasError: boolean) => `w-full glass-input text-slate-200 px-4 py-2.5 sm:py-3 rounded-xl outline-none placeholder:text-slate-600 text-sm border transition-all duration-300 font-sans ${
    hasError 
      ? 'border-red-500 bg-red-950/10 focus:border-red-400 focus:shadow-[0_0_12px_rgba(239,68,68,0.15)]' 
      : 'border-white/[0.04] focus:border-red-500/50'
  }`;

  const labelClasses = "block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-display";

  return (
    <div className="glass-panel-elevated p-4 sm:p-5 lg:p-6 rounded-3xl shadow-2xl relative border border-white/[0.05]">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider font-display flex items-center">
          <span className="w-1.5 h-6 bg-red-600 mr-3 rounded-full"></span>
          Request Quote
        </h2>
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
        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
          
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
                {errors.email && errors.email !== errors.phone && <li>{errors.email}</li>}
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
              Company / Sender Name <span className="text-slate-500 font-light font-sans lowercase italic">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <Building className="h-4 w-4" />
              </div>
              <input
                id="senderName"
                name="senderName"
                type="text"
                className={`${inputClasses(!!errors.senderName)} pl-10`}
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

          {/* Contact & Email Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Contact Phone */}
            <div>
              <label htmlFor="phone" className={labelClasses}>
                Phone <span className="text-slate-500 font-light font-sans lowercase italic">(or email)</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                  <Phone className="h-4 w-4" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={`${inputClasses(!!errors.phone)} pl-10`}
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

            {/* Email Address */}
            <div>
              <label htmlFor="email" className={labelClasses}>
                Email <span className="text-slate-500 font-light font-sans lowercase italic">(or phone)</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`${inputClasses(!!errors.email)} pl-10`}
                  placeholder="dispatch@company.com"
                  value={formState.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "err-email" : undefined}
                />
              </div>
              {errors.email && touched.email && (
                <span id="err-email" className="text-red-400 text-xs mt-1 block font-sans" aria-live="polite">
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          {/* Routing Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Pickup Address or Zip */}
            <div>
              <label htmlFor="pickupLocation" className={labelClasses}>
                Pickup <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                  <MapPin className="h-4 w-4" />
                </div>
                <input
                  id="pickupLocation"
                  name="pickupLocation"
                  type="text"
                  required
                  className={`${inputClasses(!!errors.pickupLocation)} pl-10`}
                  placeholder="Zip or address"
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
                Delivery <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                  <Navigation className="h-4 w-4" />
                </div>
                <input
                  id="deliveryLocation"
                  name="deliveryLocation"
                  type="text"
                  required
                  className={`${inputClasses(!!errors.deliveryLocation)} pl-10`}
                  placeholder="Zip or address"
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
          </div>

          {/* Details Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Package Type */}
            <div>
              <label htmlFor="packageType" className={labelClasses}>Package Type</label>
              <div className="relative">
                <select
                  id="packageType"
                  name="packageType"
                  className="w-full glass-input text-slate-200 px-4 py-2.5 sm:py-3 rounded-xl outline-none border border-white/[0.04] appearance-none text-sm focus:border-red-500/50 cursor-pointer pr-10 font-sans"
                  value={formState.packageType}
                  onChange={handleChange}
                >
                  <option value="Documents" className="bg-obsidian text-slate-200">Documents / Legal Filings</option>
                  <option value="Small Parcel" className="bg-obsidian text-slate-200">Small Parcel / Package</option>
                  <option value="Large Box" className="bg-obsidian text-slate-200">Large Box / Cargo Case</option>
                  <option value="Pallet" className="bg-obsidian text-slate-200">Pallet / Expedited Freight</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* When do you need delivered */}
            <div>
              <label htmlFor="deliveryNeeded" className={labelClasses}>
                Timing Required <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                  <Clock className="h-4 w-4" />
                </div>
                <input
                  id="deliveryNeeded"
                  name="deliveryNeeded"
                  type="text"
                  required
                  className={`${inputClasses(!!errors.deliveryNeeded)} pl-10`}
                  placeholder="ASAP or Date/Time"
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
          </div>

          {/* Submission Button */}
          <div className="pt-2 sm:pt-4">
            <Button
              variant="alert"
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-3 py-3 sm:py-4 text-sm rounded-full shadow-lg hover:shadow-red-900/10 transition-all duration-300 font-display cursor-pointer"
            >
              {isSubmitting ? (
                <span>Processing Quote Request...</span>
              ) : (
                <>
                  <span>Submit Form</span>
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
