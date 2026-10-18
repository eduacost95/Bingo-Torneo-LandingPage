import React, { useState } from 'react';
import { ShoppingBag, Utensils, ShieldCheck, MapPin, AlertCircle } from 'lucide-react';
import { TournamentSettings } from '../types';
import { DEFAULT_SETTINGS } from '../lib/supabase';

interface PrizesProps {
  onRegisterClick: () => void;
  settings?: TournamentSettings;
}

export const Prizes: React.FC<PrizesProps> = ({
  onRegisterClick,
  settings = DEFAULT_SETTINGS,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { firstPrize, secondPrize, thirdPrize } = settings;

  return (
    <section id="premios" className="py-16 sm:py-24 bg-white border-t border-[#E8D5B5]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C45A3C] mb-2">
            Recompensas Familiares Sin Apuestas
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight font-heading">
            Premios Que Sí Se Usan en Casa
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Sin rodeos ni promesas falsas: premiamos a las familias de Maicao con alimentos, 
            mercado para el hogar y bonos en tiendas locales.
          </p>
        </div>

        {/* 2-Column Showcase: Featured Hamper Photo & Prizes Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-12">
          
          {/* Left Column: Authentic Grocery Basket Photo */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#E8D5B5] shadow-md bg-[#FAF6EF] h-full flex flex-col justify-between">
              
              {/* Fallback container */}
              {(!imageLoaded || imageError) && (
                <div className="aspect-[4/3] bg-gradient-to-br from-[#E8D5B5] to-[#C45A3C]/20 flex flex-col items-center justify-center p-6 text-center">
                  <ShoppingBag className="w-12 h-12 text-[#C45A3C] mb-2" />
                  <span className="font-bold text-stone-800 text-sm">Canasta Familiar de Mercado</span>
                  <span className="text-xs text-stone-600">Alimentos de primera necesidad</span>
                </div>
              )}

              <div className="relative">
                <img
                  src={settings.prizesImageUrl || DEFAULT_SETTINGS.prizesImageUrl}
                  alt="Canasta familiar de mercado con víveres colombianos y bono de compra para el hogar"
                  className={`w-full aspect-[4/3] object-cover transition-opacity duration-300 ${
                    imageLoaded && !imageError ? 'opacity-100 block' : 'hidden'
                  }`}
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    setImageError(true);
                    setImageLoaded(true);
                  }}
                />
                
                {/* Visual guarantee tag */}
                <div className="absolute top-3 left-3 bg-[#FAF6EF]/90 backdrop-blur-xs border border-[#E8D5B5] px-2.5 py-1 rounded-md text-[11px] font-bold text-[#4A6C6F]">
                  Foto referencial de canasta de mercado
                </div>
              </div>

              <div className="p-5 bg-[#FAF6EF] border-t border-[#E8D5B5]">
                <h4 className="text-sm font-bold text-stone-900 font-heading mb-1">
                  Abastece tu cocina sin gastar un peso
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Arroz, café de Colombia, panela, aceite, granos y víveres esenciales seleccionados para aliviar el gasto semanal del hogar.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: 3 Podium Prize Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* 1st Place Marquee */}
            <div className="relative p-6 sm:p-7 rounded-2xl bg-[#FAF6EF] border-2 border-[#C45A3C] shadow-md transition-transform hover:-translate-y-0.5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#C45A3C] bg-[#C45A3C]/10 px-2 py-0.5 rounded">
                      {firstPrize.badge || 'Primer Puesto (Llegar a 500 Pts)'}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 font-heading">
                    {firstPrize.title}
                  </h3>
                  {firstPrize.subtitle && (
                    <p className="text-sm font-semibold text-[#4A6C6F]">
                      {firstPrize.subtitle}
                    </p>
                  )}
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#C45A3C] text-white flex items-center justify-center text-lg font-black shrink-0 font-heading shadow-xs">
                  1º
                </div>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                {firstPrize.description}
              </p>
            </div>

            {/* 2nd Place */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8D5B5] shadow-2xs hover:border-[#4A6C6F] transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4A6C6F]">
                    {secondPrize.badge || 'Segundo Puesto'}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-stone-900 font-heading">
                    {secondPrize.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600">
                    {secondPrize.description}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#4A6C6F] text-white flex items-center justify-center text-base font-black shrink-0 font-heading shadow-xs">
                  2º
                </div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8D5B5] shadow-2xs hover:border-stone-400 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    {thirdPrize.badge || 'Tercer Puesto'}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-stone-900 font-heading">
                    {thirdPrize.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600">
                    {thirdPrize.description}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-stone-300 text-stone-800 flex items-center justify-center text-base font-black shrink-0 font-heading shadow-xs">
                  3º
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Mandatory Transparency Notice Box */}
        <div className="p-5 rounded-2xl bg-[#FDF5F2] border border-[#C45A3C]/30 max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#C45A3C]/10 text-[#C45A3C] flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1 flex-1">
            <h5 className="text-xs sm:text-sm font-bold text-stone-900 font-heading">
              Aclaración de Transparencia y Entrega
            </h5>
            <p className="text-xs text-stone-600 leading-relaxed">
              Premios en especie y bonos de mercado, <strong className="text-stone-900">no canjeables por dinero en efectivo</strong>. 
              Entrega presencial en Maicao presentando cédula de ciudadanía original que coincida con el registro del cartón digital.
            </p>
          </div>
          <button
            onClick={onRegisterClick}
            className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-white bg-[#00C2D1] hover:bg-[#00A9B7] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Asegurar mi cartón gratis
          </button>
        </div>

      </div>
    </section>
  );
};
