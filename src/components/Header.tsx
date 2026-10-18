import React, { useState } from 'react';
import { Menu, X, Gift, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onRegisterClick: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRegisterClick, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EF]/95 backdrop-blur-md border-b border-[#E8D5B5]/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand title with Comunitario subtitle */}
          <a
            href="#"
            className="hover:opacity-90 transition-opacity flex items-center gap-2.5 whitespace-nowrap shrink-0"
          >
            <span className="w-9 h-9 rounded-xl bg-[#C45A3C] text-white flex items-center justify-center text-base font-black shadow-xs font-heading">
              B
            </span>
            <div className="flex flex-col text-left leading-none">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#C45A3C] font-heading">
                Bingo Torneo
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#4A6C6F] mt-0.5">
                Comunitario
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
            <a
              href="#como-funciona"
              className="hover:text-[#C45A3C] transition-colors whitespace-nowrap shrink-0"
            >
              Cómo Funciona
            </a>
            <a
              href="#sistema-puntos"
              className="hover:text-[#C45A3C] transition-colors whitespace-nowrap shrink-0"
            >
              Sistema 500 Puntos
            </a>
            <a
              href="#premios"
              className="hover:text-[#C45A3C] transition-colors whitespace-nowrap shrink-0"
            >
              Premios en Especie
            </a>
            <a
              href="#reglas"
              className="hover:text-[#C45A3C] transition-colors whitespace-nowrap shrink-0"
            >
              Reglas Oficiales
            </a>
            <a
              href="#faq"
              className="hover:text-[#C45A3C] transition-colors whitespace-nowrap shrink-0"
            >
              Preguntas
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="p-2 text-stone-500 hover:text-stone-900 hover:bg-[#E8D5B5]/30 rounded-xl transition-colors cursor-pointer"
                title="Panel Administrativo y de Configuración"
                aria-label="Panel Administrativo"
              >
                <ShieldCheck className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={onRegisterClick}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-white bg-[#00C2D1] hover:bg-[#00A9B7] active:scale-[0.98] rounded-xl transition-all shadow-sm whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C2D1]"
            >
              <Gift className="w-4 h-4 mr-1.5" />
              Quiero mi cartón gratis
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-200/50 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8D5B5]/60 bg-[#FAF6EF] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium text-stone-800">
            <a
              href="#como-funciona"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#E8D5B5]/40 transition-colors"
            >
              Cómo Funciona el Torneo
            </a>
            <a
              href="#sistema-puntos"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#E8D5B5]/40 transition-colors"
            >
              Sistema de 500 Puntos
            </a>
            <a
              href="#premios"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#E8D5B5]/40 transition-colors"
            >
              Premios de Mercado
            </a>
            <a
              href="#reglas"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#E8D5B5]/40 transition-colors"
            >
              Reglas Oficiales
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#E8D5B5]/40 transition-colors"
            >
              Preguntas Frecuentes
            </a>
          </nav>
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRegisterClick();
              }}
              className="w-full py-3 px-4 text-center text-sm font-bold text-white bg-[#00C2D1] hover:bg-[#00A9B7] rounded-xl shadow-sm flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4" />
              Quiero mi cartón gratis
            </button>

            {onOpenAdmin && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2 px-3 text-center text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 rounded-lg flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Panel Administrativo
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
