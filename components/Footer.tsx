import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { ArrowUpRight, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <footer id="contact" className="bg-cobalt-dark text-glacier relative overflow-hidden">
        {/* Main Footer Content */}
        <div className="py-20 md:py-32 px-6 md:px-12">
          <div className="max-w-[1400px] mx-auto relative z-10">
            <FadeIn>
              <div className="max-w-3xl mb-16">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-hc-partner leading-[0.95] mb-8">
                  Das ist dein<br />
                  <span className="text-mint/40">nächster Schritt.</span>
                </h2>
                <p className="text-lg md:text-xl font-light text-glacier/60 max-w-xl leading-relaxed tracking-hc-partner">
                  Lass uns über die KI-Vision und -Transformation in deinem Unternehmen sprechen. Und wie wir den AI-Cycle mit deinem Team angehen können.
                </p>
              </div>

              <div className="border-t border-white/10 pt-12">
                <button
                  onClick={() => setModalOpen(true)}
                  className="group flex items-center justify-between w-full py-6 md:py-8 border-b border-white/10 hover:border-poppy transition-colors text-left"
                >
                  <span className="text-2xl md:text-5xl font-light group-hover:pl-4 transition-all duration-500 tracking-hc-partner">Kontaktiere uns</span>
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-poppy group-hover:border-poppy transition-all duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8 text-glacier" strokeWidth={1} />
                  </div>
                </button>
              </div>
            </FadeIn>

            {/* Small footer links */}
            <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-6 text-glacier/30 text-sm font-mono uppercase tracking-widest">
              <p>© {new Date().getFullYear()} AI-CYCLE</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-glacier transition-colors">Impressum</a>
                <a href="#" className="hover:text-glacier transition-colors">Datenschutz</a>
              </div>
            </div>
          </div>
        </div>

        {/* Big Footer Logo - Full Width */}
        <div className="relative w-full overflow-hidden">
          <FadeIn>
            <div className="w-full flex justify-center items-end pb-6">
              <h2
                className="text-[18vw] md:text-[15vw] font-light tracking-tight leading-none text-white select-none whitespace-nowrap"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                AI CYCLE
              </h2>
            </div>
          </FadeIn>
        </div>
      </footer>

      {/* Contact Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-cobalt-dark/90 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          {/* Modal */}
          <div className="relative bg-white w-full max-w-lg p-8 md:p-12 shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 transition-colors"
            >
              <X size={24} />
            </button>

            <h3 className="text-3xl md:text-4xl font-normal text-cobalt-dark mb-2 tracking-hc-partner">
              Reden wir über den AI-Cycle
            </h3>
            <p className="text-stone-500 mb-8">Wir melden uns innerhalb von 24 Stunden.</p>

            <form className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-cobalt/60 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-cobalt transition-colors"
                  placeholder="Dein Name"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-cobalt/60 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-cobalt transition-colors"
                  placeholder="deine@email.ch"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-cobalt/60 mb-2">
                  Unternehmen
                </label>
                <input
                  type="text"
                  className="w-full border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-cobalt transition-colors"
                  placeholder="Dein Unternehmen"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-cobalt/60 mb-2">
                  Nachricht
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-cobalt transition-colors resize-none"
                  placeholder="Erzähl uns kurz von deinem Vorhaben..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cobalt-dark text-white py-4 font-medium hover:bg-cobalt transition-colors tracking-hc-partner"
              >
                Absenden
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
