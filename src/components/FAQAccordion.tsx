import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
      {items.map((item, index) => (
        <div
          key={index}
          className="glass-card overflow-hidden"
          itemScope
          itemProp="mainEntity"
          itemType="https://schema.org/Question"
        >
          <button
            className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-white pr-4" itemProp="name">
              {item.question}
            </span>
            <ChevronDown
              size={20}
              className={`flex-shrink-0 text-blue-brand transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
          >
            <p className="px-5 pb-5 text-slate-300 leading-relaxed" itemProp="text">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
