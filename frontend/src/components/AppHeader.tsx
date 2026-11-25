import { IonButtons, IonHeader, IonMenuButton, IonToolbar } from '@ionic/react';

import { appConfig } from '../config/appConfig';
import { brandLabels } from '../config/labels';

import './AppHeader.css';

interface AppHeaderProps {
  menuId: string;
  variant?: 'customer' | 'admin';
}

const AppHeader: React.FC<AppHeaderProps> = ({ menuId, variant = 'customer' }) => (
  <IonHeader className={`app-header app-header--${variant}`}>
    <IonToolbar>
      <div slot="start" className="app-header__brand">
        <span className="app-header__logo" aria-hidden="true">
          {brandLabels.logoIcon}
        </span>
        <span className="app-header__name">{appConfig.appName}</span>
      </div>
      <IonButtons slot="end">
        <IonMenuButton menu={menuId} aria-label={brandLabels.openMenu} />
      </IonButtons>
    </IonToolbar>
  </IonHeader>
);

export default AppHeader;
