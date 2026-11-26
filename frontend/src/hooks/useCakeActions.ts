import { useCallback, useState } from 'react';

import type { Cake } from '../models/cake';
import { deleteCake, setCakeVisibility } from '../services/cakeService';
import { getErrorMessage } from '../utils/errorMessage';

export interface CakeActionsState {
  toggleVisibility: (cake: Cake) => Promise<boolean>;
  removeCake: (cake: Cake) => Promise<boolean>;
  busyCakeId: string | null; // the cake being changed right now, to disable its buttons
  errorMessage: string | null;
}

export function useCakeActions(): CakeActionsState {
  const [busyCakeId, setBusyCakeId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Shared by both actions: marks the cake as busy, runs the call, reports success.
  const runAction = useCallback(async (cakeId: string, action: () => Promise<unknown>): Promise<boolean> => {
    setBusyCakeId(cakeId);
    setErrorMessage(null);
    try {
      await action();
      return true;
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error));
      return false;
    } finally {
      setBusyCakeId(null);
    }
  }, []);

  const toggleVisibility = useCallback(
    (cake: Cake) => runAction(cake.id, () => setCakeVisibility(cake.id, !cake.isPublished)),
    [runAction],
  );

  const removeCake = useCallback((cake: Cake) => runAction(cake.id, () => deleteCake(cake.id)), [runAction]);

  return { toggleVisibility, removeCake, busyCakeId, errorMessage };
}
