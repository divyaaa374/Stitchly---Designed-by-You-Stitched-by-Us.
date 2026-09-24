import { create } from 'zustand';
import chatService from '../services/chat.js';

export const useChat = create((set, get) => ({
  isOpen: false,
  activeTailor: {
    id: 'tailor_01',
    name: 'Master Meera Devi',
    city: 'Jaipur',
    badge: 'Bridal Specialist',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  messages: [],
  isTyping: false,

  openChat: (tailor = null) => {
    if (tailor) {
      set({ activeTailor: tailor, isOpen: true });
    } else {
      set({ isOpen: true });
    }
    get().fetchMessages();
  },

  closeChat: () => set({ isOpen: false }),

  fetchMessages: async () => {
    const { activeTailor } = get();
    const msgs = await chatService.getMessages(activeTailor.id);
    set({ messages: msgs });
  },

  sendMessage: async (text, imageAttachment = null) => {
    const { activeTailor } = get();
    if (!text.trim() && !imageAttachment) return;

    const sent = await chatService.sendMessage(activeTailor.id, text, imageAttachment);
    set((state) => ({ messages: [...state.messages, sent], isTyping: true }));

    // Simulate tailor reply after 1.8s
    setTimeout(async () => {
      const reply = await chatService.simulateTailorReply(activeTailor.id, text);
      set((state) => ({
        messages: [...state.messages, reply],
        isTyping: false,
      }));
    }, 1200);
  },
}));

export default useChat;
