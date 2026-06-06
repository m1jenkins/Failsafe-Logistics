import React, { useState, useEffect, useRef } from 'react';
import { LocationData } from '../types';
import { locations } from '../data/locations';
import { 
  ArrowRight, Shield, Zap, CheckCircle, Navigation, MapPin, 
  AlertCircle, ChevronDown, Check, Building, Phone
} from 'lucide-react';
import { Button } from './Button';
import { Fleet } from './Fleet';

interface LocationLandingPageProps {
  location: LocationData;
  onNavigate: (locationId: string) => void;
}

interface FormState {
  senderName: string;
  phone: string;
  pickupZip: string;
  deliveryZip: string;
  packageType: string;
  urgencyTier: string;
}

interface FormErrors {
  senderName?: string;
  phone?: string;
  pickupZip?: string;
  deliveryZip?: string;
}

export const LocationLandingPage: React.FC<LocationLandingPageProps> = ({ location, onNavigate }) => {
  const [formState, setFormState] = useState<FormState>({
    senderName: '',
    phone: '',
    pickupZip: '',
    deliveryZip: '',
    packageType: 'Documents',
    urgencyTier: 'Rush (Immediate Dispatch)'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Focus reference for validation accessibility
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  // Filter out the current location for the neighboring directories section
  const otherLocations = Object.values(locations).filter(loc => loc.id !== location.id);

  // Scroll to top on location change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.id]);

  // Validation function
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'senderName':
        if (!value.trim()) return 'Company or Sender Name is required';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        // Basic phone validation (at least 10 digits)
        const digits = value.replace(/\D/g, '');
        if (digits.length < 10) return 'Please enter a valid 10-digit phone number';
        return '';
      case 'pickupZip':
        if (!value.trim()) return 'Pickup Zip Code is required';
        if (!/^\d{5}$/.test(value)) return 'Zip code must be exactly 5 digits';
        return '';
      case 'deliveryZip':
        if (!value.trim()) return 'Delivery Zip Code is required';
        if (!/^\d{5}$/.test(value)) return 'Zip code must be exactly 5 digits';
        return '';
      default:
        return '';
    }
  };

  // Handle changes (clearing errors as the user edits)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-format phone input for nice UX
    let formattedValue = value;
    if (name === 'phone') {
      const x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      if (x) {
        formattedValue = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
      }
    }

    setFormState(prev => ({ ...prev, [name]: formattedValue }));
    
    // Clear error dynamically as the user corrects their input
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle blur validation (validate only after user finishes interacting with a field)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: errorMsg || undefined }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formState).forEach(key => {
      const errorMsg = validateField(key, formState[key as keyof FormState]);
      if (errorMsg) {
        newErrors[key as keyof FormErrors] = errorMsg;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Mark all fields as touched to show validation errors visually
      const allTouched: Record<string, boolean> = {};
      Object.keys(formState).forEach(key => { allTouched[key] = true; });
      setTouched(allTouched);

      // Route focus to error summary for accessibility
      setTimeout(() => {
        errorSummaryRef.current?.focus();
        errorSummaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }

    setIsSubmitting(true);

    try {
      const messageBody = `
        LOCAL LANDING PAGE REQUEST (${location.name})
        ------------------------------------
        Sender/Company: ${formState.senderName}
        Phone: ${formState.phone}
        Pickup Zip: ${formState.pickupZip}
        Delivery Zip: ${formState.deliveryZip}
        Package Type: ${formState.packageType}
        Urgency Tier: ${formState.urgencyTier}
        ------------------------------------
        Originating Route: /${location.id}
      `;

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "252fa1f4-869b-4891-9ff1-fd5165e7d0a8",
          name: formState.senderName,
          email: "leads@speedybat.com",
          phone: formState.phone,
          message: messageBody,
          subject: `New Lead - ${location.name} Courier Service Request`
        })
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        // Clear form state
        setFormState({
          senderName: '',
          phone: '',
          pickupZip: '',
          deliveryZip: '',
          packageType: 'Documents',
          urgencyTier: 'Rush (Immediate Dispatch)'
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

  // Helper classes for standard inputs to maintain Liquid Glass aesthetics
  const inputClasses = (hasError: boolean) => `w-full glass-input text-slate-200 px-5 py-4 rounded-xl outline-none placeholder:text-slate-600 text-sm md:text-base border transition-all duration-300 font-sans ${
    hasError 
      ? 'border-red-500 bg-red-950/10 focus:border-red-400 focus:shadow-[0_0_12px_rgba(239,68,68,0.15)]' 
      : 'border-white/[0.04] focus:border-red-500/50'
  }`;

  const labelClasses = "block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-display";

  return (
    <div className="relative pt-24 pb-16 min-h-screen bg-obsidian">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <main className="container mx-auto px-6 relative z-10">
        
        {/* =========================================================================
            1. HERO & INTRODUCTION SECTION
            ========================================================================= */}
        <section className="py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" aria-labelledby="hero-heading">
          <div className="lg:col-span-7 space-y-6">
            
            {/* Dispatch Status Badge */}
            <div className="inline-flex items-center space-x-2 bg-red-950/30 border border-red-500/20 px-3.5 py-1.5 rounded-full backdrop-blur-md liquid-shimmer">
              <Shield className="h-3.5 w-3.5 text-red-500 animate-pulse" />
              <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest font-display">
                {location.name} Dispatch Active
              </span>
            </div>

            {/* Keyword-optimized H1 */}
            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight font-display">
              Reliable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700">
                {location.name} Courier Service
              </span>
              <span className="text-slate-300 block text-2xl sm:text-3xl font-light mt-4 tracking-normal">
                On-Demand Logistics & Same-Day Courier Fleet
              </span>
            </h1>

            {/* Geographical Transit E-E-A-T introduction */}
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.04] shadow-lg max-w-xl">
              <p className="text-slate-300 font-light leading-relaxed text-sm md:text-base">
                Speedy Bat Couriers is the premier local solution for secure, prompt transport in the <strong className="text-white font-semibold">{location.name}</strong> area. 
                {location.transitInfo} We provide 24/7 dedicated direct-drive delivery solutions to corporate, legal, and medical teams who cannot afford delay.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#quick-quote-form" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border border-red-500/20 text-white font-bold uppercase tracking-wider text-xs md:text-sm px-6 py-4 rounded-full shadow-lg shadow-red-950/30 transition-all inline-flex items-center space-x-2 font-display">
                <span>Book Instant Courier</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="sms:5129104938" className="bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] text-slate-300 hover:text-white font-bold uppercase tracking-wider text-xs md:text-sm px-6 py-4 rounded-full shadow-md transition-all inline-flex items-center space-x-2 font-display">
                <Phone className="h-4 w-4 text-red-500" />
                <span>Text Dispatch (512) 910-4938</span>
              </a>
            </div>

            {/* Micro badges */}
            <div className="flex items-center gap-6 pt-4 text-[10px] text-slate-500 font-bold tracking-wider uppercase font-display border-t border-white/[0.02] max-w-lg">
              <span className="flex items-center"><CheckCircle className="h-3 w-3 text-red-500 mr-1.5" /> 30-60 Min Pickup</span>
              <span className="flex items-center"><CheckCircle className="h-3 w-3 text-red-500 mr-1.5" /> HIPAA Compliant</span>
              <span className="flex items-center"><CheckCircle className="h-3 w-3 text-red-500 mr-1.5" /> Chain of Custody</span>
            </div>

          </div>

          {/* =========================================================================
              2. LEAD CAPTURE FORM SECTION
              ========================================================================= */}
          <div className="lg:col-span-5" id="quick-quote-form">
            <div className="glass-panel-elevated p-8 rounded-3xl shadow-2xl relative border border-white/[0.05]">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider font-display flex items-center">
                  <span className="w-1.5 h-6 bg-red-600 mr-3 rounded-full"></span>
                  Request local courier
                </h2>
                <p className="text-slate-400 text-xs mt-1 font-light leading-relaxed">
                  Provide route coordinates to dispatch a vehicle immediately.
                </p>
              </div>

              {/* Submitted success state */}
              {isSubmitted ? (
                <div className="text-center py-10 space-y-4 font-sans" role="alert" aria-live="polite">
                  <div className="w-16 h-16 bg-red-950/20 border border-red-500/30 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Check className="h-8 w-8 animate-[scaleUp_0.3s_ease]" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase font-display tracking-wider">Request Dispatched!</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                    Thank you. Your local dispatch ticket has been opened. Our Austin dispatcher will contact you by phone shortly to confirm.
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
                  
                  {/* Accessibility Error Summary */}
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
                        {errors.pickupZip && <li>{errors.pickupZip}</li>}
                        {errors.deliveryZip && <li>{errors.deliveryZip}</li>}
                      </ul>
                    </div>
                  )}

                  {/* Submission connection error */}
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
                        placeholder="e.g. St. David's Health, tech lab"
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
                        placeholder="(512) 555-0199"
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

                  {/* Zip Code Route Coordinates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="pickupZip" className={labelClasses}>
                        Pickup Zip <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <input
                          id="pickupZip"
                          name="pickupZip"
                          type="text"
                          required
                          inputMode="numeric"
                          pattern="[0-9]{5}"
                          maxLength={5}
                          className={`${inputClasses(!!errors.pickupZip)} pl-11`}
                          placeholder={location.zipCodes[0]}
                          value={formState.pickupZip}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="postal-code"
                          aria-invalid={!!errors.pickupZip}
                          aria-describedby={errors.pickupZip ? "err-pickupZip" : undefined}
                        />
                      </div>
                      {errors.pickupZip && touched.pickupZip && (
                        <span id="err-pickupZip" className="text-red-400 text-xs mt-1 block font-sans" aria-live="polite">
                          {errors.pickupZip}
                        </span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="deliveryZip" className={labelClasses}>
                        Delivery Zip <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                          <Navigation className="h-4 w-4" />
                        </div>
                        <input
                          id="deliveryZip"
                          name="deliveryZip"
                          type="text"
                          required
                          inputMode="numeric"
                          pattern="[0-9]{5}"
                          maxLength={5}
                          className={`${inputClasses(!!errors.deliveryZip)} pl-11`}
                          placeholder="78701"
                          value={formState.deliveryZip}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={!!errors.deliveryZip}
                          aria-describedby={errors.deliveryZip ? "err-deliveryZip" : undefined}
                        />
                      </div>
                      {errors.deliveryZip && touched.deliveryZip && (
                        <span id="err-deliveryZip" className="text-red-400 text-xs mt-1 block font-sans" aria-live="polite">
                          {errors.deliveryZip}
                        </span>
                      )}
                    </div>
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

                  {/* Urgency Tier */}
                  <div>
                    <label htmlFor="urgencyTier" className={labelClasses}>Urgency Tier</label>
                    <div className="relative">
                      <select
                        id="urgencyTier"
                        name="urgencyTier"
                        className="w-full glass-input text-slate-200 px-5 py-4 rounded-xl outline-none border border-white/[0.04] appearance-none text-sm md:text-base focus:border-red-500/50 cursor-pointer pr-12 font-sans"
                        value={formState.urgencyTier}
                        onChange={handleChange}
                      >
                        <option value="Standard Same-Day" className="bg-obsidian text-slate-200">Standard Same-Day (4-6 Hours)</option>
                        <option value="Rush (Immediate Dispatch)" className="bg-obsidian text-slate-200">Rush Dispatch (Immediate Direct-Drive)</option>
                        <option value="Hot-Shot / STAT Specimen" className="bg-obsidian text-slate-200">Hot-Shot / STAT Specimen (30-60 Min Response)</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
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
                        <span>Processing Dispatch...</span>
                      ) : (
                        <>
                          <span>Request Courier Quote</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <p className="text-center text-slate-600 text-[10px] mt-3 leading-relaxed font-sans font-light">
                      By submitting, you agree to priority routing terms. We dispatch direct-drive couriers immediately upon telephone confirmation.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. LOCAL INSIGHTS SECTION (SEO/E-E-A-T)
            ========================================================================= */}
        <section className="py-20 border-t border-white/[0.03]" aria-labelledby="insights-heading">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="text-center space-y-4">
              <h2 id="insights-heading" className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-wider font-display">
                Austin Hub Geographic Familiarity
              </h2>
              <p className="text-slate-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
                Why central logistics requires more than just navigation software. How Speedy Bat secures speed and reliability inside the {location.name} corridor.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              
              {/* Transit & Bottleneck Familiarity card */}
              <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <h3 className="text-lg font-bold text-white uppercase mb-4 flex items-center font-display tracking-wider">
                  <span className="w-1.5 h-6 bg-red-600 mr-3 rounded-full"></span>
                  Traffic & Infrastructure Bypasses
                </h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed mb-4">
                  Every courier knows the coordinates, but local dispatch dictates routes that skip notorious bottlenecks. We understand when the I-35 deck split is backed up, how Congress Avenue events create detours, and how to optimize MoPac express lanes for time-sensitive cargo.
                </p>
                <div className="p-4 bg-white/[0.01] border border-white/[0.03] rounded-xl text-xs text-slate-500 font-sans italic leading-relaxed">
                  "For immediate {location.name} dispatch, our drivers route through local transit cuts, avoiding highway back-ups to maintain our 60-minute pickup promise."
                </div>
              </div>

              {/* Local Landmarks & Coordinates card */}
              <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <h3 className="text-lg font-bold text-white uppercase mb-4 flex items-center font-display tracking-wider">
                  <span className="w-1.5 h-6 bg-red-600 mr-3 rounded-full"></span>
                  Serving Local Hubs & Institutions
                </h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                  We are intimately familiar with high-priority pickup and dropoff docks in this area. Our drivers serve local institutions daily, meaning we don't get lost inside campus maps or dock directories.
                </p>
                <div className="space-y-3 font-display">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Frequently Serviced Landmark Nodes:</div>
                  <div className="flex flex-wrap gap-2">
                    {location.localHighlights.map((landmark) => (
                      <span key={landmark} className="text-[10px] font-bold text-slate-300 bg-white/[0.02] border border-white/[0.05] px-3 py-1.5 uppercase rounded-full">
                        {landmark}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        <Fleet />

        {/* =========================================================================
            4. LOCAL SERVICE MATRIX
            ========================================================================= */}
        <section className="py-20 border-t border-white/[0.03]" aria-labelledby="services-heading">
          <div className="max-w-5xl mx-auto space-y-12">
            
            <div className="text-center space-y-4">
              <h2 id="services-heading" className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-wider font-display">
                Courier Service Specialties in {location.name}
              </h2>
              <p className="text-slate-400 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
                Direct-drive logistics specifically configured for local corporate, legal, and industrial requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {location.localServices.map((service, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-2xl relative overflow-hidden group flex flex-col justify-between hover:border-red-500/20 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="w-10 h-10 bg-red-950/20 border border-red-500/20 rounded-xl flex items-center justify-center text-red-500 font-bold font-display text-sm">
                      0{idx + 1}
                    </div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display leading-snug">
                      {service.split(' ').slice(0, 3).join(' ')}
                    </h3>
                    <p className="text-slate-400 text-xs font-light leading-relaxed">
                      {service}
                    </p>
                  </div>
                  <div className="pt-6 mt-auto">
                    <a href="#quick-quote-form" className="text-[10px] font-bold text-red-500 hover:text-red-400 uppercase tracking-widest font-display flex items-center space-x-1.5 transition-colors">
                      <span>Dispatch Now</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            5. NEIGHBORHOOD DIRECTORY & ROUTING LINKS (SEO)
            ========================================================================= */}
        <section className="py-20 border-t border-white/[0.03]" aria-labelledby="directory-heading">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="text-center space-y-4">
              <h2 id="directory-heading" className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wider font-display">
                Austin Service Directory
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
                Speedy Bat Couriers serves all of Central Austin and the surrounding metro area. Choose your neighborhood for specialized regional dispatch info.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {otherLocations.map((loc) => (
                <a
                  key={loc.id}
                  href={`/${loc.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(loc.id);
                  }}
                  className="glass-panel p-4 text-center rounded-xl border border-white/[0.03] hover:border-red-500/25 hover:bg-white/[0.01] transition-all duration-300 font-display font-medium text-xs text-slate-400 hover:text-white uppercase tracking-wider cursor-pointer"
                >
                  <MapPin className="h-3.5 w-3.5 text-red-500/60 mx-auto mb-2 group-hover:text-red-500" />
                  <span>{loc.name}</span>
                </a>
              ))}
            </div>

            <div className="pt-10 text-center">
              <a 
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('');
                }}
                className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-red-500 uppercase tracking-widest font-display transition-colors cursor-pointer"
              >
                <span>&larr; Return to Austin Main Page</span>
              </a>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
};
