export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'How do I get a quote?',
    answer: 'Send the pickup and destination ZIPs, deadline, item type, approximate size and weight, and your phone number or email. Dispatch will follow up with availability, price, and any questions.'
  },
  {
    question: 'How soon can you pick up?',
    answer: 'Pickup time depends on the location, deadline, cargo, traffic, access, and available courier and vehicle. Send the route for a current estimate.'
  },
  {
    question: 'Where do you pick up?',
    answer: 'Routine pickup is in the Austin metro. We also quote longer routes that start in Austin. Ask dispatch about the exact pickup and destination.'
  },
  {
    question: 'How is pricing calculated?',
    answer: 'Price depends on distance, urgency, vehicle, cargo size and weight, waiting time, tolls, airport handling, site access, and after-hours work when applicable. Dispatch confirms the price before booking.'
  },
  {
    question: 'Can I request direct delivery?',
    answer: 'Yes, you can request it. Direct or dedicated service is included only when dispatch confirms it in the quote.'
  },
  {
    question: 'Do you handle airport recovery and NFO shipments?',
    answer: 'We consider Austin airport recovery, tender, transfer, NFO, and AOG requests. Acceptance depends on the handler, cargo release, documents, access, operating hours, cargo, and onward route.'
  },
  {
    question: 'Will I receive updates or delivery confirmation?',
    answer: 'Dispatch confirms the update and receipt method for each accepted job. Options may include milestone updates, a recipient signature, a photo, or another agreed handoff record.'
  },
  {
    question: 'What should I leave out of the quote form?',
    answer: 'Do not send health information, patient names, account numbers, IDs, access codes, or detailed descriptions of valuables through the public form or text messages. Start with a broad item category.'
  }
];
