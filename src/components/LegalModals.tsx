import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { OFFICIAL_RULES_SECTIONS } from '../data/mockData';

interface LegalModalsProps {
  rulesOpen: boolean;
  privacyOpen: boolean;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({
  rulesOpen,
  privacyOpen,
  onClose,
}) => {
  if (!rulesOpen && !privacyOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#E8D5B5] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8D5B5] flex items-center justify-between bg-[#FAF6EF]">
          <div className="flex items-center gap-2.5">
            {rulesOpen ? (
              <FileText className="w-5 h-5 text-[#C45A3C]" />
            ) : (
              <Shield className="w-5 h-5 text-[#4A6C6F]" />
            )}
            <h3 className="text-lg sm:text-xl font-black text-stone-900 font-heading">
              {rulesOpen
                ? 'Reglas Oficiales del Torneo - Bingo Torneo Free'
                : 'Política de Tratamiento de Datos Personales (Ley 1581)'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-200/50 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          {rulesOpen && (
            <div className="space-y-5">
              <div className="p-3 bg-[#FAF6EF] rounded-xl border border-[#E8D5B5] text-xs font-medium text-stone-700">
                Torneo de entretenimiento familiar sin compra, sin apuesta, sin depósito. Premios en especie y bonos de mercado. Exclusivo para mayores de 18 años residentes en Maicao, Riohacha y Uribia, La Guajira, Colombia.
              </div>

              {OFFICIAL_RULES_SECTIONS.map((sec) => (
                <div key={sec.id} className="space-y-1.5">
                  <h4 className="font-bold text-stone-900 text-sm font-heading">{sec.title}</h4>
                  <p className="whitespace-pre-line text-stone-600">{sec.content}</p>
                </div>
              ))}
            </div>
          )}

          {privacyOpen && (
            <div className="space-y-4">
              <h4 className="font-bold text-stone-900 text-sm font-heading">
                Aviso de Privacidad y Autorización de Tratamiento de Datos Personales
              </h4>
              <p>
                De conformidad con lo dispuesto en la <strong>Ley Estatutaria 1581 de 2012</strong>, su Decreto Reglamentario 1377 de 2013 y demás normas complementarias de la República de Colombia, [Bingo Torneo Free - Maicao Entretenimiento Familiar], como Responsable del Tratamiento de datos personales, informa a los participantes:
              </p>
              
              <div className="space-y-2">
                <h5 className="font-bold text-stone-800 text-xs">1. Finalidad de la recolección:</h5>
                <p className="text-stone-600">
                  Los datos solicitados (nombre completo, número telefónico celular de WhatsApp y barrio/municipio de residencia) tienen como finalidad exclusiva:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-stone-600">
                  <li>Asignar un cartón digital numerado único e intransferible por persona.</li>
                  <li>Enviar los enlaces directos a las transmisiones en vivo del torneo y recordatorios del horario de juego.</li>
                  <li>Validar la identidad del participante en caso de resultar ganador de los bonos de mercado o canasta familiar.</li>
                  <li>Coordinar la entrega presencial de premios en el municipio de Maicao.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-stone-800 text-xs">2. Derechos del Titular:</h5>
                <p className="text-stone-600">
                  Como titular de sus datos personales, usted tiene derecho a conocer, actualizar, rectificar y solicitar la supresión de sus datos de nuestras listas en cualquier momento comunicándose a través de nuestra línea de WhatsApp oficial.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-stone-800 text-xs">3. Seguridad y No Cesión:</h5>
                <p className="text-stone-600">
                  Bingo Torneo Free se compromete a no vender, ceder ni compartir sus datos con terceras empresas para fines comerciales o publicitarios ajenos a la actividad. No se solicita ningún dato bancario ni financiero.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E8D5B5] bg-[#FAF6EF] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#4A6C6F] hover:bg-[#354F52] rounded-xl transition-colors"
          >
            Entendido y Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
