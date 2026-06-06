import React, { useState, useEffect } from 'react';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';
import { ArrowRight, Zap, ShieldCheck, MessageSquare } from 'lucide-react';

interface ContactFormProps {
  prefilledDetails?: {
    pickupAddress?: string;
    deliveryAddress?: string;
    itemDescription?: string;
  };
}

export const ContactForm: React.FC<ContactFormProps> = ({ prefilledDetails }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMode, setFormMode] = useState<'quick' | 'full'>('quick');

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  useEffect(() => {
    if (prefilledDetails) {
      if (prefilledDetails.pickupAddress !== undefined) setPickupAddress(prefilledDetails.pickupAddress);
      if (prefilledDetails.deliveryAddress !== undefined) setDeliveryAddress(prefilledDetails.deliveryAddress);
      if (prefilledDetails.itemDescription !== undefined) setItemDescription(prefilledDetails.itemDescription);
      if (prefilledDetails.pickupAddress || prefilledDetails.deliveryAddress || prefilledDetails.itemDescription) {
        setFormMode('full');
      }
    }
  }, [prefilledDetails]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const messageBody = formMode === 'quick'
        ? `QUICK Dispatch Request from ${fullName}\nPhone: ${phone}\nCargo/Details: ${itemDescription}`
        : `Booking Request from ${fullName}\nPhone: ${phone}\nPickup: ${pickupAddress}\nDelivery: ${deliveryAddress}\nItem Description: ${itemDescription}`;

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "9f904ee4-4752-46ac-bfe9-8ef9dab95cae",
          name: fullName,
          email: email || "quick-request@speedybat.com",
          phone: phone,
          pickupAddress: formMode === 'quick' ? 'N/A (Quick Dispatch)' : pickupAddress,
          deliveryAddress: formMode === 'quick' ? 'N/A (Quick Dispatch)' : deliveryAddress,
          itemDescription: itemDescription,
          message: messageBody
        })
      });

      const result = await response.json();
      if (result.success) {
        window.location.href = '/success';
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("There was a connection error. Please text our dispatch line directly at (512) 910-4938.");
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full glass-input text-slate-200 px-5 py-4 rounded-xl outline-none placeholder:text-slate-600 text-sm md:text-base";
  const labelClasses = "block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-display";

  return (
    <section className="py-24 bg-obsidian border-b border-white/[0.03] relative overflow-hidden" id="booking">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <SectionHeading
          title="Secure Booking"
          subtitle="Ready to dispatch? Fill out the details below for an immediate response."
          align="center"
        />

        <div className="mt-12 glass-panel-elevated rounded-3xl p-8 md:p-12 shadow-2xl relative">
          {/* Card highlight lines */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          {/* Form Mode Tabs (Pill Control Style) */}
          <div className="flex p-1 bg-white/[0.02] border border-white/[0.04] rounded-full mb-8 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setFormMode('quick')}
              className={`flex-1 py-2.5 text-center font-bold uppercase tracking-wider text-xs rounded-full transition-all duration-300 cursor-pointer ${
                formMode === 'quick'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-950/20'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Quick Request
            </button>
            <button
              type="button"
              onClick={() => setFormMode('full')}
              className={`flex-1 py-2.5 text-center font-bold uppercase tracking-wider text-xs rounded-full transition-all duration-300 cursor-pointer ${
                formMode === 'full'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-950/20'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Full Booking Details
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  required
                  className={inputClasses}
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              <div>
                <label className={labelClasses}>Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  className={inputClasses}
                  placeholder="(512) 910-4938"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </div>
            </div>

            {formMode === 'quick' ? (
              /* Quick Request Mode Extra Fields */
              <div>
                <label className={labelClasses}>What are you shipping and where?</label>
                <textarea
                  name="itemDescription"
                  required
                  rows={4}
                  className={`${inputClasses} resize-none`}
                  placeholder="e.g. Medical kit from St. David's Main to Round Rock Clinic, or parts to Samsung Taylor fab"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                />
              </div>
            ) : (
              /* Full Booking Mode Extra Fields */
              <>
                <div>
                  <label className={labelClasses}>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className={inputClasses}
                    placeholder="dispatch@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>Pickup Address</label>
                    <input
                      name="pickupAddress"
                      type="text"
                      required
                      className={inputClasses}
                      placeholder="Street, City, Zip"
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                      autoComplete="street-address"
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Delivery Address</label>
                    <input
                      name="deliveryAddress"
                      type="text"
                      required
                      className={inputClasses}
                      placeholder="Street, City, Zip"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>What are we transporting?</label>
                  <input
                    name="itemDescription"
                    type="text"
                    required
                    className={inputClasses}
                    placeholder="e.g. Box of parts, Documents, Medical Kit"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="pt-4">
              <Button
                variant="alert"
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-3 py-4 text-base rounded-full shadow-lg hover:shadow-red-900/10 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Processing Request...</span>
                ) : (
                  <>
                    <span>Request Courier Dispatch</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
              <p className="text-center text-slate-500 text-xs mt-4 leading-relaxed">
                By clicking Request, you agree to our service terms. Immediate availability is subject to confirmation.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-white/[0.04] mt-8 text-left">
              <div className="flex items-center space-x-3 bg-white/[0.02] p-4 border border-white/[0.04] rounded-2xl hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-300">
                <div className="bg-red-950/20 border border-red-500/20 p-2.5 rounded-xl text-red-500 shrink-0">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider font-display">30-60 Min Response</div>
                  <div className="text-[10px] text-slate-500">Rapid local dispatch</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/[0.02] p-4 border border-white/[0.04] rounded-2xl hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-300">
                <div className="bg-red-950/20 border border-red-500/20 p-2.5 rounded-xl text-red-500 shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider font-display">Secure Logistics</div>
                  <div className="text-[10px] text-slate-500">HIPAA & Chain of Custody</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/[0.02] p-4 border border-white/[0.04] rounded-2xl hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-300">
                <div className="bg-red-950/20 border border-red-500/20 p-2.5 rounded-xl text-red-500 shrink-0">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider font-display">SMS Tracking</div>
                  <div className="text-[10px] text-slate-500">Real-time transit updates</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};