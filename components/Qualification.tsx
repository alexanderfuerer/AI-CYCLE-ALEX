import React from 'react';
import { FadeIn } from './FadeIn';

export const Qualification: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-glacier border-y border-mist">
      <div className="max-w-[1400px] mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-mist divide-y md:divide-y-0 md:divide-x divide-mist shadow-sm shadow-cobalt/5">
            {/* Left Column - Match */}
            <div className="p-8 md:p-16 lg:p-20 bg-white">
              <h3 className="text-sm font-mono uppercase tracking-widest text-poppy mb-12 tracking-hc-partner">Match</h3>
              <ul className="space-y-8">
                {[
                  "Ihr seid ein KMU mit Ambition",
                  "Die Geschäftsleitung ist involviert",
                  "Ihr versteht KI als Dauerlauf"
                ].map((item, i) => (
                  <li key={i} className="flex flex-col gap-2">
                    <span className="text-2xl md:text-3xl font-light text-cobalt-dark leading-tight tracking-hc-partner">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - No Match */}
            <div className="p-8 md:p-16 lg:p-20 bg-mist/30">
              <h3 className="text-sm font-mono uppercase tracking-widest text-stone-400 mb-12 tracking-hc-partner">No Match</h3>
              <ul className="space-y-8">
                {[
                  "Ihr wollt nur Tools vergleichen",
                  "Ihr sucht einen einmaligen Workshop",
                  "Entscheidungen dauern ewig"
                ].map((item, i) => (
                  <li key={i} className="flex flex-col gap-2">
                    <span className="text-2xl md:text-3xl font-light text-stone-400 line-through decoration-mist decoration-2 tracking-hc-partner">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};