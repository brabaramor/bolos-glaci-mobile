import { IonContent, IonPage, useIonRouter } from '@ionic/react';
import { useState } from 'react';

import AppHeader from '../../../components/AppHeader';
import DataState from '../../../components/DataState';
import FilterChips, { type FilterChipOption } from '../../../components/FilterChips';
import OrderCard from '../../../components/OrderCard';
import PageTitleBar from '../../../components/PageTitleBar';
import { appRoutes } from '../../../config/appRoutes';
import { adminLabels, adminOrdersLabels, orderStatusFilterLabels } from '../../../config/labels';
import { mainMenuId } from '../../../config/navigation';
import { useAdminOrders } from '../../../hooks/useAdminOrders';
import { ORDER_STATUSES, type Order, type OrderStatus } from '../../../models/order';

import './OrderList.css';

type StatusFilter = OrderStatus | 'all';

// "Todos" first, then one chip per status, built from the model's list.
const statusFilterOptions: FilterChipOption<StatusFilter>[] = [
  { value: 'all', label: orderStatusFilterLabels.all },
  ...ORDER_STATUSES.map((status) => ({ value: status, label: orderStatusFilterLabels[status] })),
];

const OrderList: React.FC = () => {
  const router = useIonRouter();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const { orders, isLoading, errorMessage, reload } = useAdminOrders(statusFilter === 'all' ? undefined : statusFilter);

  const handleOpen = (order: Order): void => {
    router.push(appRoutes.adminOrderDetail(order.id));
  };

  return (
    <IonPage>
      <AppHeader menuId={mainMenuId} variant="admin" title={adminLabels.panelTitle} />
      <IonContent>
        <PageTitleBar title={adminOrdersLabels.title} />
        <FilterChips
          options={statusFilterOptions}
          selectedValue={statusFilter}
          onChange={setStatusFilter}
          ariaLabel={adminOrdersLabels.filterAriaLabel}
        />

        <div className="order-list">
          <DataState
            isLoading={isLoading}
            errorMessage={errorMessage}
            isEmpty={orders.length === 0}
            emptyMessage={adminOrdersLabels.emptyList}
            onRetry={reload}
          >
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} onOpen={handleOpen} />
            ))}
          </DataState>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OrderList;
