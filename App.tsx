import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TextSection } from './components/TextSection';
import { CycleProcess } from './components/CycleProcess';
import { Qualification } from './components/Qualification';
import { Team } from './components/Team';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-glacier font-sans text-stone-900 selection:bg-cobalt selection:text-white overflow-x-hidden">
      <Header />

      <main>
        <Hero />

        <TextSection
          id="context"
          label="Warum es uns gibt"
          headline="Wir leben in einer Zeit, in der Technologie schneller ist als jede Lernkurve."
          content={
            <>
              <p>Nicht, weil Menschen zu langsam sind – sondern weil Entwicklung exponentiell ist.</p>
              <p>Das Problem ist nicht die KI. Das Problem ist die Brücke zwischen dem, was technisch möglich ist, und dem, was im Alltag wirklich ankommt.</p>
              <p className="font-medium text-cobalt-dark">Genau dort arbeiten wir.</p>
            </>
          }
        />

        <TextSection
          layout="split"
          headline="Das Problem mit dem Status quo"
          content={
            <>
              <p>Die meisten Unternehmen behandeln KI wie ein Ereignis. Ein Workshop. Ein Tool. Ein bisschen Hype. Das Ergebnis ist ein Strohfeuer.</p>
              <blockquote className="text-xl md:text-2xl italic text-cobalt/60 leading-relaxed my-8 pl-6 border-l border-poppy">
                "Ein Einmal-Workshop ist wie einmal im Januar ein Salat. Oder einmal kurz ins Fitnessstudio gehen und glauben, das reicht."
              </blockquote>
              <p>Transformation funktioniert anders.</p>
            </>
          }
        />

        <TextSection
          dark
          layout="statement"
          headline="KI scheitert nicht an Technik. Sie scheitert an Organisationen."
          content={
            <div className="space-y-8">
              <p className="text-glacier/60">Die Technologie ist nicht das Problem. Die Modelle sind da. Die Tools sind da. Was fehlt, ist:</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-t border-white/10 pt-4 text-glacier">Mut</div>
                <div className="border-t border-white/10 pt-4 text-glacier">Führung</div>
                <div className="border-t border-white/10 pt-4 text-glacier">Lernkultur</div>
                <div className="border-t border-white/10 pt-4 text-glacier">System</div>
              </div>
            </div>
          }
        />

        <TextSection
          label="Was der AI-Cycle wirklich ist"
          headline="AI Cycle ist kein Produkt, das man kauft und dann abhakt. AI Cycle ist ein Betriebssystem für dein Unternehmen."
          content={
            <>
              <p>Ein System, das zeigt, wo du wirklich stehst, konkrete Piloten ermöglicht, KI in Rollen und Prozesse integriert und den Motor am Laufen hält.</p>
              <p className="font-medium mt-8 text-xl text-cobalt-dark">Wir bauen nichts für euch – wir bauen es mit euch.</p>
            </>
          }
        />

        <section className="py-32 md:py-48 px-6 md:px-12 bg-mist">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 md:order-1 relative aspect-[4/3] bg-white overflow-hidden shadow-2xl shadow-cobalt/5">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" alt="Haltung" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s]" />
              <div className="absolute inset-0 bg-cobalt/10 mix-blend-multiply opacity-0 hover:opacity-100 transition-opacity duration-[2s]"></div>
            </div>
            <div className="order-1 md:order-2">
              <span className="block text-xs font-mono uppercase tracking-widest text-cobalt/60 mb-8">Haltung</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-hc-partner leading-tight mb-12 text-cobalt-dark">Der Mensch bleibt im Zentrum</h2>
              <div className="text-lg md:text-xl font-light leading-relaxed space-y-8 text-stone-700 tracking-hc-partner">
                <p>Wir glauben nicht, dass sich Menschen der Maschine anpassen müssen. Es ist genau umgekehrt.</p>
                <p>KI ist ein Partner. Der Mensch bleibt im Driver Seat.</p>
                <div className="flex gap-8 pt-4 border-t border-mist">
                  <div>
                    <span className="block text-cobalt-dark font-medium mb-1">Entscheidungen</span>
                    <span className="text-stone-500">Menschlich</span>
                  </div>
                  <div>
                    <span className="block text-cobalt-dark font-medium mb-1">Routine</span>
                    <span className="text-stone-500">Automatisiert</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CycleProcess />

        <Qualification />

        <Team />

      </main>

      <Footer />
    </div>
  );
}

export default App;