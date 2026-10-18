import React, { useState } from 'react';
import { BingoCardData } from '../types';
import { Download, Share2, Check, Sparkles, X, ShieldCheck } from 'lucide-react';

interface BingoCardViewProps {
  card: BingoCardData;
  onClose?: () => void;
}

export const BingoCardView: React.FC<BingoCardViewProps> = ({ card, onClose }) => {
  const [markedCells, setMarkedCells] = useState<Record<string, boolean>>({
    '2-2': true, // Center is free space
  });
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleMark = (row: number, col: number) => {
    if (row === 2 && col === 2) return; // Free center
    const key = `${row}-${col}`;
    setMarkedCells((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `¡Ya tengo mi cartón oficial para el Torneo de Bingo Gratis en Maicao! Mi código es ${card.serialNumber}. ¡Inscríbete gratis tú también y gana bonos de mercado!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopySerial = () => {
    navigator.clipboard?.writeText?.(card.serialNumber);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const letters = ['B', 'I', 'N', 'G', 'O'];

  return (
    <div className="bg-[#FAF6EF] border-2 border-[#E8D5B5] rounded-3xl p-5 sm:p-7 shadow-xl max-w-md mx-auto text-stone-900 relative">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/50 transition-colors"
          aria-label="Cerrar vista de cartón"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Card Header & Serial Lockup */}
      <div className="text-center pb-4 border-b border-[#E8D5B5]">
        <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#C45A3C] font-mono">
          <ShieldCheck className="w-4 h-4 text-[#4A6C6F]" />
          <span>Cartón Oficial Digital</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-stone-900 font-heading mt-0.5">
          Bingo Torneo Free
        </h3>
        <p className="text-xs text-stone-600">
          Maicao · Torneo Gratuito por Puntos
        </p>

        {/* Player & Serial Meta */}
        <div className="mt-3 bg-white py-2 px-3 rounded-xl border border-[#E8D5B5] flex items-center justify-between text-xs">
          <div className="text-left">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Jugador</span>
            <strong className="text-stone-800 font-bold truncate max-w-[130px] sm:max-w-[170px] inline-block">
              {card.playerName}
            </strong>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Serial Único</span>
            <strong className="text-[#C45A3C] font-mono font-bold tracking-tight">
              {card.serialNumber}
            </strong>
          </div>
        </div>
      </div>

      {/* 5x5 Bingo Matrix */}
      <div className="my-5">
        {/* Letter Headers */}
        <div className="grid grid-cols-5 gap-1.5 mb-1.5 text-center">
          {letters.map((letter, i) => (
            <div
              key={letter}
              className={`py-2 rounded-lg font-black font-heading text-sm sm:text-base text-white shadow-2xs ${
                i === 0
                  ? 'bg-[#C45A3C]'
                  : i === 1
                  ? 'bg-[#4A6C6F]'
                  : i === 2
                  ? 'bg-[#00C2D1]'
                  : i === 3
                  ? 'bg-[#C45A3C]'
                  : 'bg-[#4A6C6F]'
              }`}
            >
              {letter}
            </div>
          ))}
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-5 gap-1.5">
          {card.matrix.map((row, rIdx) =>
            row.map((cellValue, cIdx) => {
              const isCenter = rIdx === 2 && cIdx === 2;
              const isMarked = markedCells[`${rIdx}-${cIdx}`];

              return (
                <button
                  key={`${rIdx}-${cIdx}`}
                  type="button"
                  onClick={() => toggleMark(rIdx, cIdx)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center font-mono font-black text-sm sm:text-base border transition-all cursor-pointer select-none relative ${
                    isMarked
                      ? 'bg-[#C45A3C] text-white border-[#A7452A] shadow-xs scale-[0.98]'
                      : 'bg-white hover:bg-[#FAF6EF] text-stone-800 border-[#E8D5B5]'
                  }`}
                  title={isCenter ? 'Casilla Libre' : `Marcar ${cellValue}`}
                >
                  {isCenter ? (
                    <div className="flex flex-col items-center">
                      <Sparkles className={`w-4 h-4 ${isMarked ? 'text-white' : 'text-[#00C2D1]'}`} />
                      <span className="text-[9px] uppercase font-bold tracking-tighter">Libre</span>
                    </div>
                  ) : (
                    <span>{cellValue}</span>
                  )}
                  {isMarked && !isCenter && (
                    <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-white/80" />
                  )}
                </button>
              );
            })
          )}
        </div>

        <p className="text-[11px] text-center text-stone-500 mt-2">
          Toca cualquier casilla para marcar tus números durante la transmisión en vivo.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-[#E8D5B5] space-y-2.5">
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="w-full py-2.5 px-4 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20BE5A] rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Guardar / Recibir por WhatsApp
        </button>

        <button
          type="button"
          onClick={handleCopySerial}
          className="w-full py-2 px-3 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-[#E8D5B5] rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5" />}
          <span>{copiedLink ? '¡Serial copiado al portapapeles!' : 'Copiar código de cartón'}</span>
        </button>
      </div>

      <div className="mt-4 text-center text-[10px] text-stone-400">
        Cartón digital intransferible · Válido para el torneo actual en Maicao · 18+
      </div>
    </div>
  );
};
