import { useCallback, useEffect, useState } from 'react';

import type { Order, OrderStatus } from '../models/order';
import { fetchOrders } from '../services/orderService';
import { getErrorMessage } from '../utils/errorMessage';

export interface AdminOrdersState {
  orders: Order[];
  isLoading: boolean;
  errorMessage: string | null;
  reload: () => void;
}

interface OrdersResponse {
  requestKey: string;
  orders: Order[];
  errorMessage: string | null;
}

export function useAdminOrders(status?: OrderStatus): AdminOrdersState {
  const [response, setResponse] = useState<OrdersResponse | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const requestKey = JSON.stringify([status, reloadKey]);

  useEffect(() => {
    let isActive = true;

    fetchOrders(status)
      .then((orders) => {
        if (isActive) setResponse({ requestKey, orders, errorMessage: null });
      })
      .catch((error: unknown) => {
        if (isActive) setResponse({ requestKey, orders: [], errorMessage: getErrorMessage(error) });
      });

    return () => {
      isActive = false;
    };
  }, [requestKey, status]);

  const reload = useCallback(() => setReloadKey((currentKey) => currentKey + 1), []);
  const isLoading = response?.requestKey !== requestKey;

  return {
    orders: response?.orders ?? [],
    isLoading,
    errorMessage: isLoading ? null : (response?.errorMessage ?? null),
    reload,
  };
}
