import React from 'react';
import { FadeIn } from './FadeIn';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-cobalt-dark text-glacier relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <FadeIn>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 mb-32">
              <div className="max-w-4xl">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-hc-partner leading-[0.95] mb-12">
                  Das ist dein<br />
                  <span className="text-mint/40">nächster Schritt.</span>
                </h2>
                <p className="text-xl md:text-2xl font-light text-glacier/60 max-w-xl leading-relaxed tracking-hc-partner">
                  Lass uns reden – offen, ehrlich und ohne Verkaufsdruck. Wenn der AI Cycle nicht zu euch passt, sagen wir das.
                </p>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-2">
                <span className="text-mint/30 text-sm font-mono uppercase tracking-widest">Investition</span>
                <span className="text-4xl md:text-5xl font-light tracking-tight">CHF 35'000 <span className="text-lg text-mint/40 font-normal">/ Jahr</span></span>
                <span className="text-mint/30 text-xs mt-1">(Start ab, limitiert auf 10 Plätze)</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-16">
              <a
                href="mailto:contact@ai-cycle.ch"
                className="group flex items-center justify-between w-full py-8 md:py-12 border-b border-white/10 hover:border-poppy transition-colors"
              >
                <span className="text-3xl md:text-6xl font-light group-hover:pl-4 transition-all duration-500 tracking-hc-partner">Kontakt aufnehmen</span>
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-poppy group-hover:border-poppy transition-all duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="w-6 h-6 md:w-10 md:h-10 text-glacier" strokeWidth={1} />
                </div>
              </a>
              <p className="mt-8 text-glacier/40 font-mono text-sm">
                Wenn wir nicht die Richtigen sind, sagen wir das offen.
              </p>
            </div>
          </FadeIn>

          {/* Small footer links */}
          <div className="mt-32 flex flex-col md:flex-row justify-between items-center gap-8 text-glacier/30 text-sm font-mono uppercase tracking-widest">
            <p>© {new Date().getFullYear()} AI-CYCLE</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-glacier transition-colors">Impressum</a>
              <a href="#" className="hover:text-glacier transition-colors">Datenschutz</a>
            </div>
          </div>
        </div>
      </div>

      {/* Big Footer Logo - Full Width */}
      <div className="relative w-full overflow-hidden border-t border-white/5">
        <FadeIn>
          <div className="w-full flex justify-center items-end pt-16 pb-8">
            <h2
              className="text-[18vw] md:text-[15vw] font-bold tracking-tight leading-none text-glacier/10 select-none whitespace-nowrap"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              AI CYCLE
            </h2>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};
