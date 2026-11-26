import { useCallback, useEffect, useState } from 'react';

import type { Cake } from '../models/cake';
import { fetchAdminCakeById } from '../services/cakeService';
import { getErrorMessage } from '../utils/errorMessage';

export interface AdminCakeDetailState {
  cake: Cake | null;
  isLoading: boolean;
  errorMessage: string | null;
  reload: () => void;
}

interface CakeResponse {
  requestKey: string;
  cake: Cake | null;
  errorMessage: string | null;
}

export function useAdminCakeDetail(cakeId?: string): AdminCakeDetailState {
  const [response, setResponse] = useState<CakeResponse | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const requestKey = JSON.stringify([cakeId, reloadKey]);

  useEffect(() => {
    if (!cakeId) return;
    let isActive = true;

    fetchAdminCakeById(cakeId)
      .then((cake) => {
        if (isActive) setResponse({ requestKey, cake, errorMessage: null });
      })
      .catch((error: unknown) => {
        if (isActive) setResponse({ requestKey, cake: null, errorMessage: getErrorMessage(error) });
      });

    return () => {
      isActive = false;
    };
  }, [requestKey, cakeId]);

  const reload = useCallback(() => setReloadKey((currentKey) => currentKey + 1), []);
  const isLoading = cakeId ? response?.requestKey !== requestKey : false;

  return {
    cake: cakeId ? (response?.cake ?? null) : null,
    isLoading,
    errorMessage: isLoading ? null : (response?.errorMessage ?? null),
    reload,
  };
}
