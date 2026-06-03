import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';
import { ArrowRight } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const pickupAddress = formData.get("pickupAddress") as string;
    const deliveryAddress = formData.get("deliveryAddress") as string;
    const itemDescription = formData.get("itemDescription") as string;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "252fa1f4-869b-4891-9ff1-fd5165e7d0a8",
          name: fullName,
          email: email,
          phone: phone,
          pickupAddress: pickupAddress,
          deliveryAddress: deliveryAddress,
          itemDescription: itemDescription,
          message: `Booking Request from ${fullName}\nPhone: ${phone}\nPickup: ${pickupAddress}\nDelivery: ${deliveryAddress}\nItem Description: ${itemDescription}`
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
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>Full Name</label>
                <input name="fullName" type="text" required className={inputClasses} placeholder="John Doe" />
              </div>

              <div>
                <label className={labelClasses}>Phone Number</label>
                <input name="phone" type="tel" required className={inputClasses} placeholder="(512) 910-4938" />
              </div>

              <div className="md:col-span-2">
                <label className={labelClasses}>Email Address</label>
                <input name="email" type="email" required className={inputClasses} placeholder="dispatch@company.com" />
              </div>
            </div>

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
            </div>

            <div className="pt-4">
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
        </div>
      </div>
    </section>
  );
};