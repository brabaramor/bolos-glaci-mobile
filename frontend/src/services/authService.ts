import { apiRoutes } from '../config/apiRoutes';
import { appConfig } from '../config/appConfig';
import { authLabels } from '../config/labels';
import type { AuthSession, LoginCredentials } from '../models/auth';

import { ApiError, request } from './httpClient';
import { mockAdminCredentials, mockAdminUser } from './mocks/mockData';
import { mockDelay } from './mocks/mockDelay';
import { tokenStorage } from './tokenStorage';

// Convenção deste arquivo:
// Trechos entre "~~ mock" e "~~ fim" só rodam com VITE_USE_MOCKS=true.

export async function login(credentials: LoginCredentials): Promise<AuthSession> {
  let session: AuthSession;

  // ~~ mock
  if (appConfig.useMocks) {
    const isValid =
      credentials.email === mockAdminCredentials.email && credentials.password === mockAdminCredentials.password;

    if (!isValid) throw new ApiError(authLabels.invalidCredentials, 401);

    session = await mockDelay({ token: 'mock-token', user: mockAdminUser });
  } else {
    // ~~ fim
    session = await request<AuthSession>(apiRoutes.login, { method: 'POST', body: credentials });
    // ~~ mock
  }
  // ~~ fim

  tokenStorage.set(session.token);
  return session;
}

// Sem chamada à API: com token (JWT), sair é só apagar
export function logout(): void {
  tokenStorage.clear();
}

export function isAuthenticated(): boolean {
  return tokenStorage.get() !== null;
}
