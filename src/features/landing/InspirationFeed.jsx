import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Wand2 } from 'lucide-react';
import { INSPIRATION_ITEMS } from '../../data/inspirationData';
import { useUI } from '../../store/useUI';
import { useStudio } from '../../store/useStudio';
import Button from '../../components/ui/Button';
import Chip from '../../components/ui/Chip';
import ChalkUnderline from '../../components/motifs/ChalkUnderline';

export const InspirationFeed = () => {
  const { openDrawer } = useUI();
  const { generateDesigns } = useStudio();
  const navigate = useNavigate();

  const handleRecreate = (item) => {
    openDrawer({
      title: item.title,
      subtitle: `${item.category} • ${item.fabric}`,
      content: (
        <div className="space-y-5">
          <div className="h-60 rounded-3xl overflow-hidden shadow-md">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-1">
            <h4 className="font-serif text-lg font-bold text-plum">{item.title}</h4>
            <p className="text-xs text-plum-soft">{item.silhouette}</p>
          </div>

          <div className="p-3.5 bg-cream rounded-2xl border border-blush text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-plum-soft">Occasion:</span>
              <strong className="text-plum">{item.occasion}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-plum-soft">Estimated Price:</span>
              <strong className="text-plum font-mono">{item.priceEstimate}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-plum-soft">Recommended Artisan:</span>
              <strong className="text-plum">{item.recommendedTailor}</strong>
            </div>
          </div>

          <div className="p-3 bg-blush/30 rounded-2xl border border-blush text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-deep block mb-1">
              AI Prompt Suggestion:
            </span>
            <p className="font-serif italic text-plum">"{item.promptSuggestion}"</p>
          </div>

          <Button
            onClick={() => {
              generateDesigns(item.promptSuggestion);
              navigate('/signup');
            }}
            variant="primary"
            size="md"
            icon={Wand2}
            className="w-full"
          >
            Recreate Look in AI Studio
          </Button>
        </div>
      ),
    });
  };

  return (
    <section className="py-20 bg-cream relative" id="inspiration-feed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-deep bg-blush/60 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Curated Lookbook
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum">
              Indian haute couture gallery.{' '}
              <br />
              <span className="relative inline-block text-rose-deep">
                Recreate any silhouette.
                <ChalkUnderline color="#F9D5DC" />
              </span>
            </h2>
          </div>

          <Button
            onClick={() => navigate('/inspiration')}
            variant="secondary"
            size="md"
            icon={ArrowRight}
            className="mt-6 sm:mt-0"
          >
            Explore Complete Lookbook
          </Button>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSPIRATION_ITEMS.slice(0, 6).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="group rounded-4xl bg-white/80 backdrop-blur-md border border-blush/70 overflow-hidden shadow-pastel hover:shadow-soft-lift transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container with overlay actions */}
              <div className="relative h-64 overflow-hidden bg-cream">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <Button
                    onClick={() => handleRecreate(item)}
                    variant="primary"
                    size="sm"
                    icon={Wand2}
                    className="w-full shadow-lg"
                  >
                    Recreate this Look
                  </Button>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3 bg-white/85 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-plum border border-blush">
                  {item.category}
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-rose-deep">
                    {item.colorName}
                  </span>
                  <span className="text-[11px] font-mono text-plum-soft">
                    {item.estimatedTime}
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-plum group-hover:text-rose-deep transition-colors">
                  {item.title}
                </h4>
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Chip key={tag} variant="blush" size="sm">
                      {tag}
                    </Chip>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InspirationFeed;
