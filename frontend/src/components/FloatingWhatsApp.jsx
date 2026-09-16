import React, { useState } from 'react';
import { MessageSquare, ArrowUpRight } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Subtle Tooltip on hover or screen focus */}
      <div
        className={`hidden md:flex items-center gap-2 bg-studio-charcoal/95 border border-studio-borderSubtle text-xs text-studio-soft px-3 py-1.5 shadow-2xl transition-all duration-300 pointer-events-none ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        <span className="font-mono text-[11px] uppercase tracking-wider">Direct Studio WhatsApp</span>
      </div>

      <a
        href="https://wa.me/923227535688"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Direct WhatsApp Consultation with Haroon's Interiors"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-studio-charcoal hover:bg-studio-black border border-white/20 hover:border-studio-gold text-white hover:text-studio-gold transition-all duration-300 shadow-2xl focus:outline-none"
      >
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-studio-gold rounded-full" />
      </a>
    </div>
  );
}
