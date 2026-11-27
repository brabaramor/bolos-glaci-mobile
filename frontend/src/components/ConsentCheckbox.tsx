import { IonCheckbox } from '@ionic/react';

import './ConsentCheckbox.css';

interface ConsentCheckboxProps {
  title: string;
  description: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  errorMessage?: string | null;
}

// Highlighted consent box (LGPD). The whole text is the checkbox label, so tapping it toggles.
const ConsentCheckbox: React.FC<ConsentCheckboxProps> = ({ title, description, isChecked, onChange, errorMessage }) => (
  <div className="consent-box">
    <IonCheckbox
      checked={isChecked}
      labelPlacement="end"
      justify="start"
      alignment="start"
      onIonChange={(event) => onChange(event.detail.checked)}
    >
      <span className="consent-box__title">{title}</span>
      <span className="consent-box__description">{description}</span>
    </IonCheckbox>
    {errorMessage && (
      <p className="consent-box__error" role="alert">
        {errorMessage}
      </p>
    )}
  </div>
);

export default ConsentCheckbox;
