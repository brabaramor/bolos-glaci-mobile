import { appRoutes } from './appRoutes';
import { adminLabels, navigationLabels } from './labels';

export type MenuAction = 'logout';

export interface MenuItem {
  label: string;
  path?: string;
  action?: MenuAction;
}

export const mainContentId = 'main-content';
export const mainMenuId = 'main-menu';

export const customerMenuItems: MenuItem[] = [
  { label: navigationLabels.home, path: appRoutes.home },
  { label: navigationLabels.catalog, path: appRoutes.catalog },
  { label: navigationLabels.placeOrder, path: appRoutes.placeOrder },
  { label: navigationLabels.adminArea, path: appRoutes.adminLogin },
];

export const adminMenuItems: MenuItem[] = [
  { label: adminLabels.orders, path: appRoutes.adminOrders },
  { label: adminLabels.products, path: appRoutes.adminProducts },
  { label: adminLabels.logout, action: 'logout' },
];
