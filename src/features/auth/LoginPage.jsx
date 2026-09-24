import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  RotateCw, 
  User, 
  Scissors, 
  Sparkles 
} from 'lucide-react';
import { useAuth } from '../../store/useAuth';
import { useUI } from '../../store/useUI';
import { DEMO_CREDENTIALS } from '../../data/seed';
import { NeedleIcon } from '../../components/motifs/Doodles';
import Button from '../../components/ui/Button';

export const LoginPage = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [errors, setErrors] = useState({});

  const { login, verifyOtp, quickLogin, isLoading, authError, clearError } = useAuth();
  const { addToast } = useUI();
  const navigate = useNavigate();
  const location = useLocation();

  const otpInputsRef = useRef([]);

  // Redirect destination after login
  const from = location.state?.from?.pathname || null;

  // 30s resend timer
  useEffect(() => {
    let interval;
    if (otpStep && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [otpStep, timer]);

  // Autofocus first OTP box when step 2 opens
  useEffect(() => {
    if (otpStep && otpInputsRef.current[0]) {
      otpInputsRef.current[0].focus();
    }
  }, [otpStep]);

  const validateStep1 = () => {
    const errs = {};
    if (!emailOrPhone.trim()) {
      errs.emailOrPhone = 'Please enter your registered email or phone number.';
    }
    if (!password) {
      errs.password = 'Please provide your account password.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    clearError();
    if (!validateStep1()) return;

    try {
      const challenge = await login({ emailOrPhone, password });
      setActiveChallenge(challenge);
      setOtpStep(true);
      setTimer(30);
      setCanResend(false);
      addToast({
        title: 'Atelier Security Passcode Sent',
        message: 'For quick demo login, enter code: 123456',
        type: 'info',
        duration: 6000,
      });
    } catch (err) {
      // Handled by authError in store
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      // Handle paste
      const pasted = value.replace(/[^0-9]/g, '').slice(0, 6);
      if (pasted) {
        const newOtp = [...otp];
        for (let i = 0; i < 6; i++) {
          newOtp[i] = pasted[i] || '';
        }
        setOtp(newOtp);
        const nextIdx = Math.min(pasted.length, 5);
        otpInputsRef.current[nextIdx]?.focus();
      }
      return;
    }

    const clean = value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = clean;
    setOtp(newOtp);

    // Auto advance to next box
    if (clean && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtpSubmit = async (e) => {
    e.preventDefault();
    clearError();
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setErrors({ otp: 'Please enter all 6 digits of your security code.' });
      return;
    }

    try {
      const user = await verifyOtp({
        userId: activeChallenge.userId,
        otp: fullOtp,
      });

      addToast({
        title: `Welcome to Stitchly, ${user.name}! ✨`,
        message: 'Successfully signed in to your atelier studio.',
        type: 'success',
      });

      redirectUser(user.role);
    } catch (err) {
      // Auth error shown
    }
  };

  const handleQuickLogin = async (role) => {
    clearError();
    try {
      const user = await quickLogin(role);
      addToast({
        title: `Signed in as ${user.name}`,
        message: `Quick demo access loaded for role: ${role}`,
        type: 'success',
      });
      redirectUser(user.role);
    } catch (err) {
      addToast({
        title: 'Demo login error',
        message: err.message,
        type: 'error',
      });
    }
  };

  const redirectUser = (role) => {
    if (from) {
      navigate(from, { replace: true });
      return;
    }
    if (role === 'admin') navigate('/admin', { replace: true });
    else if (role === 'tailor') navigate('/tailor', { replace: true });
    else navigate('/app', { replace: true });
  };

  const resendCode = () => {
    if (!canResend) return;
    setTimer(30);
    setCanResend(false);
    addToast({
      title: 'New Code Dispatched',
      message: 'Demo passcode remains: 123456',
      type: 'info',
    });
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 flex items-center justify-center relative">
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-blush/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-mint/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-md w-full bg-white/85 backdrop-blur-xl rounded-4xl border border-blush/70 p-8 shadow-pastel text-plum">
        {/* Atelier Logo Head */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-blush flex items-center justify-center shadow-pastel mb-3 border border-white">
            <NeedleIcon className="w-6 h-6 text-rose-deep -rotate-12" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-plum">
            Welcome to the Atelier
          </h2>
          <p className="text-xs text-plum-soft mt-1.5">
            Sign in to track your garments, consult your karigar, or review atelier queues.
          </p>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="mb-6 p-3.5 rounded-2xl bg-cream border border-blush/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-plum-soft flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-rose-deep" />
              1-Click Demo Logins
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {DEMO_CREDENTIALS.map((cred) => (
              <button
                key={cred.role}
                type="button"
                onClick={() => handleQuickLogin(cred.role)}
                className={`px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all hover:scale-102 flex flex-col items-center gap-0.5 text-center ${
                  cred.role === 'customer'
                    ? 'bg-blush/50 border-blush-dark hover:bg-blush text-plum'
                    : cred.role === 'tailor'
                    ? 'bg-mint/50 border-mint-dark hover:bg-mint text-plum'
                    : 'bg-sky/50 border-sky-dark hover:bg-sky text-plum'
                }`}
                title={cred.note}
              >
                <span>{cred.label.replace('Demo ', '')}</span>
                <span className="text-[9px] opacity-75 font-normal">
                  {cred.role === 'customer' ? 'Priya' : cred.role === 'tailor' ? 'Meera' : 'Aarav'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Error notification banner */}
        {authError && (
          <div className="mb-5 p-3 rounded-2xl bg-blush-light border border-rose-deep/40 text-xs text-rose-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-rose-deep shrink-0 mt-0.5" />
            <span>{authError}</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!otpStep ? (
            /* STEP 1: Email/Phone & Password */
            <motion.form
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={handleStep1Submit}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-plum mb-1.5">
                  Email Address or Phone
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-plum-soft absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => {
                      setEmailOrPhone(e.target.value);
                      if (errors.emailOrPhone) setErrors({ ...errors, emailOrPhone: null });
                    }}
                    placeholder="priya@gmail.com or +91 98765 43210"
                    className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-cream rounded-2xl border border-blush text-plum placeholder-plum-soft/60 input-thread-focus"
                  />
                </div>
                {errors.emailOrPhone && (
                  <p className="text-[11px] text-rose-deep mt-1 ml-1">{errors.emailOrPhone}</p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-plum">
                    Password
                  </label>
                  <span className="text-[11px] text-plum-soft">
                    (Demo: password123)
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-plum-soft absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: null });
                    }}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-cream rounded-2xl border border-blush text-plum placeholder-plum-soft/60 input-thread-focus"
                  />
                </div>
                {errors.password && (
                  <p className="text-[11px] text-rose-deep mt-1 ml-1">{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full mt-2"
                icon={ArrowRight}
              >
                Continue with Passcode
              </Button>
            </motion.form>
          ) : (
            /* STEP 2: 6-Box OTP Verification */
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onSubmit={handleVerifyOtpSubmit}
              className="space-y-5"
            >
              <div className="text-center bg-cream/70 p-3 rounded-2xl border border-blush/60">
                <span className="text-xs text-plum-soft block">
                  Verification code dispatched for
                </span>
                <span className="font-semibold text-plum text-xs">
                  {activeChallenge?.emailOrPhone}
                </span>
                <div className="mt-1 text-[11px] text-rose-deep font-mono font-medium">
                  Use universal demo code: <strong>123456</strong>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-plum text-center mb-2.5">
                  Enter 6-Digit Atelier Security Code
                </label>
                <div className="flex justify-between gap-2 max-w-xs mx-auto">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputsRef.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-10 h-12 text-center font-mono text-lg font-bold bg-cream rounded-xl border border-blush text-plum focus:border-rose-deep focus:ring-2 focus:ring-rose-deep/30 focus:outline-none"
                    />
                  ))}
                </div>
                {errors.otp && (
                  <p className="text-[11px] text-rose-deep text-center mt-2">{errors.otp}</p>
                )}
              </div>

              {/* Resend Timer */}
              <div className="flex items-center justify-between text-xs text-plum-soft px-1">
                <span>Didn't receive code?</span>
                <button
                  type="button"
                  onClick={resendCode}
                  disabled={!canResend}
                  className={`font-semibold transition-colors flex items-center gap-1 ${
                    canResend
                      ? 'text-rose-deep hover:underline cursor-pointer'
                      : 'text-plum-soft/50 cursor-not-allowed'
                  }`}
                >
                  <RotateCw className="w-3 h-3" />
                  {canResend ? 'Resend Code' : `Resend in ${timer}s`}
                </button>
              </div>

              <div className="flex gap-2.5">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={() => setOtpStep(false)}
                  className="flex-1"
                >
                  Change Account
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isLoading}
                  className="flex-1"
                >
                  Verify & Enter
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-blush/60 text-center text-xs text-plum-soft">
          Don't have an atelier account?{' '}
          <Link
            to="/signup"
            className="font-bold text-rose-deep hover:underline"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
