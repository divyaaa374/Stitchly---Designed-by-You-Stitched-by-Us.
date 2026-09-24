import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, MapPin } from 'lucide-react';
import ChalkUnderline from '../../components/motifs/ChalkUnderline';

const TESTIMONIALS = [
  {
    id: 'test_1',
    name: 'Ananya Deshmukh',
    city: 'Mumbai',
    role: 'Bride',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    garment: '24-Kali Raw Silk Sangeet Lehenga',
    tailor: 'Master Meera Devi (Jaipur)',
    text: 'Living in Mumbai with a demanding corporate job, visiting boutiques in Santacruz was impossible. Stitchly matched me with Meera ji in Jaipur. Seeing video snippets of my peacock zardozi being hand-embroidered made me cry happy tears. The fit was millimeter perfect on arrival!',
  },
  {
    id: 'test_2',
    name: 'Dr. Vikramaditya Rao',
    city: 'Bengaluru',
    role: 'Groom',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    garment: 'Champagne Angrakha Sherwani',
    tailor: 'Gurpreet Singh (Delhi NCR)',
    text: 'Most ready-made groom sherwanis are stiff and ill-proportioned for tall frames. With Stitchly, I inputted my shoulder-to-wrist and posture specs. Gurpreet ji added secret inner breathability gussets. It felt like a bespoke Savile Row suit crafted for an Indian royal court.',
  },
  {
    id: 'test_3',
    name: 'Shreya & Radhika Sen',
    city: 'London & Kolkata',
    role: 'Sister of Bride & Maid of Honor',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    garment: 'Twin Organza Lucknowi Anarkalis',
    tailor: 'Ustad Rajesh Kumar (Lucknow)',
    text: 'I was in London while my sister was in Kolkata. The Wedding Room feature kept our shade of pistachio mint 100% synchronized from the same silk dye vat. Our dresses arrived together, hand-pressed, three weeks before the wedding. Unbelievable precision.',
  },
  {
    id: 'test_4',
    name: 'Tanvi Iyer',
    city: 'San Jose, California',
    role: 'NRI Client',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    garment: 'Kanjeevaram Silk Plunge Cut Blouse',
    tailor: 'Suresh Nambiar (Bengaluru)',
    text: 'Getting Indian blouses stitched from abroad is always a nightmare of tight armholes. The 3D scan and audio voice input in Tamil were shockingly accurate. Suresh sir nailed the deep sweetheart cut and even sent extra latkan tassels. Stitchly is a blessing for NRIs.',
  },
];

export const TestimonialsSection = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-deep bg-blush/60 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Atelier Love Letters
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum">
            Worn for life’s sweetest memories.{' '}
            <br />
            <span className="relative inline-block text-rose-deep">
              Hear from our clients.
              <ChalkUnderline color="#F9D5DC" />
            </span>
          </h2>
        </div>

        {/* Testimonials Marquee / Grid with hover pause */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-6 rounded-4xl bg-white/80 backdrop-blur-md border border-blush/70 shadow-pastel flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {'★★★★★'.split('').map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-rose-deep/40" />
                </div>

                {/* Review Text */}
                <p className="text-xs text-plum leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
              </div>

              {/* Author & Garment Meta */}
              <div className="pt-4 border-t border-blush/50">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-blush shadow-xs"
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-serif text-xs font-bold text-plum truncate">
                      {t.name}
                    </h5>
                    <div className="flex items-center gap-1 text-[11px] text-plum-soft">
                      <MapPin className="w-3 h-3 text-rose-deep" />
                      <span>{t.city} • {t.role}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 p-2 rounded-xl bg-cream border border-blush/60 text-[10px] text-plum-soft flex justify-between items-center">
                  <span className="truncate">{t.garment}</span>
                  <span className="text-emerald-700 font-semibold shrink-0 ml-1">Verified</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
