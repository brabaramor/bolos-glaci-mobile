import { useCallback, useState } from 'react';

import type { Cake, CakeFormInput } from '../models/cake';
import { createCake, updateCake } from '../services/cakeService';
import { getErrorMessage } from '../utils/errorMessage';

export interface SaveCakeState {
  saveCake: (input: CakeFormInput, imageFile: File | null, cakeId?: string) => Promise<Cake | null>;
  isSaving: boolean;
  errorMessage: string | null;
}

export function useSaveCake(): SaveCakeState {
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const saveCake = useCallback(
    async (input: CakeFormInput, imageFile: File | null, cakeId?: string): Promise<Cake | null> => {
      setIsSaving(true);
      setErrorMessage(null);
      try {
        return cakeId ? await updateCake(cakeId, input, imageFile) : await createCake(input, imageFile);
      } catch (error: unknown) {
        setErrorMessage(getErrorMessage(error));
        return null;
      } finally {
        setIsSaving(false);
      }
    },
    [],
  );

  return { saveCake, isSaving, errorMessage };
}
