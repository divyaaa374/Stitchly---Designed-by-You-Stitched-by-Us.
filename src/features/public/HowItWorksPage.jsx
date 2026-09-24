import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Ruler, 
  Scissors, 
  Video, 
  Truck, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight,
  Heart,
  Check
} from 'lucide-react';
import { STEPS_DATA } from '../landing/HowItWorksSection';
import Button from '../../components/ui/Button';
import TapeMeasure from '../../components/motifs/TapeMeasure';
import ChalkUnderline from '../../components/motifs/ChalkUnderline';

export const HowItWorksPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  const faqs = [
    {
      q: 'How does Stitchly ensure my garment fits with zero shop visits?',
      a: 'We combine three verification layers: (1) Our 3D body estimation mesh that converts two smartphone photos into 28 body measurements, (2) Optional doorstep pickup of your best-fitting blouse or kurta to replicate armhole and dart placements, and (3) Our master tailors automatically add a 1.5-inch inner fabric seam allowance for effortless future tailoring.',
    },
    {
      q: 'What if my finished outfit needs an alteration?',
      a: 'Every Stitchly garment is backed by our 100% Free Doorstep Alteration Guarantee. If any seam requires even a quarter-inch adjustment, simply request an alteration on your order dashboard within 7 days of delivery. Our courier will pick up the garment, your master tailor will adjust it, and return it hand-pressed within 48 to 72 hours.',
    },
    {
      q: 'Can I provide my own heirloom fabric (e.g. vintage Banarasi or mother’s saree)?',
      a: 'Yes! In our studio setup, select "I have my own fabric". Our insured courier partner will pick up your fabric from your home, photograph and log the yardage into your atelier vault, and deliver it safely to your matched master tailor.',
    },
    {
      q: 'How are master tailors selected and verified?',
      a: 'Tailors must have a minimum of 5 years of verified experience in their specialized Indian craft (Zardozi, Chikankari, Banarasi, etc.), pass an in-person physical sample stitch inspection by our atelier curators, and maintain an ongoing customer satisfaction rating above 4.8 stars.',
    },
  ];

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-rose-deep bg-blush/60 px-3.5 py-1.5 rounded-full inline-block mb-3">
          Virtual Atelier Architecture
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-plum">
          How Stitchly re-engineers{' '}
          <br className="hidden sm:inline" />
          <span className="relative inline-block text-rose-deep">
            bespoke Indian tailoring.
            <ChalkUnderline color="#F9D5DC" />
          </span>
        </h1>
        <p className="text-sm sm:text-base text-plum-soft mt-4 leading-relaxed">
          From AI design ideation and artisan matching to live video milestones and doorstep delivery — here is every detail of how your bespoke garments are created.
        </p>
      </div>

      {/* 6 Comprehensive Step Walkthroughs */}
      <div className="space-y-12 max-w-5xl mx-auto mb-20">
        {STEPS_DATA.map((step, idx) => {
          const Icon = step.icon;
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 items-center bg-white/80 backdrop-blur-md rounded-4xl border border-blush/70 p-6 sm:p-10 shadow-pastel`}
            >
              {/* Visual Preview */}
              <div className="w-full md:w-1/2 h-64 sm:h-72 rounded-3xl overflow-hidden shadow-md relative bg-cream">
                <img
                  src={step.previewImg}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-plum shadow-xs">
                  Stage {step.step} of 6
                </div>
              </div>

              {/* Text Description */}
              <div className="w-full md:w-1/2 space-y-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${step.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-plum">
                  {step.step}. {step.title}: {step.tagline}
                </h3>
                <p className="text-sm text-plum-soft leading-relaxed">
                  {step.detail}
                </p>

                {/* Progress Tape illustration for tracking step */}
                {step.step === 5 && (
                  <div className="pt-2">
                    <TapeMeasure progress={75} label="Live Stitch Milestone Tracker" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Measurement Tech Spotlight Banner */}
      <div className="max-w-5xl mx-auto rounded-5xl bg-gradient-to-r from-mint/40 via-cream to-blush/40 border border-mint-dark/40 p-8 sm:p-12 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 bg-mint px-3 py-1 rounded-full">
              Proprietary Fit Engineering
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-plum">
              Never visit an awkward trial room again.
            </h3>
            <p className="text-sm text-plum-soft leading-relaxed">
              Our 3D photo mesh scans posture curve, shoulder slope, and bust point depth. Every order comes with generous 1.5-inch inner fabric margins and video styling consultations.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-plum">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                100% Free Doorstep Alterations
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                Insured Doorstep Sample Pickup
              </span>
            </div>
          </div>
          <div className="md:col-span-4 flex justify-center">
            <Button
              onClick={() => navigate('/signup')}
              variant="primary"
              size="lg"
              icon={Sparkles}
            >
              Start Your Design
            </Button>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="font-serif text-3xl font-bold text-plum">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-plum-soft mt-1">
            Everything you need to know about custom couture without shop visits.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="rounded-3xl bg-white/80 border border-blush/70 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-bold text-plum hover:text-rose-deep transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-plum-soft shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-rose-deep' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 text-xs sm:text-sm text-plum-soft leading-relaxed border-t border-blush/40 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
