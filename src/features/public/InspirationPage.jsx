import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, Tag, Clock, ArrowRight, Heart } from 'lucide-react';
import { INSPIRATION_ITEMS } from '../../data/inspirationData';
import { useStudio } from '../../store/useStudio';
import Button from '../../components/ui/Button';
import Chip from '../../components/ui/Chip';
import ChalkUnderline from '../../components/motifs/ChalkUnderline';

export const InspirationPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { generateDesigns } = useStudio();
  const navigate = useNavigate();

  const categories = [
    'All',
    'Bridal Lehenga',
    'Festive Kurta Set',
    'Designer Blouse',
    'Royal Sherwani',
    'Festive Anarkali',
  ];

  const filteredItems = selectedCategory === 'All'
    ? INSPIRATION_ITEMS
    : INSPIRATION_ITEMS.filter((item) => item.category === selectedCategory);

  const handleRecreate = (prompt) => {
    generateDesigns(prompt);
    navigate('/signup');
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-rose-deep bg-blush/60 px-3.5 py-1.5 rounded-full inline-block mb-3">
          Couture Lookbook
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-plum">
          Curated Indian Haute Couture.{' '}
          <br className="hidden sm:inline" />
          <span className="relative inline-block text-rose-deep">
            Recreate with your own fit & palette.
            <ChalkUnderline color="#F9D5DC" />
          </span>
        </h1>
        <p className="text-sm sm:text-base text-plum-soft mt-3">
          Explore heirloom embroideries and contemporary silhouette cuts. Click any look to spin off a bespoke AI studio variation.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-6 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold border transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-rose-deep text-white border-rose-deep shadow-pastel'
                : 'bg-white/80 text-plum border-blush hover:bg-blush/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Inspiration Outfits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            className="group rounded-4xl bg-white/85 backdrop-blur-md border border-blush/80 overflow-hidden shadow-pastel hover:shadow-soft-lift transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Box */}
            <div className="relative h-80 overflow-hidden bg-cream">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-plum border border-blush shadow-xs">
                {item.category}
              </div>

              {/* Color Dot Swatch */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-blush shadow-xs">
                <span
                  className="w-3 h-3 rounded-full border border-white shadow-xs"
                  style={{ backgroundColor: item.colorHex }}
                />
                <span className="text-[10px] font-medium text-plum">{item.colorName}</span>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 space-y-3">
              <h3 className="font-serif text-lg font-bold text-plum">
                {item.title}
              </h3>
              <p className="text-xs text-plum-soft">
                {item.silhouette} • {item.fabric}
              </p>

              <div className="p-3 bg-cream rounded-2xl border border-blush/70 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-plum-soft">Occasion:</span>
                  <strong className="text-plum">{item.occasion}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-plum-soft">Est. Stitching Time:</span>
                  <span className="text-plum font-mono">{item.estimatedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-plum-soft">Price Range:</span>
                  <span className="text-rose-deep font-bold font-mono">{item.priceEstimate}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag) => (
                  <Chip key={tag} variant="blush" size="sm">
                    {tag}
                  </Chip>
                ))}
              </div>

              <Button
                onClick={() => handleRecreate(item.promptSuggestion)}
                variant="primary"
                size="md"
                icon={Wand2}
                className="w-full mt-2"
              >
                Recreate Look with AI
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InspirationPage;
