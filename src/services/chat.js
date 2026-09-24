const STORAGE_KEY_CHAT = 'stitchly_chat_threads';

const INITIAL_THREADS = {
  tailor_01: [
    {
      id: 'msg_1',
      sender: 'tailor',
      text: 'Namaste Priya ji! I have received your design specs for the Crimson Zardozi Lehenga. Our Jaipur workshop is inspecting the pure raw silk yardage today.',
      timestamp: '10:15 AM',
      date: 'Today',
    },
    {
      id: 'msg_2',
      sender: 'customer',
      text: 'Thank you Meera ji! Could you ensure the can-can skirt has comfortable soft cotton lining so it does not prick during sangeet dancing?',
      timestamp: '10:22 AM',
      date: 'Today',
    },
    {
      id: 'msg_3',
      sender: 'tailor',
      text: 'Absolutely! We always add a double layer of soft mulmul lining between the can-can stiffener and your skin. I will post a video milestone once the kalis are assembled.',
      timestamp: '10:30 AM',
      date: 'Today',
    },
  ],
  tailor_03: [
    {
      id: 'msg_4',
      sender: 'tailor',
      text: 'Hello Priya! Fatima here from Hyderabad. Your Mint Organza Anarkali is currently on our embroidery frame. The pearl scallop borders look delicate and stunning.',
      timestamp: 'Yesterday, 4:45 PM',
      date: 'Yesterday',
    },
  ],
};

function getThreads() {
  if (typeof window === 'undefined') return INITIAL_THREADS;
  const stored = localStorage.getItem(STORAGE_KEY_CHAT);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY_CHAT, JSON.stringify(INITIAL_THREADS));
    return INITIAL_THREADS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_THREADS;
  }
}

export const chatService = {
  async getMessages(tailorId = 'tailor_01') {
    const threads = getThreads();
    return threads[tailorId] || [];
  },

  async sendMessage(tailorId = 'tailor_01', text = '', imageAttachment = null) {
    const threads = getThreads();
    if (!threads[tailorId]) threads[tailorId] = [];

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: 'customer',
      text,
      image: imageAttachment || null,
      timestamp: timeStr,
      date: 'Just now',
    };

    threads[tailorId].push(newMsg);
    localStorage.setItem(STORAGE_KEY_CHAT, JSON.stringify(threads));

    return newMsg;
  },

  /**
   * Simulates an intelligent tailor reply after 1.8s
   */
  async simulateTailorReply(tailorId = 'tailor_01', triggerText = '') {
    await new Promise((r) => setTimeout(r, 1800));
    const threads = getThreads();
    if (!threads[tailorId]) threads[tailorId] = [];

    const responses = [
      'Noted with care! I will calibrate the dart angles and seam allowance per your 3D fit profile.',
      'That will look regal. I will match the antique gold zari thread to your color swatch.',
      'Rest assured, every seam includes a generous 1.5-inch inner margin for effortless future letting out.',
      'I will capture a high-definition video of the hand-beading for your live milestone cam today!',
    ];

    const replyText = responses[Math.floor(Math.random() * responses.length)];
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const replyMsg = {
      id: `msg_${Date.now()}`,
      sender: 'tailor',
      text: replyText,
      timestamp: timeStr,
      date: 'Just now',
    };

    threads[tailorId].push(replyMsg);
    localStorage.setItem(STORAGE_KEY_CHAT, JSON.stringify(threads));

    // Dispatch custom event for cross-tab or same-window listeners
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('stitchly_chat_update', { detail: { tailorId, replyMsg } }));
    }

    return replyMsg;
  },
};

export default chatService;
