import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Scissors, Sparkles, MapPin, Star, Award } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function Counter({ end, duration = 1.8, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    let start = 0;
    const stepTime = 16;
    const steps = (duration * 1000) / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, end, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className="font-serif font-bold text-3xl sm:text-4xl text-plum">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export const TrustStrip = () => {
  const stats = [
    {
      end: 350,
      suffix: '+',
      label: 'Master Karigars & Tailors',
      sublabel: 'Verified by regional craft guild',
      icon: Scissors,
      color: 'bg-blush text-rose-deep',
    },
    {
      end: 14800,
      suffix: '+',
      label: 'Bespoke Outfits Crafted',
      sublabel: 'Bridal, festive & wedding parties',
      icon: Sparkles,
      color: 'bg-lavender text-plum',
    },
    {
      end: 42,
      suffix: '',
      label: 'Indian Craft Clusters',
      sublabel: 'Jaipur, Lucknow, Banaras & beyond',
      icon: MapPin,
      color: 'bg-mint text-emerald-800',
    },
    {
      isRating: true,
      label: '4.95 / 5 Star Rating',
      sublabel: 'From 3,200+ verified brides & clients',
      icon: Star,
      color: 'bg-butter text-amber-800',
    },
  ];

  return (
    <section className="py-12 border-y border-blush/60 bg-white/50 backdrop-blur-md relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center sm:items-start text-center sm:text-left"
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-3 shadow-sm ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex items-baseline gap-1">
                  {stat.isRating ? (
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif font-bold text-3xl sm:text-4xl text-plum">
                        4.95
                      </span>
                      <div className="flex text-amber-500">
                        {'★★★★★'.split('').map((s, i) => (
                          <span key={i} className="text-xs">★</span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Counter end={stat.end} suffix={stat.suffix} />
                  )}
                </div>

                <h4 className="font-serif text-sm font-semibold text-plum mt-1">
                  {stat.label}
                </h4>
                <p className="text-[11px] text-plum-soft mt-0.5">
                  {stat.sublabel}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
