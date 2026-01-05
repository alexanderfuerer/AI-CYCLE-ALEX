import React from 'react';
import { FadeIn } from './FadeIn';

interface TextSectionProps {
  id?: string;
  label?: string;
  headline?: React.ReactNode;
  content: React.ReactNode;
  layout?: 'split' | 'centered' | 'wide' | 'statement';
  className?: string;
  dark?: boolean;
}

export const TextSection: React.FC<TextSectionProps> = ({
  id,
  label,
  headline,
  content,
  layout = 'wide',
  className = '',
  dark = false
}) => {
  const bgClass = dark ? 'bg-cobalt-dark text-glacier' : 'bg-transparent text-stone-900';
  const labelClass = dark ? 'text-mint/40' : 'text-cobalt/60';
  const headlineClass = dark ? 'text-glacier' : 'text-cobalt-dark';
  const contentClass = dark ? 'text-glacier/70' : 'text-stone-700';

  return (
    <section id={id} className={`py-32 md:py-48 px-6 md:px-12 ${bgClass} ${className}`}>
      <div className="max-w-[1400px] mx-auto">
        <FadeIn>
          {layout === 'wide' && (
            <div className="max-w-4xl">
              {label && <span className={`block text-xs font-mono uppercase tracking-widest mb-8 ${labelClass}`}>{label}</span>}
              {headline && <h2 className={`text-4xl md:text-6xl font-normal tracking-hc-partner leading-[1.1] mb-12 ${headlineClass} max-w-3xl`}>{headline}</h2>}
              <div className={`text-lg md:text-2xl font-light leading-relaxed space-y-8 ${contentClass} max-w-2xl tracking-hc-partner`}>
                {content}
              </div>
            </div>
          )}

          {layout === 'split' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
              <div className="md:col-span-5">
                {label && <span className={`block text-xs font-mono uppercase tracking-widest mb-8 ${labelClass}`}>{label}</span>}
                {headline && <h2 className={`text-3xl md:text-5xl font-normal tracking-tight leading-tight ${headlineClass}`}>{headline}</h2>}
              </div>
              <div className={`md:col-span-7 ${contentClass} pt-2 md:pt-16`}>
                <div className="text-lg md:text-xl font-light leading-relaxed space-y-8">
                  {content}
                </div>
              </div>
            </div>
          )}

          {layout === 'centered' && (
            <div className="max-w-3xl mx-auto text-center">
              {label && <span className={`block text-xs font-mono uppercase tracking-widest mb-8 ${labelClass}`}>{label}</span>}
              {headline && <h2 className={`text-4xl md:text-6xl font-normal tracking-tight leading-tight mb-12 ${headlineClass}`}>{headline}</h2>}
              <div className={`text-lg md:text-xl font-light leading-relaxed space-y-8 ${contentClass}`}>
                {content}
              </div>
            </div>
          )}

          {layout === 'statement' && (
            <div className="max-w-5xl">
              {label && <span className={`block text-xs font-mono uppercase tracking-widest mb-8 ${labelClass}`}>{label}</span>}
              <h2 className={`text-4xl md:text-7xl font-normal tracking-tight leading-[1.05] ${headlineClass}`}>
                {headline}
              </h2>
              <div className={`mt-16 max-w-2xl text-xl md:text-2xl font-light leading-relaxed ${contentClass}`}>
                {content}
              </div>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
};