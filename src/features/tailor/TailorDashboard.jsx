import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, DollarSign, Clock, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import { useAuth } from '../../store/useAuth';
import Button from '../../components/ui/Button';

export const TailorDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Queue', value: '4 Outfits', icon: Clock, color: 'bg-mint text-emerald-900' },
    { label: 'This Month Earnings', value: '₹68,500', icon: DollarSign, color: 'bg-butter text-amber-900' },
    { label: 'Craft Rating', value: '4.96 ★', icon: Award, color: 'bg-blush text-rose-deep' },
    { label: 'Completed Deliveries', value: '420', icon: CheckCircle2, color: 'bg-sky text-sky-950' },
  ];

  const pendingQueue = [
    {
      id: 'ord_102',
      customer: 'Priya Sharma (Bengaluru)',
      garment: 'Pastel Mint Organza Anarkali Set',
      milestone: 'Embroidery & Gota Border Assembly',
      due: 'In 4 Days',
      amount: '₹14,200',
    },
    {
      id: 'ord_103',
      customer: 'Kavita Chawla (Delhi)',
      garment: 'Deep Magenta Velvet Bridal Choli',
      milestone: 'Pattern Drafting & Can-can Lining',
      due: 'In 7 Days',
      amount: '₹9,800',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-4xl bg-gradient-to-r from-mint/50 via-cream to-blush/30 border border-mint-dark/40 p-6 sm:p-8 shadow-pastel-mint flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 bg-white/80 px-3 py-1 rounded-full shadow-xs">
            Artisan Workshop
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-plum mt-2">
            Master {user?.name || 'Meera Devi'}’s Atelier
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft mt-1">
            Specialty: {user?.specialties ? user.specialties.join(', ') : 'Bridal Lehengas & Zardozi'} • Hub: {user?.city || 'Jaipur'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-emerald-700 text-white shadow-xs">
            ✓ Verified Karigar
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="p-5 rounded-3xl bg-white/85 border border-mint-dark/30 shadow-xs"
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-3 ${s.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-plum">
                {s.value}
              </div>
              <div className="text-xs text-plum-soft mt-0.5">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Active Orders in Progress */}
      <div className="rounded-4xl bg-white/85 backdrop-blur-md border border-mint-dark/30 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-blush/60 mb-6">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-emerald-800" />
            <h3 className="font-serif text-lg font-bold text-plum">
              Active Stitching Queue
            </h3>
          </div>
          <span className="text-xs text-plum-soft">2 In Progress</span>
        </div>

        <div className="space-y-4">
          {pendingQueue.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-cream border border-blush/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-plum">{item.garment}</span>
                  <span className="text-[10px] bg-mint text-emerald-900 font-semibold px-2 py-0.5 rounded-full">
                    {item.due}
                  </span>
                </div>
                <p className="text-xs text-plum-soft mt-1">
                  Client: <strong>{item.customer}</strong> • Current Step: {item.milestone}
                </p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="font-mono text-sm font-bold text-plum">{item.amount}</span>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-xl bg-mint hover:bg-mint-dark text-plum font-semibold text-xs transition-colors"
                >
                  Update Milestone Cam
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TailorDashboard;
