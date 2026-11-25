import { cakeCardLabels } from '../config/labels';
import type { Cake } from '../models/cake';
import { formatPrice, getStartingPrice } from '../utils/price';

import AppButton from './AppButton';

import './CakeCard.css';

interface CakeCardProps {
  cake: Cake;
  onOrder: (cake: Cake) => void;
}

// Customer-facing card, shared by Home (featured cakes) and Catalog..
const CakeCard: React.FC<CakeCardProps> = ({ cake, onOrder }) => (
  <article className="cake-card">
    <div className="cake-card__media">
      {cake.imageUrl ? (
        <img className="cake-card__image" src={cake.imageUrl} alt={cake.name} loading="lazy" />
      ) : (
        <span className="cake-card__placeholder" role="img" aria-label={cakeCardLabels.imagePlaceholder}>
          {cakeCardLabels.imagePlaceholderIcon}
        </span>
      )}
    </div>

    <div className="cake-card__body">
      <h3 className="cake-card__title">{cake.name}</h3>
      <p className="cake-card__description">{cake.description}</p>

      <div className="cake-card__footer">
        <div>
          <span className="cake-card__price-caption">{cakeCardLabels.startingAt}</span>
          <strong className="cake-card__price">{formatPrice(getStartingPrice(cake))}</strong>
        </div>
        <AppButton variant="secondary" size="small" onClick={() => onOrder(cake)}>
          {cakeCardLabels.orderButton}
        </AppButton>
      </div>
    </div>
  </article>
);

export default CakeCard;
