import { IonButton } from '@ionic/react';
import type { ComponentProps } from 'react';

import './AppButton.css';

type IonButtonProps = ComponentProps<typeof IonButton>;

interface AppButtonProps extends IonButtonProps {
  variant?: 'primary' | 'secondary' | 'light' | 'outline';
}

const AppButton: React.FC<AppButtonProps> = ({ variant = 'primary', className, ...buttonProps }) => (
  <IonButton
    {...buttonProps}
    className={['app-button', `app-button--${variant}`, className].filter(Boolean).join(' ')}
  />
);

export default AppButton;
