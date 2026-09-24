import React, { useState } from 'react';
import { Scissors, Clock, Camera, CheckCircle2, ChevronRight } from 'lucide-react';
import { useUI } from '../../store/useUI';
import Button from '../../components/ui/Button';

export const TailorOrders = () => {
  const { addToast } = useUI();
  const [orders, setOrders] = useState([
    {
      id: 'ord_102',
      customer: 'Priya Sharma (Bengaluru)',
      garment: 'Pastel Mint Organza Anarkali Set',
      milestone: 'Embroidery & Gota Border Assembly',
      progress: 65,
      payout: '₹14,200',
    },
    {
      id: 'ord_103',
      customer: 'Kavita Chawla (Delhi)',
      garment: 'Deep Magenta Velvet Bridal Choli',
      milestone: 'Pattern Drafting & Can-can Lining',
      progress: 30,
      payout: '₹9,800',
    },
    {
      id: 'ord_104',
      customer: 'Sunaina Rao (Hyderabad)',
      garment: 'Raw Silk Kalidar Sangeet Skirt',
      milestone: 'Final Stitch Inspection & Pressing',
      progress: 90,
      payout: '₹16,500',
    },
  ]);

  const advanceMilestone = (id) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          const newProgress = Math.min(100, o.progress + 15);
          return {
            ...o,
            progress: newProgress,
            milestone:
              newProgress >= 100
                ? 'Hand-pressed & Packed in Bespoke Garment Box'
                : 'Embroidery Detailed & Quality Checked',
          };
        }
        return o;
      })
    );
    addToast({
      title: 'Milestone Dispatched to Client 📸',
      message: 'Video snippet and status update posted to client dashboard.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-mint-dark/30">
        <div>
          <h1 className="font-serif text-2xl font-bold text-plum">
            Active Stitching Queue & Client Milestones
          </h1>
          <p className="text-xs text-plum-soft mt-0.5">
            Advance progress stages to automatically inform clients and trigger courier dispatch.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-6 rounded-4xl bg-white/85 border border-mint-dark/40 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base font-bold text-plum">{order.garment}</span>
                  <span className="text-[10px] font-mono bg-mint text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                    {order.id}
                  </span>
                </div>
                <p className="text-xs text-plum-soft mt-0.5">Client: <strong>{order.customer}</strong></p>
              </div>
              <div className="text-right">
                <span className="font-mono text-sm font-bold text-plum">{order.payout}</span>
                <span className="text-[10px] text-emerald-700 block font-semibold">Direct Artisan Payout</span>
              </div>
            </div>

            <div className="p-3 bg-cream rounded-2xl border border-blush text-xs flex justify-between items-center">
              <span>Current Stage: <strong>{order.milestone}</strong></span>
              <span className="font-mono font-bold text-plum">{order.progress}%</span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                onClick={() => advanceMilestone(order.id)}
                variant="tailor"
                size="sm"
                icon={Camera}
              >
                Upload Video Milestone (+15%)
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TailorOrders;
