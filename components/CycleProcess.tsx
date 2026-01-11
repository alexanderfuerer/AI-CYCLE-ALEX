import React from 'react';
import { FadeIn } from './FadeIn';
import { Phase } from '../types';

const phases: Phase[] = [
  {
    number: "01",
    title: "FOUNDATION",
    description: "Der Eintritt in den Cycle schafft die Basis: Alle Mitarbeitenden erhalten ein gemeinsames Grundverständnis und eine gemeinsame Sprache rund um KI. So entsteht ein einheitlicher Rahmen für Rollen, Erwartungen und sichere Nutzung. Harte Vorgabe: Ohne dieses Modul darf niemand KI-Tools nutzen – als Schutz vor Datenabfluss und Halluzinationen."
  },
  {
    number: "02",
    title: "FOCUS",
    description: "Übersetzt das Fundament in die Fachbereiche und macht KI dort wirksam, wo sie echten Hebel bringt. Im Marketing steigern wir Reichweite und Genauigkeit, ohne die Markenidentität zu verlieren. In der Administration reduzieren orchestrierte Prozesse Reibungsverluste und sorgen für klarere Abläufe und spürbare Entlastung."
  },
  {
    number: "03",
    title: "BUILD",
    description: "Die Phase, in der der konkrete Wert entsteht: Hier gewinnen wir Effizienz, reduzieren Aufwand und machen den ROI sichtbar. Dafür führen wir einen Backlog ein, priorisieren konsequent und setzen um. In agilen Sprints realisieren wir die Top-3 Ideen aus den Workshops, etwa durch Prozessautomatisierung oder den Bau von Bots."
  },
  {
    number: "04",
    title: "PULSE",
    description: "Die Versicherung gegen Veralterung hält den Cycle dauerhaft frisch. Weil sich Technologie schnell verändert, sorgt dieses Modul für regelmässige Updates und Orientierung. Alle zwei Monate gibt es ein «System-Check»-Webinar: Was ist neu, was fliegt raus, und was haben wir intern gelernt?"
  }
];

// Phase descriptions for the diagram
const phaseDescriptions = [
  "Gemeinsame Basis schaffen",
  "Deep Dives in Fachbereiche",
  "Umsetzung & ROI sichtbar machen",
  "Laufende Updates & Orientierung"
];

// Circle Diagram Component - Larger with external labels and descriptions
const CycleDiagram: React.FC = () => {
  const size = 480;
  const center = size / 2;
  const radius = 140;
  const strokeWidth = 50;

  const colors = ['#1e3a5f', '#2d5a87', '#4a7c9b', '#6b9eb8'];

  return (
    <div className="relative flex items-center justify-center" style={{ width: size + 200, height: size + 120 }}>
      {/* SVG Circle */}
      <div className="absolute" style={{ left: 100, top: 40 }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          {phases.map((_, index) => {
            const startAngle = (index * 90) * (Math.PI / 180);
            const endAngle = ((index + 1) * 90) * (Math.PI / 180);
            const gap = 0.04;

            const x1 = center + radius * Math.cos(startAngle + gap);
            const y1 = center + radius * Math.sin(startAngle + gap);
            const x2 = center + radius * Math.cos(endAngle - gap);
            const y2 = center + radius * Math.sin(endAngle - gap);

            return (
              <path
                key={index}
                d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
                fill="none"
                stroke={colors[index]}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                className="transition-all duration-500 hover:opacity-80"
              />
            );
          })}

          {/* Clockwise arrow at the start */}
          <polygon
            points="240,95 255,115 240,110 225,115"
            fill="#1e3a5f"
            className="transform rotate-45 origin-center"
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl font-light text-cobalt-dark">12</span>
            <span className="block text-sm font-mono uppercase tracking-widest text-cobalt/60 mt-2">Monate</span>
          </div>
        </div>
      </div>

      {/* Phase labels - positioned outside the circle, clockwise */}
      {/* 01 Foundation - Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
        <span className="text-xl font-semibold text-cobalt-dark">01</span>
        <span className="block text-base font-medium uppercase tracking-wide text-cobalt-dark">Foundation</span>
        <span className="block text-sm text-cobalt/60 mt-1 max-w-[180px]">{phaseDescriptions[0]}</span>
      </div>

      {/* 02 Focus - Right */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 text-left pl-4">
        <span className="text-xl font-semibold text-cobalt-dark">02</span>
        <span className="block text-base font-medium uppercase tracking-wide text-cobalt-dark">Focus</span>
        <span className="block text-sm text-cobalt/60 mt-1 max-w-[160px]">{phaseDescriptions[1]}</span>
      </div>

      {/* 03 Build - Bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <span className="text-xl font-semibold text-cobalt-dark">03</span>
        <span className="block text-base font-medium uppercase tracking-wide text-cobalt-dark">Build</span>
        <span className="block text-sm text-cobalt/60 mt-1 max-w-[180px]">{phaseDescriptions[2]}</span>
      </div>

      {/* 04 Pulse - Left */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-right pr-4">
        <span className="text-xl font-semibold text-cobalt-dark">04</span>
        <span className="block text-base font-medium uppercase tracking-wide text-cobalt-dark">Pulse</span>
        <span className="block text-sm text-cobalt/60 mt-1 max-w-[160px]">{phaseDescriptions[3]}</span>
      </div>

      {/* Clockwise indicator */}
      <div className="absolute top-24 right-24">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-cobalt/30">
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
};

export const CycleProcess: React.FC = () => {
  return (
    <section id="cycle" className="py-32 md:py-48 px-6 md:px-12 bg-glacier transition-colors duration-1000">
      <div className="max-w-[1400px] mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-5">
              <span className="block text-xs font-mono uppercase tracking-widest text-cobalt/60 mb-6">Wie wir arbeiten</span>
              <h2 className="text-4xl md:text-6xl font-normal tracking-hc-partner text-cobalt-dark mb-8">Der 12-Monats-Cycle</h2>
              <p className="text-lg md:text-xl font-light text-stone-600 tracking-hc-partner leading-relaxed">
                In zwölf Monaten begleiten wir dein Unternehmen durch vier Phasen – von der gemeinsamen Grundlage über gezielte Vertiefung bis zur konkreten Umsetzung und laufenden Weiterentwicklung. Jede Phase baut auf der vorherigen auf. So entsteht kein Strohfeuer, sondern ein System, das trägt.
              </p>
            </div>
            <div className="lg:col-span-7 flex items-center justify-center lg:justify-end py-8">
              <CycleDiagram />
            </div>
          </div>
        </FadeIn>

        <div className="border-t border-mist">
          {phases.map((phase, index) => (
            <FadeIn key={phase.number} delay={index * 100}>
              <div className="group border-b border-mist py-12 md:py-16 transition-all duration-700 hover:bg-mist/50 relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline relative z-10">
                  <div className="md:col-span-2">
                    <span className="font-mono text-sm text-cobalt/40 group-hover:text-poppy transition-colors duration-500">Phase {phase.number}</span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="text-3xl md:text-4xl font-normal text-cobalt-dark group-hover:translate-x-2 transition-transform duration-700 tracking-hc-partner">{phase.title}</h3>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-stone-600 font-light text-lg md:text-xl max-w-xl group-hover:text-stone-900 transition-colors duration-700 tracking-hc-partner">{phase.description}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-1000 -z-0"></div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
