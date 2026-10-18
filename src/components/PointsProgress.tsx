import React, { useState } from 'react';
import { POINT_RULES } from '../data/mockData';
import { Trophy, Award, Flame, RotateCcw, Plus, Info } from 'lucide-react';

export const PointsProgress: React.FC = () => {
  const [simulatedPoints, setSimulatedPoints] = useState<number>(175);
  const targetPoints = 500;
  const progressPercent = Math.min(100, Math.round((simulatedPoints / targetPoints) * 100));

  const addFigurePoints = (pts: number) => {
    setSimulatedPoints((prev) => Math.min(targetPoints, prev + pts));
  };

  const resetSimulation = () => {
    setSimulatedPoints(50);
  };

  return (
    <section id="sistema-puntos" className="py-16 sm:py-20 bg-[#FAF6EF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C45A3C] mb-2">
            Bingos Comunitarios · Puntuación Oficial
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight font-heading">
            Sistema de 500 Puntos del Torneo Comunitario
          </h2>
          <p className="mt-3 text-stone-700 text-sm sm:text-base leading-relaxed">
            El primer jugador en alcanzar <strong>500 puntos</strong> en nuestros <strong>bingos comunitarios</strong> se lleva el 1er puesto. 
            El segundo en llegar se lleva el 2do puesto y el tercero el 3er puesto. 
            Los puntos se acumulan durante todo el torneo en cada transmisión en vivo.
          </p>
        </div>

        {/* 3 Main Figures Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {POINT_RULES.map((rule) => (
            <div
              key={rule.id}
              className="bg-white rounded-2xl p-6 border-2 border-[#E8D5B5] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4A6C6F]">
                    Figura Ganadora
                  </span>
                  <span className="text-2xl font-black text-[#C45A3C] font-mono tabular-nums">
                    +{rule.points} pts
                  </span>
                </div>

                <h3 className="text-xl font-black text-stone-900 mb-2 font-heading">
                  {rule.name}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 mb-5 leading-relaxed">
                  {rule.description}
                </p>
              </div>

              {/* 5x5 Mini Visual Pattern Representation */}
              <div className="bg-[#FAF6EF] p-3 rounded-xl border border-[#E8D5B5]/60 flex items-center justify-center">
                <div className="grid grid-cols-5 gap-1 w-28 h-28">
                  {rule.previewGrid.map((row, rIdx) =>
                    row.map((active, cIdx) => {
                      const isCenter = rIdx === 2 && cIdx === 2;
                      return (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          className={`rounded-sm flex items-center justify-center text-[9px] font-bold transition-all ${
                            active
                              ? 'bg-[#C45A3C] text-white shadow-2xs'
                              : isCenter
                              ? 'bg-[#00C2D1]/30 text-stone-700'
                              : 'bg-white border border-[#E8D5B5]/60 text-transparent'
                          }`}
                        >
                          {isCenter ? '★' : ''}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Quick Add Button to interactive simulation */}
              <button
                type="button"
                onClick={() => addFigurePoints(rule.points)}
                className="mt-4 w-full py-2 px-3 text-xs font-bold text-[#4A6C6F] bg-[#4A6C6F]/10 hover:bg-[#4A6C6F]/20 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Probar en simulador (+{rule.points})
              </button>
            </div>
          ))}
        </div>

        {/* Visual Progress Bar Section & Interactive Simulator */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E8D5B5] shadow-sm max-w-4xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#C45A3C]" />
                <h4 className="text-lg sm:text-xl font-black text-stone-900 font-heading">
                  Simulador de Puntuación al Torneo
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Haz clic en las figuras para ver cómo se acumulan los puntos hacia la meta de 500.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-500 font-medium">
                Puntos actuales:{' '}
                <strong className="text-stone-900 font-mono text-base font-bold tabular-nums">
                  {simulatedPoints}
                </strong>
                /500
              </span>
              <button
                type="button"
                onClick={resetSimulation}
                className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors"
                title="Reiniciar simulador"
                aria-label="Reiniciar simulador"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar Visual Representation */}
          <div className="relative pt-6 pb-4">
            
            {/* Milestones Labels */}
            <div className="absolute top-0 w-full flex justify-between text-[11px] font-bold text-stone-500 font-mono">
              <span>0 pts</span>
              <span className="hidden sm:inline">150 pts</span>
              <span className="text-[#4A6C6F]">300 pts</span>
              <span className="text-[#C45A3C]">400 pts (Podio)</span>
              <span className="text-[#C45A3C] font-black">500 pts ★ META</span>
            </div>

            {/* Track Bar */}
            <div className="w-full h-5 sm:h-6 bg-stone-100 rounded-full overflow-hidden p-1 border border-stone-200 relative">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#4A6C6F] via-[#00C2D1] to-[#C45A3C] transition-all duration-500 ease-out flex items-center justify-end pr-2"
                style={{ width: `${Math.max(5, progressPercent)}%` }}
              >
                <span className="text-[10px] sm:text-xs font-black text-white font-mono tabular-nums leading-none drop-shadow-xs">
                  {progressPercent}%
                </span>
              </div>
            </div>

            {/* Threshold Indicators */}
            <div className="mt-3 flex items-center justify-between text-xs text-stone-600">
              <span className="font-semibold text-stone-800">
                {simulatedPoints >= 500 ? (
                  <span className="text-[#C45A3C] font-black flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-[#C45A3C]" />
                    ¡Meta de 500 Puntos Alcanzada! 1er Puesto
                  </span>
                ) : simulatedPoints >= 350 ? (
                  <span className="text-[#4A6C6F] font-bold flex items-center gap-1">
                    <Award className="w-4 h-4 text-[#4A6C6F]" />
                    ¡Cerca del podio! Faltan {500 - simulatedPoints} pts
                  </span>
                ) : (
                  <span>
                    Faltan <strong>{500 - simulatedPoints} puntos</strong> para la meta
                  </span>
                )}
              </span>

              <span className="text-stone-500 text-[11px]">
                {simulatedPoints >= 500 ? 'Ganador confirmado' : 'Puntos acumulables entre rondas'}
              </span>
            </div>
          </div>

          {/* Quick interactive buttons inside simulator */}
          <div className="mt-5 pt-4 border-t border-stone-200 flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-semibold text-stone-700 mr-2">Simular jugada:</span>
            <button
              onClick={() => addFigurePoints(50)}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#FAF6EF] text-stone-800 border border-[#E8D5B5] hover:bg-[#E8D5B5] transition-colors"
            >
              + Línea (50)
            </button>
            <button
              onClick={() => addFigurePoints(75)}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#FAF6EF] text-stone-800 border border-[#E8D5B5] hover:bg-[#E8D5B5] transition-colors"
            >
              + 4 Esquinas (75)
            </button>
            <button
              onClick={() => addFigurePoints(100)}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#FAF6EF] text-stone-800 border border-[#E8D5B5] hover:bg-[#E8D5B5] transition-colors"
            >
              + Cartón Lleno (100)
            </button>
          </div>

          {/* Clarification Callout */}
          <div className="mt-6 p-4 rounded-xl bg-[#FAF6EF] border border-[#E8D5B5]/80 flex items-start gap-3 text-xs text-stone-700 leading-relaxed">
            <Info className="w-4 h-4 text-[#4A6C6F] shrink-0 mt-0.5" />
            <div>
              <strong>Regla de desempate en vivo:</strong> Si dos o más jugadores alcanzan los 500 puntos en la misma balota o fecha, el orden del 1er, 2do y 3er puesto se determinará por la hora y segundo exacto en que hayan validado su cartón en el chat en vivo con los moderadores oficiales.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
