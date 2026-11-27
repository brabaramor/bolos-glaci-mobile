import { commonLabels } from '../config/labels';
import { ApiError } from '../services/httpClient';

export function getErrorMessage(error: unknown): string {
  return error instanceof ApiError ? error.message : commonLabels.genericError;
}
