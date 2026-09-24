import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Ruler, 
  MapPin, 
  Check, 
  ArrowRight, 
  ChevronRight,
  Heart,
  Palette
} from 'lucide-react';
import { useAuth } from '../../store/useAuth';
import Stepper from '../../components/ui/Stepper';
import Button from '../../components/ui/Button';
import Chip from '../../components/ui/Chip';

export const OnboardingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  // Customer preferences
  const [selectedStyles, setSelectedStyles] = useState(['Bridal Lehengas', 'Festive Kurta Sets']);
  const [measurementMode, setMeasurementMode] = useState('saved'); // 'saved', 'camera', 'sample'
  const [preferredCity, setPreferredCity] = useState('Jaipur');

  const steps = [
    { label: 'Couture Taste', sublabel: 'Silhouettes' },
    { label: 'Measurements', sublabel: 'Fit Profile' },
    { label: 'Karigar City', sublabel: 'Artisan Match' },
  ];

  const styleOptions = [
    'Bridal Lehengas',
    'Festive Kurta Sets',
    'Designer Blouses',
    'Royal Sherwanis',
    'Chikankari Anarkalis',
    'Banarasi Brocades',
    'Gota Patti Shararas',
  ];

  const toggleStyle = (style) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const handleFinish = () => {
    if (user?.role === 'tailor') {
      navigate('/tailor');
    } else if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/app');
    }
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white/85 backdrop-blur-xl rounded-4xl border border-blush/70 p-8 sm:p-10 shadow-pastel text-plum">
        {/* Progress Stepper */}
        <div className="mb-10">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Dynamic Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-deep bg-blush/50 px-3 py-1 rounded-full">
                  Step 1 of 3
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-plum mt-2">
                  What custom silhouettes inspire you?
                </h2>
                <p className="text-xs text-plum-soft mt-1">
                  We'll customize your AI Studio prompts and artisan match queue.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 justify-center py-4">
                {styleOptions.map((style) => {
                  const isSelected = selectedStyles.includes(style);
                  return (
                    <button
                      key={style}
                      type="button"
                      onClick={() => toggleStyle(style)}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'bg-rose-deep text-white border-rose-deep shadow-pastel'
                          : 'bg-cream text-plum border-blush hover:bg-blush/30'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '} {style}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4 border-t border-blush/60">
                <Button
                  onClick={() => setCurrentStep(1)}
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                >
                  Continue to Fit Setup
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-deep bg-blush/50 px-3 py-1 rounded-full">
                  Step 2 of 3
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-plum mt-2">
                  How would you like to provide measurements?
                </h2>
                <p className="text-xs text-plum-soft mt-1">
                  Stitchly guarantees 100% fit with zero shop visits.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 py-3">
                <div
                  onClick={() => setMeasurementMode('saved')}
                  className={`p-4 rounded-3xl border cursor-pointer transition-all ${
                    measurementMode === 'saved'
                      ? 'bg-blush/40 border-rose-deep ring-2 ring-blush-dark/50'
                      : 'bg-cream border-blush hover:bg-blush/20'
                  }`}
                >
                  <Ruler className="w-5 h-5 text-rose-deep mb-2" />
                  <h4 className="font-serif text-sm font-bold text-plum">Manual Tape Entry</h4>
                  <p className="text-[11px] text-plum-soft mt-1">
                    Enter bust, waist, hips, and shoulder inches with our visual guide.
                  </p>
                </div>

                <div
                  onClick={() => setMeasurementMode('camera')}
                  className={`p-4 rounded-3xl border cursor-pointer transition-all ${
                    measurementMode === 'camera'
                      ? 'bg-blush/40 border-rose-deep ring-2 ring-blush-dark/50'
                      : 'bg-cream border-blush hover:bg-blush/20'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-rose-deep mb-2" />
                  <h4 className="font-serif text-sm font-bold text-plum">AI Phone Scanner</h4>
                  <p className="text-[11px] text-plum-soft mt-1">
                    Capture 2 full-body photos in fitted clothing for 3D body mesh.
                  </p>
                </div>

                <div
                  onClick={() => setMeasurementMode('sample')}
                  className={`p-4 rounded-3xl border cursor-pointer transition-all ${
                    measurementMode === 'sample'
                      ? 'bg-blush/40 border-rose-deep ring-2 ring-blush-dark/50'
                      : 'bg-cream border-blush hover:bg-blush/20'
                  }`}
                >
                  <Heart className="w-5 h-5 text-rose-deep mb-2" />
                  <h4 className="font-serif text-sm font-bold text-plum">Send Best-Fitting Garment</h4>
                  <p className="text-[11px] text-plum-soft mt-1">
                    Our insured courier picks up your favorite kurta or blouse to clone.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-blush/60">
                <Button
                  onClick={() => setCurrentStep(0)}
                  variant="secondary"
                  size="md"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setCurrentStep(2)}
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                >
                  Continue to Craft Cluster
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-deep bg-blush/50 px-3 py-1 rounded-full">
                  Step 3 of 3
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-plum mt-2">
                  Pick your preferred artisan hub
                </h2>
                <p className="text-xs text-plum-soft mt-1">
                  You can always switch or pick tailors nationwide for each garment.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3">
                {[
                  { city: 'Jaipur', craft: 'Zardozi & Gota Patti' },
                  { city: 'Lucknow', craft: 'Mukaish & Chikankari' },
                  { city: 'Hyderabad', craft: 'Khada Dupatta & Cutwork' },
                  { city: 'Varanasi', craft: 'Katan Banarasi Silk' },
                ].map((item) => (
                  <div
                    key={item.city}
                    onClick={() => setPreferredCity(item.city)}
                    className={`p-3.5 rounded-2xl border text-center cursor-pointer transition-all ${
                      preferredCity === item.city
                        ? 'bg-mint/40 border-mint-dark ring-2 ring-mint-dark/50'
                        : 'bg-cream border-blush hover:bg-mint/10'
                    }`}
                  >
                    <MapPin className="w-4 h-4 mx-auto mb-1 text-emerald-800" />
                    <h5 className="font-serif text-xs font-bold text-plum">{item.city}</h5>
                    <p className="text-[10px] text-plum-soft mt-0.5">{item.craft}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-blush/60">
                <Button
                  onClick={() => setCurrentStep(1)}
                  variant="secondary"
                  size="md"
                >
                  Back
                </Button>
                <Button
                  onClick={handleFinish}
                  variant="primary"
                  size="md"
                  icon={Check}
                >
                  Enter My Atelier Studio
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingPage;
