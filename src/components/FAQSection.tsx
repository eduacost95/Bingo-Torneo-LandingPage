import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-[#FAF6EF] border-t border-[#E8D5B5]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4A6C6F] mb-2">
            <HelpCircle className="w-4 h-4 text-[#C45A3C]" />
            <span>Respuestas Rápidas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight font-heading">
            Preguntas Frecuentes
          </h2>
          <p className="mt-2.5 text-stone-600 text-sm sm:text-base leading-relaxed">
            Resolvemos tus dudas sobre la gratuidad, los cartones y la entrega de premios en Maicao.
          </p>
        </div>

        {/* FAQs List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-[#E8D5B5] overflow-hidden transition-all shadow-2xs hover:border-[#4A6C6F]/40"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-stone-900 font-heading">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#C45A3C]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-700 leading-relaxed border-t border-[#E8D5B5]/40 animate-in fade-in-50 duration-150 space-y-2">
                    <p>{faq.answer}</p>
                    {faq.highlight && (
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A6C6F] bg-[#FAF6EF] px-2.5 py-1 rounded-md border border-[#E8D5B5]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C45A3C]" />
                        <span>{faq.highlight}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
