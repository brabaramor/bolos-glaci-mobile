import { apiRoutes } from '../config/apiRoutes';
import { appConfig } from '../config/appConfig';
import { commonLabels } from '../config/labels';
import type { CreateOrderInput, Order, OrderStatus, UpdateOrderInput } from '../models/order';

import { ApiError, request } from './httpClient';
import { mockCakes, mockOrders, mockSizes } from './mocks/mockData';
import { mockDelay } from './mocks/mockDelay';

// Convenção deste arquivo:
// Trechos entre "~~ mock" e "~~ fim" só rodam com VITE_USE_MOCKS=true.

// ~~ mock: helpers usados apenas enquanto não houver back-end
function findMockOrderIndex(orderId: string): number {
  const orderIndex = mockOrders.findIndex((order) => order.id === orderId);
  if (orderIndex === -1) throw new ApiError(commonLabels.notFound, 404);
  return orderIndex;
}

function buildMockOrder(input: CreateOrderInput): Order {
  const cake = mockCakes.find((mockCake) => mockCake.id === input.cakeId);
  const size = mockSizes.find((mockSize) => mockSize.id === input.sizeId);
  const sizePrice = cake?.sizePrices.find((price) => price.sizeId === input.sizeId);

  if (!cake || !size || !sizePrice) {
    throw new ApiError(commonLabels.notFound, 404);
  }

  const lastOrderNumber = Math.max(0, ...mockOrders.map((order) => order.orderNumber));

  return {
    id: `order-${Date.now()}`,
    orderNumber: lastOrderNumber + 1,
    status: 'new',
    cakeId: cake.id,
    sizeId: size.id,
    cakeName: cake.name,
    sizeName: size.name,
    price: sizePrice.price,
    deliveryDate: input.deliveryDate,
    preferredTime: input.preferredTime,
    customerNotes: input.customerNotes,
    internalNotes: '',
    customer: input.customer,
    createdAt: new Date().toISOString(),
  };
}
// ~~ fim

// Público (cliente)
export async function createOrder(input: CreateOrderInput): Promise<Order> {
  // ~~ mock
  if (appConfig.useMocks) {
    const newOrder = buildMockOrder(input);
    mockOrders.unshift(newOrder); // entra no topo, como o pedido mais recente
    return mockDelay(newOrder);
  }
  // ~~ fim
  return request<Order>(apiRoutes.orders, { method: 'POST', body: input });
}

// Admin
export async function fetchOrders(status?: OrderStatus): Promise<Order[]> {
  // ~~ mock
  if (appConfig.useMocks) {
    const filteredOrders = status ? mockOrders.filter((order) => order.status === status) : mockOrders;
    return mockDelay(filteredOrders);
  }
  // ~~ fim
  const queryString = status ? `?status=${status}` : '';
  return request<Order[]>(`${apiRoutes.adminOrders}${queryString}`);
}

export async function fetchOrderById(orderId: string): Promise<Order> {
  // ~~ mock
  if (appConfig.useMocks) {
    return mockDelay(mockOrders[findMockOrderIndex(orderId)]);
  }
  // ~~ fim
  return request<Order>(apiRoutes.adminOrderById(orderId));
}

export async function updateOrder(orderId: string, input: UpdateOrderInput): Promise<Order> {
  // ~~ mock
  if (appConfig.useMocks) {
    const orderIndex = findMockOrderIndex(orderId);
    mockOrders[orderIndex] = { ...mockOrders[orderIndex], ...input };
    return mockDelay(mockOrders[orderIndex]);
  }
  // ~~ fim
  return request<Order>(apiRoutes.adminOrderById(orderId), { method: 'PATCH', body: input });
}
