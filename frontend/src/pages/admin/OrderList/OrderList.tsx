import { IonContent, IonPage } from '@ionic/react';

import AppHeader from '../../../components/AppHeader';
import { adminLabels } from '../../../config/labels';
import { mainMenuId } from '../../../config/navigation';

const OrderList: React.FC = () => (
  <IonPage>
    <AppHeader menuId={mainMenuId} variant="admin" title={adminLabels.panelTitle} />
    <IonContent className="ion-padding" />
  </IonPage>
);

export default OrderList;
