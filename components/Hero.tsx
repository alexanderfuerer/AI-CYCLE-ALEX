import React from 'react';
import { FadeIn } from './FadeIn';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 pt-32">
      <div className="max-w-[1400px] mx-auto w-full">
        <FadeIn>
          <div className="max-w-[95vw]">
            <h1 className="text-[11vw] md:text-[8vw] font-medium tracking-hc-partner text-cobalt-dark leading-[0.85] mb-12 md:mb-24 -ml-[0.05em]">
              KI ist kein Event.<br />
              <span className="bg-gradient-to-r from-cobalt to-mint bg-clip-text text-transparent">KI ist ein Betriebssystem.</span>
            </h1>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-mist pt-8">
          <div className="md:col-span-5 lg:col-span-4">
            <FadeIn delay={200}>
              <div className="flex flex-col gap-8">
                <p className="text-lg md:text-xl font-light leading-relaxed text-stone-700 tracking-hc-partner">
                  Wir verankern KI als produktiven Standard in Unternehmen – begleitet, menschlich und unternehmerisch.
                </p>

                <div className="flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-poppy animate-pulse"></span>
                  <p className="text-xs font-mono uppercase tracking-widest text-cobalt/60">
                    Maximal 10 Unternehmen / Jahr
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="md:col-span-7 lg:col-span-8 flex justify-start md:justify-end">
            <FadeIn delay={400}>
              <a href="#contact" className="group flex items-center gap-4 text-stone-900 font-medium text-lg md:text-xl transition-all hover:opacity-60">
                <span>Passt das zu uns?</span>
                <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-stone-50 group-hover:border-stone-900 transition-all">
                  <ArrowDown size={16} />
                </div>
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};