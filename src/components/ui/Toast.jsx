import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from 'lucide-react';
import { useUI } from '../../store/useUI';

export const ToastContainer = () => {
  const { toasts, removeToast } = useUI();

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
    error: <AlertCircle className="w-5 h-5 text-rose-deep" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-600" />,
    info: <Sparkles className="w-5 h-5 text-rose-deep" />,
  };

  const bgMap = {
    success: 'bg-mint-light/95 border-mint-dark',
    error: 'bg-blush-light/95 border-rose-deep/50',
    warning: 'bg-butter-light/95 border-butter-dark',
    info: 'bg-white/95 border-blush',
  };

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-auto rounded-2xl border p-4 shadow-xl backdrop-blur-md flex items-start gap-3 text-plum ${
              bgMap[toast.type] || bgMap.info
            }`}
          >
            <div className="shrink-0 mt-0.5">{iconMap[toast.type] || iconMap.info}</div>
            <div className="flex-1 min-w-0">
              {toast.title && (
                <h4 className="font-serif font-semibold text-sm leading-tight text-plum">
                  {toast.title}
                </h4>
              )}
              {toast.message && (
                <p className="text-xs text-plum-soft mt-1 leading-normal">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-plum-soft hover:text-plum p-1 -mr-1 -mt-1 rounded-full focus:outline-none"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
