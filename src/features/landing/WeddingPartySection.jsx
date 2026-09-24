import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Sparkles, Tag, CheckCircle2, ArrowRight, Heart } from 'lucide-react';
import Button from '../../components/ui/Button';
import ChalkUnderline from '../../components/motifs/ChalkUnderline';

export const ENTOURAGE_ROLES = [
  {
    role: 'The Bride',
    outfit: 'Imperial Crimson Velvet Zardozi Lehenga',
    colorHex: '#8B1E3F',
    colorName: 'Royal Crimson',
    fabric: 'Pure Mulberry Silk Velvet',
    price: '₹28,500',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    status: 'Pattern Draft Ready',
  },
  {
    role: 'The Groom',
    outfit: 'Ivory Raw Silk Angrakha Sherwani',
    colorHex: '#FFF1B8',
    colorName: 'Champagne Butter',
    fabric: 'Matka Silk with Pearl Buttons',
    price: '₹22,000',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'Fabric Sourced',
  },
  {
    role: 'Bridesmaid (Sister)',
    outfit: 'Pastel Mint Organza Tiered Anarkali',
    colorHex: '#D5EFE3',
    colorName: 'Pistachio Mint',
    fabric: 'Hand-dyed French Organza',
    price: '₹14,200',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    status: 'Measurements Synced',
  },
  {
    role: 'Best Man',
    outfit: 'Mint & Mukaish Bundi Jacket with Kurta',
    colorHex: '#D5EFE3',
    colorName: 'Pistachio Mint',
    fabric: 'Chanderi Silk Brocade',
    price: '₹11,500',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    status: 'Measurements Synced',
  },
  {
    role: 'Mother of the Bride',
    outfit: 'Royal Plum Banarasi Katan Silk Saree Set',
    colorHex: '#4A3F5C',
    colorName: 'Mystic Plum',
    fabric: 'Pure Banarasi Brocade',
    price: '₹18,000',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    status: 'Weaving in Banaras',
  },
];

export const WeddingPartySection = () => {
  const [selectedRole, setSelectedRole] = useState(ENTOURAGE_ROLES[0]);
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-b from-cream via-blush/15 to-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blush border border-rose-deep/30 text-xs font-bold text-plum mb-3 shadow-xs">
            <Tag className="w-3.5 h-3.5 text-rose-deep" />
            <span>Wedding Entourage Special • Save 18% on 5+ Outfits</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum">
            Harmonized wedding party orders.{' '}
            <br />
            <span className="relative inline-block text-rose-deep">
              One theme. Zero chaotic WhatsApp chats.
              <ChalkUnderline color="#F9D5DC" />
            </span>
          </h2>
          <p className="text-sm text-plum-soft mt-3">
            Coordinate matching palettes across bridesmaids and groomsmen located in different cities. Each guest inputs their measurements privately.
          </p>
        </div>

        {/* Interactive Entourage Room Mockup */}
        <div className="max-w-5xl mx-auto bg-white/85 backdrop-blur-xl rounded-4xl border border-blush shadow-pastel p-6 sm:p-8">
          {/* Top Room Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-blush/60 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-bold text-plum">
                  Priya & Rohan's Jaipur Palace Wedding
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-mint text-emerald-900">
                  Active Atelier Room
                </span>
              </div>
              <p className="text-xs text-plum-soft mt-0.5">
                Theme: Royal Crimson & Pistachio Mint • 5 Members Synced
              </p>
            </div>

            <Button
              onClick={() => navigate('/signup')}
              variant="primary"
              size="md"
              icon={Sparkles}
            >
              Create Your Wedding Room
            </Button>
          </div>

          {/* Entourage Member Selector Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 py-6">
            {ENTOURAGE_ROLES.map((person) => {
              const isSelected = selectedRole.role === person.role;
              return (
                <div
                  key={person.role}
                  onClick={() => setSelectedRole(person)}
                  className={`p-3.5 rounded-3xl border cursor-pointer transition-all text-center select-none ${
                    isSelected
                      ? 'bg-blush/50 border-rose-deep shadow-sm ring-2 ring-blush'
                      : 'bg-cream/60 border-blush hover:bg-blush/20'
                  }`}
                >
                  <img
                    src={person.avatar}
                    alt={person.role}
                    className="w-12 h-12 rounded-full mx-auto object-cover border-2 border-white shadow-xs mb-2"
                  />
                  <h4 className="font-serif text-xs font-bold text-plum truncate">
                    {person.role}
                  </h4>
                  <span className="text-[10px] text-plum-soft block truncate">
                    {person.colorName}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Selected Entourage Outfit Display */}
          <div className="p-6 rounded-3xl bg-cream border border-blush/80 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-mint/50 px-3 py-0.5 rounded-full font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{selectedRole.status}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-plum">
                {selectedRole.outfit}
              </h3>
              <p className="text-xs text-plum-soft">
                Fabric: <strong>{selectedRole.fabric}</strong> • Matched with specialist artisan
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="text-center sm:text-right">
                <span className="text-[10px] text-plum-soft block line-through">
                  ₹{Math.round(parseInt(selectedRole.price.replace(/[^0-9]/g, '')) * 1.2).toLocaleString()}
                </span>
                <span className="font-mono text-xl font-bold text-rose-deep">
                  {selectedRole.price}
                </span>
                <span className="text-[10px] text-emerald-700 block font-semibold">
                  (18% Group Discount Applied)
                </span>
              </div>

              <Button
                onClick={() => navigate('/signup')}
                variant="secondary"
                size="md"
                icon={ArrowRight}
              >
                Customize Member Look
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingPartySection;
