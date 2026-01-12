import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
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

        {/* KI als Fundament Section */}
        <section className="py-32 md:py-48 px-6 md:px-12 bg-mist">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 md:order-1 relative aspect-[4/3] bg-stone-200 overflow-hidden shadow-2xl shadow-cobalt/5 flex items-center justify-center">
              <span className="text-stone-400 font-mono text-sm">[ Bild-Platzhalter ]</span>
            </div>
            <div className="order-1 md:order-2">
              <span className="block text-xs font-mono uppercase tracking-widest text-cobalt/60 mb-8">Unsere Überzeugung</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-hc-partner leading-tight mb-12 text-cobalt-dark">KI verändert nicht nur, was wir tun. Sie verändert, wie wir zusammenarbeiten.</h2>
              <div className="text-lg md:text-xl font-light leading-relaxed space-y-6 text-stone-700 tracking-hc-partner">
                <p>Ein Workshop hier, ein bisschen ChatGPT dort – das ist keine Transformation. Das ist Aktionismus.</p>
                <p>KI ist kein IT-Projekt. Sie ist ein neues Paradigma – eine Grundlage, die in alle Bereiche greift. Wie ein Betriebssystem. Das beginnt mit ehrlicher Analyse: Welche Prozesse prägen den Alltag? Wo liegt die DNA des Unternehmens? Erst dann lassen sich KI-Workflows sinnvoll einführen – schrittweise, durchdacht, mit allen Beteiligten.</p>
                <p>Und eines ist entscheidend: Es geht nicht darum, Menschen zu ersetzen. Es geht darum, sie freizuspielen – für das, was sie besser können als jede Maschine: strategisch denken, kreativ lösen, Beziehungen pflegen.</p>
                <p className="font-medium text-cobalt-dark">Nicht Effizienz um jeden Preis. Sondern Wirksamkeit.</p>
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