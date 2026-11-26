import { useIonViewWillEnter } from '@ionic/react';
import { useRef } from 'react';

export function useReloadOnReturn(reload: () => void): void {
  const hasEnteredRef = useRef(false);

  useIonViewWillEnter(() => {
    if (hasEnteredRef.current) reload();
    hasEnteredRef.current = true;
  });
}
