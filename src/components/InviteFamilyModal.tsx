import React, { useState } from 'react';
import {
  Users,
  X,
  Share2,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
} from 'lucide-react';

interface InviteFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviterName?: string;
}

export const InviteFamilyModal: React.FC<InviteFamilyModalProps> = ({
  isOpen,
  onClose,
  inviterName = 'Un participante de los Bingos Comunitarios',
}) => {
  const [relativeName, setRelativeName] = useState('');
  const [relativePhone, setRelativePhone] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSendInvite = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!relativeName.trim()) {
      setError('Por favor ingresa el nombre de la persona o familiar a inscribir.');
      return;
    }

    setError('');
    const cleanName = relativeName.trim();
    const cleanPhone = relativePhone.replace(/\D/g, '');

    // Current page origin and path for redemption
    const baseUrl = window.location.origin + window.location.pathname;
    const inviteCode = `INV-${Date.now().toString(36).toUpperCase()}`;

    // Target redemption URL with query parameters
    const redemptionUrl = `${baseUrl}?invitado=true&invitado_por=${encodeURIComponent(
      inviterName || 'Familiar'
    )}&nombre_invitado=${encodeURIComponent(cleanName)}&codigo=${inviteCode}`;

    // Engaging, compliant WhatsApp message
    const message = `¡Hola ${cleanName}! Te inscribí para recibir un cartón gratis en el Torneo de Bingos Comunitarios de Maicao. 🎁🎟️

Es 100% GRATIS (sin compra necesaria, sin apuestas). Jugamos por puntos acumulables hasta 500 para ganar bonos de mercado de $400.000 y canastas familiares.

Toca este enlace para redimir tu cartón gratuito, confirmar tu inscripción y unirte al grupo oficial de WhatsApp:
${redemptionUrl}

¡Solo para mayores de 18 años!`;

    // If specific phone was typed, open with phone; otherwise open contact picker in WhatsApp
    let whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    if (cleanPhone.length >= 10) {
      whatsappUrl = `https://api.whatsapp.com/send?phone=57${cleanPhone}&text=${encodeURIComponent(message)}`;
    }

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsSent(true);

    setTimeout(() => {
      // Keep state clean for next invite
      setRelativeName('');
      setRelativePhone('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full my-auto shadow-2xl border-2 border-[#E8D5B5] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#FAF6EF] via-[#F4ECE0] to-[#FAF6EF] border-b border-[#E8D5B5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#00C2D1] text-white flex items-center justify-center shadow-xs font-black">
              <UserPlus className="w-4 h-4" />
            </span>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#C45A3C]">
                Bingos Comunitarios · Maicao
              </div>
              <h3 className="text-base sm:text-lg font-black text-stone-900 font-heading">
                Inscribir otro familiar
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

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-5 text-stone-800">
          
          {/* Explanation Box */}
          <div className="p-4 rounded-2xl bg-[#FAF6EF] border border-[#E8D5B5] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#4A6C6F]">
              <Users className="w-4 h-4 text-[#C45A3C]" />
              <span>Inscripción rápida por WhatsApp</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Escribe el nombre de tu familiar o amigo. Al presionar <strong>Inscribir a otro</strong>, se abrirá tu aplicación de WhatsApp para que busques su contacto y le envíes su cartón digital gratis.
            </p>
          </div>

          <form onSubmit={handleSendInvite} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Nombre del familiar o amigo (Mayor de 18 años) <span className="text-[#C45A3C]">*</span>
              </label>
              <input
                type="text"
                placeholder="Ej. Carlos Mendoza, Tía Carmen, etc."
                value={relativeName}
                onChange={(e) => {
                  setRelativeName(e.target.value);
                  if (error) setError('');
                }}
                className="w-full px-4 py-3 rounded-xl border border-[#E8D5B5] text-sm text-stone-800 bg-[#FAF6EF]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C2D1]"
                autoFocus
              />
              {error && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {error}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Número de WhatsApp (Opcional)
                </label>
                <span className="text-[10px] text-stone-400">Si lo dejas vacío, lo buscas en tu lista</span>
              </div>
              <div className="relative flex rounded-xl border border-[#E8D5B5] bg-[#FAF6EF]/40 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00C2D1] overflow-hidden">
                <div className="flex items-center gap-1 px-3 bg-[#E8D5B5]/40 text-stone-700 text-xs font-bold border-r border-[#E8D5B5]">
                  <span>🇨🇴 +57</span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="300 000 0000 (Opcional)"
                  value={relativePhone}
                  onChange={(e) => setRelativePhone(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs text-stone-800 bg-transparent focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Instruction Callout with Required Labels */}
            <div className="pt-2 text-center space-y-2">
              {/* CLEAR PROMINENT TEXT ABOVE BUTTON */}
              <div className="text-sm sm:text-base font-black text-stone-900 font-heading">
                Inscribir otro familiar mayor de 18 años
              </div>
              <p className="text-[11px] text-stone-500">
                Se abrirá WhatsApp para que elijas el contacto y le llegue la invitación para redimir su cartón.
              </p>

              {/* DYNAMIC AND EYE-CATCHING BUTTON */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base text-white bg-gradient-to-r from-[#00C2D1] via-[#00A9B7] to-[#4A6C6F] hover:from-[#00A9B7] hover:to-[#354F52] hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg group focus:outline-none focus:ring-4 focus:ring-[#00C2D1]/40"
              >
                <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="tracking-wide">Inscribir a otro</span>
                <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
              </button>
            </div>
          </form>

          {isSent && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>¡WhatsApp abierto!</strong> Envía el mensaje con el enlace. Tu invitado podrá redimir su cartón gratis al tocar el enlace.
              </span>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E8D5B5] bg-[#FAF6EF] flex items-center justify-between">
          <span className="text-[10px] text-stone-500">
            Torneo de bingos comunitarios · 100% gratis · 18+
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
