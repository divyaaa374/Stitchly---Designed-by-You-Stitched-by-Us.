import { INITIAL_USERS } from '../data/seed.js';

const STORAGE_KEY_USERS = 'stitchly_users';
const STORAGE_KEY_SESSION = 'stitchly_session';

// Helper to initialize seed users if empty
function initializeStorage() {
  if (typeof window === 'undefined') return;
  const existing = localStorage.getItem(STORAGE_KEY_USERS);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(INITIAL_USERS));
  }
}

initializeStorage();

export const authService = {
  /**
   * Fetch all registered users
   */
  async getUsers() {
    initializeStorage();
    const data = localStorage.getItem(STORAGE_KEY_USERS);
    return data ? JSON.parse(data) : INITIAL_USERS;
  },

  /**
   * Save updated users array
   */
  async saveUsers(users) {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  },

  /**
   * Get currently logged-in user session
   */
  async getCurrentUser() {
    const session = localStorage.getItem(STORAGE_KEY_SESSION);
    if (!session) return null;
    try {
      return JSON.parse(session);
    } catch {
      return null;
    }
  },

  /**
   * Step 1 Login: Check email/phone and password, issue pending OTP challenge
   */
  async login({ emailOrPhone, password }) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    const users = await this.getUsers();
    const query = emailOrPhone.trim().toLowerCase();

    const user = users.find(
      (u) =>
        (u.email.toLowerCase() === query || (u.phone && u.phone.replace(/\s+/g, '') === query.replace(/\s+/g, '')))
    );

    if (!user) {
      throw new Error('No atelier account found with this email or phone number.');
    }

    if (user.password !== password) {
      throw new Error('Incorrect password. Please verify and try again.');
    }

    return {
      requiresOtp: true,
      emailOrPhone: user.email || user.phone,
      userId: user.id,
      role: user.role,
      name: user.name,
    };
  },

  /**
   * Step 2 Login: Verify OTP (Code 123456 always succeeds)
   */
  async verifyOtp({ userId, otp }) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const users = await this.getUsers();
    const user = users.find((u) => u.id === userId);

    if (!user) {
      throw new Error('User session not found.');
    }

    // Code 123456 always works
    if (otp !== '123456' && otp !== '000000') {
      throw new Error('Invalid OTP code. For demo testing, please enter 123456.');
    }

    // Persist session
    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      city: user.city || 'Jaipur',
      avatar: user.avatar,
      badge: user.badge,
      verified: user.verified,
      kycStatus: user.kycStatus,
    };

    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(sessionUser));
    return sessionUser;
  },

  /**
   * Quick Login for Demo Customer, Demo Tailor, or Demo Admin
   */
  async quickLogin(role) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const users = await this.getUsers();
    let user;

    if (role === 'admin') {
      user = users.find((u) => u.role === 'admin');
    } else if (role === 'tailor') {
      user = users.find((u) => u.role === 'tailor' && u.verified);
    } else {
      user = users.find((u) => u.role === 'customer');
    }

    if (!user) {
      user = INITIAL_USERS.find((u) => u.role === role);
    }

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      city: user.city || 'Jaipur',
      avatar: user.avatar,
      badge: user.badge,
      verified: user.verified,
      kycStatus: user.kycStatus,
    };

    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(sessionUser));
    return sessionUser;
  },

  /**
   * Signup for Customer or Tailor
   */
  async signup({ name, emailOrPhone, password, role, city, specialty, kycDocument }) {
    await new Promise((resolve) => setTimeout(resolve, 450));
    const users = await this.getUsers();
    const query = emailOrPhone.trim().toLowerCase();

    const isExisting = users.some(
      (u) => u.email.toLowerCase() === query || (u.phone && u.phone === query)
    );

    if (isExisting) {
      throw new Error('An account already exists with this email or phone number.');
    }

    const isEmail = query.includes('@');
    const newUser = {
      id: `user_${Date.now()}`,
      name: name.trim(),
      email: isEmail ? query : `${query.replace(/[^0-9]/g, '')}@stitchly.user`,
      phone: !isEmail ? query : '+91 98000 00000',
      password,
      role, // 'customer' or 'tailor'
      city: city || 'New Delhi',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,
      createdAt: new Date().toISOString(),
      verified: role === 'customer',
      specialties: specialty ? [specialty] : ['Custom Tailoring'],
      badge: role === 'tailor' ? 'KYC Review Pending' : 'New Client',
      kycStatus: role === 'tailor' ? 'pending' : 'approved',
      kycDocument: kycDocument || null, // Base64 storage
      orders: [],
    };

    users.push(newUser);
    await this.saveUsers(users);

    // Auto-login new user
    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      city: newUser.city,
      avatar: newUser.avatar,
      badge: newUser.badge,
      verified: newUser.verified,
      kycStatus: newUser.kycStatus,
    };

    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(sessionUser));
    return sessionUser;
  },

  /**
   * Logout user and clear session
   */
  async logout() {
    await new Promise((resolve) => setTimeout(resolve, 150));
    localStorage.removeItem(STORAGE_KEY_SESSION);
    return true;
  },
};

export default authService;
