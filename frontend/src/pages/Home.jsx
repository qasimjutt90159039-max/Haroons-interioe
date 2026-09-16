import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, Phone, MessageSquare, Compass, Eye, ChevronRight } from 'lucide-react';
import { api } from '../services/api';
import { CardSkeleton } from '../components/LoadingSkeleton';

const servicesList = [
  {
    num: '01',
    title: 'Residential Interiors',
    desc: 'Full-scale residences, private villas, and bespoke apartment renovations tailored for calm, daily luxury.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
    link: '/services',
  },
  {
    num: '02',
    title: 'Commercial Interiors',
    desc: 'Executive offices, collaborative studios, and commercial suites designed around brand identity and focus.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    link: '/services',
  },
  {
    num: '03',
    title: 'Space Planning',
    desc: 'Disciplined spatial orchestration maximizing circulation, natural daylighting, and functional movement.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    link: '/services',
  },
  {
    num: '04',
    title: 'Interior Styling',
    desc: 'Tactile curation of custom furniture, bespoke textiles, tonal art pieces, and architectural ceramics.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    link: '/services',
  },
  {
    num: '05',
    title: 'Wall & Surface Design',
    desc: 'Sculptural acoustic paneling, fluted timber profiles, raw lime plaster, and custom stone inlays.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80',
    link: '/services',
  },
  {
    num: '06',
    title: 'Custom Interior Solutions',
    desc: 'One-of-a-kind built-in joinery, architectural lighting troughs, and bespoke furniture engineering.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
    link: '/services',
  },
];

const philosophyPillars = [
  { title: 'Balance', desc: 'Equilibrium between monolithic negative space and purposeful human comfort.' },
  { title: 'Materials', desc: 'Honest textures: flamed granite, smoked oak, brushed brass, and natural linens.' },
  { title: 'Light', desc: 'Directing natural daylight during the day and subtle ambient illumination by evening.' },
  { title: 'Proportion', desc: 'Architectural harmony where every line aligns with spatial sightlines.' },
  { title: 'Function', desc: 'Effortless usability engineered beneath pristine, uncluttered visual surfaces.' },
  { title: 'Personality', desc: 'Infusing the owner’s temperament so the interior feels intimately inhabited.' },
];

const processSteps = [
  {
    num: '01',
    phase: 'DISCOVER',
    desc: 'Understand the space, lifestyle, functional flow, and specific aesthetic requirements.',
  },
  {
    num: '02',
    phase: 'DEFINE',
    desc: 'Develop the design direction, materiality boards, and initial spatial layout concepts.',
  },
  {
    num: '03',
    phase: 'DEVELOP',
    desc: 'Refine technical details, finishes, custom millwork drawings, furniture, and lighting.',
  },
  {
    num: '04',
    phase: 'DELIVER',
    desc: 'Bring the final vision together with meticulous attention to detail and craftsmanship.',
  },
];

