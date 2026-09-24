import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Scissors, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  User as UserIcon, 
  LogOut, 
  Home, 
  AlertCircle,
  Award
} from 'lucide-react';
import { useAuth } from '../../store/useAuth';
import ToastContainer from '../../components/ui/Toast';

export const TailorLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Artisan Workshop', path: '/tailor', icon: Scissors },
    { label: 'Active Stitching Queue', path: '/tailor/orders', icon: Clock, badge: '4' },
    { label: 'Master Portfolio', path: '/tailor/profile', icon: Award },
    { label: 'Earnings & Payouts', path: '/tailor/earnings', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-cream flex flex-col md:flex-row text-plum">
      {/* Tailor Sidebar (Role signature: Mint) */}
      <aside className="w-full md:w-64 bg-white/80 backdrop-blur-md border-r border-mint-dark/40 p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Tailor Badge */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-mint-dark/40">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-mint flex items-center justify-center text-plum shadow-sm">
                <Scissors className="w-4 h-4 text-emerald-800" />
              </div>
              <span className="font-serif text-xl font-bold text-plum">Stitchly</span>
            </Link>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-mint text-emerald-900 uppercase tracking-wider">
              Karigar
            </span>
          </div>

          {/* Tailor Profile Card */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-mint/30 border border-mint-dark/40 mb-6">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover border border-white shadow-sm"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <h4 className="font-serif text-sm font-semibold truncate text-plum">
                  {user?.name || 'Master Meera Devi'}
                </h4>
                {user?.verified && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                )}
              </div>
              <p className="text-[11px] text-plum-soft truncate">
                {user?.city || 'Jaipur'} • {user?.badge || 'Master Artisan'}
              </p>
            </div>
          </div>

          {/* KYC Status banner if pending */}
          {user?.kycStatus === 'pending' && (
            <div className="mb-5 p-3 rounded-2xl bg-butter/50 border border-butter-dark text-xs text-plum flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">KYC Verification Under Review</strong>
                <span className="text-[11px] text-plum-soft">Admin will verify within 24h. You can explore your workshop studio.</span>
              </div>
            </div>
          )}

          {/* Nav Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-mint text-plum font-semibold shadow-sm'
                      : 'text-plum-soft hover:text-plum hover:bg-mint/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-800' : 'text-plum-soft'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] bg-emerald-700 text-white px-1.5 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-mint-dark/40 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-plum-soft hover:text-plum hover:bg-mint/20 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Public Marketplace</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-deep hover:bg-rose-50 transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white/60 backdrop-blur-md border-b border-mint-dark/30 px-6 py-4 flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold text-plum">
            Master Karigar Atelier Suite
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1 rounded-full bg-mint/50 border border-mint-dark/50 font-medium text-plum">
              Dispatch SLA: 48h Window
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default TailorLayout;
