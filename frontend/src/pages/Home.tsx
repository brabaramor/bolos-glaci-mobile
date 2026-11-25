import { IonContent, IonPage, useIonRouter } from '@ionic/react';

import AppButton from '../components/AppButton';
import AppHeader from '../components/AppHeader';
import CakeCard from '../components/CakeCard';
import CallToActionFooter from '../components/CallToActionFooter';
import DataState from '../components/DataState';
import { appRoutes } from '../config/appRoutes';
import { homeLabels } from '../config/labels';
import { customerMenuId } from '../config/navigation';
import { useCakeCatalog } from '../hooks/useCakeCatalog';
import type { Cake } from '../models/cake';

import './Home.css';

const Home: React.FC = () => {
  const router = useIonRouter();
  const { cakes, isLoading, errorMessage, reload } = useCakeCatalog();

  // The catalog is small, so featured cakes are picked from the published list.
  const featuredCakes = cakes.filter((cake) => cake.isFeatured);

  const handleOrder = (cake: Cake): void => {
    router.push(appRoutes.placeOrderForCake(cake.id));
  };

  return (
    <IonPage>
      <AppHeader menuId={customerMenuId} />
      <IonContent>
        <section className="home-hero">
          <h1 className="home-hero__title">{homeLabels.heroTitle}</h1>
          <p className="home-hero__subtitle">{homeLabels.heroSubtitle}</p>
          <AppButton expand="block" routerLink={appRoutes.catalog}>
            {homeLabels.viewCatalog}
          </AppButton>
        </section>

        <section className="home-featured">
          <h2 className="home-featured__title">
            <span aria-hidden="true">{homeLabels.featuredIcon}</span>
            {homeLabels.featuredTitle}
          </h2>
          <DataState
            isLoading={isLoading}
            errorMessage={errorMessage}
            isEmpty={featuredCakes.length === 0}
            emptyMessage={homeLabels.noFeatured}
            onRetry={reload}
          >
            <div className="home-featured__list">
              {featuredCakes.map((cake) => (
                <CakeCard key={cake.id} cake={cake} onOrder={handleOrder} />
              ))}
            </div>
          </DataState>
        </section>

        <CallToActionFooter
          title={homeLabels.callToActionTitle}
          description={homeLabels.callToActionDescription}
          actionLabel={homeLabels.callToActionButton}
          actionPath={appRoutes.placeOrder}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
