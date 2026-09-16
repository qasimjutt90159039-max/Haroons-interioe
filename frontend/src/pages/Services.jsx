import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Compass, Sliders, Box, Layers, Layout, Palette } from 'lucide-react';

const servicesData = [
  {
    id: 'residential',
    num: '01',
    title: 'Residential Interior Design',
    tagline: 'Complete and individual residential interior solutions.',
    description: 'We orchestrate end-to-end residential interiors that merge architectural rigor with everyday serenity. From expansive private residences in Lahore to tailored apartment sanctuaries, every zone is designed with balanced sightlines, concealed storage, and tailored material palettes.',
    suitableSpaces: ['Private Villas & Bungalows', 'Luxury Apartments & Penthouses', 'Drawing & Dining Chambers', 'Master Bedroom Sanctuaries'],
    benefits: [
      'Cohesive architectural identity across the entire residence',
      'Optimized natural lighting and concealed evening ambient layers',
      'Customized joinery and storage maximizing usable space',
      'Enduring, premium materials suited for Lahore’s climate'
    ],
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'commercial',
    num: '02',
    title: 'Commercial Interior Design',
    tagline: 'Professional and functional spaces for businesses.',
    description: 'Commercial interiors engineered to reinforce corporate identity, enhance focus, and facilitate seamless collaboration. We design modern office suites, executive conference chambers, and reception environments with acoustically treated surfaces and clean architectural lines.',
    suitableSpaces: ['Executive Corporate Suites', 'Creative Design Studios & Agencies', 'Boardrooms & Conference Facilities', 'Boutique Commercial Lounges'],
    benefits: [
      'Spatial layouts that elevate team productivity and focus',
      'Acoustic management through tailored wall and ceiling systems',
      'Sophisticated first impression for visiting corporate clients',
      'Durable, high-traffic commercial finishes and lighting integration'
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'space-planning',
    num: '03',
    title: 'Space Planning',
    tagline: 'Efficient layouts designed around movement and usability.',
    description: 'Disciplined spatial orchestration that unlocks the latent potential of floor plans. We analyze human circulation vectors, functional adjacencies, door swings, and natural daylight orientation to create effortless room-to-room transitions.',
    suitableSpaces: ['New Floorplan Developments', 'Under-utilized Residential Wings', 'Open-Plan Office Layouts', 'Compact Urban Residences'],
    benefits: [
      'Elimination of dead corners and congested circulation corridors',
      'Harmonious zoning between entertaining and private quarters',
      'Ergonomic furniture placement aligned with architectural sightlines',
      'Optimized natural cross-ventilation and view apertures'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'interior-styling',
    num: '04',
    title: 'Interior Styling',
    tagline: 'Furniture, materials, colors, textures and decorative elements.',
    description: 'The final layer that elevates an architectural shell into a living editorial work. We hand-select textures, curated furniture pieces, low-sheen metal accents, architectural pottery, and tactile linens that speak a singular visual language.',
    suitableSpaces: ['Formal Living Areas', 'Executive Study Corners', 'Master Suites', 'Architectural Foyers & Galleries'],
    benefits: [
      'Rich textural depth without visual clutter or noisy ornaments',
      'Disciplined color palettes grounded in blacks, charcoals, and warm tones',
      'Curated furniture procurement ensuring scale and proportion',
      'Harmonized drapery, bespoke rugs, and architectural focal points'
    ],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'wall-surface',
    num: '05',
    title: 'Wall & Surface Design',
    tagline: 'Panels, textures, wallpapers and decorative treatments.',
    description: 'Transforming blank planar partitions into sculptural surfaces. Our surface portfolio encompasses vertical timber fluting, honed marble slabs, matte blackened metal inlays, acoustic slat walls, and artisanal lime wash plaster.',
    suitableSpaces: ['Feature Hearth Walls', 'Foyer Arrival Portals', 'Bed Headboard Accent Walls', 'Dining Room Partitions'],
    benefits: [
      'Sculptural depth that interacts dynamically with grazing light',
      'Enhanced acoustic dampening and sound absorption',
      'Concealed doors and discreet flush storage integration',
      'Distinctive tactile surfaces that age gracefully'
    ],
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'custom-solutions',
    num: '06',
    title: 'Custom Interior Solutions',
    tagline: 'Design concepts tailored to the client\'s requirements.',
    description: 'When catalog solutions fall short, we design bespoke architectural millwork, floating credenzas, custom lighting coves, and tailor-made storage solutions precision-engineered to fit the exact dimensions of your space.',
    suitableSpaces: ['Custom Walk-in Wardrobes', 'Bespoke Media Consoles & Fireplaces', 'Architectural Libraries & Shelving', 'Unique Partition Screens'],
    benefits: [
      'Millimeter precision custom fit to room architectural boundaries',
      'Integration of hidden wiring, cable channels, and LED coves',
      'Unique design language that cannot be replicated from retail stores',
      'Superior structural joinery with premium hardware and hinges'
    ],
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function Services() {
  return (
    <div className="bg-studio-black text-studio-soft pt-32 pb-24 selection:bg-studio-gold selection:text-studio-black">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-studio-gold" />
          <span className="text-xs uppercase tracking-widestEditorial text-studio-gold font-mono">
            PRACTICE CAPABILITIES
          </span>
        </div>
        <h1 className="text-5xl sm:text-7xl font-editorial font-normal text-white max-w-4xl tracking-tight leading-tight">
          Architectural Interior <br />
          <span className="italic font-light text-studio-gold">Disciplines.</span>
        </h1>
        <p className="text-studio-light/80 text-base sm:text-lg font-light max-w-2xl mt-6 leading-relaxed">
          From full-scale private residences to targeted surface design and custom millwork, we deliver tailored interior environments across Lahore.
        </p>
      </div>

      {/* Services Detailed List */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-28">
        {servicesData.map((item, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div
              key={item.id}
              id={item.id}
              className="pt-12 border-t border-studio-borderSubtle grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
            >
              {/* Text column */}
              <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-studio-gold">{item.num}</span>
                  <span className="w-6 h-px bg-studio-gold/40" />
                  <span className="text-xs font-mono uppercase tracking-widest text-studio-medium">
                    {item.tagline}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-white">
                  {item.title}
                </h2>

                <p className="text-studio-light/80 font-light leading-relaxed text-sm sm:text-base">
                  {item.description}
                </p>

                {/* Suitable Spaces */}
                <div className="pt-2">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-studio-gold mb-3">
                    Suitable Spaces
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-studio-medium">
                    {item.suitableSpaces.map((space) => (
                      <div key={space} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-studio-gold/60" />
                        <span>{space}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="pt-2">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-studio-gold mb-3">
                    Key Advantages
                  </h3>
                  <ul className="space-y-2 text-xs text-studio-medium font-light">
                    {item.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-studio-gold shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA */}
                <div className="pt-4">
                  <Link
                    to={`/contact?service=${encodeURIComponent(item.title)}`}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-studio-gold/60 text-studio-gold text-xs uppercase tracking-widest hover:bg-studio-gold hover:text-studio-black transition-all group"
                  >
                    <span>Request {item.title} Consultation</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>

              {/* Image column */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative aspect-[4/3] overflow-hidden border border-studio-borderSubtle bg-studio-charcoal group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale contrast-110 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-studio-black/85 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-widest uppercase text-studio-gold border border-white/10">
                    Discipline {item.num}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Consultation Banner */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-28">
        <div className="p-10 sm:p-16 border border-studio-borderSubtle bg-studio-deep text-center">
          <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-white mb-4">
            Custom Inquiries & Space Audits
          </h2>
          <p className="text-studio-medium text-sm sm:text-base font-light max-w-xl mx-auto mb-8 leading-relaxed">
            Need a tailored combination of residential interior design, wall surfaces, and space planning? We prepare comprehensive project proposals for spaces across Lahore.
          </p>
          <Link
            to="/contact"
            className="px-8 py-4 bg-white text-studio-black font-semibold text-xs uppercase tracking-widest hover:bg-studio-gold transition-colors inline-flex items-center gap-2"
          >
            <span>Book Spatial Audit</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
