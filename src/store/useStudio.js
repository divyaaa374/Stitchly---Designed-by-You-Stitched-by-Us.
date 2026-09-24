import { create } from 'zustand';
import aiService from '../services/ai';

export const useStudio = create((set, get) => ({
  activePrompt: 'Maroon velvet lehenga for sangeet with intricate peacock motifs',
  isGenerating: false,
  variations: [],
  selectedVariation: null,

  setPrompt: (prompt) => set({ activePrompt: prompt }),

  generateDesigns: async (customPrompt) => {
    const prompt = customPrompt || get().activePrompt;
    set({ isGenerating: true, activePrompt: prompt });
    try {
      const results = await aiService.generateVariations(prompt);
      set({ variations: results, selectedVariation: results[0] || null, isGenerating: false });
      return results;
    } catch (err) {
      set({ isGenerating: false });
    }
  },

  selectVariation: (variation) => set({ selectedVariation: variation }),
}));

export default useStudio;
