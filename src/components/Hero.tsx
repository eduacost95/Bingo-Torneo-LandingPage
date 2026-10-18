import React, { useState } from 'react';
import { ArrowRight, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onRegisterClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 bg-gradient-to-b from-[#FAF6EF] via-[#F4ECE0] to-[#FBF8F3]">
      {/* Subtle organic Guajiro sun texture backdrop */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-[#E8D5B5]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-80 h-80 bg-[#C45A3C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Proposition & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Trust and Compliance Markers (Zero-Pill clean text with separators) */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-bold uppercase tracking-wider text-[#4A6C6F]">
              <span className="text-[#C45A3C] font-black">
                BINGOS COMUNITARIOS
              </span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span className="flex items-center gap-1 text-[#4A6C6F]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C45A3C]" />
                100% GRATIS
              </span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span>SIN COMPRA NECESARIA</span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span>PREMIOS EN ESPECIE</span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span className="font-mono text-stone-900 bg-[#E8D5B5] px-1.5 py-0.5 rounded text-[11px]">18+</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-[1.15] font-heading" style={{ textWrap: 'balance' }}>
              ¡Torneo de{' '}
              <span className="text-[#C45A3C]">Bingo Comunitario</span> Gratis por Puntos en{' '}
              <span className="underline decoration-[#00C2D1] decoration-4 underline-offset-4">
                Maicao
              </span>
              !
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-xl">
              Consigue tu cartón gratis y participa en nuestros <strong className="font-semibold text-stone-900">bingos comunitarios</strong>. Acumula puntos por cada figura y gana bonos de mercado. 
              <strong className="font-semibold text-stone-900"> Sin compra, sin apuesta, solo entretenimiento comunitario</strong> en La Guajira.
            </p>

            {/* CTA decision cluster */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onRegisterClick}
                className="inline-flex items-center justify-center px-6 py-3.5 sm:py-4 text-base font-extrabold text-white bg-[#00C2D1] hover:bg-[#00A9B7] active:scale-[0.98] rounded-xl shadow-md transition-all group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C2D1]"
              >
                <Sparkles className="w-5 h-5 mr-2 text-[#FAF6EF]" />
                <span>Quiero mi cartón gratis</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#sistema-puntos"
                className="inline-flex items-center justify-center px-5 py-3.5 text-sm font-semibold text-[#4A6C6F] hover:text-[#354F52] hover:bg-[#E8D5B5]/30 rounded-xl transition-colors text-center"
              >
                ¿Cómo sumar 500 puntos?
              </a>
            </div>

            {/* Micro-proof strip */}
            <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-600">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C45A3C]" />
                <span>Maicao, Riohacha y Uribia</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-stone-800">1 Cartón</span>
                <span>digital por persona</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#4A6C6F]">Bonos $400.000</span>
                <span>en mercado local</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Realist Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative warm framing */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#C45A3C]/20 via-[#E8D5B5]/50 to-[#00C2D1]/20 rounded-2xl transform rotate-1 scale-[1.02] filter blur-xs -z-10" />

              <div className="relative overflow-hidden rounded-2xl border-2 border-[#E8D5B5] shadow-xl bg-[#FAF6EF]">
                
                {/* Fallback container if image fails or while loading */}
                {(!imageLoaded || imageError) && (
                  <div className="aspect-[16/10] sm:aspect-[4/3] bg-gradient-to-br from-[#E8D5B5] to-[#C45A3C]/30 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#C45A3C] text-white flex items-center justify-center text-2xl font-black mb-3">
                      B
                    </div>
                    <span className="font-bold text-stone-800 text-sm">Bingo Torneo · Comunitario</span>
                    <span className="text-xs text-stone-600 mt-1">Bingos comunitarios gratuitos por puntos</span>
                  </div>
                )}

                <img
                  src="/src/assets/images/hero_maicao_bingo_1792333770482.jpg"
                  alt="Mujer adulta sonriente con tinto en tienda de barrio de Maicao mirando celular con bingo digital"
                  className={`w-full aspect-[16/10] sm:aspect-[4/3] object-cover transition-opacity duration-300 ${
                    imageLoaded && !imageError ? 'opacity-100 block' : 'hidden'
                  }`}
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    setImageError(true);
                    setImageLoaded(true);
                  }}
                />

                {/* Photo natural contextual caption */}
                <div className="p-3.5 bg-[#FAF6EF] border-t border-[#E8D5B5]/80 flex items-center justify-between text-xs text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#4A6C6F]" />
                    <span className="font-medium text-stone-800">Ambiente de Maicao</span>
                  </div>
                  <span className="text-stone-500">Juega en vivo desde tu celular</span>
                </div>

              </div>

              {/* Floating Highlight Card on Photo */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-white/95 backdrop-blur-md border border-[#E8D5B5] p-3 sm:p-3.5 rounded-xl shadow-lg max-w-[210px] hidden sm:block">
                <span className="text-[11px] font-bold text-[#C45A3C] uppercase tracking-wider block">
                  Sin Recargas
                </span>
                <p className="text-xs font-semibold text-stone-800 mt-0.5">
                  Premios en despensas y bonos de alimentos
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
