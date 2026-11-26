import { IonIcon } from '@ionic/react';

import './IconButton.css';

interface IconButtonProps {
  icon: string;
  label: string;
  tone?: 'info' | 'neutral' | 'danger';
  disabled?: boolean;
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, label, tone = 'neutral', disabled = false, onClick }) => (
  <button
    type="button"
    className={`icon-button icon-button--${tone}`}
    aria-label={label}
    title={label}
    disabled={disabled}
    onClick={onClick}
  >
    <IonIcon icon={icon} aria-hidden="true" />
  </button>
);

export default IconButton;
