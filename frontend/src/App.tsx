import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Navigate, Route } from 'react-router-dom';

import AdminRoute from './components/AdminRoute';
import MainMenu from './components/MainMenu';
import { appRoutes } from './config/appRoutes';
import { mainContentId } from './config/navigation';
import Catalog from './pages/Catalog/Catalog';
import Home from './pages/Home';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import AdminLogin from './pages/admin/AdminLogin/AdminLogin';
import OrderList from './pages/admin/OrderList/OrderList';

/* Core CSS required for Ionic components */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      {/* Picks customer or admin items by itself, based on the current path. */}
      <MainMenu />
      <IonRouterOutlet id={mainContentId}>
        {/* Admin: every screen except the login is wrapped in AdminRoute */}
        <Route path={appRoutes.adminLogin} element={<AdminLogin />} />
        <Route
          path={appRoutes.adminOrders}
          element={
            <AdminRoute>
              <OrderList />
            </AdminRoute>
          }
        />

        {/* Customer */}
        <Route path={appRoutes.home} element={<Home />} />
        <Route path={appRoutes.catalog} element={<Catalog />} />
        <Route path={appRoutes.placeOrder} element={<PlaceOrder />} />
        <Route path={appRoutes.orderConfirmation} element={<OrderConfirmation />} />
        <Route path="/" element={<Navigate to={appRoutes.home} replace />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
