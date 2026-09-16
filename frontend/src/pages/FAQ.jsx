import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowUpRight, HelpCircle, Phone, MessageSquare } from 'lucide-react';

const faqList = [
  {
    q: 'What interior design services do you provide?',
    a: 'Haroon\'s Interiors provides comprehensive spatial and interior design solutions including Residential Interior Design, Commercial Interior Design, Space Planning, Interior Styling, Custom Wall & Surface Treatments (such as fluted panels and stone cladding), and Bespoke Interior Joinery/Cabinetry solutions throughout Lahore.',
  },
  {
    q: 'Do you design residential interiors?',
    a: 'Yes, residential interior design is one of our primary specializations. We design full villas, contemporary townhouses, luxury apartments, drawing & dining rooms, bespoke master bedroom sanctuaries, and kitchen/pantry spatial concepts tailored to your family’s routine and aesthetic preferences.',
  },
  {
    q: 'Do you handle commercial projects?',
    a: 'Yes, we design functional, high-focus commercial environments including executive corporate offices, meeting suites, boutique agency studios, and commercial reception lounges. Our commercial designs prioritize acoustic comfort, brand atmosphere, and ergonomic workflow.',
  },
  {
    q: 'Can interior designs be customized?',
    a: 'Absolutely. Every design crafted by Haroon\'s Interiors is completely bespoke. We do not use generic off-the-shelf templates. Dimensions, storage requirements, lighting circuits, finish textures, and furniture pieces are tailor-drawn to match the exact structural realities of your space.',
  },
  {
    q: 'How can I request a consultation?',
    a: 'You can easily request a consultation by completing our online project inquiry form on the Contact page, calling our studio directly at +92 322 7535688, or reaching out via WhatsApp. We will review your space requirements and arrange an initial discovery walkthrough.',
  },
  {
    q: 'How can I contact Haroon\'s Interiors?',
    a: 'You can contact Haroon\'s Interiors directly by phone at +92 322 7535688 or via WhatsApp. You can also visit our studio at Samars Plaza, Ferozpur Road, Shah Jamal More, Ichhra, Lahore, Pakistan by scheduling an advance appointment.',
  },
  {
    q: 'Where is Haroon\'s Interiors located?',
    a: 'Our studio is conveniently located at G8JC+4HH, Samars Plaza, Ferozpur Rd, Shah Jamal More, Ichhra, Ichhra Lahore, 54600, Pakistan. We serve residential and commercial clients across all major areas of Lahore including Gulberg, DHA, Cantt, Model Town, and Bahria Town.',
  },
];

export default function FAQ() {
  // Allow toggling multiple or single
  const [openIndices, setOpenIndices] = useState([0]);

  const toggleFAQ = (idx) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter((i) => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  return (
    <div className="bg-studio-black text-studio-soft pt-32 pb-24 selection:bg-studio-gold selection:text-studio-black">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 mb-16 text-center">
        <div className="inline-flex items-center gap-3 mb-6 justify-center">
          <span className="w-6 h-px bg-studio-gold" />
          <span className="text-xs uppercase tracking-widestEditorial text-studio-gold font-mono">
            INQUIRY REPOSITORY
          </span>
          <span className="w-6 h-px bg-studio-gold" />
        </div>
        <h1 className="text-5xl sm:text-6xl font-editorial font-normal text-white tracking-tight leading-tight">
          Frequently Answered <br />
          <span className="italic font-light text-studio-gold">Questions.</span>
        </h1>
        <p className="text-studio-light/80 text-base font-light max-w-xl mx-auto mt-6 leading-relaxed">
          Clear answers regarding our interior design methodology, residential & commercial scopes, consultation steps, and Lahore studio location.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="divide-y divide-studio-borderSubtle border-y border-studio-borderSubtle">
          {faqList.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div key={idx} className="py-6 sm:py-8 transition-colors">
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left flex items-start justify-between gap-6 group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className="font-mono text-xs text-studio-gold/70 pt-1">
                      0{idx + 1}
                    </span>
                    <h2
                      className={`text-lg sm:text-xl font-editorial transition-colors ${
                        isOpen ? 'text-studio-gold' : 'text-white group-hover:text-studio-soft'
                      }`}
                    >
                      {item.q}
                    </h2>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full border border-studio-borderSubtle flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-studio-gold text-studio-black border-studio-gold' : 'text-studio-medium group-hover:text-white'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated Dropdown Answer */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pl-8 sm:pl-12 pr-4 text-sm sm:text-base text-studio-light/80 font-light leading-relaxed">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Direct Help Banner */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 mt-20">
        <div className="p-8 sm:p-12 border border-studio-borderSubtle bg-studio-deep flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-editorial text-white mb-2">Have a specific question not listed?</h3>
            <p className="text-xs sm:text-sm text-studio-medium font-light">
              Speak directly with our interior designer in Ichhra, Lahore.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+923227535688"
              className="px-5 py-3 border border-white/20 text-white text-xs uppercase tracking-widest hover:border-studio-gold hover:text-studio-gold transition-colors inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Us</span>
            </a>
            <Link
              to="/contact"
              className="px-5 py-3 bg-studio-gold text-studio-black text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors inline-flex items-center gap-1.5"
            >
              <span>Contact Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
