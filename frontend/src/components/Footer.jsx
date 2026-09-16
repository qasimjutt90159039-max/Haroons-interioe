import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ArrowUpRight, Shield } from 'lucide-react';

const footerNav = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Process', path: '/process' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-studio-black border-t border-studio-borderSubtle text-studio-soft pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-studio-borderSubtle">
          {/* Column 1: Studio Identity */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 bg-studio-gold" />
                <h2 className="text-xl sm:text-2xl font-editorial font-bold text-white tracking-wide uppercase">
                  HAROON'S INTERIORS
                </h2>
              </div>
              <p className="text-xs uppercase tracking-architectural text-studio-gold font-medium mb-4">
                Interior Designer — Lahore
              </p>
              <p className="text-studio-medium text-sm leading-relaxed max-w-md font-light">
                Transforming everyday spaces into refined environments where architecture, functionality, and personal character come together in quiet balance.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-studio-borderSubtle/50">
              <span className="text-[11px] uppercase tracking-widest text-studio-medium block mb-2">
                Direct Consultation
              </span>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+923227535688"
                  className="inline-flex items-center gap-2 text-sm text-white hover:text-studio-gold transition-colors font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-studio-gold" />
                  <span>+92 322 7535688</span>
                </a>
                <a
                  href="https://wa.me/923227535688"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-studio-gold hover:text-white transition-colors"
                >
                  <span>WhatsApp Inquiries</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Architectural Index Navigation */}
          <div className="md:col-span-3">
            <h3 className="text-xs uppercase tracking-architectural text-white font-mono mb-6">
              Studio Directory
            </h3>
            <ul className="space-y-3 text-sm">
              {footerNav.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-studio-medium hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-px bg-studio-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Physical Address & Presence */}
          <div className="md:col-span-4">
            <h3 className="text-xs uppercase tracking-architectural text-white font-mono mb-6">
              Studio Location
            </h3>
            <div className="space-y-4 text-sm text-studio-medium leading-relaxed font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-studio-gold shrink-0 mt-1" />
                <div>
                  <p className="text-white font-medium">Samars Plaza, Ferozpur Road</p>
                  <p>Shah Jamal More, Ichhra, Lahore</p>
                  <p>Punjab 54600, Pakistan</p>
                  <p className="text-xs font-mono text-studio-gold/80 mt-1">Code: G8JC+4HH</p>
                </div>
              </div>
              <p className="text-xs text-studio-medium pt-2 border-t border-studio-borderSubtle/40">
                In-person spatial consultations available by advance appointment across Lahore.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-studio-medium gap-4">
          <p>© 2026 Haroon's Interiors. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[11px] tracking-wider text-studio-medium/70">
              Lahore • Architecture & Interiors
            </span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 text-[11px] text-studio-medium/60 hover:text-studio-gold transition-colors"
              title="Studio Administrative Panel"
            >
              <Shield className="w-3 h-3" />
              <span>Staff Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