export default function Home() {
  const [activeServiceHover, setActiveServiceHover] = useState(0);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await api.getProjects({ featured: true });
        if (res.data && res.data.length > 0) {
          setFeaturedProjects(res.data.slice(0, 5));
        }
      } catch (err) {
        console.error('Error fetching featured projects:', err);
      } finally {
        setLoadingProjects(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <div className="bg-studio-black text-studio-soft selection:bg-studio-gold selection:text-studio-black">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-12 px-6 sm:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Background Architectural Atmosphere */}
        <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85"
            alt="Interior Architecture"
            className="w-full h-full object-cover object-center filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-studio-black via-studio-black/80 to-studio-black/50" />
        </div>

        {/* Top Tagline */}
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-studio-gold" />
          <span className="text-xs uppercase tracking-widestEditorial text-studio-gold font-mono">
            INTERIOR DESIGN STUDIO
          </span>
        </div>

        {/* Main Editorial Hero Typography */}
        <div className="my-auto max-w-4xl py-12">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-editorial font-normal tracking-tight leading-tightEditorial text-white mb-8">
            Spaces With <br />
            <span className="italic font-light text-studio-gold">Character.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-studio-light/80 max-w-2xl font-light leading-relaxed mb-10">
            Haroon's Interiors transforms everyday spaces into refined environments where architecture, functionality and personal style come together.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <Link
              to="/portfolio"
              className="px-8 py-4 bg-white text-studio-black font-medium text-xs uppercase tracking-widest hover:bg-studio-gold transition-colors duration-300 flex items-center gap-2 group shadow-xl"
            >
              <span>Explore Portfolio</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border border-white/20 text-white font-medium text-xs uppercase tracking-widest hover:border-studio-gold hover:text-studio-gold transition-all duration-300"
            >
              Start a Project
            </Link>
          </div>
        </div>

        {/* Bottom Hero Indicators */}
        <div className="flex items-end justify-between border-t border-white/10 pt-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-studio-gold" />
            <span className="text-xs font-mono tracking-widest uppercase text-studio-light/70">
              LAHORE • PAKISTAN
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono tracking-widest text-studio-medium">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-studio-gold" />
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION (01 — OUR APPROACH) */}
      <section className="py-24 sm:py-32 border-t border-studio-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-xs font-mono tracking-widest uppercase text-studio-gold mb-12 flex items-center gap-2">
            <span>01 — OUR APPROACH</span>
            <span className="w-12 h-px bg-studio-gold/40" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Editorial Heading & Content */}
            <div className="lg:col-span-6 space-y-8">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-normal leading-tight text-white">
                Designed Around The Way You Live.
              </h2>
              <p className="text-base sm:text-lg text-studio-light/80 font-light leading-relaxed">
                Every interior has its own character. Our approach focuses on understanding the space, the people who use it and the atmosphere they want to create.
              </p>
              <div className="space-y-4 text-sm text-studio-medium leading-relaxed font-light pt-4 border-t border-studio-borderSubtle">
                <p>
                  Rather than imposing repetitive templates, we study natural light vectors, architectural proportions, and organic movement patterns. The result is a home or office that feels effortless, serene, and distinctly yours.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-studio-gold hover:text-white transition-colors group"
                >
                  <span>Read Studio Philosophy</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Column: Large Architectural Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] overflow-hidden border border-studio-borderSubtle group">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Architectural Interior Detail"
                  className="w-full h-full object-cover grayscale contrast-110 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 bg-studio-black/90 backdrop-blur-md px-4 py-2 text-[11px] font-mono tracking-widest uppercase text-studio-soft border border-white/10">
                  Spatial Equilibrium • Lahore
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES (02 — WHAT WE DESIGN) */}
      <section className="py-24 sm:py-32 bg-studio-deep border-t border-studio-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-studio-borderSubtle">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-studio-gold block mb-2">
                02 — DISCIPLINE
              </span>
              <h2 className="text-4xl sm:text-5xl font-editorial font-normal text-white">
                What We Design
              </h2>
            </div>
            <p className="text-xs uppercase tracking-widest text-studio-medium mt-4 md:mt-0">
              Interactive Discipline Index
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Numbered Vertical Service List */}
            <div className="lg:col-span-7 divide-y divide-studio-borderSubtle">
              {servicesList.map((service, idx) => {
                const isActive = activeServiceHover === idx;
                return (
                  <div
                    key={service.num}
                    onMouseEnter={() => setActiveServiceHover(idx)}
                    className={`py-6 sm:py-8 transition-all duration-300 cursor-pointer group ${
                      isActive ? 'bg-studio-charcoal/40 px-4' : 'px-0'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 sm:gap-6">
                        <span
                          className={`font-mono text-sm sm:text-base transition-colors duration-300 ${
                            isActive ? 'text-studio-gold font-bold' : 'text-studio-medium'
                          }`}
                        >
                          {service.num}
                        </span>
                        <div>
                          <h3
                            className={`text-xl sm:text-2xl font-editorial transition-colors duration-300 ${
                              isActive ? 'text-white' : 'text-studio-soft/80'
                            }`}
                          >
                            {service.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-studio-medium mt-1 max-w-md font-light">
                            {service.desc}
                          </p>
                        </div>
                      </div>

                      <Link
                        to="/services"
                        className={`inline-flex items-center gap-1 text-xs uppercase tracking-widest transition-all duration-300 ${
                          isActive
                            ? 'text-studio-gold opacity-100 translate-x-0'
                            : 'text-studio-medium opacity-0 -translate-x-2'
                        }`}
                      >
                        <span>Explore</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Dynamic Interactive Preview Image */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="sticky top-28 aspect-[3/4] overflow-hidden border border-studio-borderSubtle bg-studio-charcoal">
                <img
                  src={servicesList[activeServiceHover].image}
                  alt={servicesList[activeServiceHover].title}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-studio-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono uppercase text-studio-light">
                  <span>{servicesList[activeServiceHover].num}</span>
                  <span className="tracking-widest">{servicesList[activeServiceHover].title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PORTFOLIO (03 — ASYMMETRICAL SHOWCASE) */}
      <section className="py-24 sm:py-32 border-t border-studio-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-studio-borderSubtle">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-studio-gold block mb-2">
                03 — CURATED ARCHIVES
              </span>
              <h2 className="text-4xl sm:text-5xl font-editorial font-normal text-white">
                Featured Portfolio
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-studio-light hover:text-studio-gold transition-colors mt-4 sm:mt-0"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {loadingProjects ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="text-center py-16 text-studio-medium">
              Portfolio projects currently loading.
            </div>
          ) : (
            /* Asymmetric Editorial Gallery Grid */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Feature 1: Large Major Hero Showcase (Span 7) */}
              {featuredProjects[0] && (
                <div className="md:col-span-7 group">
                  <Link to={`/portfolio/${featuredProjects[0]._id || featuredProjects[0].id}`}>
                    <div className="relative aspect-[16/10] overflow-hidden border border-studio-borderSubtle bg-studio-charcoal">
                      <img
                        src={featuredProjects[0].images[0]}
                        alt={featuredProjects[0].title}
                        className="w-full h-full object-cover grayscale contrast-110 transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-studio-black/80 px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase text-studio-gold border border-studio-borderSubtle">
                        {featuredProjects[0].isSample ? 'Sample Project' : 'Project'}
                      </div>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                      <div>
                        <span className="text-xs uppercase tracking-widest text-studio-gold font-mono block">
                          {featuredProjects[0].category}
                        </span>
                        <h3 className="text-2xl font-editorial text-white group-hover:text-studio-gold transition-colors mt-1">
                          {featuredProjects[0].title}
                        </h3>
                      </div>
                      <span className="text-xs uppercase tracking-widest text-studio-medium font-mono hidden sm:inline-block">
                        View Space →
                      </span>
                    </div>
                  </Link>
                </div>
              )}

              {/* Feature 2: Tall Portrait Showcase (Span 5) */}
              {featuredProjects[1] && (
                <div className="md:col-span-5 group md:mt-12">
                  <Link to={`/portfolio/${featuredProjects[1]._id || featuredProjects[1].id}`}>
                    <div className="relative aspect-[3/4] overflow-hidden border border-studio-borderSubtle bg-studio-charcoal">
                      <img
                        src={featuredProjects[1].images[0]}
                        alt={featuredProjects[1].title}
                        className="w-full h-full object-cover grayscale contrast-110 transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-studio-black/80 px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase text-studio-gold border border-studio-borderSubtle">
                        {featuredProjects[1].isSample ? 'Sample Project' : 'Project'}
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-xs uppercase tracking-widest text-studio-gold font-mono block">
                        {featuredProjects[1].category}
                      </span>
                      <h3 className="text-xl font-editorial text-white group-hover:text-studio-gold transition-colors mt-1">
                        {featuredProjects[1].title}
                      </h3>
                    </div>
                  </Link>
                </div>
              )}

              {/* Feature 3: Medium Compact (Span 4) */}
              {featuredProjects[2] && (
                <div className="md:col-span-4 group">
                  <Link to={`/portfolio/${featuredProjects[2]._id || featuredProjects[2].id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden border border-studio-borderSubtle bg-studio-charcoal">
                      <img
                        src={featuredProjects[2].images[0]}
                        alt={featuredProjects[2].title}
                        className="w-full h-full object-cover grayscale contrast-110 transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-studio-black/80 px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase text-studio-gold border border-studio-borderSubtle">
                        {featuredProjects[2].isSample ? 'Sample Project' : 'Project'}
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="text-xs uppercase tracking-widest text-studio-gold font-mono block">
                        {featuredProjects[2].category}
                      </span>
                      <h3 className="text-lg font-editorial text-white group-hover:text-studio-gold transition-colors mt-1">
                        {featuredProjects[2].title}
                      </h3>
                    </div>
                  </Link>
                </div>
              )}

              {/* Feature 4: Wide Panoramic Showcase (Span 8) */}
              {featuredProjects[3] && (
                <div className="md:col-span-8 group">
                  <Link to={`/portfolio/${featuredProjects[3]._id || featuredProjects[3].id}`}>
                    <div className="relative aspect-[16/8] overflow-hidden border border-studio-borderSubtle bg-studio-charcoal">
                      <img
                        src={featuredProjects[3].images[0]}
                        alt={featuredProjects[3].title}
                        className="w-full h-full object-cover grayscale contrast-110 transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-studio-black/80 px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase text-studio-gold border border-studio-borderSubtle">
                        {featuredProjects[3].isSample ? 'Sample Project' : 'Project'}
                      </div>
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <div>
                        <span className="text-xs uppercase tracking-widest text-studio-gold font-mono block">
                          {featuredProjects[3].category}
                        </span>
                        <h3 className="text-xl font-editorial text-white group-hover:text-studio-gold transition-colors mt-1">
                          {featuredProjects[3].title}
                        </h3>
                      </div>
                      <span className="text-xs uppercase tracking-widest text-studio-medium font-mono hidden sm:inline-block">
                        View Space →
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 5. DESIGN PHILOSOPHY (04 — LESS NOISE. MORE CHARACTER.) */}
      <section className="py-24 sm:py-32 bg-studio-charcoal/40 border-t border-studio-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono tracking-widest uppercase text-studio-gold block mb-4">
              04 — DESIGN PHILOSOPHY
            </span>
            <h2 className="text-4xl sm:text-6xl font-editorial font-normal text-white leading-tight mb-6">
              Less Noise. <br />
              <span className="italic text-studio-gold font-light">More Character.</span>
            </h2>
            <p className="text-base sm:text-lg text-studio-light/80 font-light leading-relaxed">
              True architectural luxury is not loud ornamentation. It is the deliberate calibration of light, materials, and proportion to elevate the human experience inside four walls.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {philosophyPillars.map((item, idx) => (
              <div
                key={item.title}
                className="p-8 border border-studio-borderSubtle bg-studio-black hover:border-studio-gold/50 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-studio-gold">0{idx + 1}</span>
                  <span className="w-4 h-px bg-studio-borderSubtle" />
                </div>
                <h3 className="text-xl font-editorial text-white mb-2">{item.title}</h3>
                <p className="text-sm text-studio-medium font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROCESS PREVIEW (05 — TIMELINE) */}
      <section className="py-24 sm:py-32 border-t border-studio-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-studio-borderSubtle">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-studio-gold block mb-2">
                05 — METHODOLOGY
              </span>
              <h2 className="text-4xl sm:text-5xl font-editorial font-normal text-white">
                How We Create
              </h2>
            </div>
            <Link
              to="/process"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-studio-light hover:text-studio-gold transition-colors mt-4 sm:mt-0"
            >
              <span>Explore Detailed Process</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div
                key={step.num}
                className="p-8 border-t-2 border-studio-gold/60 bg-studio-deep/50 hover:bg-studio-deep transition-colors"
              >
                <span className="font-mono text-xs text-studio-gold block mb-4">{step.num}</span>
                <h3 className="text-2xl font-editorial tracking-wide text-white mb-3">{step.phase}</h3>
                <p className="text-xs sm:text-sm text-studio-medium font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DRAMATIC CTA SECTION */}
      <section className="py-24 sm:py-32 bg-studio-deep border-t border-studio-borderSubtle relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
          <span className="text-xs font-mono tracking-widest uppercase text-studio-gold block mb-4">
            06 — SPATIAL ENGAGEMENT
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal text-white tracking-tight leading-tight mb-6">
            Have A Space In Mind?
          </h2>
          <p className="text-base sm:text-lg text-studio-light/80 font-light max-w-xl mx-auto mb-10 leading-relaxed">
            Let's discuss your ideas and explore what your space can become.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="tel:+923227535688"
              className="w-full sm:w-auto px-8 py-4 bg-white text-studio-black font-semibold text-xs uppercase tracking-widest hover:bg-studio-gold transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Haroon's Interiors</span>
            </a>
            <a
              href="https://wa.me/923227535688"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 border border-studio-gold/50 text-studio-gold hover:bg-studio-gold hover:text-studio-black font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
