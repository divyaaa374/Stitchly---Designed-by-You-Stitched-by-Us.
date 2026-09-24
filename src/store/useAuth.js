import { create } from 'zustand';
import authService from '../services/auth';

export const useAuth = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  authError: null,

  /**
   * Check active session on app boot
   */
  checkAuth: async () => {
    try {
      set({ isLoading: true, authError: null });
      const sessionUser = await authService.getCurrentUser();
      if (sessionUser) {
        set({ user: sessionUser, isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch (err) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  /**
   * Step 1: Login challenge
   */
  login: async (credentials) => {
    set({ isLoading: true, authError: null });
    try {
      const challenge = await authService.login(credentials);
      set({ isLoading: false });
      return challenge;
    } catch (err) {
      set({ isLoading: false, authError: err.message });
      throw err;
    }
  },

  /**
   * Step 2: Verify OTP
   */
  verifyOtp: async (data) => {
    set({ isLoading: true, authError: null });
    try {
      const user = await authService.verifyOtp(data);
      set({ user, isAuthenticated: true, isLoading: false });
      return user;
    } catch (err) {
      set({ isLoading: false, authError: err.message });
      throw err;
    }
  },

  /**
   * One-click demo login
   */
  quickLogin: async (role) => {
    set({ isLoading: true, authError: null });
    try {
      const user = await authService.quickLogin(role);
      set({ user, isAuthenticated: true, isLoading: false });
      return user;
    } catch (err) {
      set({ isLoading: false, authError: err.message });
      throw err;
    }
  },

  /**
   * Customer / Tailor registration
   */
  signup: async (data) => {
    set({ isLoading: true, authError: null });
    try {
      const user = await authService.signup(data);
      set({ user, isAuthenticated: true, isLoading: false });
      return user;
    } catch (err) {
      set({ isLoading: false, authError: err.message });
      throw err;
    }
  },

  /**
   * Logout
   */
  logout: async () => {
    set({ isLoading: true });
    await authService.logout();
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  clearError: () => set({ authError: null }),
}));

export default useAuth;
