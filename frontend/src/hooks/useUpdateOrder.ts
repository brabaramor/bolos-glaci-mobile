import { useCallback, useState } from 'react';

import type { Order, UpdateOrderInput } from '../models/order';
import { updateOrder } from '../services/orderService';
import { getErrorMessage } from '../utils/errorMessage';

export interface UpdateOrderState {
  saveOrder: (orderId: string, input: UpdateOrderInput) => Promise<Order | null>;
  isSaving: boolean;
  errorMessage: string | null;
}

export function useUpdateOrder(): UpdateOrderState {
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const saveOrder = useCallback(async (orderId: string, input: UpdateOrderInput): Promise<Order | null> => {
    setIsSaving(true);
    setErrorMessage(null);
    try {
      return await updateOrder(orderId, input);
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error));
      return null;
    } finally {
      setIsSaving(false);
    }
  }, []);

  return { saveOrder, isSaving, errorMessage };
}
