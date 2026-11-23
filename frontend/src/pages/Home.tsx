import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { appConfig } from '../config/appConfig';

const Home: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Bolos da Glaci</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <p>Em construção</p>
    </IonContent>
  </IonPage>
);

export default Home;
