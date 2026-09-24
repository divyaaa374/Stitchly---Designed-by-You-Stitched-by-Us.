import React from 'react';
import { Award, MapPin, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import { useAuth } from '../../store/useAuth';
import Chip from '../../components/ui/Chip';

export const TailorProfile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-mint-dark/30">
        <h1 className="font-serif text-2xl font-bold text-plum">
          Master Karigar Atelier Profile
        </h1>
        <p className="text-xs text-plum-soft mt-0.5">
          Public client-facing credentials, guild verification, and craft badges.
        </p>
      </div>

      <div className="rounded-4xl bg-white/85 border border-mint-dark/40 p-6 sm:p-8 shadow-pastel-mint space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'}
            alt={user?.name}
            className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-md"
          />
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-2xl font-bold text-plum">
                {user?.name || 'Master Meera Devi'}
              </h2>
              {user?.verified && (
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Master
                </span>
              )}
            </div>
            <p className="text-xs text-plum-soft flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-deep" />
              {user?.city || 'Jaipur, Rajasthan'} • 18 years heritage practice
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-700 font-semibold pt-1">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>4.96 Rating (142 verified client reviews)</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-blush/60 space-y-3">
          <h4 className="font-serif text-sm font-bold text-plum">Craft Specialties:</h4>
          <div className="flex flex-wrap gap-2">
            {(user?.specialties || ['Bridal Lehengas', 'Zardozi & Gota Patti', 'Silk Draping']).map((s) => (
              <Chip key={s} variant="mint" size="md">
                {s}
              </Chip>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-mint/30 border border-mint-dark/30 text-xs text-plum space-y-1">
          <strong>KYC Document Status:</strong>{' '}
          <span className="text-emerald-800 font-semibold capitalize">{user?.kycStatus || 'Approved'}</span>
          <p className="text-plum-soft text-[11px]">
            Identity and artisan verification documents are stored securely as base64 tokens in Stitchly DB.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TailorProfile;
