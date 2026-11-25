import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import type { MenuLink } from '../config/navigation';

interface AppMenuProps {
  menuId: string;
  contentId: string;
  title: string;
  links: MenuLink[];
}

// Side menu opened by the header's ☰ button. Customer and admin pass their own links.
const AppMenu: React.FC<AppMenuProps> = ({ menuId, contentId, title, links }) => (
  <IonMenu menuId={menuId} contentId={contentId} side="end" type="overlay">
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        {links.map((link) => (
          // Closes the menu automatically after a link is tapped.
          <IonMenuToggle key={link.path} autoHide={false}>
            <IonItem routerLink={link.path} routerDirection="root" detail={false}>
              <IonLabel>{link.label}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        ))}
      </IonList>
    </IonContent>
  </IonMenu>
);

export default AppMenu;
