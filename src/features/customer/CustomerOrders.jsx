import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle2, ChevronRight, MessageCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../../store/useAuth';
import TapeMeasure from '../../components/motifs/TapeMeasure';
import Button from '../../components/ui/Button';

export const CustomerOrders = () => {
  const { user } = useAuth();

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
      orderDate: '12 Sep 2026',
      estimatedDelivery: '28 Sep 2026',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80',
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
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=500&q=80',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-blush/60 gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-plum">
            My Garments & Live Tracking
          </h1>
          <p className="text-xs text-plum-soft mt-0.5">
            Follow every cut, embroidery session, and doorstep delivery in real time.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-4xl bg-white/85 backdrop-blur-md border border-blush p-6 sm:p-8 shadow-pastel"
          >
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="w-full md:w-48 h-44 rounded-2xl overflow-hidden bg-cream shrink-0">
                <img
                  src={order.image}
                  alt={order.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-3 min-w-0 w-full">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-mint text-emerald-900'
                    }`}>
                      {order.status}
                    </span>
                    <span className="text-xs text-plum-soft font-mono">
                      Order #{order.id}
                    </span>
                  </div>
                  <span className="font-mono text-base font-bold text-plum">
                    {order.price}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-plum">
                  {order.title}
                </h3>

                <p className="text-xs text-plum-soft">
                  Assigned Tailor: <strong>{order.tailorName}</strong> • Ordered on: {order.orderDate}
                </p>

                {/* Tape Measure Progress */}
                <div className="pt-2">
                  <TapeMeasure
                    progress={order.progress}
                    label={`Status: ${order.currentStep}`}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-blush/40 text-xs">
                  <span className="text-plum-soft">
                    {order.status === 'Delivered' ? `Delivered on ${order.deliveryDate}` : `Est. Delivery: ${order.estimatedDelivery}`}
                  </span>
                  <div className="flex gap-2">
                    {order.status === 'Delivered' && (
                      <button
                        type="button"
                        className="px-3 py-1.5 rounded-xl border border-blush text-plum hover:bg-blush/30 text-xs font-semibold"
                      >
                        Request Free Alteration
                      </button>
                    )}
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-blush text-plum hover:bg-blush-dark text-xs font-semibold"
                    >
                      Message Karigar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerOrders;
