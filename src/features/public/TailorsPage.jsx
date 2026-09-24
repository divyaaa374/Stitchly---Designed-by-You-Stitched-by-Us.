import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, ShieldCheck, Sparkles, Filter, Award, ChevronRight } from 'lucide-react';
import { TAILORS_LIST } from '../../data/tailorsData';
import { useUI } from '../../store/useUI';
import Button from '../../components/ui/Button';
import Chip from '../../components/ui/Chip';
import ChalkUnderline from '../../components/motifs/ChalkUnderline';

export const TailorsPage = () => {
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get('city') || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const { openModal } = useUI();
  const navigate = useNavigate();

  const cities = ['All', 'Jaipur', 'Lucknow', 'Hyderabad', 'Bengaluru', 'Delhi', 'Varanasi'];
  const specialties = [
    'All',
    'Bridal Lehengas',
    'Chikankari Kurta Sets',
    'Cutwork Blouses',
    'Royal Sherwanis',
    'Zardozi & Gota Patti',
  ];

  const filteredTailors = useMemo(() => {
    return TAILORS_LIST.filter((tailor) => {
      const matchesCity = selectedCity === 'All' || tailor.city.toLowerCase() === selectedCity.toLowerCase();
      const matchesSpecialty =
        selectedSpecialty === 'All' ||
        tailor.specialties.some((s) => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));
      const matchesQuery =
        searchQuery === '' ||
        tailor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tailor.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tailor.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCity && matchesSpecialty && matchesQuery;
    });
  }, [selectedCity, selectedSpecialty, searchQuery]);

  const handleCommissionClick = (tailor) => {
    openModal('commissionAtelier', {
      title: `Commission ${tailor.name}`,
      subtitle: `${tailor.city}, ${tailor.state} • ${tailor.badge}`,
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-cream rounded-2xl border border-blush">
            <img
              src={tailor.avatar}
              alt={tailor.name}
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div>
              <h4 className="font-serif text-sm font-bold text-plum">{tailor.name}</h4>
              <p className="text-xs text-plum-soft">Starting from {tailor.startingPrice} • {tailor.turnaroundDays}</p>
            </div>
          </div>
          <p className="text-xs text-plum-soft">
            To book this master karigar’s dedicated loom, please sign in or register your couture profile.
          </p>
          <Button
            onClick={() => navigate('/signup')}
            variant="primary"
            size="md"
            icon={Sparkles}
            className="w-full"
          >
            Sign Up & Reserve Slot
          </Button>
        </div>
      ),
    });
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-mint px-3.5 py-1.5 rounded-full inline-block mb-3">
          Artisan Guild Directory
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-plum">
          Verified Master Karigars & Tailors.{' '}
          <br className="hidden sm:inline" />
          <span className="relative inline-block text-rose-deep">
            Directly from craft hubs.
            <ChalkUnderline color="#D5EFE3" />
          </span>
        </h1>
        <p className="text-sm sm:text-base text-plum-soft mt-3">
          Every tailor is vetted for heritage craft mastery, ethically compensated with direct wages, and backed by Stitchly's 100% Fit Guarantee.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white/80 backdrop-blur-md rounded-4xl border border-blush/80 p-5 sm:p-6 shadow-pastel mb-12 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-plum-soft absolute left-4 top-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by karigar name, city (Jaipur, Lucknow) or craft (Zardozi, Chikankari)..."
            className="w-full pl-11 pr-4 py-3.5 text-xs sm:text-sm bg-cream rounded-2xl border border-blush text-plum placeholder-plum-soft/60 focus:outline-none focus:ring-2 focus:ring-rose-deep/30"
          />
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="font-semibold text-plum shrink-0 flex items-center gap-1 text-[11px] mr-1">
            <MapPin className="w-3.5 h-3.5 text-rose-deep" />
            Craft Cluster:
          </span>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap text-xs ${
                selectedCity === city
                  ? 'bg-rose-deep text-white border-rose-deep font-semibold shadow-xs'
                  : 'bg-cream text-plum border-blush hover:bg-blush/30'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Specialty Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="font-semibold text-plum shrink-0 flex items-center gap-1 text-[11px] mr-1">
            <Sparkles className="w-3.5 h-3.5 text-rose-deep" />
            Specialty:
          </span>
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap text-xs ${
                selectedSpecialty === spec
                  ? 'bg-emerald-800 text-white border-emerald-800 font-semibold shadow-xs'
                  : 'bg-cream text-plum border-mint hover:bg-mint/30'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Tailor Cards Grid */}
      {filteredTailors.length === 0 ? (
        <div className="text-center py-16 bg-white/60 rounded-4xl border border-blush">
          <p className="text-base text-plum font-serif">No artisans match your current filter.</p>
          <p className="text-xs text-plum-soft mt-1">Try resetting city or specialty filters.</p>
          <Button
            onClick={() => {
              setSelectedCity('All');
              setSelectedSpecialty('All');
              setSearchQuery('');
            }}
            variant="secondary"
            size="sm"
            className="mt-4"
          >
            Reset All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTailors.map((tailor, idx) => (
            <motion.div
              key={tailor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="rounded-4xl bg-white/85 backdrop-blur-md border border-mint/70 p-6 shadow-pastel-mint flex flex-col justify-between"
            >
              <div>
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
                    <h3 className="font-serif text-base font-bold text-plum truncate">
                      {tailor.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-plum-soft mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-deep shrink-0" />
                      <span>{tailor.city}, {tailor.state}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-plum-soft leading-relaxed line-clamp-3 mb-4">
                  {tailor.bio}
                </p>

                {/* Rating & Orders */}
                <div className="flex items-center justify-between text-xs py-2 px-3 bg-cream rounded-2xl border border-blush/60 mb-4">
                  <div className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span>{tailor.rating}</span>
                    <span className="text-plum-soft font-normal text-[11px]">
                      ({tailor.reviewCount})
                    </span>
                  </div>
                  <span className="text-plum-soft text-[11px]">
                    {tailor.ordersCompleted}+ Outfits Completed
                  </span>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tailor.specialties.map((spec) => (
                    <Chip key={spec} variant="mint" size="sm">
                      {spec}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* Card Action */}
              <div className="pt-4 border-t border-blush/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-plum-soft block">Starting at</span>
                  <strong className="text-plum font-serif text-sm">{tailor.startingPrice}</strong>
                </div>
                <Button
                  onClick={() => handleCommissionClick(tailor)}
                  variant="primary"
                  size="sm"
                >
                  Commission Artisan
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TailorsPage;
