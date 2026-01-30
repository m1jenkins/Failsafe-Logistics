import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';
import { CheckCircle, ArrowRight, AlertTriangle, Scale, Ruler, Phone } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // GOOGLE SHEETS INTEGRATION
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwuYuhre90uLdf6n7VHLGI7jFp2Vrp_iyS1ixGQm87l4uOREtdwV8J7XqPN3TvbruiEyA/exec";

    try {
      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'no-cors', 
            headers: {
                'Content-Type': 'application/json',
            }
        });
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Form Data Captured:", data);
      }
      setSubmitted(true);
    } catch (error) {
      console.error("Submission Error:", error);
      alert("There was a connection error. Please call our dispatch line directly.");
    } finally {
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

        {/* Min-height ensures the page doesn't jump/scroll when content is swapped */}
        <div className="mt-12 bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-800 shadow-2xl min-h-[800px] flex flex-col justify-center">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500 h-full">
              <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Request Logged</h3>
              <p className="text-slate-400 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
                Our dispatch team has received your details. Please be advised that <span className="text-white font-bold">CALLING is the fastest way to reach us</span>, especially after hours or for urgent dispatch requirements.
              </p>
              
              <div className="flex flex-col w-full max-w-xs gap-4">
                <Button variant="alert" onClick={() => window.location.href = 'tel:5550192834'} className="rounded-lg w-full flex items-center justify-center space-x-2 py-4">
                  <Phone className="h-5 w-5" />
                  <span>CALL NOW</span>
                </Button>
                
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="text-slate-500 hover:text-white text-sm underline underline-offset-4 transition-colors pt-2"
                >
                  Submit New Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Contact Details Group */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6 flex items-center border-b border-slate-800 pb-3">
                  <span className="bg-red-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs mr-3">1</span>
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                    <label className={labelClasses}>Full Name</label>
                    <input name="fullName" type="text" required className={inputClasses} placeholder="John Doe" />
                   </div>
                   
                   <div>
                    <label className={labelClasses}>Phone Number</label>
                    <input name="phone" type="tel" required className={inputClasses} placeholder="(512) 555-0123" />
                   </div>

                   <div className="md:col-span-2">
                    <label className={labelClasses}>Email Address</label>
                    <input name="email" type="email" required className={inputClasses} placeholder="dispatch@company.com" />
                   </div>
                </div>
              </div>

              {/* Service Requirements Group */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6 flex items-center border-b border-slate-800 pb-3">
                  <span className="bg-red-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs mr-3">2</span>
                  Service Requirements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="md:col-span-2">
                    <label className={labelClasses}>Desired Mode of Service</label>
                    <select name="serviceMode" className={inputClasses}>
                      <option value="ground">Expedited Ground (SUV/Van)</option>
                      <option value="air">Air Hand Carry</option>
                    </select>
                   </div>

                   <div>
                    <label className={labelClasses}>Desired Pickup Time</label>
                    <input 
                      name="pickupTime"
                      type="datetime-local" 
                      className={`${inputClasses} [color-scheme:dark] cursor-pointer`} 
                    />
                   </div>

                   <div>
                    <label className={labelClasses}>Desired Delivery Time</label>
                    <input 
                      name="deliveryTime"
                      type="datetime-local" 
                      className={`${inputClasses} [color-scheme:dark] cursor-pointer`} 
                    />
                   </div>

                   <div className="md:col-span-2">
                    <label className="flex items-center space-x-3 cursor-pointer group p-4 border border-red-900/40 bg-red-950/10 rounded-lg hover:bg-red-950/20 transition-colors">
                        <div className="relative flex items-center">
                          <input name="urgent" type="checkbox" className="peer w-6 h-6 border-2 border-slate-600 rounded bg-slate-900 checked:bg-red-600 checked:border-red-600 transition-colors cursor-pointer appearance-none" />
                          <CheckCircle className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-1 top-1" />
                        </div>
                        <span className="text-red-200 font-bold tracking-wide group-hover:text-red-100 flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-3 text-red-500 animate-pulse" />
                            IMMEDIATE RESPONSE REQUIRED (ASAP)
                        </span>
                    </label>
                   </div>
                </div>
              </div>

              {/* Shipment Details Group */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6 flex items-center border-b border-slate-800 pb-3">
                  <span className="bg-red-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs mr-3">3</span>
                  Shipment & Payload
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                    <label className={labelClasses}>Pickup Address</label>
                    <input name="pickupAddress" type="text" required className={inputClasses} placeholder="Street, City, Zip" />
                   </div>

                   <div>
                    <label className={labelClasses}>Delivery Address</label>
                    <input name="deliveryAddress" type="text" required className={inputClasses} placeholder="Street, City, Zip" />
                   </div>

                   <div className="md:col-span-2">
                    <label className={labelClasses}>What are we transporting?</label>
                    <input name="itemDescription" type="text" required className={inputClasses} placeholder="e.g. Box of parts, Documents, Medical Kit" />
                   </div>

                   <div>
                    <label className={labelClasses}>
                      <span className="flex items-center"><Scale className="w-4 h-4 mr-2 text-slate-500" /> Est. Weight</span>
                    </label>
                    <input name="weight" type="text" className={inputClasses} placeholder="e.g. 50 lbs" />
                   </div>

                   <div>
                    <label className={labelClasses}>
                      <span className="flex items-center"><Ruler className="w-4 h-4 mr-2 text-slate-500" /> Est. Dimensions (LxWxH)</span>
                    </label>
                    <input name="dimensions" type="text" className={inputClasses} placeholder="e.g. 40x48x20 in" />
                   </div>
                   
                   <div className="md:col-span-2">
                    <label className={labelClasses}>Additional Notes / Access Codes</label>
                    <textarea 
                      name="notes"
                      className={`${inputClasses} min-h-[120px] resize-y`} 
                      placeholder="Gate codes, specific contact person, handling instructions..."
                    ></textarea>
                   </div>
                </div>
              </div>

              <div className="pt-6">
                <Button variant="alert" type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center space-x-3 py-4 text-lg rounded-lg shadow-lg hover:shadow-red-900/20 transition-all">
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
            </form>
          )}
        </div>
      </div>
    </section>
  );
};