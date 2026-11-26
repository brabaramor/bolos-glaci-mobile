import { createOutline, eyeOffOutline, eyeOutline, trashOutline } from 'ionicons/icons';

import { adminCakeCardLabels } from '../config/labels';
import type { Cake } from '../models/cake';
import { formatPrice, getStartingPrice } from '../utils/price';

import CakeImage from './CakeImage';
import IconButton from './IconButton';

import './AdminCakeCard.css';

interface AdminCakeCardProps {
  cake: Cake;
  isBusy?: boolean;
  onView: (cake: Cake) => void;
  onEdit: (cake: Cake) => void;
  onToggleVisibility: (cake: Cake) => void;
  onDelete: (cake: Cake) => void;
}

const AdminCakeCard: React.FC<AdminCakeCardProps> = ({
  cake,
  isBusy = false,
  onView,
  onEdit,
  onToggleVisibility,
  onDelete,
}) => (
  <article className={`admin-cake-card${cake.isPublished ? '' : ' admin-cake-card--hidden'}`}>
    <button
      type="button"
      className="admin-cake-card__open"
      aria-label={`${adminCakeCardLabels.edit}: ${cake.name}`}
      onClick={() => onView(cake)}
    >
      <CakeImage imageUrl={cake.imageUrl} name={cake.name} />
    </button>

    <div className="admin-cake-card__body">
      <button type="button" className="admin-cake-card__title" onClick={() => onView(cake)}>
        {cake.name}
      </button>
      <strong className="admin-cake-card__price">{formatPrice(getStartingPrice(cake))}</strong>
      {!cake.isPublished && <span className="admin-cake-card__hidden-tag">{adminCakeCardLabels.hiddenTag}</span>}

      <div className="admin-cake-card__actions">
        <IconButton
          icon={createOutline}
          label={adminCakeCardLabels.edit}
          tone="info"
          disabled={isBusy}
          onClick={() => onEdit(cake)}
        />
        <IconButton
          icon={cake.isPublished ? eyeOutline : eyeOffOutline}
          label={cake.isPublished ? adminCakeCardLabels.unpublish : adminCakeCardLabels.publish}
          disabled={isBusy}
          onClick={() => onToggleVisibility(cake)}
        />
        <IconButton
          icon={trashOutline}
          label={adminCakeCardLabels.delete}
          tone="danger"
          disabled={isBusy}
          onClick={() => onDelete(cake)}
        />
      </div>
    </div>
  </article>
);

export default AdminCakeCard;
