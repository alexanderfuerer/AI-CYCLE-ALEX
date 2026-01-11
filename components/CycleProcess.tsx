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
    title: "FOCUS (Deep Dives)",
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

// Circle Diagram Component
const CycleDiagram: React.FC = () => {
  const size = 320;
  const center = size / 2;
  const radius = 120;
  const strokeWidth = 40;

  const colors = ['#1e3a5f', '#2d5a87', '#4a7c9b', '#6b9eb8'];
  const labels = ['Foundation', 'Focus', 'Build', 'Pulse'];

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {phases.map((_, index) => {
          const startAngle = (index * 90) * (Math.PI / 180);
          const endAngle = ((index + 1) * 90) * (Math.PI / 180);
          const gap = 0.03;

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
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl font-light text-cobalt-dark">12</span>
          <span className="block text-xs font-mono uppercase tracking-widest text-cobalt/60 mt-1">Monate</span>
        </div>
      </div>

      {/* Phase labels */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2">
        <span className="text-xs font-mono uppercase tracking-wider text-cobalt/60">01</span>
      </div>
      <div className="absolute top-1/2 -right-8 -translate-y-1/2">
        <span className="text-xs font-mono uppercase tracking-wider text-cobalt/60">02</span>
      </div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
        <span className="text-xs font-mono uppercase tracking-wider text-cobalt/60">03</span>
      </div>
      <div className="absolute top-1/2 -left-8 -translate-y-1/2">
        <span className="text-xs font-mono uppercase tracking-wider text-cobalt/60">04</span>
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
            <div className="lg:col-span-7 flex items-center justify-center lg:justify-end">
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
                {/* Focal Plane Effect Backdrop */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-1000 -z-0"></div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200}>
          <div className="mt-32 grid grid-cols-1 md:grid-cols-12 gap-12 border border-mist p-8 md:p-12 bg-white shadow-sm shadow-cobalt/5">
            <div className="md:col-span-5">
              <h3 className="text-2xl font-normal mb-4 text-cobalt-dark tracking-hc-partner">Umsetzung ohne Dauer-Entscheide</h3>
              <div className="w-12 h-[2px] bg-poppy my-6"></div>
            </div>
            <div className="md:col-span-7 space-y-6">
              <p className="text-stone-800 font-light leading-relaxed text-lg tracking-hc-partner">
                In vielen KI-Projekten muss jeder Use Case einzeln genehmigt werden. Das kostet Zeit und tötet Momentum.
              </p>
              <p className="text-stone-600 font-light leading-relaxed text-lg tracking-hc-partner">
                Im AI Cycle definieren wir zu Beginn einen klaren Umsetzungsrahmen. Innerhalb dieses Rahmens setzen wir um – ohne jedes Mal neu zu verkaufen.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
