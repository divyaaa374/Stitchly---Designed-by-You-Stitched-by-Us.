import { create } from 'zustand';
import wishlistService from '../services/wishlist.js';

export const useWishlist = create((set, get) => ({
  items: [],
  isLoading: false,

  fetchWishlist: async () => {
    set({ isLoading: true });
    const list = await wishlistService.getWishlist();
    set({ items: list, isLoading: false });
  },

  toggleWishlist: async (design) => {
    const { items } = get();
    const exists = items.some((i) => i.id === design.id);
    if (exists) {
      await wishlistService.removeFromWishlist(design.id);
      set({ items: items.filter((i) => i.id !== design.id) });
      return false; // Removed
    } else {
      const added = await wishlistService.addToWishlist(design);
      set({ items: [added, ...items] });
      return true; // Added
    }
  },

  removeItem: async (id) => {
    await wishlistService.removeFromWishlist(id);
    set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
  },

  isWishlisted: (id) => {
    return get().items.some((i) => i.id === id);
  },
}));

export default useWishlist;
