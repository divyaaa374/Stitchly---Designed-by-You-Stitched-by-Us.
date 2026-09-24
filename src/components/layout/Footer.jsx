import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Globe, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { useUI } from '../../store/useUI';
import { NeedleIcon, ScissorsIcon, PinIcon } from '../motifs/Doodles';
import StitchDivider from '../motifs/StitchDivider';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { addToast, language, setLanguage } = useUI();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast({
        title: 'Check your email address',
        message: 'Please enter a valid email to join our atelier newsletter.',
        type: 'warning',
      });
      return;
    }

    addToast({
      title: "You're on the Stitch List! 🧵",
      message: 'Look forward to weekly fabric drops, bridal moodboards, and craft tales.',
      type: 'success',
    });
    setEmail('');
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'bn', label: 'বাংলা' },
  ];

  return (
    <footer className="relative bg-white/70 border-t border-blush/60 pt-16 pb-12 overflow-hidden">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-blush/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-mint/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-blush flex items-center justify-center text-plum shadow-pastel">
                <NeedleIcon className="w-5 h-5 -rotate-12 text-rose-deep" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-plum">
                Stitchly
              </span>
            </Link>
            <p className="text-sm text-plum-soft max-w-sm leading-relaxed">
              Designed by you, stitched by master karigars. A two-sided online atelier connecting couture lovers with independent heritage tailors across India.
            </p>

            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscribe} className="pt-2 max-w-sm">
              <label htmlFor="footer-newsletter" className="block text-xs font-semibold text-plum mb-2">
                Join our Atelier Journal & Fabric Drops
              </label>
              <div className="relative flex items-center">
                <input
                  id="footer-newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-4 pr-12 py-2.5 text-xs bg-cream rounded-2xl border border-blush text-plum placeholder-plum-soft/60 focus:outline-none focus:ring-2 focus:ring-rose-deep/30"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 p-2 rounded-xl bg-rose-deep text-white hover:bg-rose-deep/90 transition-colors shadow-sm"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Column 2: Atelier Marketplace */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-plum mb-4">
              Atelier
            </h4>
            <ul className="space-y-2.5 text-xs text-plum-soft">
              <li>
                <Link to="/how-it-works" className="hover:text-rose-deep transition-colors">
                  How Virtual Tailoring Works
                </Link>
              </li>
              <li>
                <Link to="/tailors" className="hover:text-rose-deep transition-colors">
                  Master Karigar Directory
                </Link>
              </li>
              <li>
                <Link to="/inspiration" className="hover:text-rose-deep transition-colors">
                  Curated Lookbook
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-rose-deep transition-colors flex items-center gap-1 text-rose-deep font-semibold">
                  <Sparkles className="w-3 h-3" />
                  AI Studio Creator
                </Link>
              </li>
              <li>
                <span className="text-plum-soft/60 cursor-not-allowed">
                  Fabric Swatch Box (Coming in Part 2)
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Indian Crafts & Cities */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-plum mb-4">
              Craft Clusters
            </h4>
            <ul className="space-y-2.5 text-xs text-plum-soft">
              <li>
                <Link to="/tailors?city=Jaipur" className="hover:text-rose-deep transition-colors">
                  Jaipur Zardozi & Gota Patti
                </Link>
              </li>
              <li>
                <Link to="/tailors?city=Lucknow" className="hover:text-rose-deep transition-colors">
                  Lucknow Shadow Chikankari
                </Link>
              </li>
              <li>
                <Link to="/tailors?city=Hyderabad" className="hover:text-rose-deep transition-colors">
                  Hyderabadi Khada Dupattas
                </Link>
              </li>
              <li>
                <Link to="/tailors?city=Varanasi" className="hover:text-rose-deep transition-colors">
                  Varanasi Handloom Katan Silk
                </Link>
              </li>
              <li>
                <Link to="/tailors?city=Bengaluru" className="hover:text-rose-deep transition-colors">
                  South Indian Temple Borders
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Tailors & Regional Language */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-plum mb-4">
              Artisan Guild
            </h4>
            <ul className="space-y-2.5 text-xs text-plum-soft mb-6">
              <li>
                <Link to="/signup" className="hover:text-rose-deep transition-colors font-medium text-plum">
                  Join as an Artisan / Tailor
                </Link>
              </li>
              <li>
                <span className="text-plum-soft/80 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Fit Guarantee
                </span>
              </li>
              <li>
                <Link to="/login" className="hover:text-rose-deep transition-colors">
                  Tailor Atelier Portal
                </Link>
              </li>
            </ul>

            {/* Language Switcher */}
            <div className="pt-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-plum mb-2">
                <Globe className="w-3.5 h-3.5 text-rose-deep" />
                <span>Regional Atelier Language</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      addToast({
                        title: `Language changed to ${lang.label}`,
                        message: `Voice prompts and UI dialect will now tailor to ${lang.label}.`,
                        type: 'info',
                      });
                    }}
                    className={`px-2.5 py-1 text-[11px] rounded-lg border transition-all ${
                      language === lang.code
                        ? 'bg-plum text-cream border-plum font-semibold'
                        : 'bg-white/80 text-plum-soft border-blush hover:border-plum'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stitch Line Divider */}
        <StitchDivider withIcon="scissors" className="opacity-70 my-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-plum-soft pt-2">
          <p>© {new Date().getFullYear()} Stitchly Inc. Crafted with care for Indian Haute Couture.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-[11px]">
              <PinIcon className="w-3.5 h-3.5" fillColor="#D9718A" />
              Serving 42 Indian Cities
            </span>
            <span className="text-plum-soft/40">•</span>
            <span className="text-[11px]">Zero Shop Visits</span>
            <span className="text-plum-soft/40">•</span>
            <span className="text-[11px]">Bespoke Craftsmanship</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
