import React from 'react';
import { FadeIn } from './FadeIn';

export const Team: React.FC = () => {
  return (
    <section id="team" className="py-32 md:py-48 px-6 md:px-12 bg-glacier">
      <div className="max-w-[1400px] mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative aspect-[4/3] bg-stone-200 overflow-hidden shadow-2xl shadow-cobalt/5 flex items-center justify-center">
              <span className="text-stone-400 font-mono text-sm">[ Bild-Platzhalter ]</span>
            </div>
            <div>
              <span className="block text-xs font-mono uppercase tracking-widest text-cobalt/60 mb-8">Wer dahinter steht</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-hc-partner leading-tight mb-12 text-cobalt-dark">
                Unternehmer, die wissen, wie Unternehmen ticken.
              </h2>
              <div className="text-lg md:text-xl font-light leading-relaxed space-y-6 text-stone-700 tracking-hc-partner">
                <p>
                  Wir sind keine externen Berater, die Konzepte liefern und dann verschwinden. Wir sind Unternehmer mit jahrelanger Erfahrung in KMUs und mittelständischen Betrieben. Wir kennen die Realität von knappen Ressourcen, schnellen Entscheidungen und dem Druck, Ergebnisse zu liefern.
                </p>
                <p>
                  Unser Know-how liegt in Cloud Computing, KI-Strategie und pragmatischer Umsetzung. Und unser Anspruch ist einfach: Wir bauen nichts für euch – wir bauen es mit euch.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Founders Placeholder */}
        <FadeIn delay={200}>
          <div className="mt-32 pt-16 border-t border-mist">
            <h3 className="text-2xl font-normal text-cobalt-dark mb-12 tracking-hc-partner">Founders</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-stone-100 flex items-center justify-center aspect-[3/2]">
                <span className="text-stone-400 font-mono text-sm">[ Founder 1 – folgt ]</span>
              </div>
              <div className="p-8 bg-stone-100 flex items-center justify-center aspect-[3/2]">
                <span className="text-stone-400 font-mono text-sm">[ Founder 2 – folgt ]</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
