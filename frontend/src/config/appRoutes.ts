import type { Order } from '../models/order';

// Screen paths. Screens and menus navigate through these.
export const appRoutes = {
  home: '/home',
  catalog: '/catalog',
  placeOrder: '/order',
  placeOrderForCake: (cakeId: string) => `/order?cakeId=${cakeId}`,
  adminLogin: '/admin/login',
  orderConfirmation: '/order/confirmation',
} as const;

export interface OrderConfirmationRouteState {
  order: Order;
}
