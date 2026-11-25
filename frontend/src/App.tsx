import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Navigate, Route } from 'react-router-dom';

import AppMenu from './components/AppMenu';
import { appRoutes } from './config/appRoutes';
import { brandLabels } from './config/labels';
import { customerMenuId, customerMenuLinks, mainContentId } from './config/navigation';
import Home from './pages/Home';

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
      <AppMenu
        menuId={customerMenuId}
        contentId={mainContentId}
        title={brandLabels.menuTitle}
        links={customerMenuLinks}
      />
      <IonRouterOutlet id={mainContentId}>
        <Route path={appRoutes.home} element={<Home />} />
        <Route path="/" element={<Navigate to={appRoutes.home} replace />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
