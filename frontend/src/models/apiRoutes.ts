// Paths relative to appConfig.apiBaseUrl. Services build URLs only from here.

export const apiRoutes = {
  // Public (customer)
  cakes: '/cakes',
  cakeById: (cakeId: string) => `/cakes/${cakeId}`,
  sizes: '/sizes',
  categories: '/categories',
  orders: '/orders',

  // Admin (requires "Authorization: Bearer <token>")
  login: '/auth/login',
  adminCakes: '/admin/cakes',
  adminCakeById: (cakeId: string) => `/admin/cakes/${cakeId}`,
  adminCakeVisibility: (cakeId: string) => `/admin/cakes/${cakeId}/visibility`,
  adminOrders: '/admin/orders',
  adminOrderById: (orderId: string) => `/admin/orders/${orderId}`,
} as const;
