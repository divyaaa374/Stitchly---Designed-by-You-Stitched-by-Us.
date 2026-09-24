import React from 'react';
import { motion } from 'framer-motion';

export const Tabs = ({
  tabs = [],
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`inline-flex p-1.5 bg-white/70 backdrop-blur-md rounded-2xl border border-blush/60 shadow-sm ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors duration-200 z-10 focus:outline-none ${
              isActive ? 'text-plum font-semibold' : 'text-plum-soft hover:text-plum'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-blush rounded-xl shadow-sm -z-10"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <span className="flex items-center gap-1.5">
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.label}
              {tab.badge !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white text-plum' : 'bg-blush/50 text-plum'
                }`}>
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
