import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, ArrowRight, Check, Palette, Clock, Tag } from 'lucide-react';
import { useStudio } from '../../store/useStudio';
import NeedleLoader from '../../components/motifs/NeedleLoader';
import Button from '../../components/ui/Button';
import Chip from '../../components/ui/Chip';
import ChalkUnderline from '../../components/motifs/ChalkUnderline';

const PRESET_PROMPTS = [
  'Emerald Velvet Sangeet Lehenga with Peacock Zardozi',
  'Ivory Handloom Silk Kurta with Gota Hem & Gharara',
  'Pastel Lilac Organza Anarkali with Pearl Edges',
  'Maroon Brocade Regal Sherwani with Angrakha Cut',
];

export const AIStudioTeaser = () => {
  const { activePrompt, isGenerating, variations, generateDesigns, selectedVariation, selectVariation } = useStudio();
  const [customInput, setCustomInput] = useState('');
  const navigate = useNavigate();

  // Initial generation on first mount if empty
  useEffect(() => {
    if (variations.length === 0) {
      generateDesigns(PRESET_PROMPTS[0]);
    }
  }, []);

  const handleGenerate = (promptText) => {
    const text = promptText || customInput || activePrompt;
    generateDesigns(text);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-cream via-white/80 to-cream relative overflow-hidden" id="ai-studio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lavender/50 border border-lavender-dark/40 text-xs font-semibold text-plum mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-deep" />
            <span>Interactive Live Studio Teaser</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum">
            Try the AI Couture Studio.
            <br />
            <span className="relative inline-block text-rose-deep">
              Generate 4 variations right now.
              <ChalkUnderline color="#F9D5DC" />
            </span>
          </h2>
          <p className="text-sm text-plum-soft mt-3">
            Click any prompt chip below or type your dream outfit to simulate instant design rendering.
          </p>
        </div>

        {/* Studio Interactive Control Box */}
        <div className="max-w-3xl mx-auto mb-12 bg-white/85 backdrop-blur-xl rounded-4xl border border-blush shadow-pastel p-4 sm:p-6">
          {/* Preset Chips */}
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {PRESET_PROMPTS.map((prompt) => (
              <Chip
                key={prompt}
                variant="blush"
                selected={activePrompt === prompt}
                onClick={() => {
                  setCustomInput(prompt);
                  handleGenerate(prompt);
                }}
              >
                {prompt}
              </Chip>
            ))}
          </div>

          {/* Prompt Input Bar */}
          <div className="relative flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full">
              <input
                type="text"
                value={customInput || activePrompt}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate(customInput)}
                placeholder="Describe your silhouette, fabric, color or wedding theme..."
                className="w-full px-5 py-3.5 text-xs sm:text-sm bg-cream rounded-2xl border border-blush text-plum placeholder-plum-soft/60 focus:outline-none focus:ring-2 focus:ring-rose-deep/30 pr-10"
              />
              <Wand2 className="w-4 h-4 text-rose-deep absolute right-4 top-4 pointer-events-none opacity-70" />
            </div>
            <Button
              onClick={() => handleGenerate(customInput)}
              variant="primary"
              size="md"
              isLoading={isGenerating}
              icon={Sparkles}
              className="w-full sm:w-auto shrink-0 py-3.5 px-6"
            >
              Simulate AI Stitch
            </Button>
          </div>
        </div>

        {/* 4 Generated Variations Display */}
        <div className="relative min-h-[380px]">
          {isGenerating ? (
            <div className="h-80 flex flex-col items-center justify-center">
              <NeedleLoader size="lg" text="Weaving prompt threads into 4 couture variations..." />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {variations.map((item, idx) => {
                const isSelected = selectedVariation?.id === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    onClick={() => selectVariation(item)}
                    className={`rounded-3xl bg-white/80 backdrop-blur-md border cursor-pointer transition-all duration-300 p-5 flex flex-col justify-between relative group ${
                      isSelected
                        ? 'border-rose-deep shadow-pastel ring-2 ring-blush'
                        : 'border-blush/60 hover:border-blush hover:shadow-soft-lift'
                    }`}
                  >
                    {/* Top Tag & Selection badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cream border border-blush text-plum-soft">
                        Variation #{idx + 1}
                      </span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-rose-deep text-white flex items-center justify-center text-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>

                    {/* Preview Image */}
                    <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-cream">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-2 left-2 flex gap-1">
                        {item.swatches.map((color, i) => (
                          <span
                            key={i}
                            className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-1.5 flex-1">
                      <h4 className="font-serif text-sm font-bold text-plum line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-plum-soft leading-snug line-clamp-2">
                        {item.silhouette} • {item.fabric}
                      </p>
                      <div className="text-[11px] text-rose-deep font-medium pt-1">
                        {item.embroidery}
                      </div>
                    </div>

                    {/* Footer estimate */}
                    <div className="pt-3 mt-3 border-t border-blush/50 flex items-center justify-between text-xs">
                      <span className="font-bold text-plum font-mono">{item.estimatedCost}</span>
                      <span className="text-[10px] text-plum-soft">{item.tailorSpecialty}</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Direct CTA to Studio */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-3xl bg-blush/30 border border-blush">
            <span className="text-xs sm:text-sm font-medium text-plum">
              Love this silhouette? Step into the full studio to adjust borders, tassels, and matching tailors.
            </span>
            <Button
              onClick={() => navigate('/signup')}
              variant="primary"
              size="md"
              icon={ArrowRight}
            >
              Customize in Full Studio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIStudioTeaser;
