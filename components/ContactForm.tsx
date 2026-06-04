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
          access_key: "252fa1f4-869b-4891-9ff1-fd5165e7d0a8",
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

  const inputClasses = "w-full bg-slate-950 border border-slate-700 text-slate-200 px-5 py-4 rounded-lg focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-slate-600 text-base";
  const labelClasses = "block text-sm font-semibold text-slate-300 mb-2";

  return (
    <section className="py-24 bg-slate-950" id="booking">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeading
          title="Secure Booking"
          subtitle="Ready to dispatch? Fill out the details below for an immediate response."
          align="center"
        />

        <div className="mt-12 bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-800 shadow-2xl">
          {/* Form Mode Tabs */}
          <div className="flex border-b border-slate-800 mb-8">
            <button
              type="button"
              onClick={() => setFormMode('quick')}
              className={`flex-1 pb-3 text-center font-bold uppercase tracking-wider text-sm border-b-2 transition-all cursor-pointer ${
                formMode === 'quick'
                  ? 'border-red-600 text-white font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              ⚡ Quick Request
            </button>
            <button
              type="button"
              onClick={() => setFormMode('full')}
              className={`flex-1 pb-3 text-center font-bold uppercase tracking-wider text-sm border-b-2 transition-all cursor-pointer ${
                formMode === 'full'
                  ? 'border-red-600 text-white font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              📋 Full Booking Details
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
                  rows={3}
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
                className="w-full flex items-center justify-center space-x-3 py-4 text-lg rounded-lg shadow-lg hover:shadow-red-900/20 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Processing Request...</span>
                ) : (
                  <>
                    <span>Request Courier</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
              <p className="text-center text-slate-500 text-sm mt-4">
                By clicking Request, you agree to our service terms. Immediate availability is subject to confirmation.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-800/60 mt-8 text-center md:text-left">
              <div className="flex items-center space-x-3 bg-slate-950/40 p-3 border border-slate-800/40 rounded-lg">
                <div className="bg-red-950/40 p-2 rounded text-red-500 shrink-0">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wide">30-60 Min Response</div>
                  <div className="text-[10px] text-slate-500">Rapid local dispatch</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-slate-950/40 p-3 border border-slate-800/40 rounded-lg">
                <div className="bg-red-950/40 p-2 rounded text-red-500 shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wide">Secure Logistics</div>
                  <div className="text-[10px] text-slate-500">HIPAA & Chain of Custody</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-slate-950/40 p-3 border border-slate-800/40 rounded-lg">
                <div className="bg-red-950/40 p-2 rounded text-red-500 shrink-0">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wide">SMS Tracking</div>
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