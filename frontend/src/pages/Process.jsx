import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Compass, Layers, Ruler, Hammer, Sparkles } from 'lucide-react';

const processSteps = [
  {
    num: '01',
    title: 'DISCOVERY',
    subtitle: 'Understanding the client\'s needs and space.',
    description: 'Every project initiates with an immersive spatial diagnosis. We walk the physical site in Lahore, taking comprehensive measurements, evaluating orientation to natural light, noting structural constraints, and interviewing the client regarding their daily rituals and aesthetic expectations.',
    deliverables: [
      'Site audit & photographic spatial survey',
      'Client lifestyle & functional questionnaire',
      'Structural and MEP constraints analysis',
      'Initial scope definition & timeline calibration',
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    icon: Compass,
  },
  {
    num: '02',
    title: 'CONCEPT',
    subtitle: 'Creating the initial design direction.',
    description: 'We translate observations into a distinct architectural narrative. This phase explores mood, monolithic geometry, tonal palettes, and tactile materials. Rather than generic moodboards, we assemble cohesive design palettes that define the emotional temperature of the space.',
    deliverables: [
      'Architectural mood and atmosphere curation',
      'Preliminary materiality & surface sample boards',
      'Color spectrum & lighting direction',
      'Conceptual volumetric layouts',
    ],
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
    icon: Layers,
  },
  {
    num: '03',
    title: 'PLANNING',
    subtitle: 'Developing layouts, materials and details.',
    description: 'Rigorous architectural drafting turns the concept into buildable technical drawings. We draft millimeter-accurate 2D floor plans, elevation views, electrical and lighting plans, reflected ceiling plans (RCP), and detailed millwork specifications.',
    deliverables: [
      'Detailed 2D spatial layouts and circulation plans',
      'Custom joinery & cabinetry technical drawings',
      'Architectural lighting layout & circuit mapping',
      'Itemized material and finish schedules',
    ],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    icon: Ruler,
  },
  {
    num: '04',
    title: 'EXECUTION',
    subtitle: 'Turning the design into a finished space.',
    description: 'Design realization demands continuous quality oversight. We coordinate with specialized joiners, masons, plaster artisans, and lighting technicians in Lahore to ensure that every shadow gap, marble vein transition, and electrical drop is executed according to specification.',
    deliverables: [
      'On-site technical design supervision',
      'Craftsmanship and finish quality audits',
      'Custom millwork installation verification',
      'Coordination of architectural surface treatments',
    ],
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80',
    icon: Hammer,
  },
  {
    num: '05',
    title: 'FINAL DETAIL',
    subtitle: 'Completing the finishing touches.',
    description: 'The final culmination where furniture, textiles, curated luminaires, and architectural accents are placed with intentional restraint. We perform final luminaire calibrations, test dimmer curves, and conduct a thorough walkthrough with the client.',
    deliverables: [
      'Furniture placement & proportional balancing',
      'Textile and drapery hang adjustments',
      'Architectural lighting balance & dimmer tuning',
      'Comprehensive final walkthrough & handover',
    ],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    icon: Sparkles,
  },
];

export default function Process() {
  return (
    <div className="bg-studio-black text-studio-soft pt-32 pb-24 selection:bg-studio-gold selection:text-studio-black">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-studio-gold" />
          <span className="text-xs uppercase tracking-widestEditorial text-studio-gold font-mono">
            ARCHITECTURAL PROTOCOL
          </span>
        </div>
        <h1 className="text-5xl sm:text-7xl font-editorial font-normal text-white max-w-4xl tracking-tight leading-tight">
          The Design <br />
          <span className="italic font-light text-studio-gold">Trajectory.</span>
        </h1>
        <p className="text-studio-light/80 text-base sm:text-lg font-light max-w-2xl mt-6 leading-relaxed">
          From initial spatial discovery to final luminaire calibration, our five-stage methodology ensures complete clarity, rigorous quality, and cohesive architectural beauty.
        </p>
      </div>

      {/* Long Scrolling Editorial Timeline */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        {/* Continuous thin vertical line for large screens */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-studio-borderSubtle -translate-x-1/2" />

        <div className="space-y-24 sm:space-y-32">
          {processSteps.map((step, idx) => {
            const isEven = idx % 2 === 1;
            const IconComponent = step.icon;

            return (
              <div
                key={step.num}
                className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Center Timeline Node */}
                <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 w-8 h-8 rounded-full bg-studio-black border-2 border-studio-gold items-center justify-center z-10">
                  <span className="w-2 h-2 rounded-full bg-studio-gold" />
                </div>

                {/* Content Side */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isEven ? 'lg:order-2 lg:pl-12' : 'lg:order-1 lg:pr-12'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-studio-gold px-2 py-0.5 border border-studio-gold/30 bg-studio-deep">
                      STAGE {step.num}
                    </span>
                    <span className="w-6 h-px bg-studio-gold/40" />
                    <span className="text-xs font-mono uppercase tracking-widest text-studio-medium">
                      Phase {step.num}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-white">
                      {step.title}
                    </h2>
                    <p className="text-sm font-mono text-studio-gold/90 mt-1">
                      {step.subtitle}
                    </p>
                  </div>

                  <p className="text-studio-light/80 font-light leading-relaxed text-sm sm:text-base">
                    {step.description}
                  </p>

                  <div className="pt-4 border-t border-studio-borderSubtle">
                    <p className="text-xs font-mono uppercase tracking-widest text-white mb-3">
                      Stage Deliverables & Focus
                    </p>
                    <ul className="space-y-2 text-xs text-studio-medium">
                      {step.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-studio-gold shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Visual Imagery Side */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden border border-studio-borderSubtle bg-studio-charcoal group">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover grayscale contrast-110 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 p-2 bg-studio-black/80 backdrop-blur-md border border-white/10 text-studio-gold">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="absolute bottom-4 left-4 bg-studio-black/85 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-widest uppercase text-studio-light">
                      Step {step.num} Protocol
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-32">
        <div className="p-10 sm:p-16 border border-studio-borderSubtle bg-studio-deep text-center">
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-white mb-4">
            Begin With Stage 01: Discovery
          </h2>
          <p className="text-studio-medium text-sm sm:text-base font-light max-w-xl mx-auto mb-8 leading-relaxed">
            Every memorable interior starts with an honest discussion about space and lifestyle. Connect with Haroon's Interiors in Lahore today.
          </p>
          <Link
            to="/contact"
            className="px-8 py-4 bg-white text-studio-black font-semibold text-xs uppercase tracking-widest hover:bg-studio-gold transition-colors inline-flex items-center gap-2"
          >
            <span>Schedule Discovery Walkthrough</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
