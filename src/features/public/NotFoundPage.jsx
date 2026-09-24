import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Scissors } from 'lucide-react';
import { NeedleIcon, SpoolIcon } from '../../components/motifs/Doodles';
import Button from '../../components/ui/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-lg w-full bg-white/80 backdrop-blur-xl rounded-5xl border border-blush p-8 sm:p-12 shadow-pastel">
        {/* Animated Spool Graphic */}
        <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 rounded-full bg-blush/40 flex items-center justify-center"
          >
            <SpoolIcon className="w-12 h-12 text-rose-deep" />
          </motion.div>
          <div className="absolute -top-1 -right-1 p-2 bg-cream rounded-full border border-blush shadow-xs">
            <NeedleIcon className="w-5 h-5 text-plum transform rotate-45" />
          </div>
        </div>

        <span className="inline-block text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 bg-blush/60 text-rose-deep rounded-full mb-3">
          Error 404 • Tangled Thread
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-plum mb-3">
          Lost in the Fabric Roll
        </h1>

        <p className="text-sm text-plum-soft mb-8 leading-relaxed max-w-sm mx-auto">
          The pattern or cutting table you are looking for has been moved, unstitched, or tucked away into another atelier drawer.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate('/')}
            variant="primary"
            size="md"
            icon={Home}
          >
            Return to Home Atelier
          </Button>
          <Button
            onClick={() => navigate(-1)}
            variant="secondary"
            size="md"
            icon={ArrowLeft}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
