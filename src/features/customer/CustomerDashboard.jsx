import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag, Ruler, Clock, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useAuth } from '../../store/useAuth';
import TapeMeasure from '../../components/motifs/TapeMeasure';
import Button from '../../components/ui/Button';

export const CustomerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const orders = user?.orders || [
    {
      id: 'ord_102',
      title: 'Pastel Mint Organza Anarkali Set with Pearl Hem',
      category: 'Festive Anarkali',
      tailorName: 'Fatima Noor',
      status: 'In Tailoring',
      progress: 65,
      currentStep: 'Hand-sewing Gota Patti Borders & Tassels',
      price: '₹14,200',
      estimatedDelivery: '28 Sep 2026',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'ord_101',
      title: 'Crimson Raw Silk Bridal Lehenga with Peacock Zardozi',
      category: 'Bridal Lehenga',
      tailorName: 'Master Meera Devi',
      status: 'Delivered',
      progress: 100,
      currentStep: 'Delivered to Doorstep in Bespoke Box',
      price: '₹28,500',
      orderDate: '15 Aug 2026',
      deliveryDate: '28 Aug 2026',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const activeOrder = orders.find((o) => o.status !== 'Delivered') || orders[0];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-4xl bg-gradient-to-r from-blush/60 via-cream to-lavender/40 border border-blush p-6 sm:p-8 shadow-pastel flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-deep bg-white/80 px-3 py-1 rounded-full shadow-xs">
            Client Atelier Space
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-plum mt-2">
            Namaste, {user?.name || 'Priya'} ✨
          </h1>
          <p className="text-xs sm:text-sm text-plum-soft mt-1">
            Your custom garments are being hand-crafted across Jaipur and Hyderabad.
          </p>
        </div>

        <Button
          onClick={() => navigate('/signup')}
          variant="primary"
          size="md"
          icon={Sparkles}
        >
          Design New Outfit
        </Button>
      </div>

      {/* Active Order Spotlight */}
      {activeOrder && (
        <div className="rounded-4xl bg-white/85 backdrop-blur-md border border-blush p-6 sm:p-8 shadow-pastel">
          <div className="flex items-center justify-between pb-4 border-b border-blush/60 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-deep" />
              <h3 className="font-serif text-lg font-bold text-plum">
                Live Garment in Progress
              </h3>
            </div>
            <Link
              to="/app/orders"
              className="text-xs text-rose-deep font-semibold hover:underline flex items-center gap-1"
            >
              All Orders <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-3 h-44 rounded-2xl overflow-hidden bg-cream">
              <img
                src={activeOrder.image}
                alt={activeOrder.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-9 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-mint text-emerald-900">
                  {activeOrder.status}
                </span>
                <span className="font-mono text-sm font-bold text-plum">
                  {activeOrder.price}
                </span>
              </div>

              <h4 className="font-serif text-base sm:text-lg font-bold text-plum">
                {activeOrder.title}
              </h4>

              <p className="text-xs text-plum-soft">
                Master Artisan: <strong>{activeOrder.tailorName}</strong> • Est. Delivery:{' '}
                <strong>{activeOrder.estimatedDelivery || 'In 6 Days'}</strong>
              </p>

              {/* Tape measure progress bar */}
              <div className="pt-2">
                <TapeMeasure
                  progress={activeOrder.progress}
                  label={`Current Milestone: ${activeOrder.currentStep}`}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Measurements Quick Preview & Studio Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Measurements Card */}
        <div className="rounded-4xl bg-white/80 border border-blush p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-rose-deep" />
                <h4 className="font-serif text-base font-bold text-plum">
                  Your 3D Fit Profile
                </h4>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-mint/50 px-2 py-0.5 rounded-full">
                Verified Fit
              </span>
            </div>

            <p className="text-xs text-plum-soft mb-4">
              Stored body parameters calibrated for blouse darts, lehenga waist drops, and comfort ease.
            </p>

            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-cream border border-blush">
                <span className="text-[10px] text-plum-soft block">Bust</span>
                <strong className="text-plum font-mono">34"</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-cream border border-blush">
                <span className="text-[10px] text-plum-soft block">Waist</span>
                <strong className="text-plum font-mono">28"</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-cream border border-blush">
                <span className="text-[10px] text-plum-soft block">Hips</span>
                <strong className="text-plum font-mono">38"</strong>
              </div>
            </div>
          </div>

          <Link
            to="/app/measurements"
            className="mt-6 text-xs text-rose-deep font-semibold flex items-center justify-between pt-3 border-t border-blush/60"
          >
            <span>Update Measurements & Seam Margins</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Wedding Room Co-Op Card */}
        <div className="rounded-4xl bg-white/80 border border-blush p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-rose-deep" />
              <h4 className="font-serif text-base font-bold text-plum">
                Group Wedding Party Room
              </h4>
            </div>
            <p className="text-xs text-plum-soft leading-relaxed mb-4">
              Planning outfits for your bridesmaids or family? Create a synchronized atelier room to lock matching silk dye lots and unlock 18% group savings.
            </p>
            <div className="p-3 bg-blush/30 rounded-2xl border border-blush/60 text-xs text-plum flex items-center justify-between">
              <span>Group discount milestone</span>
              <strong className="text-rose-deep">Save 18% on 5+ outfits</strong>
            </div>
          </div>

          <Button
            onClick={() => navigate('/how-it-works')}
            variant="secondary"
            size="sm"
            className="w-full mt-6"
          >
            Learn About Group Rooms
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
