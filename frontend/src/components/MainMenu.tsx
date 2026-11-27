import { useIonRouter } from '@ionic/react';
import { useLocation } from 'react-router-dom';

import { appRoutes } from '../config/appRoutes';
import { brandLabels } from '../config/labels';
import { type MenuAction, adminMenuItems, customerMenuItems, mainContentId, mainMenuId } from '../config/navigation';
import { logout } from '../services/authService';

import AppMenu from './AppMenu';

const MainMenu: React.FC = () => {
  const location = useLocation();
  const router = useIonRouter();
  const isAdminArea = location.pathname.startsWith(appRoutes.adminArea);

  const handleAction = (action: MenuAction): void => {
    if (action === 'logout') {
      logout();
      router.push(appRoutes.adminLogin, 'root', 'replace');
    }
  };

  return (
    <AppMenu
      menuId={mainMenuId}
      contentId={mainContentId}
      title={brandLabels.menuTitle}
      items={isAdminArea ? adminMenuItems : customerMenuItems}
      onAction={handleAction}
    />
  );
};

export default MainMenu;
