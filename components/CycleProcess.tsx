import React from 'react';
import { FadeIn } from './FadeIn';
import { Phase } from '../types';

const phases: Phase[] = [
  {
    number: "01",
    title: "FOUNDATION",
    description: "Der Eintritt in den Circle schafft die Basis: Alle Mitarbeitenden erhalten ein gemeinsames Grundverständnis und eine gemeinsame Sprache rund um KI. So entsteht ein einheitlicher Rahmen für Rollen, Erwartungen und sichere Nutzung. Harte Vorgabe: Ohne dieses Modul darf niemand KI-Tools nutzen, als Schutz vor Datenabfluss und Halluzinationen."
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
    description: "Die Versicherung gegen Veralterung hält den Circle dauerhaft frisch. Weil sich Technologie schnell verändert, sorgt dieses Modul für regelmässige Updates und Orientierung. Alle zwei Monate gibt es ein «System-Check»-Webinar: Was ist neu, was fliegt raus, und was haben wir intern gelernt?"
  }
];

export const CycleProcess: React.FC = () => {
  return (
    <section id="cycle" className="py-32 md:py-48 px-6 md:px-12 bg-glacier transition-colors duration-1000">
      <div className="max-w-[1400px] mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-4">
              <span className="block text-xs font-mono uppercase tracking-widest text-cobalt/60 mb-6">Wie wir arbeiten</span>
              <h2 className="text-4xl md:text-6xl font-normal tracking-hc-partner text-cobalt-dark mb-6">Der 12-Monats-Cycle</h2>
            </div>
            <div className="lg:col-span-8 lg:pt-8">
              <p className="text-xl md:text-2xl font-light text-stone-600 max-w-2xl tracking-hc-partner">
                Ziel: KI wird so normal wie E-Mail – nur mächtiger.
              </p>
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
                In vielen KI-Projekten muss jeder Use Case neu genehmigt werden. Im AI Cycle nicht.
              </p>
              <p className="text-stone-600 font-light leading-relaxed text-lg tracking-hc-partner">
                Wir definieren zu Beginn einen klaren Umsetzungsrahmen. Innerhalb dieses Rahmens setzen wir um – ohne jedes Mal neu zu verkaufen. Das spart Zeit und schafft Momentum.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};