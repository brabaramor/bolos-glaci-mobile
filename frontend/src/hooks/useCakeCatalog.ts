import { useCallback, useEffect, useState } from 'react';

import type { CakeSortOption } from '../config/labels';
import type { Cake } from '../models/cake';
import { fetchPublishedCakes } from '../services/cakeService';
import { getErrorMessage } from '../utils/errorMessage';

export interface CakeCatalogState {
  cakes: Cake[];
  isLoading: boolean;
  errorMessage: string | null;
  reload: () => void;
}

// A response remembers which request produced it.
interface CatalogResponse {
  requestKey: string;
  cakes: Cake[];
  errorMessage: string | null;
}

export function useCakeCatalog(
  search?: string,
  categoryId?: string,
  sort?: CakeSortOption,
): CakeCatalogState {
  const [response, setResponse] = useState<CatalogResponse | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  // Changes whenever a filter changes or "Tentar novamente" is pressed.
  const requestKey = JSON.stringify([search, categoryId, sort, reloadKey]);

  useEffect(() => {
    // Ignores a response that arrives after the filter changed or the screen closed.
    let isActive = true;

    fetchPublishedCakes({ search, categoryId, sort })
      .then((cakes) => {
        if (isActive) setResponse({ requestKey, cakes, errorMessage: null });
      })
      .catch((error: unknown) => {
        if (isActive) setResponse({ requestKey, cakes: [], errorMessage: getErrorMessage(error) });
      });

    return () => {
      isActive = false;
    };
  }, [requestKey, search, categoryId, sort]);

  const reload = useCallback(() => setReloadKey((currentKey) => currentKey + 1), []);

  // Derived instead of stored: loading means the latest response is for an older request.
  const isLoading = response?.requestKey !== requestKey;

  return {
    cakes: response?.cakes ?? [],
    isLoading,
    errorMessage: isLoading ? null : (response?.errorMessage ?? null),
    reload,
  };
}