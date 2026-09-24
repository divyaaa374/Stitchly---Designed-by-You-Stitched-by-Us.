const STORAGE_KEY_WISHLIST = 'stitchly_wishlist';

function getStoredWishlist() {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY_WISHLIST);
  if (!stored) {
    // Seed initial wishlist items for demo
    const initial = [
      {
        id: 'wish_seed_1',
        name: 'Imperial Velvet Bridal Lehenga',
        type: 'lehenga',
        colour: '#8B1E3F',
        fabric: 'velvet',
        embroidery: 'royal',
        neckline: 'sweetheart',
        sleeve: 'elbow',
        estimatedPrice: 32500,
        estimatedDays: 14,
        dateAdded: 'Yesterday',
        tailorSpecialty: 'Bridal Lehengas',
        notes: 'Antique gold peacock zardozi along 24-kali skirt hem.',
      },
      {
        id: 'wish_seed_2',
        name: 'Pastel Mint Organza Anarkali',
        type: 'anarkali',
        colour: '#D5EFE3',
        fabric: 'georgette',
        embroidery: 'subtle',
        neckline: 'v-neck',
        sleeve: 'bell',
        estimatedPrice: 16800,
        estimatedDays: 8,
        dateAdded: '3 days ago',
        tailorSpecialty: 'Chikankari & Pearl Work',
        notes: 'Pearl scallop hemline with sheer organza neckline inserts.',
      },
    ];
    localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export const wishlistService = {
  async getWishlist() {
    return getStoredWishlist();
  },

  async addToWishlist(item) {
    const list = getStoredWishlist();
    const exists = list.some((i) => i.id === item.id);
    if (!exists) {
      const newItem = {
        ...item,
        id: item.id || `wish_${Date.now()}`,
        dateAdded: 'Just now',
      };
      list.unshift(newItem);
      localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(list));
      return newItem;
    }
    return item;
  },

  async removeFromWishlist(id) {
    const list = getStoredWishlist();
    const updated = list.filter((i) => i.id !== id);
    localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(updated));
    return true;
  },

  async isInWishlist(id) {
    const list = getStoredWishlist();
    return list.some((i) => i.id === id);
  },
};

export default wishlistService;
