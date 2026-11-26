import { orderStatusLabels } from '../config/labels';
import type { OrderStatus } from '../models/order';

import './StatusBadge.css';

const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => (
  <span className={`status-badge status-badge--${status}`}>{orderStatusLabels[status]}</span>
);

export default StatusBadge;
