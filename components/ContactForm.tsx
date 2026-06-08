import React, { useState, useEffect } from 'react';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';
import { Zap, ShieldCheck, MessageSquare, User, Phone, MapPin } from 'lucide-react';

interface ContactFormProps {
  prefilledDetails?: {
    pickupAddress?: string;
    deliveryAddress?: string;
    itemDescription?: string;
  };
}

export const ContactForm: React.FC<ContactFormProps> = ({ prefilledDetails }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  useEffect(() => {
    if (prefilledDetails) {
      let combined = '';
      if (prefilledDetails.itemDescription) {
        combined += prefilledDetails.itemDescription;
      }
      if (prefilledDetails.pickupAddress) {
        combined += (combined ? '\n' : '') + `Pickup: ${prefilledDetails.pickupAddress}`;
      }
      if (prefilledDetails.deliveryAddress) {
        combined += (combined ? '\n' : '') + `Delivery: ${prefilledDetails.deliveryAddress}`;
      }
      setItemDescription(combined);
    }
  }, [prefilledDetails]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const messageBody = `QUICK Dispatch Request from ${fullName}\nPhone: ${phone}\nCargo/Details: ${itemDescription}`;

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "4d84c98a-eb94-4f22-8a55-a7e4a80855ec",
          name: fullName,
          fullName: fullName,
          email: "quick-request@speedybat.com",
          phone: phone,
          pickupAddress: 'N/A (Quick Dispatch)',
          deliveryAddress: 'N/A (Quick Dispatch)',
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

  const inputClasses = "w-full glass-input text-slate-200 px-4 py-3 rounded-xl outline-none placeholder:text-slate-600 text-sm md:text-base";
  const labelClasses = "block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-display";

  return (
    <section className="py-12 md:py-16 bg-obsidian border-b border-white/[0.03] relative overflow-hidden" id="booking">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <SectionHeading
          title="Request Dispatch"
          subtitle="Tell us what you need moved and we'll respond in minutes; day or night."
          align="center"
        />

        <div className="mt-6 md:mt-8 form-premium-glow relative rounded-3xl group/form">
          <div className="form-glow-backdrop" />
          <div className="glass-panel-elevated rounded-3xl p-6 md:p-8 shadow-2xl relative border border-white/[0.05] z-10">
            {/* Card highlight lines */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Web3Forms Access Key HTML Input */}
            <input type="hidden" name="access_key" value="4d84c98a-eb94-4f22-8a55-a7e4a80855ec" />
            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactFullName" className={labelClasses}>Full Name</label>
                <div className="relative group/input">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-300 group-focus-within/input:text-red-500">
                    <User className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="contactFullName"
                    name="fullName"
                    type="text"
                    required
                    className={`${inputClasses} pl-11`}
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contactPhone" className={labelClasses}>Phone Number</label>
                <div className="relative group/input">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-300 group-focus-within/input:text-red-500">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="contactPhone"
                    name="phone"
                    type="tel"
                    required
                    className={`${inputClasses} pl-11`}
                    placeholder="(512) 910-4938"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="contactItemDescription" className={labelClasses}>What are you shipping and where?</label>
              <div className="relative group/input">
                <div className="absolute left-3.5 top-3.5 text-slate-500 transition-colors duration-300 group-focus-within/input:text-red-500">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <textarea
                  id="contactItemDescription"
                  name="itemDescription"
                  required
                  rows={3}
                  className={`${inputClasses} pl-11 resize-none`}
                  placeholder="e.g. Medical kit from St. David's Main to Round Rock Clinic, or parts to Samsung Taylor fab"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-1">
              <Button
                variant="alert"
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-3 py-3 text-base rounded-full shadow-lg hover:shadow-red-900/10 transition-all cursor-pointer btn-shimmer"
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

            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-6 border-t border-white/[0.04] mt-6 text-left">
              <div className="flex items-center space-x-3 bg-white/[0.01] px-4 py-2 border border-white/[0.02] rounded-xl hover:bg-white/[0.02] hover:border-white/[0.04] transition-all duration-300">
                <div className="bg-red-950/20 border border-red-500/20 p-2 rounded-xl text-red-500 shrink-0">
                  <Zap className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider font-display">30-60 Min Response</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/[0.01] px-4 py-2 border border-white/[0.02] rounded-xl hover:bg-white/[0.02] hover:border-white/[0.04] transition-all duration-300">
                <div className="bg-red-950/20 border border-red-500/20 p-2 rounded-xl text-red-500 shrink-0">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider font-display">Secure Logistics</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/[0.01] px-4 py-2 border border-white/[0.02] rounded-xl hover:bg-white/[0.02] hover:border-white/[0.04] transition-all duration-300">
                <div className="bg-red-950/20 border border-red-500/20 p-2 rounded-xl text-red-500 shrink-0">
                  <MessageSquare className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider font-display">SMS Tracking</div>
                </div>
              </div>
            </div>
          </form>
        </div>
        </div>
      </div>
    </section>
  );
};