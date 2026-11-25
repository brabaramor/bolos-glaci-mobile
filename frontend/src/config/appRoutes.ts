// Screen paths. Screens and menus navigate through these.
export const appRoutes = {
  home: '/home',
  catalog: '/catalog',
  placeOrder: '/order',
  placeOrderForCake: (cakeId: string) => `/order?cakeId=${cakeId}`,
  adminLogin: '/admin/login',
} as const;
