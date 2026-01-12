import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-natural ${scrolled
          ? 'py-4 bg-glacier/80 backdrop-blur-xl border-b border-mist'
          : 'py-8 bg-transparent'
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="z-50 transition-transform hover:scale-105 duration-500 text-slate-800">
            <Logo />
          </a>

          <nav className="hidden md:flex gap-10 items-center">
            {['Kontext', 'Der Cycle', 'Team'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '')}`}
                className="text-sm font-medium text-stone-600 hover:text-cobalt transition-colors tracking-hc-partner"
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              className="px-6 py-2.5 bg-poppy text-white text-sm font-medium rounded-full hover:bg-poppy-dark transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm shadow-poppy/20"
            >
              Anfragen
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-50 text-stone-900 p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-stone-50 z-40 flex flex-col items-center justify-center gap-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-10'
          }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {['Kontext', 'Der Cycle', 'Team'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '')}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-4xl font-light tracking-tight text-stone-900 hover:text-stone-500 transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="px-10 py-4 bg-stone-900 text-stone-50 rounded-full text-xl mt-8"
          >
            Anfragen
          </a>
        </nav>
      </div>
    </>
  );
};