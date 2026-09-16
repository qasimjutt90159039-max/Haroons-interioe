import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-studio-black text-studio-soft pt-36 pb-24 flex items-center justify-center px-6 selection:bg-studio-gold selection:text-studio-black">
      <div className="max-w-xl w-full text-center p-8 sm:p-12 border border-studio-borderSubtle bg-studio-deep">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-8 h-px bg-studio-gold" />
          <span className="text-xs uppercase tracking-widestEditorial text-studio-gold font-mono">
            SPATIAL ANOMALY
          </span>
          <span className="w-8 h-px bg-studio-gold" />
        </div>

        <h1 className="text-7xl sm:text-8xl font-editorial font-normal text-white mb-4 tracking-tighter">
          404
        </h1>

        <h2 className="text-2xl font-editorial text-studio-light mb-4">
          Space Not Located
        </h2>

        <p className="text-sm text-studio-medium font-light max-w-md mx-auto mb-10 leading-relaxed">
          The requested architectural route does not exist or may have been relocated within Haroon's Interiors directory.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-studio-gold text-studio-black font-semibold text-xs uppercase tracking-widest hover:bg-white transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Sanctuary</span>
          </Link>
          <Link
            to="/portfolio"
            className="px-6 py-3 border border-white/20 text-white font-medium text-xs uppercase tracking-widest hover:border-studio-gold hover:text-studio-gold transition-colors inline-flex items-center gap-2"
          >
            <span>Explore Works</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
