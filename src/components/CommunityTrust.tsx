import React, { useState } from 'react';
import { Heart, Users, MapPin, Share2, Check } from 'lucide-react';

export const CommunityTrust: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const officialAdCopy =
    'Torneo gratuito de bingo por puntos. Cartón gratis. Acumula hasta 500 puntos. Premios en bonos de mercado para 1er, 2do y 3er puesto. Sin compra. 18+';

  const handleCopyAdCopy = () => {
    navigator.clipboard?.writeText?.(
      `¡Vecino! Participa gratis en el Bingo Torneo Free de Maicao: ${officialAdCopy}`
    );
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#E8D5B5]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Community Image */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden border-2 border-[#E8D5B5] shadow-md bg-[#FAF6EF]">
              
              {(!imageLoaded || imageError) && (
                <div className="aspect-[4/3] bg-gradient-to-br from-[#E8D5B5] to-[#4A6C6F]/20 flex flex-col items-center justify-center p-6 text-center">
                  <Users className="w-12 h-12 text-[#4A6C6F] mb-2" />
                  <span className="font-bold text-stone-800 text-sm">Comunidad de Maicao</span>
                  <span className="text-xs text-stone-600">Encuentro y tradición familiar</span>
                </div>
              )}

              <img
                src="/src/assets/images/comunidad_maicao_reunion_1792333770784.jpg"
                alt="Amigos adultos conversando con café y celular en Maicao La Guajira en un ambiente cotidiano y cálido"
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

              <div className="p-4 bg-[#FAF6EF] border-t border-[#E8D5B5] flex items-center justify-between text-xs text-stone-600">
                <span className="flex items-center gap-1 font-medium text-stone-800">
                  <MapPin className="w-3.5 h-3.5 text-[#C45A3C]" />
                  La Guajira, Colombia
                </span>
                <span>Entretenimiento sano para adultos (18+)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Values & Integrity */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C45A3C]">
                Espacio de Integración Barrial
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-heading">
                Un Juego Pensado Para Nuestra Gente en Maicao
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                El bingo tradicional siempre ha sido el punto de encuentro de las familias colombianas. 
                Adaptamos esta tradición al formato digital, permitiendo que cada participante juegue desde 
                su celular sin arriesgar ni un solo peso de su bolsillo.
              </p>
            </div>

            {/* Principles Checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-[#4A6C6F]/10 text-[#4A6C6F] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 font-heading">
                    Cero Apuestas, Cero Casino
                  </h4>
                  <p className="text-xs text-stone-600">
                    No promovemos juegos de azar ni cobramos suscripciones. Todos los cartones son gratuitos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-[#C45A3C]/10 text-[#C45A3C] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 font-heading">
                    Apoyo a la Canasta Familiar Local
                  </h4>
                  <p className="text-xs text-stone-600">
                    Los premios se entregan en mercados y bonos canjeables en tiendas aliadas de Maicao para beneficiar la mesa de tu casa.
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Share Box with Official Approved Ad Copy */}
            <div className="p-4 rounded-xl bg-[#FAF6EF] border border-[#E8D5B5] space-y-2">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">
                Mensaje Oficial para Compartir con Amigos:
              </span>
              <p className="text-xs text-stone-700 italic bg-white p-2.5 rounded-lg border border-[#E8D5B5]/60 font-medium">
                "{officialAdCopy}"
              </p>
              <button
                type="button"
                onClick={handleCopyAdCopy}
                className="w-full py-2 px-3 text-xs font-semibold text-[#4A6C6F] hover:text-[#354F52] hover:bg-stone-100 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedShare ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>¡Mensaje copiado para WhatsApp!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Copiar mensaje para compartir con un vecino</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
