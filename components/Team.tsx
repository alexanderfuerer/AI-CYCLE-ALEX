import React from 'react';
import { FadeIn } from './FadeIn';
import { TeamMember, Advisor } from '../types';

const founders: TeamMember[] = [
  {
    name: "Thomas Schmidt",
    role: "Strategie & Vision",
    description: "Unternehmer seit 15 Jahren. Versteht, dass Technologie nur skaliert, wenn die Kultur folgt. Brückenbauer zwischen Hype und Bilanz.",
    image: "https://picsum.photos/600/800?grayscale&random=1"
  },
  {
    name: "Sarah Weber",
    role: "Operations & Tech",
    description: "Ingenieurin im Herzen. Sorgt dafür, dass aus Ideen funktionierende Prozesse werden. Liebt klare Strukturen und messbare Ergebnisse.",
    image: "https://picsum.photos/600/800?grayscale&random=2"
  }
];

const advisors: Advisor[] = Array.from({ length: 6 }).map((_, i) => ({
  name: ["Dr. K. Miller", "J. Chen", "M. Bauer", "L. Russo", "P. Davis", "A. Kowalski"][i],
  role: ["Technologie", "Ethik", "Organisation", "Finanzen", "HR", "Forschung"][i],
  image: `https://picsum.photos/200/200?random=${i + 10}&grayscale`
}));

export const Team: React.FC = () => {
  return (
    <section id="team" className="py-32 md:py-48 px-6 md:px-12 bg-glacier">
      <div className="max-w-[1400px] mx-auto">

        {/* Founders */}
        <div className="mb-32">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
              <div className="lg:col-span-5">
                <span className="block text-xs font-mono uppercase tracking-widest text-cobalt/60 mb-6 tracking-hc-partner">Das Team</span>
                <h2 className="text-4xl md:text-6xl font-normal tracking-hc-partner text-cobalt-dark leading-[1.1]">
                  Wir sind Unternehmer.<br />Und wir begleiten Unternehmer.
                </h2>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-x-16">
            {founders.map((member, idx) => (
              <FadeIn key={idx} delay={idx * 150}>
                <div className="group">
                  <div className="mb-8 overflow-hidden bg-white aspect-[3/4] relative shadow-xl shadow-cobalt/5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-cobalt/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-medium text-cobalt-dark tracking-hc-partner">{member.name}</h3>
                    <span className="text-xs font-mono uppercase tracking-widest text-poppy mb-4">{member.role}</span>
                    <p className="text-stone-600 font-light leading-relaxed max-w-sm text-lg tracking-hc-partner">
                      {member.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Advisory Board */}
        <FadeIn delay={300}>
          <div className="pt-24 border-t border-mist">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <h3 className="text-3xl font-normal text-cobalt-dark mb-6 tracking-hc-partner">Advisory Board</h3>
                <p className="text-stone-600 font-light text-lg leading-relaxed tracking-hc-partner">
                  Wir arbeiten nicht im luftleeren Raum. Unser Board bringt Perspektiven aus Technologie, Unternehmertum, Organisation und Kultur. Nicht operativ, sondern als Sparring.
                </p>
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
                  {advisors.map((advisor, idx) => (
                    <div key={idx} className="flex flex-col gap-4 group">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-sm">
                        <img
                          src={advisor.image}
                          alt={advisor.name}
                          className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-cobalt-dark text-lg group-hover:text-poppy transition-colors tracking-hc-partner">{advisor.name}</div>
                        <div className="text-xs text-cobalt/40 uppercase tracking-wide mt-1">{advisor.role}</div>
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