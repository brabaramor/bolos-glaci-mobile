import { useCallback, useState } from 'react';

import type { CreateOrderInput, Order } from '../models/order';
import { createOrder } from '../services/orderService';
import { getErrorMessage } from '../utils/errorMessage';

export interface PlaceOrderState {
  submitOrder: (input: CreateOrderInput) => Promise<Order | null>;
  isSubmitting: boolean;
  errorMessage: string | null;
}

export function usePlaceOrder(): PlaceOrderState {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Returns the created order, or null when it failed (the message goes to errorMessage).
  const submitOrder = useCallback(async (input: CreateOrderInput): Promise<Order | null> => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      return await createOrder(input);
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error));
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { submitOrder, isSubmitting, errorMessage };
}
