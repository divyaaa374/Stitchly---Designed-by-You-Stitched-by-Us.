import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, ChevronLeft, ChevronRight, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { TAILORS_LIST } from '../../data/tailorsData';
import { useUI } from '../../store/useUI';
import Button from '../../components/ui/Button';
import Chip from '../../components/ui/Chip';
import ChalkUnderline from '../../components/motifs/ChalkUnderline';

export const TailorSpotlight = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const { openModal } = useUI();
  const navigate = useNavigate();

  const handleOpenTailor = (tailor) => {
    openModal('tailorDetail', {
      title: tailor.name,
      subtitle: `${tailor.city}, ${tailor.state} • ${tailor.experience}`,
      content: (
        <div className="space-y-4">
          <div className="relative h-48 rounded-3xl overflow-hidden shadow-sm">
            <img
              src={tailor.coverImage}
              alt={tailor.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-plum border border-mint">
              {tailor.badge}
            </div>
          </div>

          <p className="text-sm text-plum leading-relaxed">
            {tailor.bio}
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-cream rounded-2xl border border-blush">
              <span className="text-plum-soft block text-[10px]">Turnaround Time</span>
              <strong className="text-plum font-semibold">{tailor.turnaroundDays}</strong>
            </div>
            <div className="p-3 bg-cream rounded-2xl border border-blush">
              <span className="text-plum-soft block text-[10px]">Orders Completed</span>
              <strong className="text-plum font-semibold">{tailor.ordersCompleted}+ Outfits</strong>
            </div>
          </div>

          <div className="pt-2">
            <h5 className="font-serif text-xs font-bold text-plum mb-2">Signature Masterpieces:</h5>
            <div className="flex flex-wrap gap-1.5">
              {tailor.topPieces?.map((piece) => (
                <Chip key={piece} variant="blush" size="sm">
                  {piece}
                </Chip>
              ))}
            </div>
          </div>

          <Button
            onClick={() => navigate('/tailors')}
            variant="primary"
            size="md"
            className="w-full mt-2"
          >
            Commission This Artisan
          </Button>
        </div>
      ),
    });
  };

  const nextSlide = () => {
    setScrollIndex((prev) => (prev + 1) % (TAILORS_LIST.length - 2));
  };

  const prevSlide = () => {
    setScrollIndex((prev) => (prev - 1 + (TAILORS_LIST.length - 2)) % (TAILORS_LIST.length - 2));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-cream via-mint/10 to-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-mint px-3.5 py-1.5 rounded-full inline-block mb-3">
              Master Karigar Guild
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum">
              Meet our master tailors.
              <br />
              <span className="relative inline-block text-rose-deep">
                Bridal & heritage specialists.
                <ChalkUnderline color="#D5EFE3" />
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <button
              onClick={prevSlide}
              className="p-3 rounded-2xl bg-white border border-blush hover:bg-blush/30 text-plum transition-colors shadow-xs"
              aria-label="Previous tailors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-2xl bg-white border border-blush hover:bg-blush/30 text-plum transition-colors shadow-xs"
              aria-label="Next tailors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <Button
              onClick={() => navigate('/tailors')}
              variant="secondary"
              size="md"
              icon={ArrowRight}
              className="hidden sm:inline-flex"
            >
              View All Tailors
            </Button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TAILORS_LIST.slice(scrollIndex, scrollIndex + 3).map((tailor) => (
            <motion.div
              key={tailor.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              onClick={() => handleOpenTailor(tailor)}
              className="rounded-4xl bg-white/80 backdrop-blur-md border border-mint/70 p-6 shadow-pastel-mint hover:shadow-soft-lift hover:border-mint-dark transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Tailor Avatar & Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={tailor.avatar}
                      alt={tailor.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-mint text-emerald-900 inline-block mb-1">
                      {tailor.badge}
                    </span>
                    <h4 className="font-serif text-base font-bold text-plum truncate">
                      {tailor.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-plum-soft mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-deep shrink-0" />
                      <span>{tailor.city}, {tailor.state}</span>
                    </div>
                  </div>
                </div>

                {/* Rating & Experience */}
                <div className="flex items-center justify-between text-xs py-2 px-3 bg-cream rounded-2xl border border-blush/60 mb-4">
                  <div className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span>{tailor.rating}</span>
                    <span className="text-plum-soft font-normal text-[11px]">
                      ({tailor.reviewCount})
                    </span>
                  </div>
                  <span className="text-plum-soft text-[11px]">
                    {tailor.experience} experience
                  </span>
                </div>

                {/* Specialties chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tailor.specialties.map((spec) => (
                    <Chip key={spec} variant="mint" size="sm">
                      {spec}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-blush/40 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-plum-soft block">Starting from</span>
                  <strong className="text-plum font-serif text-sm">{tailor.startingPrice}</strong>
                </div>
                <span className="text-rose-deep font-semibold flex items-center gap-1">
                  View Profile <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TailorSpotlight;
