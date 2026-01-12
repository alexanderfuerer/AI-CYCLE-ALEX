import React from 'react';
import { FadeIn } from './FadeIn';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 pt-32">
      <div className="max-w-[1400px] mx-auto w-full">
        <FadeIn>
          <div className="max-w-[95vw]">
            <h1 className="text-[11vw] md:text-[8vw] font-medium tracking-hc-partner text-cobalt-dark leading-[0.85] mb-12 md:mb-24 -ml-[0.05em]">
              Mach KI zum<br />
              <span className="bg-gradient-to-r from-cobalt to-mint bg-clip-text text-transparent">Betriebssystem deines Unternehmens.</span>
            </h1>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-mist pt-8">
          <div className="md:col-span-5 lg:col-span-4">
            <FadeIn delay={200}>
              <div className="flex flex-col gap-8">
                <p className="text-lg md:text-xl font-light leading-relaxed text-stone-700 tracking-hc-partner">
                  Der AI Cycle ist der strukturierte Weg, um KI ganzheitlich in deinem Unternehmen zu verankern – mit Substanz statt Strohfeuer.
                </p>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};