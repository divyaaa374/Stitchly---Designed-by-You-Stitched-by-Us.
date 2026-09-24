import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Ruler, 
  Scissors, 
  Video, 
  Users, 
  Mic, 
  ShieldCheck, 
  ArrowRight,
  Sparkles 
} from 'lucide-react';
import { useUI } from '../../store/useUI';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ChalkUnderline from '../../components/motifs/ChalkUnderline';

export const FEATURES_DATA = [
  {
    id: 'feat_measure',
    title: 'Zero Shop Visits: 3D Measurement',
    category: 'Fit Technology',
    icon: Ruler,
    color: 'bg-blush text-rose-deep',
    summary: 'No measuring tape anxiety. Use our guided mobile photo mesh, send a favorite garment to clone, or follow visual inch guides.',
    fullDescription: 'Traditional tailoring requires multiple boutique trips and awkward measuring sessions. Stitchly eliminates this with three flexible fit modes: (1) Guided smartphone 3D scan, (2) Doorstep pickup of your best-fitting kurta or blouse, or (3) Intuitive tape-measure visual guide with our atelier stylist on video chat.',
    tryPath: '/signup',
    tryLabel: 'Setup Fit Profile',
  },
  {
    id: 'feat_matching',
    title: 'Karigar Matching Algorithm',
    category: 'Artisan Sourcing',
    icon: Scissors,
    color: 'bg-mint text-emerald-900',
    summary: 'Intelligently connects your garment to verified independent masters by embroidery heritage, fabric mastery, and city cluster.',
    fullDescription: 'Every Indian craft has an ancestral home. We do not mass-manufacture in a factory. A Zardozi lehenga is assigned directly to a master karigar in Jaipur; a Chikankari kurta is routed to an artisan in Lucknow; and temple border silks go to Bengaluru. Each artisan sets their own fair wages.',
    tryPath: '/tailors',
    tryLabel: 'Browse Master Tailors',
  },
  {
    id: 'feat_milestones',
    title: 'Live Loom & Stitch Cam',
    category: 'Transparency',
    icon: Video,
    color: 'bg-sky text-sky-950',
    summary: 'Receive milestone photos as your fabric is dyed, pattern-cut, hand-embroidered, and pressed in the atelier.',
    fullDescription: 'Watch your dream piece come alive. Receive verified milestone notifications: "Master Meera Devi has begun hand-beading your peacock zardozi border (40% complete)". Experience the emotional romance of couture creation directly on your live order dashboard.',
    tryPath: '/signup',
    tryLabel: 'Experience Order Tracking',
  },
  {
    id: 'feat_wedding',
    title: 'Wedding Party Co-Op Studio',
    category: 'Bridal & Entourage',
    icon: Users,
    color: 'bg-lavender text-plum',
    summary: 'Create a shared wedding atelier room. Coordinate matching palettes, silhouettes, and fabric swatches for 10+ bridesmaids and groomsmen.',
    fullDescription: 'Bridal parties frequently struggle with mismatched dye lots, inconsistent fits, and chaotic coordination across cities. Stitchly lets the bride or wedding planner establish a synchronized color palette. Bridesmaids enter their measurements individually, and all outfits are stitched from the same authentic dye batch.',
    tryPath: '/signup',
    tryLabel: 'Create Wedding Room',
  },
  {
    id: 'feat_voice',
    title: 'Regional Voice Prompts',
    category: 'Accessibility',
    icon: Mic,
    color: 'bg-peach text-amber-900',
    summary: 'Speak your dream outfit in Hindi, Telugu, Tamil, Bengali, or English. Our NLP parses traditional Indian terminology seamlessly.',
    fullDescription: 'Indian fashion has a rich cultural vocabulary — from "gota patti" and "angrakha" to "kancha cut" and "kalidar flare". Speak in your native mother tongue, and our bespoke AI parser extracts silhouette, embroidery style, and draping nuances effortlessly.',
    tryPath: '/signup',
    tryLabel: 'Try Voice Designer',
  },
  {
    id: 'feat_guarantee',
    title: '100% Fit Guarantee & Free Doorstep Fix',
    category: 'Peace of Mind',
    icon: ShieldCheck,
    color: 'bg-butter text-amber-900',
    summary: 'If any garment requires even a quarter-inch nip or tuck, our courier picks it up for complimentary artisan adjustment within 48h.',
    fullDescription: 'We stand behind every stitch. In the rare event that your outfit needs adjustment, simply mark the alteration points on our interactive body map. Our insured courier partner will pick it up at your door, deliver it to your designated master tailor, and return it hand-pressed within 48 hours — at absolutely zero extra cost.',
    tryPath: '/how-it-works',
    tryLabel: 'Read Guarantee Terms',
  },
];

export const FeatureGrid = () => {
  const { openDrawer } = useUI();
  const navigate = useNavigate();

  const handleOpenDetail = (feat) => {
    const Icon = feat.icon;
    openDrawer({
      title: feat.title,
      subtitle: feat.category,
      content: (
        <div className="space-y-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm bg-blush text-rose-deep">
            <Icon className="w-7 h-7" />
          </div>

          <p className="text-sm text-plum leading-relaxed">
            {feat.fullDescription}
          </p>

          <div className="p-4 rounded-3xl bg-cream border border-blush text-xs space-y-2">
            <div className="flex items-center gap-2 font-semibold text-plum">
              <Sparkles className="w-4 h-4 text-rose-deep" />
              <span>Atelier Advantage</span>
            </div>
            <p className="text-plum-soft">
              Direct connection with verified craftsmen eliminates middlemen markups and ensures 100% genuine handloom and zari work.
            </p>
          </div>

          <Button
            onClick={() => navigate(feat.tryPath)}
            variant="primary"
            size="md"
            icon={ArrowRight}
            className="w-full"
          >
            {feat.tryLabel}
          </Button>
        </div>
      ),
    });
  };

  return (
    <section className="py-20 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-deep bg-blush/60 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Why Stitchly
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum">
            The modern atelier advantage.
            <br />
            <span className="relative inline-block text-rose-deep">
              Crafted for bespoke perfection.
              <ChalkUnderline color="#F9D5DC" />
            </span>
          </h2>
          <p className="text-sm text-plum-soft mt-3">
            Click any pastel card to explore technical details and try the feature.
          </p>
        </div>

        {/* 6 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_DATA.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => handleOpenDetail(feat)}
                className="group cursor-pointer rounded-4xl bg-white/75 backdrop-blur-md border border-blush/70 p-7 shadow-pastel hover:shadow-soft-lift hover:border-rose-deep/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform ${feat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cream border border-blush/60 text-plum-soft">
                      {feat.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-plum group-hover:text-rose-deep transition-colors mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-plum-soft leading-relaxed">
                    {feat.summary}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-blush/40 flex items-center justify-between text-xs font-semibold text-rose-deep">
                  <span>Explore detail</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
