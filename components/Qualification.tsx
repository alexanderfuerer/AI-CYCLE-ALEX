import React from 'react';
import { FadeIn } from './FadeIn';

export const Qualification: React.FC = () => {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-mist">
      <div className="max-w-[1400px] mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-hc-partner leading-tight mb-12 text-cobalt-dark">
                Für Unternehmen, die es ernst meinen.
              </h2>
              <div className="text-lg md:text-xl font-light leading-relaxed space-y-6 text-stone-700 tracking-hc-partner">
                <p>
                  Der AI Cycle ist nichts für Unternehmen, die nur ein paar Tools ausprobieren wollen. Er ist für alle, die verstanden haben, dass KI kein Trend ist, sondern ein strategischer Hebel.
                </p>
                <p>
                  Wenn du bereit bist, Silodenken hinter dir zu lassen und dein Unternehmen konsequent auf ein AI-First-Modell auszurichten – mit deinem Team, nicht gegen es – dann ist der AI Cycle der richtige Rahmen dafür.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] bg-stone-200 overflow-hidden shadow-2xl shadow-cobalt/5 flex items-center justify-center">
              <span className="text-stone-400 font-mono text-sm">[ Bild-Platzhalter ]</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
