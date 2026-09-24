import { TAILORS_LIST } from '../data/tailorsData.js';
import { INITIAL_USERS } from '../data/seed.js';

const STORAGE_KEY_TAILORS = 'stitchly_tailors_cache';

function initializeTailors() {
  if (typeof window === 'undefined') return;
  const existing = localStorage.getItem(STORAGE_KEY_TAILORS);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY_TAILORS, JSON.stringify(TAILORS_LIST));
  }
}

initializeTailors();

export const tailorsService = {
  async getAllTailors() {
    initializeTailors();
    const data = localStorage.getItem(STORAGE_KEY_TAILORS);
    return data ? JSON.parse(data) : TAILORS_LIST;
  },

  async getTailorById(id) {
    const list = await this.getAllTailors();
    return list.find((t) => t.id === id) || null;
  },

  async getPendingTailors() {
    // Read from seed users to find tailors with pending status
    const usersStr = localStorage.getItem('stitchly_users');
    const users = usersStr ? JSON.parse(usersStr) : INITIAL_USERS;
    return users.filter((u) => u.role === 'tailor' && u.kycStatus === 'pending');
  },

  async approveTailor(userId) {
    const usersStr = localStorage.getItem('stitchly_users');
    const users = usersStr ? JSON.parse(usersStr) : INITIAL_USERS;
    const updated = users.map((u) => {
      if (u.id === userId) {
        return {
          ...u,
          verified: true,
          kycStatus: 'approved',
          badge: 'Master Artisan',
        };
      }
      return u;
    });
    localStorage.setItem('stitchly_users', JSON.stringify(updated));
    return true;
  },

  async rejectTailor(userId) {
    const usersStr = localStorage.getItem('stitchly_users');
    const users = usersStr ? JSON.parse(usersStr) : INITIAL_USERS;
    const updated = users.map((u) => {
      if (u.id === userId) {
        return {
          ...u,
          verified: false,
          kycStatus: 'rejected',
          badge: 'Application Declined',
        };
      }
      return u;
    });
    localStorage.setItem('stitchly_users', JSON.stringify(updated));
    return true;
  }
};

export default tailorsService;
