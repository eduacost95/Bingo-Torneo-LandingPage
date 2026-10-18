import React, { useState } from 'react';
import { OFFICIAL_RULES_SECTIONS } from '../data/mockData';
import { ChevronDown, FileText, ShieldAlert } from 'lucide-react';

export const RulesAccordion: React.FC = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    organizador: true,
    meta_disclaimer: true, // Keep Meta disclaimer visible or expanded
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="reglas" className="py-16 sm:py-20 bg-white border-t border-[#E8D5B5]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4A6C6F] mb-2">
            <FileText className="w-4 h-4 text-[#C45A3C]" />
            <span>Términos y Condiciones Transparentes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight font-heading">
            Reglas Oficiales del Torneo
          </h2>
          <p className="mt-2.5 text-stone-600 text-sm sm:text-base leading-relaxed">
            Consulta las bases completas que rigen el torneo gratuito por puntos en Maicao, La Guajira.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {OFFICIAL_RULES_SECTIONS.map((section) => {
            const isOpen = !!openItems[section.id];
            const isMeta = section.id === 'meta_disclaimer';

            return (
              <div
                key={section.id}
                className={`rounded-2xl border transition-all ${
                  isMeta
                    ? 'border-[#C45A3C]/40 bg-[#FAF6EF]'
                    : isOpen
                    ? 'border-[#4A6C6F]/40 bg-[#FAF6EF]/60 shadow-2xs'
                    : 'border-[#E8D5B5] bg-white hover:border-[#4A6C6F]/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(section.id)}
                  className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm sm:text-base font-bold font-heading ${
                    isMeta ? 'text-[#C45A3C]' : 'text-stone-900'
                  }`}>
                    {section.title}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-stone-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-700 leading-relaxed border-t border-[#E8D5B5]/50 whitespace-pre-line animate-in fade-in-50 duration-150">
                    {section.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Highlighted Meta Release Callout Block */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#FDF5F2] border-2 border-[#C45A3C]/30 text-stone-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C45A3C]">
            <ShieldAlert className="w-4 h-4 text-[#C45A3C]" />
            <span>Declaración Obligatoria de Meta (Facebook e Instagram)</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
            "Esta promoción no está patrocinada, avalada, administrada ni asociada en modo alguno a Facebook ni a Instagram. Al participar, liberas completamente a Facebook e Instagram de toda responsabilidad. Entiendes que proporcionas tu información a Bingo Torneo Free y no a Meta. Facebook no asistirá en la administración de esta promoción y participas bajo tu propio riesgo."
          </p>
        </div>

      </div>
    </section>
  );
};
