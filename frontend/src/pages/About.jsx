import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Compass } from 'lucide-react';

const philosophyItems = [
  {
    num: '01',
    name: 'Function',
    desc: 'An interior must first work impeccably. Spatial flow, storage logic, and ergonomic layout form the invisible bedrock of every design.',
  },
  {
    num: '02',
    name: 'Aesthetics',
    desc: 'Visual poetry born from restraint rather than decoration. Clean lines, textural depth, and disciplined geometric silhouettes.',
  },
  {
    num: '03',
    name: 'Comfort',
    desc: 'A sanctuary that eases the mind. Tactile fabrics, deep seated volumes, and quiet surfaces that encourage genuine relaxation.',
  },
  {
    num: '04',
    name: 'Materials',
    desc: 'Honest, enduring materials: European smoked oak, Nero Marquina marble, brushed brass, raw plaster, and natural slubbed linens.',
  },
  {
    num: '05',
    name: 'Lighting',
    desc: 'Sculpting atmosphere through indirect illumination, recessed linear coves, and warm perimeter grazes rather than harsh glare.',
  },
  {
    num: '06',
    name: 'Proportion',
    desc: 'Calculated architectural scale and rhythm where heights, openings, and furniture footprints align in seamless harmony.',
  },
];

const valuesList = [
  {
    title: 'Detail',
    desc: 'Meticulous refinement down to millimeter shadow gaps, brass transition strips, and tailored edge profiles.',
  },
  {
    title: 'Function',
    desc: 'Designing spaces tailored specifically for the everyday patterns of the people who occupy them.',
  },
  {
    title: 'Character',
    desc: 'Rejecting sterile repetition to imbue each space with distinct soul, warmth, and artistic composure.',
  },
  {
    title: 'Quality',
    desc: 'Prioritizing architectural longevity through durable craftsmanship and authentic material selections.',
  },
];

