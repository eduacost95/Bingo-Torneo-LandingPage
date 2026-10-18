import React, { useState } from 'react';
import { RegistrationRecord } from '../types';
import {
  CheckCircle2,
  AlertTriangle,
  X,
  ExternalLink,
  Check,
} from 'lucide-react';

interface RegistrationConfirmationModalProps {
  record: RegistrationRecord | null;
  whatsappGroupLink: string;
  onClose: () => void;
  onJoinedWhatsApp: (recordId: string) => void;
  onInviteAnother?: () => void;
}

export const RegistrationConfirmationModal: React.FC<RegistrationConfirmationModalProps> = ({
  record,
  whatsappGroupLink,
  onClose,
  onJoinedWhatsApp,
  onInviteAnother,
}) => {
  const [hasClickedJoin, setHasClickedJoin] = useState(false);

  if (!record) return null;

  const handleJoinGroup = () => {
    setHasClickedJoin(true);
    onJoinedWhatsApp(record.id);
    window.open(whatsappGroupLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full my-auto shadow-2xl border-2 border-[#E8D5B5] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#FAF6EF] via-[#F4ECE0] to-[#FAF6EF] border-b border-[#E8D5B5] flex items-center justify-between relative">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-black text-stone-900 font-heading">
                ¡Pre-Inscripción Exitosa!
              </h3>
              <p className="text-xs text-stone-600">
                Cartón reservado para: <strong className="text-stone-900">{record.fullName}</strong>
              </p>
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

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-stone-800">
          
          {/* MANDATORY WHATSAPP GROUP NOTICE */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-3 shadow-xs">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-900 font-heading">
                  Paso Obligatorio Para Entrar al Torneo
                </h4>
                <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
                  Para que tu cartón quede <strong>oficialmente habilitado</strong> y puedas jugar por los premios en bonos de mercado, 
                  <strong> es indispensable unirte ahora al Grupo Oficial de WhatsApp</strong> de Bingo Torneo Comunitario.
                </p>
              </div>
            </div>

            <ul className="text-xs text-amber-900/90 list-disc pl-9 space-y-1">
              <li>Allí enviaremos los enlaces directos de la transmisión en vivo de los bingos comunitarios.</li>
              <li>Podrás cantar tus figuras (Líneas, 4 esquinas, Cartón lleno) en vivo.</li>
              <li>Confirmación de puntos acumulados rumbo a la meta de 500 puntos.</li>
            </ul>

            {/* Big Join WhatsApp Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleJoinGroup}
                className="w-full py-3.5 px-4 text-sm sm:text-base font-extrabold text-white bg-[#25D366] hover:bg-[#20BE5A] active:scale-[0.99] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-200"
              >
                <span>🟢 Unirme al Grupo Oficial de WhatsApp Ahora</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {hasClickedJoin && (
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-800 pt-1">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>¡Excelente! Ya registramos tu intención de unirte al grupo.</span>
              </div>
            )}
          </div>

          {/* Assigned Card Snapshot */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-500 border-b border-stone-200 pb-1.5">
              <span className="flex items-center gap-1.5">
                <span>Tu Cartón Digital Asignado</span>
                <span className="text-[#C45A3C] font-black font-mono">(DEMO)</span>
              </span>
              <span className="text-[#C45A3C] font-mono font-black">{record.serialNumber}</span>
            </div>

            <div className="bg-[#FAF6EF] p-4 rounded-2xl border border-[#E8D5B5] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-500 block text-[10px]">Municipio / Sector</span>
                  <strong className="text-stone-800 font-bold">{record.city} · {record.neighborhood}</strong>
                </div>
                <div className="text-right">
                  <span className="text-stone-500 block text-[10px]">Fecha de Registro</span>
                  <strong className="text-stone-800">{new Date(record.createdAt).toLocaleDateString('es-CO')}</strong>
                </div>
              </div>

              {/* Mini card visual preview */}
              <div className="grid grid-cols-5 gap-1 text-center font-mono text-xs">
                {['B', 'I', 'N', 'G', 'O'].map((letra) => (
                  <div key={letra} className="bg-[#C45A3C] text-white font-bold py-1 rounded">
                    {letra}
                  </div>
                ))}
                {record.cardMatrix.slice(0, 3).map((row, rIdx) =>
                  row.map((val, cIdx) => (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className="bg-white border border-[#E8D5B5] py-1 rounded text-stone-700 font-semibold"
                    >
                      {rIdx === 2 && cIdx === 2 ? '★' : val}
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-stone-500">
                <span className="font-medium text-stone-600">Cartón de muestra · Asignado oficialmente</span>
                <span className="text-stone-400">1 cartón por persona</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC AND EYE-CATCHING "INSCRIBIR A OTRO" CALLOUT IN CONFIRMATION MODAL */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#FAF6EF] to-white border-2 border-[#E8D5B5] shadow-sm text-center space-y-2.5">
            <div className="text-xs sm:text-sm font-black text-stone-900 font-heading">
              Inscribir otro familiar mayor de 18 años
            </div>
            <p className="text-xs text-stone-600 leading-snug">
              ¿Quieres que alguien más en tu casa participe gratis? Toca el botón para abrir WhatsApp y enviarle su cartón y su enlace de inscripción.
            </p>
            <button
              type="button"
              onClick={onInviteAnother}
              className="w-full py-3 px-5 rounded-xl font-black text-xs sm:text-sm text-white bg-gradient-to-r from-[#00C2D1] via-[#00A9B7] to-[#4A6C6F] hover:from-[#00A9B7] hover:to-[#354F52] hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group focus:outline-none focus:ring-4 focus:ring-[#00C2D1]/30"
            >
              <span>Inscribir a otro</span>
              <span className="text-amber-200">✨</span>
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E8D5B5] bg-[#FAF6EF] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-stone-500 text-center sm:text-left">
            Torneo de bingos comunitarios 100% gratuito sin compra necesaria · Solo mayores de 18 años
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 text-xs font-bold text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl transition-colors cursor-pointer"
          >
            Listo, ya me uní al grupo
          </button>
        </div>

      </div>
    </div>
  );
};
