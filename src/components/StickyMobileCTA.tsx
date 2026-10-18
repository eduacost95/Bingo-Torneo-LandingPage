import React, { useEffect, useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';

interface StickyMobileCTAProps {
  onRegisterClick: () => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onRegisterClick }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling 300px and hide if user is at the bottom registration form
      const scrollY = window.scrollY;
      const formElement = document.getElementById('inscripcion');
      if (!formElement) {
        setVisible(scrollY > 280);
        return;
      }

      const formRect = formElement.getBoundingClientRect();
      const isViewingForm = formRect.top < window.innerHeight && formRect.bottom > 0;

      if (scrollY > 280 && !isViewingForm) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6EF]/95 backdrop-blur-md border-t border-[#E8D5B5] shadow-lg px-3 py-2 animate-in slide-in-from-bottom-3 duration-200">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto h-11">
        <div className="text-left leading-tight shrink-0">
          <span className="text-[10px] font-bold text-[#C45A3C] uppercase tracking-wider block">
            100% Gratis · 18+
          </span>
          <span className="text-xs font-bold text-stone-900 truncate">
            Bingos Comunitarios
          </span>
        </div>

        <button
          type="button"
          onClick={onRegisterClick}
          className="flex-1 py-2 px-3 text-xs sm:text-sm font-extrabold text-white bg-[#00C2D1] hover:bg-[#00A9B7] active:scale-[0.98] rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 focus:outline-none"
        >
          <Gift className="w-4 h-4 shrink-0" />
          <span className="truncate">Quiero mi cartón gratis</span>
        </button>
      </div>
    </div>
  );
};
