import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Scissors, ShieldCheck, Heart } from 'lucide-react';
import Button from '../../components/ui/Button';
import Chip from '../../components/ui/Chip';
import ChalkUnderline from '../../components/motifs/ChalkUnderline';
import { NeedleIcon, PinIcon, SparkleDoodle } from '../../components/motifs/Doodles';

const MORPH_OUTFITS = [
  {
    type: 'Kurta Set',
    name: 'Lucknowi Chikankari Straight Kurta',
    silhouetteSvg: 'kurta',
    colorHex: '#D5EFE3',
    accentColor: '#9BD6BA',
    swatches: ['#D5EFE3', '#FFFFFF', '#FFE2CF', '#E4DAF6'],
    chips: ['Pure Mulmul Silk', 'Mandarin Collar', 'Shadow Chikankari', 'Gharara Fit'],
    prompt: 'pastel mint organza kurta with delicate white chikankari embroidery',
    fabric: 'Georgette Silk',
  },
  {
    type: 'Bridal Lehenga',
    name: 'Imperial Zardozi Sangeet Lehenga',
    silhouetteSvg: 'lehenga',
    colorHex: '#F9D5DC',
    accentColor: '#D9718A',
    swatches: ['#F9D5DC', '#8B1E3F', '#FFE2CF', '#FFF1B8'],
    chips: ['Heavy Zardozi Work', '24-Kali Flare', 'Scalloped Velvet Border', 'Double Dupatta'],
    prompt: 'maroon lehenga for sangeet with intricate peacock motifs and golden zari',
    fabric: 'Pure Raw Silk & Velvet',
  },
  {
    type: 'Designer Blouse',
    name: 'Sculpted Sweetheart Brocade Blouse',
    silhouetteSvg: 'blouse',
    colorHex: '#FFE2CF',
    accentColor: '#F7BC98',
    swatches: ['#FFE2CF', '#FFF1B8', '#D8E8F8', '#E4DAF6'],
    chips: ['Sweetheart Neckline', 'Latkan Tassels', 'Handloom Brocade', 'Concealed Corset'],
    prompt: 'peach brocade blouse with deep sweetheart back and pearl hangings',
    fabric: 'Handloom Katan Brocade',
  },
  {
    type: 'Royal Sherwani',
    name: 'Regal Angrakha Brocade Sherwani',
    silhouetteSvg: 'sherwani',
    colorHex: '#FFF1B8',
    accentColor: '#FDE075',
    swatches: ['#FFF1B8', '#D8E8F8', '#4A3F5C', '#D5EFE3'],
    chips: ['Royal Angrakha Cut', 'Pearl Button Rows', 'Matka Silk', 'Churidar Set'],
    prompt: 'champagne gold sherwani with tone-on-tone embroidery and velvet stole',
    fabric: 'Matka Silk',
  },
];

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedPrompt, setTypedPrompt] = useState('');
  const navigate = useNavigate();

  const currentOutfit = MORPH_OUTFITS[currentIndex];

  // Morph cycle every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MORPH_OUTFITS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Realistic typewriter effect for prompt bubble
  useEffect(() => {
    const fullText = currentOutfit.prompt;
    setTypedPrompt('');
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setTypedPrompt(fullText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [currentIndex]);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
      {/* Background atelier mesh gradients */}
      <div className="absolute top-10 left-1/10 w-96 h-96 bg-blush/35 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-1/10 w-[28rem] h-[28rem] bg-lavender/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-mint/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Soft Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-blush/80 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-rose-deep animate-ping" />
              <span className="text-xs font-semibold text-plum">
                Online Couture Atelier • No Shop Visits
              </span>
              <SparkleDoodle className="w-3.5 h-3.5 text-butter-dark" />
            </motion.div>

            {/* Fraunces Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-plum leading-[1.15]"
            >
              Designed by your dream.{' '}
              <br className="hidden sm:inline" />
              <span className="relative inline-block text-rose-deep">
                Stitched by masters.
                <ChalkUnderline color="#F9D5DC" className="block" />
              </span>
            </motion.h1>

            {/* Tagline / Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-plum-soft max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              A two-sided online atelier where you co-create custom Indian bridal, festive, and group wedding wear with AI, get matched with verified regional karigars, and track every stitch live to your doorstep.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Button
                onClick={() => navigate('/signup')}
                variant="primary"
                size="lg"
                icon={Sparkles}
                className="w-full sm:w-auto"
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
                Meet Our Tailors
              </Button>
            </motion.div>

            {/* Trust Micro-bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-plum-soft"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Fit Guarantee</span>
              </div>
              <span className="text-plum-soft/40">•</span>
              <div className="flex items-center gap-1.5">
                <PinIcon className="w-4 h-4" fillColor="#D9718A" />
                <span>42 Indian Craft Hubs</span>
              </div>
              <span className="text-plum-soft/40">•</span>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-deep fill-rose-deep/20" />
                <span>Zero Shop Visits Needed</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Outfit Illustration Morphing Canvas */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Outer Glass Canvas Container */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-5xl bg-white/75 backdrop-blur-xl border border-blush shadow-pastel p-6 flex flex-col justify-between overflow-hidden">
              {/* Top Bar: Prompt Typing Bubble */}
              <div className="relative z-10 bg-cream/90 backdrop-blur-md rounded-2xl border border-blush/80 p-3 shadow-xs">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-rose-deep animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-plum-soft">
                    AI Studio Prompt
                  </span>
                </div>
                <div className="font-serif text-xs text-plum italic min-h-[32px] flex items-center">
                  "{typedPrompt}"
                  <span className="inline-block w-1 h-3.5 bg-rose-deep ml-0.5 animate-pulse" />
                </div>
              </div>

              {/* Center Canvas: Morphing Outfit Graphic */}
              <div className="relative flex-1 flex items-center justify-center py-4">
                {/* Floating ambient colored circular aura */}
                <motion.div
                  animate={{
                    backgroundColor: currentOutfit.colorHex,
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute w-56 h-56 rounded-full blur-2xl opacity-60 pointer-events-none"
                />

                {/* Animated Outfit Illustration Vector */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentOutfit.type}
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 flex flex-col items-center"
                  >
                    {/* SVG Silhouette representation */}
                    <div className="w-44 h-52 relative flex items-center justify-center">
                      {currentOutfit.silhouetteSvg === 'lehenga' && (
                        <svg viewBox="0 0 160 200" className="w-full h-full drop-shadow-md">
                          {/* Choli */}
                          <path d="M50 30 Q80 40 110 30 L105 70 Q80 75 55 70 Z" fill={currentOutfit.colorHex} stroke="#4A3F5C" strokeWidth="2.5" />
                          <path d="M65 30 Q80 50 95 30" fill="none" stroke="#4A3F5C" strokeWidth="2" strokeDasharray="3 3" />
                          {/* Dupatta drape */}
                          <path d="M45 35 Q30 90 75 140 Q60 170 45 190" fill="none" stroke="#D9718A" strokeWidth="3" strokeDasharray="5 5" opacity="0.8" />
                          {/* Flared Lehenga Skirt */}
                          <path d="M60 85 Q80 88 100 85 L140 185 Q80 195 20 185 Z" fill={currentOutfit.colorHex} stroke="#4A3F5C" strokeWidth="2.5" />
                          {/* Kali stitch lines */}
                          <line x1="80" y1="88" x2="80" y2="194" stroke="#4A3F5C" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
                          <line x1="70" y1="87" x2="50" y2="188" stroke="#4A3F5C" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
                          <line x1="90" y1="87" x2="110" y2="188" stroke="#4A3F5C" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
                          {/* Gota border */}
                          <path d="M22 178 Q80 188 138 178" stroke="#FFF1B8" strokeWidth="4" fill="none" />
                        </svg>
                      )}

                      {currentOutfit.silhouetteSvg === 'kurta' && (
                        <svg viewBox="0 0 160 200" className="w-full h-full drop-shadow-md">
                          {/* Kurta Body */}
                          <path d="M45 25 L115 25 L125 155 Q80 160 35 155 Z" fill={currentOutfit.colorHex} stroke="#4A3F5C" strokeWidth="2.5" />
                          {/* Mandarin Collar */}
                          <path d="M70 25 C70 20 90 20 90 25" stroke="#4A3F5C" strokeWidth="2.5" fill="none" />
                          {/* Center Chikankari Placket */}
                          <line x1="80" y1="25" x2="80" y2="85" stroke="#4A3F5C" strokeWidth="2" strokeDasharray="2 3" />
                          {/* Sleeves */}
                          <path d="M45 25 L20 70 L35 75 L50 45" fill={currentOutfit.colorHex} stroke="#4A3F5C" strokeWidth="2" />
                          <path d="M115 25 L140 70 L125 75 L110 45" fill={currentOutfit.colorHex} stroke="#4A3F5C" strokeWidth="2" />
                          {/* Gharara bottom peeking */}
                          <path d="M45 155 L30 195 L65 195 L60 157" fill="#FFF9F5" stroke="#4A3F5C" strokeWidth="2" />
                          <path d="M115 155 L130 195 L95 195 L100 157" fill="#FFF9F5" stroke="#4A3F5C" strokeWidth="2" />
                        </svg>
                      )}

                      {currentOutfit.silhouetteSvg === 'blouse' && (
                        <svg viewBox="0 0 160 200" className="w-full h-full drop-shadow-md">
                          {/* Structured Blouse */}
                          <path d="M40 50 Q80 65 120 50 L115 125 Q80 135 45 125 Z" fill={currentOutfit.colorHex} stroke="#4A3F5C" strokeWidth="2.5" />
                          {/* Sweetheart Neckline cut */}
                          <path d="M55 52 Q68 78 80 65 Q92 78 105 52" fill="none" stroke="#4A3F5C" strokeWidth="2.5" />
                          {/* Short sleeves */}
                          <path d="M40 50 L20 85 L35 90 L45 70" fill={currentOutfit.colorHex} stroke="#4A3F5C" strokeWidth="2" />
                          <path d="M120 50 L140 85 L125 90 L115 70" fill={currentOutfit.colorHex} stroke="#4A3F5C" strokeWidth="2" />
                          {/* Latkan back tassels */}
                          <path d="M80 130 C75 160 70 175 68 185" stroke="#D9718A" strokeWidth="2" fill="none" />
                          <circle cx="68" cy="186" r="4" fill="#FFF1B8" stroke="#4A3F5C" />
                          <path d="M80 130 C85 160 90 175 92 185" stroke="#D9718A" strokeWidth="2" fill="none" />
                          <circle cx="92" cy="186" r="4" fill="#FFF1B8" stroke="#4A3F5C" />
                        </svg>
                      )}

                      {currentOutfit.silhouetteSvg === 'sherwani' && (
                        <svg viewBox="0 0 160 200" className="w-full h-full drop-shadow-md">
                          {/* Regal Angrakha Sherwani */}
                          <path d="M45 25 L115 25 L125 170 Q80 175 35 170 Z" fill={currentOutfit.colorHex} stroke="#4A3F5C" strokeWidth="2.5" />
                          {/* Angrakha diagonal overlap */}
                          <path d="M72 25 L95 105 L95 172" stroke="#4A3F5C" strokeWidth="2" strokeDasharray="3 3" />
                          {/* Pearl Buttons */}
                          <circle cx="95" cy="45" r="2.5" fill="#FFFFFF" stroke="#4A3F5C" />
                          <circle cx="95" cy="65" r="2.5" fill="#FFFFFF" stroke="#4A3F5C" />
                          <circle cx="95" cy="85" r="2.5" fill="#FFFFFF" stroke="#4A3F5C" />
                          {/* Stole Drape */}
                          <path d="M115 40 Q130 110 120 185" stroke="#4A3F5C" strokeWidth="4" fill="none" opacity="0.8" />
                        </svg>
                      )}
                    </div>

                    <div className="mt-2 text-center">
                      <span className="font-serif text-sm font-bold text-plum block">
                        {currentOutfit.name}
                      </span>
                      <span className="text-[11px] text-plum-soft">
                        {currentOutfit.fabric}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Canvas: Rotating Chips & Swatches */}
              <div className="space-y-2.5 pt-2 border-t border-blush/60 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-plum-soft">
                    Atelier Swatch Palette:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {currentOutfit.swatches.map((color, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border border-white shadow-xs"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Animated Chips */}
                <div className="flex flex-wrap gap-1.5 min-h-[52px]">
                  <AnimatePresence>
                    {currentOutfit.chips.map((chip) => (
                      <motion.span
                        key={chip}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Chip variant="blush" size="sm">
                          {chip}
                        </Chip>
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
