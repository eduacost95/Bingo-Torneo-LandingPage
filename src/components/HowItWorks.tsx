import React from 'react';
import { UserCheck, MessageSquare, Radio, ChevronRight } from 'lucide-react';

interface HowItWorksProps {
  onRegisterClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onRegisterClick }) => {
  const steps = [
    {
      step: '01',
      title: 'Inscríbete gratis en el formulario',
      description:
        'Solo necesitas tu nombre, barrio de Maicao (o municipios cercanos) y WhatsApp. No pedimos tarjetas ni dinero.',
      icon: UserCheck,
      badge: 'Menos de 1 minuto',
    },
    {
      step: '02',
      title: 'Recibe tu cartón digital por WhatsApp',
      description:
        'Te asignamos un cartón único con código de serie oficial. Lo recibes en tu celular listo para consultar y jugar.',
      icon: MessageSquare,
      badge: 'Cartón personal único',
    },
    {
      step: '03',
      title: 'Juega en vivo y suma puntos por figura',
      description:
        'Conéctate a las transmisiones en vivo de nuestros bingos comunitarios los fines de semana. Cada línea, esquina o cartón lleno suma puntos acumulativos.',
      icon: Radio,
      badge: 'Bingos Comunitarios en Vivo',
    },
  ];

  return (
    <section id="como-funciona" className="py-16 sm:py-20 bg-white border-y border-[#E8D5B5]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#4A6C6F] mb-2">
            Bingos Comunitarios · Mecánica Simple
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight font-heading">
            ¿Cómo Funciona el Torneo Comunitario?
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Tres pasos sencillos para participar desde tu casa en Maicao en nuestros <strong>bingos comunitarios</strong> y competir sanamente por la canasta de mercado familiar.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-[#FAF6EF] rounded-2xl p-6 sm:p-7 border border-[#E8D5B5]/80 flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-[#C45A3C]/40 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#4A6C6F]/10 text-[#4A6C6F] group-hover:bg-[#C45A3C]/10 group-hover:text-[#C45A3C] transition-colors flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black font-heading text-[#C45A3C]/40 group-hover:text-[#C45A3C] transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold tracking-wide text-stone-500 uppercase">
                    {item.badge}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 mt-1 mb-2.5 font-heading">
                    {item.title}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {idx < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-stone-300">
                    <ChevronRight className="w-7 h-7" />
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-[#E8D5B5]/60 flex items-center text-xs font-semibold text-[#4A6C6F]">
                  <span>Paso obligatorio</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick action bar below steps */}
        <div className="mt-12 text-center bg-[#FAF6EF] border border-[#E8D5B5] rounded-2xl p-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-stone-900 font-heading">
              ¿Listo para pedir tu cartón hoy?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600">
              No esperes a la última hora antes de la transmisión.
            </p>
          </div>
          <button
            onClick={onRegisterClick}
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-white bg-[#00C2D1] hover:bg-[#00A9B7] rounded-xl transition-colors shadow-xs shrink-0"
          >
            Inscribirme gratis ahora
          </button>
        </div>

      </div>
    </section>
  );
};
