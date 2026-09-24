import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Scissors, 
  Upload, 
  Check, 
  User, 
  Mail, 
  Lock, 
  MapPin, 
  FileText,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../store/useAuth';
import { useUI } from '../../store/useUI';
import { NeedleIcon, PinIcon } from '../../components/motifs/Doodles';
import Button from '../../components/ui/Button';

export const SignupPage = () => {
  const [role, setRole] = useState('customer'); // 'customer' or 'tailor'
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [kycFileName, setKycFileName] = useState('');
  const [kycBase64, setKycBase64] = useState('');
  const [errors, setErrors] = useState({});

  const { signup, isLoading, authError, clearError } = useAuth();
  const { addToast } = useUI();
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, kyc: 'File size must be under 2MB.' }));
      return;
    }

    setKycFileName(file.name);
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setKycBase64(uploadEvent.target.result);
      setErrors((prev) => ({ ...prev, kyc: null }));
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Please tell us your full name.';
    if (!emailOrPhone.trim()) {
      errs.emailOrPhone = 'Email or phone number is required.';
    }
    if (!password || password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (role === 'tailor') {
      if (!city.trim()) errs.city = 'Please indicate your workshop city (e.g. Jaipur, Lucknow).';
      if (!specialty.trim()) errs.specialty = 'Please select or type your primary stitching specialty.';
      if (!kycBase64) {
        errs.kyc = 'Please upload a craft license, Aadhaar card, or workshop certificate.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    if (!validate()) return;

    try {
      const user = await signup({
        name,
        emailOrPhone,
        password,
        role,
        city: role === 'tailor' ? city : undefined,
        specialty: role === 'tailor' ? specialty : undefined,
        kycDocument: role === 'tailor' ? kycBase64 : undefined,
      });

      addToast({
        title: `Welcome to Stitchly, ${user.name}! 🧵`,
        message: role === 'tailor'
          ? 'Your atelier workshop account is created. KYC is under review.'
          : 'Your couture client account is ready to design!',
        type: 'success',
      });

      navigate('/onboarding');
    } catch (err) {
      // Error handled by store
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center relative">
      {/* Decorative Atelier background glow */}
      <div className="absolute top-1/6 left-1/4 w-96 h-96 bg-blush/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/6 right-1/4 w-96 h-96 bg-mint/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-xl w-full bg-white/85 backdrop-blur-xl rounded-4xl border border-blush/70 p-8 sm:p-10 shadow-pastel text-plum">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-blush flex items-center justify-center shadow-pastel mb-3 border border-white">
            <NeedleIcon className="w-6 h-6 text-rose-deep -rotate-12" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-plum">
            Join the Stitchly Atelier
          </h2>
          <p className="text-xs text-plum-soft mt-1.5 max-w-sm mx-auto">
            Choose your journey: Create bespoke garments as a client, or open your master craft workshop.
          </p>
        </div>

        {/* Role Choice: Two Large Pastel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Customer Card */}
          <div
            onClick={() => setRole('customer')}
            className={`p-5 rounded-3xl border-2 cursor-pointer transition-all duration-300 relative select-none ${
              role === 'customer'
                ? 'bg-blush/40 border-rose-deep shadow-pastel ring-2 ring-blush-dark/50'
                : 'bg-white/60 border-blush/60 hover:bg-blush/20'
            }`}
          >
            {role === 'customer' && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-rose-deep text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </div>
            )}
            <div className="w-10 h-10 rounded-2xl bg-blush flex items-center justify-center text-rose-deep mb-3 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-plum">
              I am a Customer
            </h3>
            <p className="text-[11px] text-plum-soft mt-1 leading-relaxed">
              Design outfits with AI, match with regional karigars, and order bridal or festive wear with zero shop visits.
            </p>
          </div>

          {/* Tailor Card */}
          <div
            onClick={() => setRole('tailor')}
            className={`p-5 rounded-3xl border-2 cursor-pointer transition-all duration-300 relative select-none ${
              role === 'tailor'
                ? 'bg-mint/40 border-emerald-700 shadow-pastel-mint ring-2 ring-mint-dark/50'
                : 'bg-white/60 border-mint/60 hover:bg-mint/20'
            }`}
          >
            {role === 'tailor' && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </div>
            )}
            <div className="w-10 h-10 rounded-2xl bg-mint flex items-center justify-center text-emerald-800 mb-3 shadow-sm">
              <Scissors className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-plum">
              I am a Master Tailor
            </h3>
            <p className="text-[11px] text-plum-soft mt-1 leading-relaxed">
              Receive verified orders, showcase your heritage embroidery, set your prices, and earn fair direct payouts.
            </p>
          </div>
        </div>

        {/* Error notification banner */}
        {authError && (
          <div className="mb-5 p-3 rounded-2xl bg-blush-light border border-rose-deep/40 text-xs text-rose-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-rose-deep shrink-0 mt-0.5" />
            <span>{authError}</span>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-plum mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-plum-soft absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
                placeholder={role === 'tailor' ? 'Master Meera Devi' : 'Priya Sharma'}
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-cream rounded-2xl border border-blush text-plum placeholder-plum-soft/60 input-thread-focus"
              />
            </div>
            {errors.name && (
              <p className="text-[11px] text-rose-deep mt-1 ml-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-plum mb-1.5">
              Email Address or Phone Number
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-plum-soft absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => {
                  setEmailOrPhone(e.target.value);
                  if (errors.emailOrPhone) setErrors({ ...errors, emailOrPhone: null });
                }}
                placeholder="meera@tailors.stitchly.app or +91 98111 22334"
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-cream rounded-2xl border border-blush text-plum placeholder-plum-soft/60 input-thread-focus"
              />
            </div>
            {errors.emailOrPhone && (
              <p className="text-[11px] text-rose-deep mt-1 ml-1">{errors.emailOrPhone}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-plum mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-plum-soft absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-cream rounded-2xl border border-blush text-plum placeholder-plum-soft/60 input-thread-focus"
              />
            </div>
            {errors.password && (
              <p className="text-[11px] text-rose-deep mt-1 ml-1">{errors.password}</p>
            )}
          </div>

          {/* TAILOR SPECIFIC FIELDS */}
          {role === 'tailor' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pt-2 border-t border-mint-dark/30"
            >
              <div className="p-3 bg-mint/30 rounded-2xl border border-mint-dark/40 text-xs text-plum">
                <strong>Artisan Guild Onboarding:</strong> Tailor applications undergo quick identity and craft validation before live commission dispatch.
              </div>

              <div>
                <label className="block text-xs font-semibold text-plum mb-1.5">
                  Workshop City & State
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-plum-soft absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (errors.city) setErrors({ ...errors, city: null });
                    }}
                    placeholder="e.g. Jaipur, Rajasthan or Lucknow, UP"
                    className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-cream rounded-2xl border border-mint text-plum placeholder-plum-soft/60 input-thread-focus"
                  />
                </div>
                {errors.city && (
                  <p className="text-[11px] text-rose-deep mt-1 ml-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-plum mb-1.5">
                  Primary Tailoring Specialty
                </label>
                <select
                  value={specialty}
                  onChange={(e) => {
                    setSpecialty(e.target.value);
                    if (errors.specialty) setErrors({ ...errors, specialty: null });
                  }}
                  className="w-full px-4 py-3 text-xs sm:text-sm bg-cream rounded-2xl border border-mint text-plum focus:outline-none focus:border-emerald-700"
                >
                  <option value="">Select your craft specialty...</option>
                  <option value="Bridal Lehengas & Heavy Zardozi">Bridal Lehengas & Heavy Zardozi</option>
                  <option value="Chikankari & Shadow-work Kurta Sets">Chikankari & Shadow-work Kurta Sets</option>
                  <option value="Cutwork & Structured Blouses">Cutwork & Structured Blouses</option>
                  <option value="Royal Sherwanis & Angrakhas">Royal Sherwanis & Angrakhas</option>
                  <option value="Handloom Katan Silk & Temple Drapes">Handloom Katan Silk & Temple Drapes</option>
                </select>
                {errors.specialty && (
                  <p className="text-[11px] text-rose-deep mt-1 ml-1">{errors.specialty}</p>
                )}
              </div>

              {/* KYC Document Upload (Stored as Base64) */}
              <div>
                <label className="block text-xs font-semibold text-plum mb-1.5">
                  KYC Verification Document (ID / Craft Certificate)
                </label>
                <div className="relative border-2 border-dashed border-mint-dark/50 rounded-2xl p-4 bg-cream text-center hover:bg-mint/10 transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="kyc-upload"
                  />
                  <div className="flex flex-col items-center gap-1.5 pointer-events-none">
                    <Upload className="w-5 h-5 text-emerald-800" />
                    <span className="text-xs font-medium text-plum">
                      {kycFileName ? `Uploaded: ${kycFileName}` : 'Click or drop your document here (JPG, PNG, PDF)'}
                    </span>
                    <span className="text-[10px] text-plum-soft">
                      {kycBase64 ? '✓ Stored securely as Base64 verification token' : 'Max size 2MB'}
                    </span>
                  </div>
                </div>
                {errors.kyc && (
                  <p className="text-[11px] text-rose-deep mt-1 ml-1">{errors.kyc}</p>
                )}
              </div>
            </motion.div>
          )}

          <Button
            type="submit"
            variant={role === 'tailor' ? 'tailor' : 'primary'}
            size="lg"
            isLoading={isLoading}
            className="w-full mt-4"
            icon={ChevronRight}
          >
            {role === 'tailor' ? 'Submit Tailor Application' : 'Create Atelier Account'}
          </Button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-blush/60 text-center text-xs text-plum-soft">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-bold text-rose-deep hover:underline"
          >
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
