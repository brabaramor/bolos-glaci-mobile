import { cakeCardLabels } from '../config/labels';

import './CakeImage.css';

interface CakeImageProps {
  imageUrl: string | null;
  name: string;
}

const CakeImage: React.FC<CakeImageProps> = ({ imageUrl, name }) => (
  <div className="cake-image">
    {imageUrl ? (
      <img className="cake-image__photo" src={imageUrl} alt={name} loading="lazy" />
    ) : (
      <span className="cake-image__placeholder" role="img" aria-label={cakeCardLabels.imagePlaceholder}>
        {cakeCardLabels.imagePlaceholderIcon}
      </span>
    )}
  </div>
);

export default CakeImage;
