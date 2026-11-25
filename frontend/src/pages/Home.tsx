import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { useCakeCatalog } from '../hooks/useCakeCatalog';

const Home: React.FC = () => {
  const { cakes, isLoading, errorMessage } = useCakeCatalog();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bolos da Glaci</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {isLoading && <p>Carregando...</p>}
        {errorMessage && <p>{errorMessage}</p>}
        <ul>
          {cakes.map((cake) => (
            <li key={cake.id}>{cake.name}</li>
          ))}
        </ul>
      </IonContent>
    </IonPage>
  );
};

export default Home;