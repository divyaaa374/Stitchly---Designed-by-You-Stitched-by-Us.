import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ShoppingBag, 
  Ruler, 
  Bookmark, 
  LogOut, 
  Home, 
  ChevronRight,
  User as UserIcon,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../store/useAuth';
import { NeedleIcon } from '../../components/motifs/Doodles';
import ToastContainer from '../../components/ui/Toast';

export const CustomerLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { label: 'My Atelier Studio', path: '/app', icon: Sparkles },
    { label: 'Active & Past Orders', path: '/app/orders', icon: ShoppingBag, badge: '2' },
    { label: '3D Measurements', path: '/app/measurements', icon: Ruler },
    { label: 'Saved Moodboards', path: '/app/saved', icon: Bookmark },
  ];

  return (
    <div className="min-h-screen bg-cream flex flex-col md:flex-row text-plum">
      {/* Customer Sidebar (Role signature: Blush) */}
      <aside className="w-full md:w-64 bg-white/80 backdrop-blur-md border-r border-blush p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Role Badge */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-blush/60">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blush flex items-center justify-center text-plum shadow-sm">
                <NeedleIcon className="w-4 h-4 -rotate-12 text-rose-deep" />
              </div>
              <span className="font-serif text-xl font-bold text-plum">Stitchly</span>
            </Link>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blush text-rose-deep uppercase tracking-wider">
              Client
            </span>
          </div>

          {/* User Profile Card */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-blush/30 border border-blush/60 mb-6">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover border border-white shadow-sm"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-serif text-sm font-semibold truncate text-plum">
                {user?.name || 'Priya Sharma'}
              </h4>
              <p className="text-[11px] text-plum-soft truncate">
                {user?.city || 'Bengaluru'} • {user?.email}
              </p>
            </div>
          </div>

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
                      ? 'bg-blush text-plum font-semibold shadow-sm'
                      : 'text-plum-soft hover:text-plum hover:bg-blush/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-rose-deep' : 'text-plum-soft'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] bg-rose-deep text-white px-1.5 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-blush/60 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-plum-soft hover:text-plum hover:bg-blush/20 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Public Home</span>
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
        <header className="bg-white/60 backdrop-blur-md border-b border-blush/60 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-plum-soft">
            <span>Stitchly Atelier</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-plum font-medium capitalize">
              {location.pathname.replace('/app', '').replace('/', '') || 'Overview'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-plum-soft bg-white px-3 py-1 rounded-full border border-blush/60 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Fit Guarantee Active
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

export default CustomerLayout;
