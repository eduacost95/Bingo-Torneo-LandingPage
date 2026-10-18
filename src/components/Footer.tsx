import React from 'react';

interface FooterProps {
  onOpenRulesModal: () => void;
  onOpenPrivacyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRulesModal,
  onOpenPrivacyModal,
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-10 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center sm:text-left">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-800 pb-6">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#C45A3C] text-white flex items-center justify-center text-xs font-black">
              B
            </span>
            <span className="font-heading font-black text-white text-base">
              Bingo Torneo Free
            </span>
            <span className="text-xs text-stone-400">· Maicao, La Guajira</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-stone-400">
            <button
              onClick={onOpenRulesModal}
              className="hover:text-white underline transition-colors cursor-pointer"
            >
              Reglas Oficiales
            </button>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <button
              onClick={onOpenPrivacyModal}
              className="hover:text-white underline transition-colors cursor-pointer"
            >
              Política de Datos (Ley 1581)
            </button>
          </div>
        </div>

        {/* Short Legal Fixed Text requested verbatim */}
        <p className="text-xs text-stone-400 leading-relaxed text-center">
          © Bingo Torneo Free Maicao. Torneo gratuito sin compra necesaria. 18+. Entretenimiento familiar. Premios en especie, no efectivo. No afiliado a Facebook.{' '}
          <button
            onClick={onOpenRulesModal}
            className="text-stone-300 hover:text-white underline inline-block"
          >
            [Reglas Oficiales]
          </button>{' '}
          <button
            onClick={onOpenPrivacyModal}
            className="text-stone-300 hover:text-white underline inline-block"
          >
            [Política de Datos]
          </button>
        </p>

        {/* Additional compliance note */}
        <p className="text-[11px] text-stone-500 text-center max-w-3xl mx-auto leading-normal">
          Actividad libre de apuestas conforme al marco regulatorio colombiano de promociones y entretenimiento social. La asignación de cartones no requiere pago alguno. Prohibida la participación de menores de edad.
        </p>

      </div>
    </footer>
  );
};
