import { useCallback, useState } from 'react';

import type { LoginCredentials } from '../models/auth';
import { login } from '../services/authService';
import { getErrorMessage } from '../utils/errorMessage';

export interface LoginState {
  submitLogin: (credentials: LoginCredentials) => Promise<boolean>;
  isSubmitting: boolean;
  errorMessage: string | null;
}

export function useLogin(): LoginState {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Returns true when the session was created. The token is stored by authService.
  const submitLogin = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await login(credentials);
      return true;
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { submitLogin, isSubmitting, errorMessage };
}
