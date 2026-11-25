import { useCallback, useEffect, useState } from 'react';

import type { CakeCategory } from '../models/cake';
import type { CakeSize } from '../models/cakeSize';
import { fetchCategories, fetchSizes } from '../services/cakeService';
import { getErrorMessage } from '../utils/errorMessage';

export interface CakeOptionsState {
  sizes: CakeSize[];
  categories: CakeCategory[];
  isLoading: boolean;
  errorMessage: string | null;
  reload: () => void;
}

interface OptionsResponse {
  requestKey: number;
  sizes: CakeSize[];
  categories: CakeCategory[];
  errorMessage: string | null;
}

export function useCakeOptions(): CakeOptionsState {
  const [response, setResponse] = useState<OptionsResponse | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isActive = true;

    // Both requests run in parallel; the screen waits for both.
    Promise.all([fetchSizes(), fetchCategories()])
      .then(([sizes, categories]) => {
        if (isActive) {
          setResponse({ requestKey: reloadKey, sizes, categories, errorMessage: null });
        }
      })
      .catch((error: unknown) => {
        if (isActive) {
          setResponse({
            requestKey: reloadKey,
            sizes: [],
            categories: [],
            errorMessage: getErrorMessage(error),
          });
        }
      });

    return () => {
      isActive = false;
    };
  }, [reloadKey]);

  const reload = useCallback(() => setReloadKey((currentKey) => currentKey + 1), []);

  const isLoading = response?.requestKey !== reloadKey;

  return {
    sizes: response?.sizes ?? [],
    categories: response?.categories ?? [],
    isLoading,
    errorMessage: isLoading ? null : (response?.errorMessage ?? null),
    reload,
  };
}