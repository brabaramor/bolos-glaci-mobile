import {
  IonContent,
  IonPage,
  IonRouterLink,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  useIonAlert,
  useIonToast,
} from '@ionic/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import AppButton from '../../../components/AppButton';
import AppHeader from '../../../components/AppHeader';
import DataState from '../../../components/DataState';
import FormField from '../../../components/FormField';
import ReadOnlyField from '../../../components/ReadOnlyField';
import SectionCard from '../../../components/SectionCard';
import { appConfig } from '../../../config/appConfig';
import { appRoutes } from '../../../config/appRoutes';
import {
  adminLabels,
  commonLabels,
  orderDetailLabels,
  orderFieldLabels,
  orderStatusLabels,
  whatsAppLabels,
} from '../../../config/labels';
import { mainMenuId } from '../../../config/navigation';
import { useOrderDetail } from '../../../hooks/useOrderDetail';
import { useUpdateOrder } from '../../../hooks/useUpdateOrder';
import { ORDER_STATUSES, type Order, type OrderStatus } from '../../../models/order';
import { formatDate, formatTimestampDate, formatTimestampTime } from '../../../utils/date';
import { buildWhatsAppUrl } from '../../../utils/whatsApp';

import './OrderDetail.css';

function OrderDetailContent({ order }: { order: Order }): React.JSX.Element {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [internalNotes, setInternalNotes] = useState(order.internalNotes);
  const { saveOrder, isSaving, errorMessage } = useUpdateOrder();
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();

  const save = async (nextStatus: OrderStatus): Promise<void> => {
    const savedOrder = await saveOrder(order.id, { status: nextStatus, internalNotes });
    if (savedOrder) {
      setStatus(savedOrder.status);
      void presentToast({
        message: orderDetailLabels.savedMessage,
        duration: 2000,
        position: 'bottom',
        color: 'success',
      });
    }
  };

  const confirmCancel = (): void => {
    void presentAlert({
      header: orderDetailLabels.cancelConfirmTitle,
      message: orderDetailLabels.cancelConfirmMessage,
      buttons: [
        { text: orderDetailLabels.cancelConfirmNo, role: 'cancel' },
        {
          text: orderDetailLabels.cancelConfirmYes,
          role: 'destructive',
          handler: () => {
            void save('cancelled');
          },
        },
      ],
    });
  };

  const deliveryDate = formatDate(order.deliveryDate);
  const whatsAppUrl = buildWhatsAppUrl(
    order.customer.phone,
    whatsAppLabels.orderMessage(order.customer.name, order.orderNumber, appConfig.appName),
  );

  return (
    <>
      <h1 className="order-detail__title">{orderDetailLabels.title(order.orderNumber)}</h1>

      <SectionCard icon={orderDetailLabels.orderInfoIcon} title={orderDetailLabels.orderInfoTitle}>
        <FormField label={orderDetailLabels.statusLabel}>
          <IonSelect
            className="order-detail__status"
            fill="outline"
            interface="action-sheet"
            aria-label={orderDetailLabels.statusLabel}
            value={status}
            onIonChange={(event) => setStatus(event.detail.value as OrderStatus)}
          >
            {ORDER_STATUSES.map((orderStatus) => (
              <IonSelectOption key={orderStatus} value={orderStatus}>
                {orderStatusLabels[orderStatus]}
              </IonSelectOption>
            ))}
          </IonSelect>
        </FormField>

        <ReadOnlyField label={orderDetailLabels.productLabel} value={order.cakeName} />
        <ReadOnlyField label={orderDetailLabels.sizeLabel} value={order.sizeName} />
        <ReadOnlyField
          label={orderDetailLabels.orderDateLabel}
          value={orderFieldLabels.dateWithTime(
            formatTimestampDate(order.createdAt),
            formatTimestampTime(order.createdAt),
          )}
        />
        <ReadOnlyField
          label={orderDetailLabels.deliveryDateLabel}
          value={order.preferredTime ? orderFieldLabels.dateWithTime(deliveryDate, order.preferredTime) : deliveryDate}
          isHighlighted
        />
        <ReadOnlyField
          label={orderDetailLabels.customerNotesLabel}
          value={order.customerNotes || orderDetailLabels.noCustomerNotes}
        />

        <FormField label={orderDetailLabels.internalNotesLabel}>
          <IonTextarea
            fill="outline"
            rows={4}
            aria-label={orderDetailLabels.internalNotesLabel}
            placeholder={orderDetailLabels.internalNotesPlaceholder}
            value={internalNotes}
            onIonInput={(event) => setInternalNotes(event.detail.value ?? '')}
          />
        </FormField>
      </SectionCard>

      <SectionCard icon={orderDetailLabels.customerIcon} title={orderDetailLabels.customerTitle}>
        <ReadOnlyField label={orderDetailLabels.nameLabel} value={order.customer.name} />
        <ReadOnlyField label={orderDetailLabels.phoneLabel} value={order.customer.phone} />
        <ReadOnlyField label={orderDetailLabels.emailLabel} value={order.customer.email} />
        <AppButton variant="success" expand="block" href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
          {orderDetailLabels.whatsAppButton}
        </AppButton>
      </SectionCard>

      <SectionCard icon={orderDetailLabels.actionsIcon} title={orderDetailLabels.actionsTitle}>
        {errorMessage && (
          <p className="order-detail__error" role="alert">
            {errorMessage}
          </p>
        )}
        {status !== 'cancelled' && (
          <AppButton variant="danger" expand="block" disabled={isSaving} onClick={confirmCancel}>
            {orderDetailLabels.cancelOrder}
          </AppButton>
        )}
        <AppButton variant="secondary" expand="block" disabled={isSaving} onClick={() => void save(status)}>
          {isSaving ? orderDetailLabels.saving : orderDetailLabels.saveChanges}
        </AppButton>
      </SectionCard>
    </>
  );
}

const OrderDetail: React.FC = () => {
  const { orderId = '' } = useParams<{ orderId: string }>();
  const { order, isLoading, errorMessage, reload } = useOrderDetail(orderId);

  return (
    <IonPage>
      <AppHeader menuId={mainMenuId} variant="admin" title={adminLabels.panelTitle} />
      <IonContent>
        <div className="order-detail">
          <IonRouterLink className="order-detail__back" routerLink={appRoutes.adminOrders} routerDirection="back">
            {orderDetailLabels.backToList}
          </IonRouterLink>

          <DataState
            isLoading={isLoading}
            errorMessage={errorMessage}
            isEmpty={!order}
            emptyMessage={commonLabels.notFound}
            onRetry={reload}
          >
            {order && <OrderDetailContent key={order.id} order={order} />}
          </DataState>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OrderDetail;
