import { apiRoutes } from '../config/apiRoutes';
import { appConfig } from '../config/appConfig';
import { commonLabels, type CakeSortOption } from '../config/labels';
import type { Paginated } from '../models/api';
import type { Cake, CakeCategory, CakeFormInput } from '../models/cake';
import type { CakeSize } from '../models/cakeSize';

import { ApiError, request } from './httpClient';
import { mockCakes, mockCategories, mockSizes } from './mocks/mockData';
import { mockDelay } from './mocks/mockDelay';

// Convenção deste arquivo:
// Trechos entre "~~ mock" e "~~ fim" só rodam com VITE_USE_MOCKS=true.
export interface CakeQuery {
  search?: string;
  categoryId?: string;
  sort?: CakeSortOption;
}

export interface AdminCakeQuery {
  search?: string;
  categoryId?: string;
  page?: number; // começa em 1
}

// Helpers
function buildCakeQueryString(query: CakeQuery & AdminCakeQuery): string {
  const params = new URLSearchParams();
  if (query.search) params.set('search', query.search);
  if (query.categoryId) params.set('category', query.categoryId);
  if (query.sort) params.set('sort', query.sort);
  if (query.page) params.set('page', String(query.page));

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
const MOCK_PAGE_SIZE = 3;

function filterMockCakes(cakes: Cake[], search?: string, categoryId?: string): Cake[] {
  const normalizedSearch = search?.trim().toLowerCase() ?? '';
  return cakes.filter(
    (cake) =>
      (!normalizedSearch || cake.name.toLowerCase().includes(normalizedSearch)) &&
      (!categoryId || cake.categoryId === categoryId),
  );
}

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

//  Público (cliente)
export async function fetchPublishedCakes(query: CakeQuery = {}): Promise<Cake[]> {
  // ~~ mock
  if (appConfig.useMocks) {
    const publishedCakes = mockCakes.filter((cake) => cake.isPublished);
    const filteredCakes = filterMockCakes(publishedCakes, query.search, query.categoryId);
    return mockDelay(sortMockCakes(filteredCakes, query.sort));
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

//  Admin
export async function fetchAllCakes(query: AdminCakeQuery = {}): Promise<Paginated<Cake>> {
  // ~~ mock
  if (appConfig.useMocks) {
    const page = query.page ?? 1;
    const filteredCakes = filterMockCakes(mockCakes, query.search, query.categoryId);
    const startIndex = (page - 1) * MOCK_PAGE_SIZE;
    return mockDelay({
      items: filteredCakes.slice(startIndex, startIndex + MOCK_PAGE_SIZE),
      page,
      pageSize: MOCK_PAGE_SIZE,
      totalItems: filteredCakes.length,
    });
  }
  // ~~ fim
  return request<Paginated<Cake>>(`${apiRoutes.adminCakes}${buildCakeQueryString(query)}`);
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

export async function deleteCake(cakeId: string): Promise<void> {
  // ~~ mock
  if (appConfig.useMocks) {
    mockCakes.splice(findMockCakeIndex(cakeId), 1);
    return mockDelay(undefined);
  }
  // ~~ fim
  return request<void>(apiRoutes.adminCakeById(cakeId), { method: 'DELETE' });
}
