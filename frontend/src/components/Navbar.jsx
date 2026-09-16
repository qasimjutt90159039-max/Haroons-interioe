import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Process', path: '/process' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 bg-studio-black/95 backdrop-blur-md ${
          isScrolled ? 'py-3.5 border-b border-studio-borderSubtle' : 'py-5 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2 tracking-widest text-sm sm:text-base font-medium uppercase text-white hover:text-studio-gold transition-colors duration-300"
          >
            <span className="w-2 h-2 bg-studio-gold inline-block transition-transform duration-300 group-hover:scale-125" />
            <span className="font-editorial font-semibold tracking-wider text-base sm:text-lg">HAROON'S INTERIORS</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9 text-xs uppercase tracking-widest font-medium">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `transition-colors duration-300 py-1 relative ${
                    isActive
                      ? 'text-studio-gold font-semibold'
                      : 'text-studio-light/80 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-studio-gold" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-white/20 text-xs uppercase tracking-widest text-white hover:border-studio-gold hover:text-studio-gold transition-all duration-300 group"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
            className="lg:hidden p-2 text-studio-soft hover:text-studio-gold transition-colors focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Fullscreen Architectural Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 bg-studio-black flex flex-col justify-between p-8 sm:p-12 transition-all duration-500 lg:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Top bar inside mobile overlay */}
        <div className="flex items-center justify-between border-b border-studio-borderSubtle pb-6">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-white font-editorial tracking-wider text-base"
          >
            <span className="w-2 h-2 bg-studio-gold" />
            <span>HAROON'S INTERIORS</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Menu"
            className="p-2 text-studio-medium hover:text-white transition-colors"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Large Typography Links */}
        <nav className="flex flex-col space-y-4 my-auto">
          {navLinks.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-baseline justify-between py-1 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-studio-gold/60">
                    0{idx + 1}
                  </span>
                  <span
                    className={`font-editorial text-2xl sm:text-3xl tracking-tight transition-colors ${
                      isActive ? 'text-studio-gold font-semibold' : 'text-white/80 group-hover:text-white'
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                {isActive && (
                  <span className="text-xs uppercase tracking-widest text-studio-gold font-mono">
                    • Active
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom studio details in mobile menu */}
        <div className="border-t border-studio-borderSubtle pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs tracking-widest uppercase text-studio-medium">Lahore Studio</p>
            <a
              href="tel:+923227535688"
              className="text-sm text-studio-soft hover:text-studio-gold transition-colors"
            >
              +92 322 7535688
            </a>
          </div>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-studio-gold text-studio-black font-semibold text-xs uppercase tracking-widest hover:bg-white transition-colors"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
