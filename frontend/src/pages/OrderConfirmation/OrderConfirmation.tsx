import { IonContent, IonPage } from '@ionic/react';
import { Navigate, useLocation } from 'react-router-dom';

import AppButton from '../../components/AppButton';
import InfoBox from '../../components/InfoBox';
import InfoList, { type InfoListItem } from '../../components/InfoList';
import PageBanner from '../../components/PageBanner';
import { type OrderConfirmationRouteState, appRoutes } from '../../config/appRoutes';
import { confirmationLabels, orderFieldLabels } from '../../config/labels';
import { formatDate } from '../../utils/date';

import './OrderConfirmation.css';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const routeState = location.state as OrderConfirmationRouteState | null;

  // Opened without an order (page refresh or typed URL): nothing to confirm, go home.
  if (!routeState?.order) {
    return <Navigate to={appRoutes.home} replace />;
  }

  const { order } = routeState;
  const deliveryDate = formatDate(order.deliveryDate);

  const summaryItems: InfoListItem[] = [
    {
      label: orderFieldLabels.product,
      value: orderFieldLabels.productName(order.cakeName, order.sizeName),
    },
    {
      label: orderFieldLabels.deliveryDate,
      // The time is optional, so it only shows when the customer filled it in.
      value: order.preferredTime ? orderFieldLabels.dateWithTime(deliveryDate, order.preferredTime) : deliveryDate,
    },
    { label: orderFieldLabels.customer, value: order.customer.name },
    { label: orderFieldLabels.phone, value: order.customer.phone },
  ];

  return (
    <IonPage>
      <IonContent>
        <PageBanner
          variant="success"
          icon={confirmationLabels.bannerIcon}
          title={confirmationLabels.title}
          subtitle={confirmationLabels.subtitle}
        />

        <div className="order-confirmation">
          <div className="order-confirmation__number-box">
            <p className="order-confirmation__number-caption">{confirmationLabels.orderNumberCaption}</p>
            <p className="order-confirmation__number">{orderFieldLabels.orderNumber(order.orderNumber)}</p>
            <p className="order-confirmation__number-caption">{confirmationLabels.orderNumberHint}</p>
          </div>

          <InfoList items={summaryItems} />

          <InfoBox icon={confirmationLabels.nextStepsIcon} title={confirmationLabels.nextStepsTitle}>
            <ul className="order-confirmation__steps">
              {confirmationLabels.nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </InfoBox>

          <AppButton expand="block" routerLink={appRoutes.catalog} routerDirection="root">
            {confirmationLabels.backToCatalog}
          </AppButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OrderConfirmation;
