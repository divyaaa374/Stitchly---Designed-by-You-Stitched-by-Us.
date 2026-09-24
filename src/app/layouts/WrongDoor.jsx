import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/useAuth';
import { ScissorsIcon, NeedleIcon } from '../../components/motifs/Doodles';
import Button from '../../components/ui/Button';

export const WrongDoor = ({ requiredRole = 'tailor' }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getTargetDashboard = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'tailor') return '/tailor';
    return '/app';
  };

  const getRoleName = (r) => {
    if (r === 'admin') return 'Marketplace Admin Portal';
    if (r === 'tailor') return 'Master Tailor Studio';
    return 'Customer Atelier';
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-4xl border border-blush p-8 shadow-pastel text-plum">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blush/40 flex items-center justify-center text-rose-deep shadow-inner relative">
          <ScissorsIcon className="w-10 h-10 transform -rotate-12" />
          <div className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-sm">
            <NeedleIcon className="w-4 h-4 text-plum" />
          </div>
        </div>

        <span className="inline-block text-[11px] font-bold tracking-widest uppercase px-3 py-1 bg-blush/60 text-plum rounded-full mb-3">
          Wrong Atelier Door
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-plum mb-3">
          This room is reserved for {getRoleName(requiredRole)}.
        </h2>

        <p className="text-sm text-plum-soft mb-6 leading-relaxed">
          You are currently signed in as <strong>{user?.name || 'Guest'}</strong> with the <strong>{user?.role}</strong> role. Let's guide you back to your workspace.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate(getTargetDashboard())}
            variant="primary"
            size="md"
          >
            Take Me to My Dashboard
          </Button>
          <Button
            onClick={() => navigate('/')}
            variant="secondary"
            size="md"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WrongDoor;
