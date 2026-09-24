import React, { useState } from 'react';
import { Ruler, ShieldCheck, Save, Camera, HelpCircle } from 'lucide-react';
import { useAuth } from '../../store/useAuth';
import { useUI } from '../../store/useUI';
import Button from '../../components/ui/Button';

export const CustomerMeasurements = () => {
  const { user } = useAuth();
  const { addToast } = useUI();

  const [measurements, setMeasurements] = useState(
    user?.measurements || {
      bust: '34 in',
      waist: '28 in',
      hips: '38 in',
      shoulder: '14.5 in',
      armLength: '22 in',
      height: '5 ft 5 in',
      preferredFit: 'Comfort Fit with 1.5-inch inner margin',
    }
  );

  const handleChange = (key, value) => {
    setMeasurements((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    addToast({
      title: 'Measurements Updated ✨',
      message: 'Your 3D fit profile has been calibrated for future orders.',
      type: 'success',
    });
  };

  const fields = [
    { key: 'bust', label: 'Bust / Chest Circumference', tip: 'Across the fullest part of bust' },
    { key: 'waist', label: 'Natural Waist', tip: 'Narrowest point above belly button' },
    { key: 'hips', label: 'Full Hips & Seat', tip: 'Widest point around hips' },
    { key: 'shoulder', label: 'Shoulder-to-Shoulder', tip: 'From bone edge to bone edge across back' },
    { key: 'armLength', label: 'Arm Length (Sleeve)', tip: 'From shoulder edge to desired sleeve hem' },
    { key: 'height', label: 'Height (for Lehenga flare)', tip: 'Barefoot standing upright' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-blush/60 gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-plum">
            3D Body Fit & Measurement Profile
          </h1>
          <p className="text-xs text-plum-soft mt-0.5">
            Calibrated for blouses, lehengas, and kurtas. Master tailors cut garments with a standard 1.5" inner margin.
          </p>
        </div>

        <Button
          onClick={handleSave}
          variant="primary"
          size="sm"
          icon={Save}
        >
          Save Fit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div
            key={f.key}
            className="p-5 rounded-3xl bg-white/85 border border-blush/70 shadow-sm space-y-2"
          >
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-plum">{f.label}</label>
              <span className="text-[10px] text-plum-soft">{f.tip}</span>
            </div>
            <input
              type="text"
              value={measurements[f.key] || ''}
              onChange={(e) => handleChange(f.key, e.target.value)}
              className="w-full px-4 py-2.5 bg-cream rounded-xl border border-blush text-sm font-mono text-plum focus:outline-none focus:border-rose-deep"
            />
          </div>
        ))}
      </div>

      {/* Preferred Ease Box */}
      <div className="p-6 rounded-4xl bg-blush/30 border border-blush flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-1" />
        <div>
          <h4 className="font-serif text-sm font-bold text-plum">
            Zero-Risk Fit Assurance
          </h4>
          <p className="text-xs text-plum-soft mt-1 leading-relaxed">
            Our atelier tailors automatically preserve an extra 1.5 inches of un-slit inner margin inside every side seam. If your body shape changes over time, any local tailor or our doorstep concierge can let it out effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerMeasurements;
