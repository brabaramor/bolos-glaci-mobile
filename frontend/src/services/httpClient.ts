import { appConfig } from '../config/appConfig';
import { appRoutes } from '../config/appRoutes';
import { commonLabels } from '../config/labels';

import { tokenStorage } from './tokenStorage';

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body } = options;
  const headers: Record<string, string> = {};

  const token = tokenStorage.get();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let requestBody: BodyInit | undefined;
  if (body instanceof FormData) {
    requestBody = body;
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    requestBody = JSON.stringify(body);
  }

  let response: Response;
  try {
    response = await fetch(`${appConfig.apiBaseUrl}${path}`, {
      method,
      headers,
      body: requestBody,
    });
  } catch {
    throw new ApiError(commonLabels.networkError, 0);
  }

  if (response.status === 401 && token) {
    tokenStorage.clear();
    window.location.assign(appRoutes.adminLogin);
  }

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new ApiError(errorBody?.message ?? commonLabels.genericError, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
