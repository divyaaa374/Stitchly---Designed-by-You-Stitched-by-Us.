import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Sun, Moon, Sparkles } from 'lucide-react';
import FabricSwatch from '../../components/motifs/FabricSwatch';
import ChalkUnderline from '../../components/motifs/ChalkUnderline';

export const OutfitChangerStrip = () => {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  };

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-deep bg-blush/60 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Interactive Style Morph
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum">
            Same silhouette.{' '}
            <span className="relative inline-block text-rose-deep">
              Infinite fabric moods.
              <ChalkUnderline color="#F9D5DC" />
            </span>
          </h2>
          <p className="text-sm text-plum-soft mt-3">
            Drag the shears slider back and forth to see how daylight sheer organza transforms into nocturnal grand velvet.
          </p>
        </div>

        {/* Draggable Comparison Canvas */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full h-[380px] sm:h-[480px] rounded-4xl overflow-hidden shadow-2xl border-4 border-white/80 select-none cursor-ew-resize bg-cream"
          >
            {/* Background 1: Evening Velvet Zardozi (Full Width underneath) */}
            <div className="absolute inset-0 bg-[#8B1E3F] flex items-center justify-center p-6 text-white">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80"
                alt="Evening Royal Velvet"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 right-6 text-right z-10 bg-plum/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <Moon className="w-3.5 h-3.5" />
                  Evening Royal Zardozi
                </span>
                <p className="text-[11px] text-cream/90 mt-0.5">Heavy Velvet • Antique Dabka • 24-Kali</p>
              </div>
            </div>

            {/* Background 2: Daytime Breezy Georgette (Clipped by slider percentage) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="relative w-full h-full" style={{ width: containerRef.current?.offsetWidth || '100%' }}>
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80"
                  alt="Daytime Breezy Organza"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 text-left z-10 bg-white/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-mint">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                    <Sun className="w-3.5 h-3.5 text-amber-600" />
                    Daytime Pastel Organza
                  </span>
                  <p className="text-[11px] text-plum-soft mt-0.5">Mint Silk Georgette • Hand-dyed Chikankari</p>
                </div>
              </div>
            </div>

            {/* Vertical Split Line & Scissors Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none z-20"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-cream border-2 border-rose-deep shadow-2xl flex items-center justify-center text-plum pointer-events-auto cursor-grab active:cursor-grabbing">
                <Scissors className="w-5 h-5 text-rose-deep transform rotate-45" />
              </div>
            </div>
          </div>

          {/* Quick preset jump buttons */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => setSliderPos(15)}
              className="text-xs font-semibold px-4 py-1.5 rounded-full border border-blush bg-white/80 hover:bg-blush/30 transition-all text-plum"
            >
              100% Evening Velvet
            </button>
            <button
              type="button"
              onClick={() => setSliderPos(50)}
              className="text-xs font-semibold px-4 py-1.5 rounded-full border border-rose-deep bg-blush text-plum"
            >
              50/50 Dual Drape
            </button>
            <button
              type="button"
              onClick={() => setSliderPos(85)}
              className="text-xs font-semibold px-4 py-1.5 rounded-full border border-mint bg-white/80 hover:bg-mint/30 transition-all text-plum"
            >
              100% Daytime Organza
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutfitChangerStrip;
