import { apiRoutes } from '../config/apiRoutes';
import { appConfig } from '../config/appConfig';
import { commonLabels, type CakeSortOption } from '../config/labels';
import type { Cake, CakeCategory, CakeFormInput } from '../models/cake';
import type { CakeSize } from '../models/cakeSize';

import { ApiError, request } from './httpClient';
import { mockCakes, mockCategories, mockSizes } from './mocks/mockData';
import { mockDelay } from './mocks/mockDelay';

// Convenção deste arquivo:
// Trechos entre "~~ mock" e "~~ fim" só rodam com VITE_USE_MOCKS=true.
// o resto é o código que conversa com a APi

export interface CakeQuery {
  categoryId?: string;
  sort?: CakeSortOption;
}

// Helpers
function buildCakeQueryString(query: CakeQuery): string {
  const params = new URLSearchParams();
  if (query.categoryId) params.set('category', query.categoryId);
  if (query.sort) params.set('sort', query.sort);

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

function buildCakeFormData(input: CakeFormInput, imageFile: File | null): FormData {
  const formData = new FormData();
  formData.append('data', JSON.stringify(input));
  if (imageFile) formData.append('image', imageFile);
  return formData;
}

function getLowestPrice(cake: Cake): number {
  return Math.min(...cake.sizePrices.map((sizePrice) => sizePrice.price));
}

// ~~ mock: helpers usados apenas enquanto não houver back-end
function sortMockCakes(cakes: Cake[], sort?: CakeSortOption): Cake[] {
  if (sort === 'price_asc') {
    return [...cakes].sort((first, second) => getLowestPrice(first) - getLowestPrice(second));
  }
  if (sort === 'popular') {
    return [...cakes].sort((first, second) => Number(second.isFeatured) - Number(first.isFeatured));
  }
  return cakes;
}

function findMockCakeIndex(cakeId: string): number {
  const cakeIndex = mockCakes.findIndex((cake) => cake.id === cakeId);
  if (cakeIndex === -1) throw new ApiError(commonLabels.notFound, 404);
  return cakeIndex;
}
// ~~ fim

// Público (cliente)
export async function fetchPublishedCakes(query: CakeQuery = {}): Promise<Cake[]> {
  // ~~ mock
  if (appConfig.useMocks) {
    const publishedCakes = mockCakes.filter(
      (cake) => cake.isPublished && (!query.categoryId || cake.categoryId === query.categoryId),
    );
    return mockDelay(sortMockCakes(publishedCakes, query.sort));
  }
  // ~~ fim
  return request<Cake[]>(`${apiRoutes.cakes}${buildCakeQueryString(query)}`);
}

export async function fetchCakeById(cakeId: string): Promise<Cake> {
  // ~~ mock
  if (appConfig.useMocks) {
    return mockDelay(mockCakes[findMockCakeIndex(cakeId)]);
  }
  // ~~ fim
  return request<Cake>(apiRoutes.cakeById(cakeId));
}

export async function fetchSizes(): Promise<CakeSize[]> {
  // ~~ mock
  if (appConfig.useMocks) {
    const sortedSizes = [...mockSizes].sort((first, second) => first.sortOrder - second.sortOrder);
    return mockDelay(sortedSizes);
  }
  // ~~ fim
  return request<CakeSize[]>(apiRoutes.sizes);
}

export async function fetchCategories(): Promise<CakeCategory[]> {
  // ~~ mock
  if (appConfig.useMocks) {
    return mockDelay(mockCategories);
  }
  // ~~ fim
  return request<CakeCategory[]>(apiRoutes.categories);
}

// Admin
export async function fetchAllCakes(): Promise<Cake[]> {
  // ~~ mock
  if (appConfig.useMocks) {
    return mockDelay(mockCakes);
  }
  // ~~ fim
  return request<Cake[]>(apiRoutes.adminCakes);
}

export async function createCake(input: CakeFormInput, imageFile: File | null): Promise<Cake> {
  // ~~ mock
  if (appConfig.useMocks) {
    const newCake: Cake = {
      ...input,
      id: `cake-${Date.now()}`,
      // URL local de pré-visualização, para a imagem aparecer sem servidor.
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : null,
    };
    mockCakes.push(newCake);
    return mockDelay(newCake);
  }
  // ~~ fim
  return request<Cake>(apiRoutes.adminCakes, {
    method: 'POST',
    body: buildCakeFormData(input, imageFile),
  });
}

export async function updateCake(cakeId: string, input: CakeFormInput, imageFile: File | null): Promise<Cake> {
  // ~~ mock
  if (appConfig.useMocks) {
    const cakeIndex = findMockCakeIndex(cakeId);
    const currentCake = mockCakes[cakeIndex];
    const updatedCake: Cake = {
      ...input,
      id: cakeId,
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : currentCake.imageUrl,
    };
    mockCakes[cakeIndex] = updatedCake;
    return mockDelay(updatedCake);
  }
  // ~~ fim
  return request<Cake>(apiRoutes.adminCakeById(cakeId), {
    method: 'PUT',
    body: buildCakeFormData(input, imageFile),
  });
}

export async function setCakeVisibility(cakeId: string, isPublished: boolean): Promise<Cake> {
  // ~~ mock
  if (appConfig.useMocks) {
    const cakeIndex = findMockCakeIndex(cakeId);
    mockCakes[cakeIndex] = { ...mockCakes[cakeIndex], isPublished };
    return mockDelay(mockCakes[cakeIndex]);
  }
  // ~~ fim
  return request<Cake>(apiRoutes.adminCakeVisibility(cakeId), {
    method: 'PATCH',
    body: { isPublished },
  });
}
