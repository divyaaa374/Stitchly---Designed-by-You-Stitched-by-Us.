import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, User, LogOut, LayoutDashboard, ChevronRight } from 'lucide-react';
import { useAuth } from '../../store/useAuth';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { NeedleIcon, PinIcon } from '../motifs/Doodles';
import Button from '../ui/Button';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { isScrolled } = useScrollPosition();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const getDashboardPath = () => {
    if (!user) return '/app';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'tailor') return '/tailor';
    return '/app';
  };

  const navLinks = [
    { label: 'How it Works', path: '/how-it-works' },
    { label: 'Tailors & Karigars', path: '/tailors' },
    { label: 'Inspiration', path: '/inspiration' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/80 backdrop-blur-md border-b border-blush/60 shadow-sm py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus:outline-none"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-9 h-9 rounded-2xl bg-blush flex items-center justify-center text-plum shadow-pastel group-hover:scale-105 group-hover:bg-blush-dark transition-all duration-300 border border-white/60">
            <NeedleIcon className="w-5 h-5 transform -rotate-12 text-rose-deep" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-plum flex items-center gap-1">
              Stitchly
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-deep" />
            </span>
            <span className="text-[10px] font-medium text-plum-soft -mt-1 tracking-wider uppercase">
              Atelier Couture
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-blush/60 shadow-sm">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors ${
                  isActive ? 'text-rose-deep font-semibold' : 'text-plum hover:text-rose-deep'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-blush/50 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <Link
                to={getDashboardPath()}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border text-xs font-semibold shadow-sm transition-transform hover:scale-102 ${
                  user.role === 'tailor'
                    ? 'bg-mint text-plum border-mint-dark/50'
                    : user.role === 'admin'
                    ? 'bg-sky text-plum border-sky-dark/50'
                    : 'bg-blush text-plum border-blush-dark/50'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{user.name.split(' ')[0]}'s Studio</span>
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 text-plum-soft hover:text-rose-deep hover:bg-blush/30 rounded-xl transition-colors"
                title="Sign out"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs sm:text-sm font-medium text-plum hover:text-rose-deep px-3 py-1.5 transition-colors"
              >
                Sign in
              </Link>
              <Button
                onClick={() => navigate('/signup')}
                variant="primary"
                size="sm"
                icon={Sparkles}
              >
                Design Your Outfit
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-2xl text-plum hover:bg-blush/40 transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream/95 backdrop-blur-xl border-b border-blush px-4 pt-3 pb-6 shadow-xl"
          >
            <div className="flex flex-col gap-2 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl text-sm font-medium text-plum hover:bg-blush/40 transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-plum-soft" />
                </Link>
              ))}

              <div className="border-t border-blush/50 my-2 pt-3">
                {isAuthenticated && user ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      to={getDashboardPath()}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 rounded-2xl bg-blush text-plum font-semibold text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4" />
                        Go to {user.role === 'admin' ? 'Admin Portal' : user.role === 'tailor' ? 'Tailor Atelier' : 'My Studio'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 p-3 text-sm text-plum-soft hover:text-rose-deep text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center py-2.5 text-sm font-medium text-plum border border-blush rounded-2xl hover:bg-white"
                    >
                      Sign In
                    </Link>
                    <Button
                      onClick={() => {
                        navigate('/signup');
                        setMobileMenuOpen(false);
                      }}
                      variant="primary"
                      size="md"
                      className="w-full"
                    >
                      Design Your Outfit
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
