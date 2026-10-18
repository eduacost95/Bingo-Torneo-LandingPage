import React, { useState, useRef } from 'react';
import {
  MUNICIPIOS_GUAJIRA,
  BARRIOS_MAICAO,
  BARRIOS_RIOHACHA,
  BARRIOS_URIBIA,
  generateRandomBingoCard,
} from '../data/mockData';
import { RegistrationRecord } from '../types';
import { saveRegistration } from '../lib/supabase';
import {
  Gift,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface RedeemInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviterName: string;
  suggestedName?: string;
  onRedeemSuccess: (record: RegistrationRecord) => void;
  onOpenRulesModal: () => void;
  onOpenPrivacyModal: () => void;
}

export const RedeemInvitationModal: React.FC<RedeemInvitationModalProps> = ({
  isOpen,
  onClose,
  inviterName,
  suggestedName = '',
  onRedeemSuccess,
  onOpenRulesModal,
  onOpenPrivacyModal,
}) => {
  const [fullName, setFullName] = useState(suggestedName);
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Maicao');
  const [customCity, setCustomCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('El Bosque');
  const [customNeighborhood, setCustomNeighborhood] = useState('');
  const [acceptsRules, setAcceptsRules] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const getNeighborhoodList = () => {
    if (city === 'Riohacha') return BARRIOS_RIOHACHA;
    if (city === 'Uribia') return BARRIOS_URIBIA;
    if (city === 'Maicao') return BARRIOS_MAICAO;
    return ['Centro', 'Barrio Principal', 'Zona Norte', 'Zona Sur', 'Otro sector'];
  };

  const handleCityChange = (newCity: string) => {
    let defaultNeighborhood = 'Centro';
    if (newCity === 'Maicao') defaultNeighborhood = 'El Bosque';
    else if (newCity === 'Riohacha') defaultNeighborhood = 'Centro';
    else if (newCity === 'Uribia') defaultNeighborhood = 'Centro';

    setCity(newCity);
    setNeighborhood(defaultNeighborhood);
  };

  const scrollMunicipalities = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -180 : 180;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'Por favor ingresa tu nombre completo.';
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Ingresa tu número de WhatsApp válido (10 dígitos).';
    }

    if (city === 'Otro' && !customCity.trim()) {
      newErrors.customCity = 'Escribe tu municipio de residencia.';
    }

    if (!acceptsRules) {
      newErrors.acceptsRules = 'Debes certificar ser mayor de 18 años y aceptar las reglas.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const selectedNeighborhood = neighborhood.includes('Otro')
        ? customNeighborhood.trim() || 'Barrio'
        : neighborhood;

      const effectiveCity =
        city === 'Otro'
          ? customCity.trim() || 'La Guajira'
          : city;

      const card = generateRandomBingoCard(
        fullName.trim(),
        `${effectiveCity} (${selectedNeighborhood})`
      );

      const record: RegistrationRecord = {
        id: `reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        fullName: fullName.trim(),
        phone: phone.trim(),
        city: effectiveCity,
        neighborhood: selectedNeighborhood,
        serialNumber: card.serialNumber,
        cardMatrix: card.matrix,
        createdAt: new Date().toISOString(),
        joinedWhatsApp: false,
        status: 'activo',
        invitedBy: inviterName || 'Familiar',
      };

      // Save to Supabase and Local Storage
      await saveRegistration(record);

      // Clean URL params so it doesn't prompt again
      if (typeof window !== 'undefined' && window.history?.replaceState) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      onRedeemSuccess(record);
      onClose();
    } catch (err) {
      console.error('Error redimiendo invitación:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full my-auto shadow-2xl border-2 border-[#E8D5B5] overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#FAF6EF] via-[#F4ECE0] to-[#FAF6EF] border-b border-[#E8D5B5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#C45A3C] text-white flex items-center justify-center shadow-xs">
              <Gift className="w-4 h-4" />
            </span>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#4A6C6F]">
                Invitación Recibida · Bingos Comunitarios
              </div>
              <h3 className="text-base sm:text-lg font-black text-stone-900 font-heading">
                Redime Tu Cartón Gratuito
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/50 transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-stone-800">
          
          {/* Welcome Banner from Inviter */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAF6EF] to-[#F4ECE0] border border-[#E8D5B5] space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#C45A3C] text-white flex items-center justify-center text-xs font-bold">
                <Users className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold text-stone-900 font-heading">
                {inviterName} te apartó un cupo gratis
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Estás a un paso de recibir tu cartón digital con serial único para los <strong>bingos comunitarios</strong> de Maicao. Es 100% gratuito (sin compras ni apuestas). Confirmas tus datos y te unes al grupo oficial de WhatsApp para jugar en vivo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Tu Nombre Completo <span className="text-[#C45A3C]">*</span>
              </label>
              <input
                type="text"
                placeholder="Nombre y apellido"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-stone-800 bg-[#FAF6EF]/50 focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.fullName ? 'border-red-400 focus:ring-red-400' : 'border-[#E8D5B5] focus:ring-[#00C2D1]'
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Tu Número de WhatsApp <span className="text-[#C45A3C]">*</span>
              </label>
              <div className="relative flex rounded-xl border border-[#E8D5B5] bg-[#FAF6EF]/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00C2D1] overflow-hidden">
                <div className="flex items-center gap-1 px-3 bg-[#E8D5B5]/40 text-stone-700 text-xs font-bold border-r border-[#E8D5B5]">
                  <span>🇨🇴 +57</span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="300 123 4567"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setPhone(val);
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-stone-800 bg-transparent focus:outline-none font-mono"
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Swipeable Municipalities */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Municipio de Residencia <span className="text-[#C45A3C]">*</span>
                </label>
                <div className="flex items-center gap-1 text-[10px] text-stone-500">
                  <button
                    type="button"
                    onClick={() => scrollMunicipalities('left')}
                    className="p-1 hover:bg-stone-100 rounded"
                  >
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollMunicipalities('right')}
                    className="p-1 hover:bg-stone-100 rounded"
                  >
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div
                ref={scrollContainerRef}
                className="flex items-center gap-1.5 overflow-x-auto py-1 scroll-smooth touch-pan-x select-none"
              >
                {MUNICIPIOS_GUAJIRA.map((mun) => {
                  const isSelected = city === mun;
                  return (
                    <button
                      key={mun}
                      type="button"
                      onClick={() => handleCityChange(mun)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-bold border whitespace-nowrap shrink-0 transition-all ${
                        isSelected
                          ? 'bg-[#C45A3C] text-white border-[#C45A3C]'
                          : 'bg-white text-stone-700 border-[#E8D5B5] hover:bg-[#FAF6EF]'
                      }`}
                    >
                      {mun}
                    </button>
                  );
                })}
              </div>

              {city === 'Otro' && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Escribe tu municipio"
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E8D5B5] text-xs bg-white"
                  />
                </div>
              )}
            </div>

            {/* Neighborhood */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Barrio o Sector <span className="text-[#C45A3C]">*</span>
              </label>
              <select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E8D5B5] text-xs sm:text-sm text-stone-800 bg-[#FAF6EF]/50 focus:bg-white"
              >
                {getNeighborhoodList().map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer text-xs text-stone-700 select-none">
                <input
                  type="checkbox"
                  checked={acceptsRules}
                  onChange={(e) => setAcceptsRules(e.target.checked)}
                  className="mt-0.5 rounded text-[#00C2D1] focus:ring-[#00C2D1]"
                />
                <span>
                  Certifico que <strong>soy mayor de 18 años</strong> y acepto las{' '}
                  <button
                    type="button"
                    onClick={onOpenRulesModal}
                    className="text-[#C45A3C] font-semibold underline"
                  >
                    reglas oficiales
                  </button>{' '}
                  de los bingos comunitarios.
                </span>
              </label>
              {errors.acceptsRules && (
                <p className="text-xs text-red-600 mt-1">{errors.acceptsRules}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-5 text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-[#00C2D1] via-[#00A9B7] to-[#4A6C6F] hover:from-[#00A9B7] hover:to-[#354F52] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 focus:outline-none focus:ring-4 focus:ring-[#00C2D1]/30"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>
                  {isSubmitting ? 'Generando tu cartón...' : 'Confirmar Mi Cartón y Entrar al Torneo'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="mt-2 text-center text-[10px] text-stone-500">
                Torneo de bingos comunitarios 100% gratuito · Sin compras ni apuestas · 18+
              </p>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
