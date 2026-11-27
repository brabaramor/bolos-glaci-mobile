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

import type { MenuAction, MenuItem } from '../config/navigation';

interface AppMenuProps {
  menuId: string;
  contentId: string;
  title: string;
  items: MenuItem[];
  onAction?: (action: MenuAction) => void;
}

// Side menu opened by the header's ☰ button. Items either open a screen or trigger an action.
const AppMenu: React.FC<AppMenuProps> = ({ menuId, contentId, title, items, onAction }) => (
  <IonMenu menuId={menuId} contentId={contentId} side="end" type="overlay">
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        {items.map((item) => (
          // Closes the menu automatically after an item is tapped.
          <IonMenuToggle key={item.label} autoHide={false}>
            {item.path ? (
              <IonItem routerLink={item.path} routerDirection="root" detail={false}>
                <IonLabel>{item.label}</IonLabel>
              </IonItem>
            ) : (
              <IonItem button detail={false} onClick={() => item.action && onAction?.(item.action)}>
                <IonLabel>{item.label}</IonLabel>
              </IonItem>
            )}
          </IonMenuToggle>
        ))}
      </IonList>
    </IonContent>
  </IonMenu>
);

export default AppMenu;