export default function About() {
  return (
    <div className="bg-studio-black text-studio-soft pt-32 pb-24 selection:bg-studio-gold selection:text-studio-black">
      {/* 1. EDITORIAL HEADER */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-studio-gold" />
          <span className="text-xs uppercase tracking-widestEditorial text-studio-gold font-mono">
            STUDIO MONOGRAPH
          </span>
        </div>
        <h1 className="text-5xl sm:text-7xl font-editorial font-normal text-white max-w-4xl tracking-tight leading-tight">
          About Haroon's <br />
          <span className="italic font-light text-studio-gold">Interiors.</span>
        </h1>
      </div>

      {/* 2. INTRODUCTION & STUDIO PROFILE */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-mono uppercase tracking-widest text-studio-medium mb-4">
              PRACTICE OVERVIEW
            </p>
            <p className="text-2xl sm:text-3xl font-editorial text-white leading-relaxed font-light">
              Haroon's Interiors is an interior design studio based on Ferozpur Road in Ichhra, Lahore.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6 text-studio-light/80 font-light leading-relaxed text-base sm:text-lg">
            <p>
              We believe that an interior is never merely an arrangement of furniture—it is an architectural envelope that directly impacts wellbeing, productivity, and emotional ease. Our work is dedicated to residential and commercial environments throughout Lahore that celebrate spatial clarity, refined materiality, and timeless balance.
            </p>
            <p>
              From private family residences and executive chambers to contemporary commercial spaces, we work in close dialogue with our clients. We take the time to observe how a space is inhabited, what natural illumination it receives, and how architectural transitions can be refined into quiet moments of beauty.
            </p>
          </div>
        </div>
      </section>

      {/* 3. OUR APPROACH — LARGE VERTICAL IMAGE + TEXT */}
      <section className="py-24 bg-studio-deep border-y border-studio-borderSubtle mb-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Large Vertical Architectural Imagery */}
            <div className="lg:col-span-6 relative aspect-[3/4] overflow-hidden border border-studio-borderSubtle">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                alt="Studio Architectural Approach"
                className="w-full h-full object-cover grayscale contrast-110"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-studio-black/85 backdrop-blur-md border border-white/10">
                <span className="text-[11px] font-mono tracking-widest text-studio-gold uppercase block">
                  Materiality & Light
                </span>
                <p className="text-xs text-studio-medium mt-1">
                  Disciplined composition of stone, light, and natural timber in Lahore.
                </p>
              </div>
            </div>

            {/* Right: Approach Details */}
            <div className="lg:col-span-6 space-y-8">
              <span className="text-xs font-mono uppercase tracking-widest text-studio-gold block">
                OUR METHOD
              </span>
              <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-white">
                Quiet Precision In Every Dimension.
              </h2>
              <p className="text-studio-light/80 font-light leading-relaxed">
                Rather than adhering to transient trends, we prioritize enduring spatial principles. Every project begins with an on-site spatial audit in Lahore, analyzing floor volumes, natural ventilation, sightlines, and practical everyday use.
              </p>

              <div className="space-y-4 pt-4 border-t border-studio-borderSubtle">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-studio-gold mt-2 shrink-0" />
                  <p className="text-sm text-studio-medium font-light">
                    <strong className="text-white font-medium">Contextual Understanding:</strong> Designing specifically for the building’s physical orientation and local climate.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-studio-gold mt-2 shrink-0" />
                  <p className="text-sm text-studio-medium font-light">
                    <strong className="text-white font-medium">Tactile Curation:</strong> Sourcing high-grade stones, architectural millwork, and custom upholstery.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-studio-gold mt-2 shrink-0" />
                  <p className="text-sm text-studio-medium font-light">
                    <strong className="text-white font-medium">Seamless Realization:</strong> Overseeing technical execution to ensure the built space matches the conceptual vision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DESIGN PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-28">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-studio-gold block mb-3">
            ARCHITECTURAL CODE
          </span>
          <h2 className="text-4xl sm:text-5xl font-editorial font-normal text-white">
            Design Philosophy
          </h2>
          <p className="text-studio-medium text-base mt-4 font-light leading-relaxed">
            Six foundational pillars define how Haroon's Interiors conceives, proportions, and executes interior environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {philosophyItems.map((item) => (
            <div
              key={item.num}
              className="p-8 border border-studio-borderSubtle bg-studio-deep/40 hover:border-studio-gold/40 transition-colors"
            >
              <span className="font-mono text-xs text-studio-gold block mb-3">{item.num}</span>
              <h3 className="text-2xl font-editorial text-white mb-2">{item.name}</h3>
              <p className="text-sm text-studio-medium font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHAT WE VALUE — 4 MINIMALIST POINTS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-24">
        <div className="border-t border-studio-borderSubtle pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-studio-gold block mb-2">
                CORE PRINCIPLES
              </span>
              <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-white">
                What We Value
              </h2>
            </div>
            <p className="text-xs uppercase tracking-widest text-studio-medium font-mono mt-2 md:mt-0">
              Integrity • Discipline • Craft
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuesList.map((val, idx) => (
              <div
                key={val.title}
                className="p-6 border-b-2 border-studio-gold bg-studio-charcoal/20"
              >
                <span className="text-xs font-mono text-studio-gold/60 block mb-2">
                  0{idx + 1}
                </span>
                <h3 className="text-xl font-editorial text-white mb-2">{val.title}</h3>
                <p className="text-xs sm:text-sm text-studio-medium font-light leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="p-12 border border-studio-borderSubtle bg-studio-deep flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-editorial text-white mb-1">
              Ready to discuss your interior project?
            </h3>
            <p className="text-sm text-studio-medium font-light">
              Connect with our studio in Ichhra, Lahore for a detailed spatial consultation.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-8 py-3.5 bg-white text-studio-black font-medium text-xs uppercase tracking-widest hover:bg-studio-gold transition-colors shrink-0"
          >
            Start Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
