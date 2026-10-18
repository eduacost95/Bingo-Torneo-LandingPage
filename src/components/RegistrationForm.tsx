import React, { useState, useRef } from 'react';
import {
  BARRIOS_MAICAO,
  BARRIOS_RIOHACHA,
  BARRIOS_URIBIA,
  MUNICIPIOS_GUAJIRA,
  generateRandomBingoCard,
} from '../data/mockData';
import { BingoCardData, RegistrationData } from '../types';
import { BingoCardView } from './BingoCardView';
import { CheckCircle2, Gift, Shield, AlertTriangle, ArrowRight, UserCheck, ChevronRight, ChevronLeft } from 'lucide-react';

interface RegistrationFormProps {
  onCardGenerated?: (card: BingoCardData) => void;
  onOpenRulesModal: () => void;
  onOpenPrivacyModal: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onCardGenerated,
  onOpenRulesModal,
  onOpenPrivacyModal,
}) => {
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    phone: '',
    city: 'Maicao',
    neighborhood: 'El Bosque',
    acceptsRulesAndAge: true,
    receiveReminders: true,
  });

  const [customCity, setCustomCity] = useState('');
  const [customNeighborhood, setCustomNeighborhood] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generatedCard, setGeneratedCard] = useState<BingoCardData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getNeighborhoodList = () => {
    if (formData.city === 'Riohacha') return BARRIOS_RIOHACHA;
    if (formData.city === 'Uribia') return BARRIOS_URIBIA;
    if (formData.city === 'Maicao') return BARRIOS_MAICAO;
    return ['Centro', 'Barrio Principal', 'Zona Norte', 'Zona Sur', 'Otro sector'];
  };

  const handleCityChange = (city: string) => {
    let defaultNeighborhood = 'Centro';
    if (city === 'Maicao') defaultNeighborhood = 'El Bosque';
    else if (city === 'Riohacha') defaultNeighborhood = 'Centro';
    else if (city === 'Uribia') defaultNeighborhood = 'Centro';

    setFormData((prev) => ({
      ...prev,
      city,
      neighborhood: defaultNeighborhood,
    }));
    if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
  };

  const scrollMunicipalities = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -180 : 180;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Por favor ingresa tu nombre y apellido completo.';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Ingresa un número de celular de WhatsApp válido (10 dígitos).';
    }

    if (formData.city === 'Otro' && !customCity.trim()) {
      newErrors.customCity = 'Por favor escribe tu municipio de residencia.';
    }

    if (!formData.acceptsRulesAndAge) {
      newErrors.acceptsRulesAndAge = 'Debes certificar ser mayor de 18 años y aceptar las reglas del torneo.';
    }

    if (formData.neighborhood.includes('Otro') && !customNeighborhood.trim()) {
      newErrors.customNeighborhood = 'Por favor escribe el nombre de tu barrio o sector.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate instant secure registration & generate card
    setTimeout(() => {
      const selectedNeighborhood = formData.neighborhood.includes('Otro')
        ? customNeighborhood.trim()
        : formData.neighborhood;

      const effectiveCity =
        formData.city === 'Otro'
          ? customCity.trim() || 'La Guajira'
          : formData.city;

      const card = generateRandomBingoCard(
        formData.fullName.trim(),
        `${effectiveCity} (${selectedNeighborhood})`
      );

      setGeneratedCard(card);
      setIsSubmitting(false);
      onCardGenerated?.(card);
    }, 400);
  };

  return (
    <section id="inscripcion" className="py-16 sm:py-24 bg-[#FAF6EF] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-[#4A6C6F] mb-2">
            Inscripción Inmediata 100% Gratuita
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight font-heading">
            Pide Tu Cartón Digital Gratis
          </h2>
          <p className="mt-2.5 text-stone-600 text-sm sm:text-base leading-relaxed">
            Completa tus datos en 30 segundos. Te generamos tu cartón digital con serial único para que participes en el torneo de Maicao.
          </p>
        </div>

        {/* Dynamic State: Form or Generated Card */}
        {generatedCard ? (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center text-xs sm:text-sm text-emerald-800 flex items-center justify-center gap-2 max-w-md mx-auto">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>¡Inscripción exitosa!</strong> Tu cartón ha sido asignado para el torneo.
              </span>
            </div>

            <BingoCardView card={generatedCard} />

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setGeneratedCard(null)}
                className="text-xs text-stone-600 underline hover:text-[#C45A3C] transition-colors"
              >
                Inscribir otro familiar mayor de 18 años
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8D5B5] shadow-lg">
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Field: Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Nombre y Apellido Completo <span className="text-[#C45A3C]">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Ej. María Elena Pérez"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-stone-800 bg-[#FAF6EF]/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-[#E8D5B5] focus:ring-[#00C2D1] focus:border-transparent'
                  }`}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Field: WhatsApp with Colombia (+57) prefix */}
              <div>
                <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Número de WhatsApp <span className="text-[#C45A3C]">*</span>
                </label>
                <div className="relative flex rounded-xl border border-[#E8D5B5] bg-[#FAF6EF]/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00C2D1] focus-within:border-transparent overflow-hidden">
                  <div className="flex items-center gap-1.5 px-3.5 bg-[#E8D5B5]/40 text-stone-700 text-xs font-bold border-r border-[#E8D5B5] select-none">
                    <span>🇨🇴 +57</span>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    maxLength={10}
                    placeholder="300 123 4567"
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setFormData({ ...formData, phone: val });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    className="w-full px-4 py-3 text-sm text-stone-800 bg-transparent focus:outline-none font-mono"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                </div>
                {errors.phone ? (
                  <p id="phone-error" className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {errors.phone}
                  </p>
                ) : (
                  <p className="text-[11px] text-stone-500 mt-1">
                    Aquí recibirás el enlace y recordatorios de la transmisión en vivo.
                  </p>
                )}
              </div>

              {/* Municipio de Residencia Selection with swipeable touch controls */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    Municipio de Residencia <span className="text-[#C45A3C]">*</span>
                  </label>
                  <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium">
                    <span className="hidden sm:inline">Desliza con el tacto</span>
                    <button
                      type="button"
                      onClick={() => scrollMunicipalities('left')}
                      className="p-1 rounded-md hover:bg-stone-200/60 text-stone-600 transition-colors"
                      title="Deslizar a la izquierda"
                      aria-label="Deslizar a la izquierda"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollMunicipalities('right')}
                      className="p-1 rounded-md hover:bg-stone-200/60 text-stone-600 transition-colors"
                      title="Deslizar a la derecha"
                      aria-label="Deslizar a la derecha"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Horizontally touch-scrollable chip container */}
                <div className="relative -mx-1 px-1">
                  <div
                    ref={scrollContainerRef}
                    tabIndex={0}
                    aria-label="Selector de municipios deslizable con el tacto"
                    className="flex items-center gap-2 overflow-x-auto py-1 px-1 scroll-smooth touch-pan-x overscroll-x-contain select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00C2D1] rounded-xl"
                    style={{
                      scrollbarWidth: 'thin',
                      WebkitOverflowScrolling: 'touch',
                    }}
                  >
                    {MUNICIPIOS_GUAJIRA.map((mun) => {
                      const isSelected = formData.city === mun;
                      return (
                        <button
                          key={mun}
                          type="button"
                          onClick={() => handleCityChange(mun)}
                          className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95 ${
                            isSelected
                              ? 'bg-[#C45A3C] text-white border-[#C45A3C] shadow-xs'
                              : 'bg-white text-stone-700 border-[#E8D5B5] hover:bg-[#FAF6EF]'
                          }`}
                        >
                          {mun}
                        </button>
                      );
                    })}
                  </div>

                  {/* Mobile swipe helper caption */}
                  <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1 px-1 sm:hidden">
                    <span>← Desliza para ver más municipios →</span>
                    <span className="font-semibold text-[#4A6C6F]">{formData.city}</span>
                  </div>
                </div>

                {/* If 'Otro' is selected, text input to specify */}
                {formData.city === 'Otro' && (
                  <div className="mt-2.5">
                    <input
                      type="text"
                      placeholder="Escribe tu municipio de residencia"
                      value={customCity}
                      onChange={(e) => {
                        setCustomCity(e.target.value);
                        if (errors.customCity) setErrors({ ...errors, customCity: '' });
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8D5B5] text-xs text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00C2D1]"
                    />
                    {errors.customCity && (
                      <p className="text-xs text-red-600 mt-1">{errors.customCity}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Neighborhood Selection */}
              <div>
                <label htmlFor="neighborhood" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Barrio o Sector en {formData.city === 'Otro' ? (customCity.trim() || 'tu municipio') : formData.city} <span className="text-[#C45A3C]">*</span>
                </label>
                <select
                  id="neighborhood"
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8D5B5] text-sm text-stone-800 bg-[#FAF6EF]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C2D1]"
                >
                  {getNeighborhoodList().map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>

                {formData.neighborhood.includes('Otro') && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder={`Escribe el nombre de tu sector en ${formData.city}`}
                      value={customNeighborhood}
                      onChange={(e) => setCustomNeighborhood(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8D5B5] text-xs text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00C2D1]"
                    />
                    {errors.customNeighborhood && (
                      <p className="text-xs text-red-600 mt-1">{errors.customNeighborhood}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Checkboxes */}
              <div className="pt-2 space-y-3">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-700 select-none">
                  <input
                    type="checkbox"
                    checked={formData.acceptsRulesAndAge}
                    onChange={(e) => {
                      setFormData({ ...formData, acceptsRulesAndAge: e.target.checked });
                      if (errors.acceptsRulesAndAge) setErrors({ ...errors, acceptsRulesAndAge: '' });
                    }}
                    className="mt-0.5 rounded border-[#E8D5B5] text-[#00C2D1] focus:ring-[#00C2D1] w-4 h-4"
                  />
                  <span>
                    Certifico que <strong>soy mayor de 18 años</strong> y acepto las{' '}
                    <button
                      type="button"
                      onClick={onOpenRulesModal}
                      className="text-[#C45A3C] font-semibold underline hover:text-[#A7452A]"
                    >
                      reglas oficiales del torneo
                    </button>{' '}
                    y la{' '}
                    <button
                      type="button"
                      onClick={onOpenPrivacyModal}
                      className="text-[#4A6C6F] font-semibold underline hover:text-stone-900"
                    >
                      política de datos (Ley 1581)
                    </button>
                    . <span className="text-[#C45A3C] font-bold">*</span>
                  </span>
                </label>
                {errors.acceptsRulesAndAge && (
                  <p className="text-xs text-red-600 pl-6 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {errors.acceptsRulesAndAge}
                  </p>
                )}

                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-600 select-none">
                  <input
                    type="checkbox"
                    checked={formData.receiveReminders}
                    onChange={(e) => setFormData({ ...formData, receiveReminders: e.target.checked })}
                    className="mt-0.5 rounded border-[#E8D5B5] text-[#00C2D1] focus:ring-[#00C2D1] w-4 h-4"
                  />
                  <span>
                    Deseo recibir aviso de inicio de la transmisión en vivo por WhatsApp.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 text-base font-extrabold text-white bg-[#00C2D1] hover:bg-[#00A9B7] active:scale-[0.99] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C2D1]"
                >
                  <Gift className="w-5 h-5" />
                  <span>
                    {isSubmitting ? 'Generando tu cartón...' : 'Quiero mi cartón gratis'}
                  </span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </button>

                {/* MANDATORY COMPLIANCE TEXT UNDER BUTTON */}
                <p className="mt-3 text-center text-xs text-stone-500 font-medium">
                  Torneo gratuito. Sin compra necesaria. Mayores de 18 años.
                </p>
              </div>

            </form>

          </div>
        )}

      </div>
    </section>
  );
};
