import { appRoutes } from './appRoutes';
import { navigationLabels } from './labels';

export interface MenuLink {
  label: string;
  path: string;
}

export const mainContentId = 'main-content';
export const customerMenuId = 'customer-menu';

export const customerMenuLinks: MenuLink[] = [
  { label: navigationLabels.home, path: appRoutes.home },
  { label: navigationLabels.catalog, path: appRoutes.catalog },
  { label: navigationLabels.placeOrder, path: appRoutes.placeOrder },
  { label: navigationLabels.adminArea, path: appRoutes.adminLogin },
];
