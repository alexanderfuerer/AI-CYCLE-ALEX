import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { ChevronDown } from 'lucide-react';
import { Advisor } from '../types';

const advisors: Advisor[] = [
  { name: "Name Nachname", role: "Expertise", image: "" },
  { name: "Name Nachname", role: "Expertise", image: "" },
  { name: "Name Nachname", role: "Expertise", image: "" },
  { name: "Name Nachname", role: "Expertise", image: "" },
  { name: "Name Nachname", role: "Expertise", image: "" },
  { name: "Name Nachname", role: "Expertise", image: "" },
];

export const Team: React.FC = () => {
  const [alexExpanded, setAlexExpanded] = useState(false);

  return (
    <section id="team" className="py-32 md:py-48 px-6 md:px-12 bg-glacier">
      <div className="max-w-[1400px] mx-auto">
        <FadeIn>
          <div className="max-w-3xl">
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
        </FadeIn>

        {/* Founders */}
        <FadeIn delay={200}>
          <div className="mt-24 pt-16 border-t border-mist">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Alexander Fürer */}
              <div>
                <h3 className="text-2xl font-normal text-cobalt-dark mb-6 tracking-hc-partner">Alexander Fürer</h3>
                <div className="relative aspect-[3/2] bg-stone-100 overflow-hidden mb-6">
                  <img
                    src="/Alexander.png"
                    alt="Alexander Fürer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <p className="text-stone-700 font-light leading-relaxed tracking-hc-partner mb-4">
                  Alex ist Unternehmer und CEO von rdcl.ai. Er begleitet Unternehmen dabei, Künstliche Intelligenz strategisch in Marketing, Kommunikation und Geschäftsprozesse zu integrieren.
                </p>

                {/* Accordion */}
                <div className="border-t border-mist pt-4">
                  <button
                    onClick={() => setAlexExpanded(!alexExpanded)}
                    className="flex items-center gap-2 text-cobalt hover:text-cobalt-dark transition-colors group"
                  >
                    <span className="text-sm font-medium">Mehr</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${alexExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <div className={`overflow-hidden transition-all duration-500 ${alexExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <p className="text-stone-600 font-light leading-relaxed tracking-hc-partner text-sm">
                      Mit über 20 Jahren Erfahrung an der Schnittstelle von Technologie, Kreativität und Business war er zuvor in internationalen Agenturen wie TBWA, Scholz & Friends und HAVAS tätig. Sein Praxiswissen untermauert er durch fundierte Weiterbildungen an Instituten wie dem MIT, dem IMD Lausanne, Hyper Island in Stockholm und an der Universität Zürich.
                    </p>
                    <p className="text-stone-600 font-light leading-relaxed tracking-hc-partner text-sm mt-4">
                      Dieses Wissen gibt Alex heute als Gastdozent für Generative KI und Digitale Transformation an Hochschulen wie der OST St. Gallen und der SPARKS University weiter.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ivan Rizzuto */}
              <div>
                <h3 className="text-2xl font-normal text-cobalt-dark mb-6 tracking-hc-partner">Ivan Rizzuto</h3>
                <div className="relative aspect-[3/2] bg-stone-100 overflow-hidden mb-6">
                  <img
                    src="/Ivan.png"
                    alt="Ivan Rizzuto"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <p className="text-stone-700 font-light leading-relaxed tracking-hc-partner">
                  Als Mitgründer der Cloud Solution GmbH verbinde ich technische Innovation mit betriebswirtschaftlicher Weitsicht, um KMUs auf ihrem Weg in eine digitale Zukunft zu stärken.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Advisory Board */}
        <FadeIn delay={300}>
          <div className="mt-24 pt-16 border-t border-mist">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <h3 className="text-3xl font-normal text-cobalt-dark mb-6 tracking-hc-partner">Advisory Board</h3>
                <p className="text-stone-600 font-light text-lg leading-relaxed tracking-hc-partner">
                  Wir arbeiten nicht im luftleeren Raum. Unser Board bringt Perspektiven aus Technologie, Unternehmertum, Organisation und Kultur.
                </p>
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
                  {advisors.map((advisor, idx) => (
                    <div key={idx} className="flex flex-col gap-4 group">
                      <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center">
                        {advisor.image ? (
                          <img
                            src={advisor.image}
                            alt={advisor.name}
                            className="w-16 h-16 rounded-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                          />
                        ) : (
                          <span className="text-stone-400 text-xs font-mono">[ Foto ]</span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-cobalt-dark text-lg group-hover:text-cobalt transition-colors tracking-hc-partner">{advisor.name}</div>
                        <div className="text-xs text-stone-400 uppercase tracking-wide mt-1">{advisor.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
