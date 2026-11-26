import { useCallback, useEffect, useState } from 'react';

import type { Order } from '../models/order';
import { fetchOrderById } from '../services/orderService';
import { getErrorMessage } from '../utils/errorMessage';

export interface OrderDetailState {
  order: Order | null;
  isLoading: boolean;
  errorMessage: string | null;
  reload: () => void;
}

interface OrderResponse {
  requestKey: string;
  order: Order | null;
  errorMessage: string | null;
}

export function useOrderDetail(orderId: string): OrderDetailState {
  const [response, setResponse] = useState<OrderResponse | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const requestKey = JSON.stringify([orderId, reloadKey]);

  useEffect(() => {
    let isActive = true;

    fetchOrderById(orderId)
      .then((order) => {
        if (isActive) setResponse({ requestKey, order, errorMessage: null });
      })
      .catch((error: unknown) => {
        if (isActive) setResponse({ requestKey, order: null, errorMessage: getErrorMessage(error) });
      });

    return () => {
      isActive = false;
    };
  }, [requestKey, orderId]);

  const reload = useCallback(() => setReloadKey((currentKey) => currentKey + 1), []);
  const isLoading = response?.requestKey !== requestKey;

  return {
    order: response?.order ?? null,
    isLoading,
    errorMessage: isLoading ? null : (response?.errorMessage ?? null),
    reload,
  };
}
