import React from 'react';
import HeroSection from './HeroSection';
import TrustStrip from './TrustStrip';
import HowItWorksSection from './HowItWorksSection';
import AIStudioTeaser from './AIStudioTeaser';
import FeatureGrid from './FeatureGrid';
import OutfitChangerStrip from './OutfitChangerStrip';
import TailorSpotlight from './TailorSpotlight';
import InspirationFeed from './InspirationFeed';
import WeddingPartySection from './WeddingPartySection';
import TestimonialsSection from './TestimonialsSection';
import FinalCTA from './FinalCTA';
import StitchDivider from '../../components/motifs/StitchDivider';

export const LandingPage = () => {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. How It Works Timeline */}
      <HowItWorksSection />

      {/* Stitch Divider */}
      <StitchDivider withIcon="scissors" className="opacity-60" />

      {/* 4. AI Studio Teaser (Real interactive mini demo) */}
      <AIStudioTeaser />

      {/* 5. Feature Grid with Detail Drawer */}
      <FeatureGrid />

      {/* Stitch Divider */}
      <StitchDivider withIcon="needle" className="opacity-60" />

      {/* 6. Outfit Changer Strip (Interactive Before/After Slider) */}
      <OutfitChangerStrip />

      {/* 7. Tailor Spotlight Carousel */}
      <TailorSpotlight />

      {/* 8. Inspiration Feed Preview */}
      <InspirationFeed />

      {/* Stitch Divider */}
      <StitchDivider withIcon="scissors" className="opacity-60" />

      {/* 9. Group Ordering / Wedding Party Section */}
      <WeddingPartySection />

      {/* 10. Testimonials */}
      <TestimonialsSection />

      {/* 11. Final CTA */}
      <FinalCTA />
    </div>
  );
};

export default LandingPage;
