import { create } from 'zustand';

export const useUI = create((set, get) => ({
  // Active modal
  modal: null, // { type: string, data: any }
  openModal: (type, data = null) => set({ modal: { type, data } }),
  closeModal: () => set({ modal: null }),

  // Active drawer
  drawer: null, // { title: string, content: ReactNode or component key, data: any }
  openDrawer: (drawerData) => set({ drawer: drawerData }),
  closeDrawer: () => set({ drawer: null }),

  // Toast notifications
  toasts: [],
  addToast: ({ title, message, type = 'info', duration = 3500 }) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const newToast = { id, title, message, type };
    set((state) => ({ toasts: [...state.toasts, newToast] }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  // Language switcher
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
}));

export default useUI;
