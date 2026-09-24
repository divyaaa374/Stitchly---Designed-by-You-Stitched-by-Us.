import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Scissors, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import Button from '../../components/ui/Button';
import { NeedleIcon, SpoolIcon, SparkleDoodle } from '../../components/motifs/Doodles';

export const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-5xl bg-gradient-to-br from-blush/60 via-cream to-lavender/50 border border-blush p-8 sm:p-14 shadow-2xl text-center overflow-hidden">
          {/* Decorative Floating Atelier Doodles */}
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/40 flex items-center justify-center pointer-events-none">
            <SpoolIcon className="w-10 h-10 text-rose-deep opacity-40 -rotate-12" />
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/40 flex items-center justify-center pointer-events-none">
            <Scissors className="w-10 h-10 text-plum opacity-30 rotate-45" />
          </div>
          <div className="absolute top-8 right-12 pointer-events-none">
            <SparkleDoodle className="w-6 h-6 text-amber-400 animate-spin" />
          </div>

          {/* Center Content */}
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white flex items-center justify-center shadow-pastel border border-blush">
              <NeedleIcon className="w-7 h-7 text-rose-deep -rotate-12" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum leading-tight">
              Ready to wear something made solely for you?
            </h2>

            <p className="text-sm sm:text-base text-plum-soft max-w-xl mx-auto leading-relaxed">
              No off-the-rack compromises. No frantic boutique visits. Simply your vision, rendered with AI in 30 seconds, stitched with love by verified Indian master artisans.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                onClick={() => navigate('/signup')}
                variant="primary"
                size="lg"
                icon={Sparkles}
                className="w-full sm:w-auto shadow-xl"
              >
                Design Your Outfit
              </Button>
              <Button
                onClick={() => navigate('/tailors')}
                variant="secondary"
                size="lg"
                icon={Scissors}
                className="w-full sm:w-auto"
              >
                Explore Master Karigars
              </Button>
            </div>

            <div className="pt-4 flex flex-wrap justify-center items-center gap-6 text-xs text-plum-soft">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% Free Doorstep Alteration
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-deep fill-rose-deep/30" />
                Ethical Direct Karigar Wages
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
