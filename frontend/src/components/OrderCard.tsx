import { orderCardLabels, orderFieldLabels } from '../config/labels';
import type { Order } from '../models/order';
import { formatDate, formatTimestampDate } from '../utils/date';

import AppButton from './AppButton';
import StatusBadge from './StatusBadge';

import './OrderCard.css';

interface OrderCardProps {
  order: Order;
  onOpen: (order: Order) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onOpen }) => (
  <article className="order-card">
    <div className="order-card__header">
      <span className="order-card__number">{orderFieldLabels.orderNumber(order.orderNumber)}</span>
      <StatusBadge status={order.status} />
    </div>

    <div>
      <h3 className="order-card__customer">{order.customer.name}</h3>
      <p className="order-card__product">{orderFieldLabels.productName(order.cakeName, order.sizeName)}</p>
    </div>

    <div className="order-card__meta">
      <span>
        <span aria-hidden="true">{orderCardLabels.orderDateIcon} </span>
        {orderCardLabels.orderDate} {formatTimestampDate(order.createdAt)}
      </span>
      <span>
        <span aria-hidden="true">{orderCardLabels.deliveryDateIcon} </span>
        {orderCardLabels.deliveryDate} {formatDate(order.deliveryDate)}
      </span>
      <span>
        <span aria-hidden="true">{orderCardLabels.phoneIcon} </span>
        {order.customer.phone}
      </span>
    </div>

    <AppButton variant="secondary" expand="block" onClick={() => onOpen(order)}>
      {orderCardLabels.viewDetails}
    </AppButton>
  </article>
);

export default OrderCard;
