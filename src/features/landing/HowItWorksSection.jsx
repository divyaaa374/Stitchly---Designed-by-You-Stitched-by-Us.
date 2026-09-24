import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Mic, 
  Sparkles, 
  Sliders, 
  Scissors, 
  Eye, 
  PackageCheck,
  ChevronRight
} from 'lucide-react';
import { useUI } from '../../store/useUI';
import ChalkUnderline from '../../components/motifs/ChalkUnderline';
import Button from '../../components/ui/Button';

export const STEPS_DATA = [
  {
    step: 1,
    title: 'Describe',
    tagline: 'Speak or type your vision',
    icon: Mic,
    color: 'bg-blush text-rose-deep',
    summary: 'Tell Stitchly your occasion, desired silhouette, fabric preference, or color palette in English or regional voice dialects.',
    detail: 'Speak in Hindi, Telugu, Tamil, Bengali, or English: "Need a dusty lilac organza anarkali for my sister’s sangeet with pearl borders." Our AI parses your style parameters instantly.',
    previewImg: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
  },
  {
    step: 2,
    title: 'AI Designs',
    tagline: '4 bespoke sketches in 30s',
    icon: Sparkles,
    color: 'bg-lavender text-plum',
    summary: 'Our specialized Indian Haute Couture model generates 4 rendered silhouette variations with authentic embroidery details.',
    detail: 'Explore variations in flare volume, neckline cuts, zardozi vs. gota patti embellishments, and fabric drape simulations before a single thread is cut.',
    previewImg: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
  },
  {
    step: 3,
    title: 'Customize',
    tagline: 'Tweak necklines, lining & flare',
    icon: Sliders,
    color: 'bg-peach text-amber-900',
    summary: 'Adjust sleeve length, latkan styles, can-can volume, and select physical fabric swatches mailed to your doorstep.',
    detail: 'Add a sweetheart neckline, specify 2 inches extra inner margin, request heavy latkans with wedding initials, or upgrade to pure Banarasi Katan silk.',
    previewImg: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
  },
  {
    step: 4,
    title: 'Match Tailor',
    tagline: 'Paired with verified specialist',
    icon: Scissors,
    color: 'bg-mint text-emerald-900',
    summary: 'Our artisan matching algorithm pairs your garment with a master karigar in the authentic craft cluster.',
    detail: 'Zardozi lehengas route to 3rd-generation Jaipur masters; shadow-work chikankari connects to Lucknow artisans; South Indian temple borders route to Bengaluru weavers.',
    previewImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
  },
  {
    step: 5,
    title: 'Track Live',
    tagline: 'Video milestones from the loom',
    icon: Eye,
    color: 'bg-sky text-sky-950',
    summary: 'Receive milestone photos and video snippets as your fabric is dyed, cut, embroidered, and hand-stitched.',
    detail: 'Follow real-time progress on your tape-measure dashboard: Fabric Inspection → Pattern Draft → Karigar Hand-embroidery → Master Assembly → Quality Fit Check.',
    previewImg: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
  },
  {
    step: 6,
    title: 'Delivered',
    tagline: 'Hand-pressed to your doorstep',
    icon: PackageCheck,
    color: 'bg-butter text-amber-900',
    summary: 'Arrives in a bespoke atelier keepsake box with hanger and garment bag, backed by our 100% Free Alteration Guarantee.',
    detail: 'Try it in the comfort of your room. If anything needs even a quarter-inch tweak, our doorstep concierge picks it up for complimentary artisan adjustment.',
    previewImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  },
];

export const HowItWorksSection = () => {
  const { openModal } = useUI();
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const handleStepClick = (step) => {
    setActiveStepIdx(step.step - 1);
    openModal('stepPreview', {
      title: `Step ${step.step}: ${step.title}`,
      subtitle: step.tagline,
      content: (
        <div className="space-y-4">
          <div className="w-full h-52 rounded-3xl overflow-hidden shadow-md">
            <img
              src={step.previewImg}
              alt={step.title}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-plum leading-relaxed">{step.detail}</p>
          <div className="p-3 bg-blush/30 rounded-2xl border border-blush text-xs text-plum-soft flex items-center justify-between">
            <span>Guaranteed turnaround window</span>
            <strong className="text-plum">7 - 14 Days Doorstep</strong>
          </div>
        </div>
      ),
    });
  };

  return (
    <section className="py-20 bg-cream relative overflow-hidden" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-deep bg-blush/60 px-3.5 py-1.5 rounded-full inline-block mb-3">
            The Bespoke Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum">
            From your mind to your wardrobe.
            <br />
            <span className="relative inline-block text-rose-deep">
              Without visiting a single shop.
              <ChalkUnderline color="#F9D5DC" />
            </span>
          </h2>
          <p className="text-sm text-plum-soft mt-3">
            Click any step to reveal the artisan craft milestone behind it.
          </p>
        </div>

        {/* Horizontal Stitch-Line Timeline (Scrollable on mobile) */}
        <div className="relative overflow-x-auto pb-6 pt-2">
          {/* Connecting Stitch Line */}
          <div className="hidden md:block absolute top-12 left-12 right-12 h-0 border-t-2 border-dashed border-rose-deep/40 -z-0" />

          <div className="flex md:grid md:grid-cols-6 gap-4 min-w-[700px] md:min-w-0">
            {STEPS_DATA.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  onClick={() => handleStepClick(step)}
                  className="flex-1 flex flex-col items-center text-center group cursor-pointer p-4 rounded-3xl bg-white/70 backdrop-blur-sm border border-blush/50 hover:border-rose-deep/60 hover:shadow-soft-lift transition-all duration-300 relative select-none"
                >
                  {/* Step Bubble */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-sm relative z-10 ${step.color}`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-plum text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-plum group-hover:text-rose-deep transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[11px] font-medium text-rose-deep/90 mt-0.5">
                    {step.tagline}
                  </p>
                  <p className="text-[11px] text-plum-soft mt-2 leading-snug line-clamp-3">
                    {step.summary}
                  </p>

                  <span className="text-[10px] font-semibold text-plum mt-3 inline-flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    View milestone <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
