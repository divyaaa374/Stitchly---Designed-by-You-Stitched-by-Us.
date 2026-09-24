import { INITIAL_USERS } from '../data/seed.js';

const STORAGE_KEY_ORDERS = 'stitchly_orders';

function initializeOrders() {
  if (typeof window === 'undefined') return;
  const existing = localStorage.getItem(STORAGE_KEY_ORDERS);
  if (!existing) {
    const demoCustomer = INITIAL_USERS.find((u) => u.id === 'user_customer_01');
    const initialOrders = (demoCustomer && demoCustomer.orders) ? [...demoCustomer.orders] : [];
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(initialOrders));
  }
}

initializeOrders();

export const ordersService = {
  async getOrders() {
    initializeOrders();
    const data = localStorage.getItem(STORAGE_KEY_ORDERS);
    return data ? JSON.parse(data) : [];
  },

  async getCustomerOrders(customerId) {
    await new Promise((r) => setTimeout(r, 200));
    const orders = await this.getOrders();
    return orders;
  },

  async getTailorOrders(tailorId) {
    await new Promise((r) => setTimeout(r, 200));
    const orders = await this.getOrders();
    return orders.filter((o) => o.tailorId === tailorId || !o.tailorId);
  },

  async getAllOrders() {
    await new Promise((r) => setTimeout(r, 200));
    return this.getOrders();
  },

  async createOrder(newOrder) {
    await new Promise((r) => setTimeout(r, 300));
    const orders = await this.getOrders();
    const orderWithId = {
      ...newOrder,
      id: `ord_${Date.now()}`,
      orderDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'In Tailoring',
      progress: 25,
      currentStep: 'Fabric Cutting & Pattern Markup',
    };
    orders.unshift(orderWithId);
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    return orderWithId;
  },
};

export default ordersService;
