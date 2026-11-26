import { useCallback, useEffect, useState } from 'react';

import type { Paginated } from '../models/api';
import type { Cake } from '../models/cake';
import { fetchAllCakes } from '../services/cakeService';
import { getErrorMessage } from '../utils/errorMessage';

export interface AdminCakesState {
  cakes: Cake[];
  totalItems: number;
  totalPages: number;
  isLoading: boolean;
  errorMessage: string | null;
  reload: () => void;
}

interface CakesResponse {
  requestKey: string;
  result: Paginated<Cake> | null;
  errorMessage: string | null;
}

export function useAdminCakes(search?: string, categoryId?: string, page = 1): AdminCakesState {
  const [response, setResponse] = useState<CakesResponse | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const requestKey = JSON.stringify([search, categoryId, page, reloadKey]);

  useEffect(() => {
    let isActive = true;

    fetchAllCakes({ search, categoryId, page })
      .then((result) => {
        if (isActive) setResponse({ requestKey, result, errorMessage: null });
      })
      .catch((error: unknown) => {
        if (isActive) setResponse({ requestKey, result: null, errorMessage: getErrorMessage(error) });
      });

    return () => {
      isActive = false;
    };
  }, [requestKey, search, categoryId, page]);

  const reload = useCallback(() => setReloadKey((currentKey) => currentKey + 1), []);
  const isLoading = response?.requestKey !== requestKey;
  const result = response?.result;

  return {
    cakes: result?.items ?? [],
    totalItems: result?.totalItems ?? 0,
    // The API sends the page size; the number of pages is derived from it.
    totalPages: result ? Math.ceil(result.totalItems / result.pageSize) : 0,
    isLoading,
    errorMessage: isLoading ? null : (response?.errorMessage ?? null),
    reload,
  };
}
