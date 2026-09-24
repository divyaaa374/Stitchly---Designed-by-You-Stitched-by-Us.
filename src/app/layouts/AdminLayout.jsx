import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  Package, 
  BarChart3, 
  LogOut, 
  Home, 
  Sparkles,
  Layers
} from 'lucide-react';
import { useAuth } from '../../store/useAuth';
import ToastContainer from '../../components/ui/Toast';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Marketplace Operations', path: '/admin', icon: Layers },
    { label: 'Tailor KYC Verifications', path: '/admin/tailors', icon: Users, badge: '1' },
    { label: 'Global Orders Pipeline', path: '/admin/orders', icon: Package },
    { label: 'Revenue Analytics', path: '/admin/metrics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-cream flex flex-col md:flex-row text-plum">
      {/* Admin Sidebar (Role signature: Sky) */}
      <aside className="w-full md:w-64 bg-white/80 backdrop-blur-md border-r border-sky-dark/40 p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Admin Badge */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-sky-dark/40">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-sky flex items-center justify-center text-plum shadow-sm">
                <ShieldCheck className="w-4 h-4 text-sky-800" />
              </div>
              <span className="font-serif text-xl font-bold text-plum">Stitchly</span>
            </Link>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky text-sky-950 uppercase tracking-wider">
              Admin HQ
            </span>
          </div>

          {/* User Profile Card */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-sky/30 border border-sky-dark/40 mb-6">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover border border-white shadow-sm"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-serif text-sm font-semibold truncate text-plum">
                {user?.name || 'Aarav Mehta'}
              </h4>
              <p className="text-[11px] text-plum-soft truncate">
                Super Administrator
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
                      ? 'bg-sky text-plum font-semibold shadow-sm'
                      : 'text-plum-soft hover:text-plum hover:bg-sky/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-sky-800' : 'text-plum-soft'}`} />
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
        <div className="pt-6 border-t border-sky-dark/40 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-plum-soft hover:text-plum hover:bg-sky/20 transition-colors"
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
        <header className="bg-white/60 backdrop-blur-md border-b border-sky-dark/30 px-6 py-4 flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold text-plum">
            Marketplace Control Console
          </h2>
          <div className="flex items-center gap-3 text-xs text-plum-soft">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              AI & Courier Partners: Operational
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

export default AdminLayout;
