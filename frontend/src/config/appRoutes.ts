import type { Order } from '../models/order';

// Screen paths. Screens and menus navigate through these.
export const appRoutes = {
  home: '/home',
  catalog: '/catalog',
  placeOrder: '/order',
  placeOrderForCake: (cakeId: string) => `/order?cakeId=${cakeId}`,
  adminLogin: '/admin/login',
  orderConfirmation: '/order/confirmation',
  adminOrders: '/admin/orders',
  adminArea: '/admin',
  adminProducts: '/admin/products',
  adminOrderDetail: (orderId: string) => `/admin/orders/${orderId}`,
  adminOrderDetailPattern: '/admin/orders/:orderId',
} as const;

export interface OrderConfirmationRouteState {
  order: Order;
}
