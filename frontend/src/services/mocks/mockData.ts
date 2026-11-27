import type { AdminUser } from '../../models/auth';
import type { Cake, CakeCategory } from '../../models/cake';
import type { CakeSize } from '../../models/cakeSize';
import type { Order } from '../../models/order';

// Apenas para desenvolvimento!
// Services lê a partir daqui quando VITE_USE_MOCKS=true.

export const mockSizes: CakeSize[] = [
  { id: 'size-s', name: 'P', description: 'Pequeno (15cm)', sortOrder: 1 },
  { id: 'size-m', name: 'M', description: 'Médio (20cm)', sortOrder: 2 },
  { id: 'size-l', name: 'G', description: 'Grande (25cm)', sortOrder: 3 },
];

export const mockCategories: CakeCategory[] = [
  { id: 'cat-classic', name: 'Tradicionais' },
  { id: 'cat-special', name: 'Especiais' },
  { id: 'cat-party', name: 'Festa' },
];

export const mockCakes: Cake[] = [
  {
    id: 'cake-1',
    name: 'Red Velvet',
    description: 'Massa aveludada com recheio de cream cheese.',
    imageUrl: null,
    categoryId: 'cat-special',
    isPublished: true,
    isFeatured: true,
    sizePrices: [
      { sizeId: 'size-s', price: 90 },
      { sizeId: 'size-m', price: 130 },
      { sizeId: 'size-l', price: 180 },
    ],
  },
  {
    id: 'cake-2',
    name: 'Chocolate Belga',
    description: 'Massa de chocolate com ganache meio amargo.',
    imageUrl: null,
    categoryId: 'cat-classic',
    isPublished: true,
    isFeatured: true,
    sizePrices: [
      { sizeId: 'size-s', price: 80 },
      { sizeId: 'size-m', price: 120 },
      { sizeId: 'size-l', price: 165 },
    ],
  },
  {
    id: 'cake-3',
    name: 'Ninho com Morango',
    description: 'Creme de leite Ninho com morangos frescos.',
    imageUrl: null,
    categoryId: 'cat-party',
    isPublished: true,
    isFeatured: false,
    sizePrices: [
      { sizeId: 'size-s', price: 95 },
      { sizeId: 'size-m', price: 140 },
      { sizeId: 'size-l', price: 190 },
    ],
  },
  {
    id: 'cake-4',
    name: 'Limão Siciliano',
    description: 'Massa cítrica com cobertura de merengue.',
    imageUrl: null,
    categoryId: 'cat-classic',
    isPublished: false,
    isFeatured: false,
    sizePrices: [
      { sizeId: 'size-s', price: 75 },
      { sizeId: 'size-m', price: 110 },
      { sizeId: 'size-l', price: 150 },
    ],
  },
];

// One order per status, so every badge can be checked on screen.
export const mockOrders: Order[] = [
  {
    id: 'order-1',
    orderNumber: 1024,
    status: 'new',
    cakeId: 'cake-1',
    sizeId: 'size-m',
    cakeName: 'Red Velvet',
    sizeName: 'Médio (20cm)',
    price: 130,
    deliveryDate: '2026-12-10',
    preferredTime: '14:00',
    customerNotes: 'Escrever "Feliz Aniversário, Ana".',
    internalNotes: '',
    customer: {
      name: 'Cliente Exemplo 1',
      phone: '(51) 90000-0001',
      email: 'cliente1@exemplo.com',
    },
    createdAt: '2026-11-20T10:30:00Z',
  },
  {
    id: 'order-2',
    orderNumber: 1023,
    status: 'in_production',
    cakeId: 'cake-2',
    sizeId: 'size-l',
    cakeName: 'Chocolate Belga',
    sizeName: 'Grande (25cm)',
    price: 165,
    deliveryDate: '2026-12-05',
    preferredTime: null,
    customerNotes: '',
    internalNotes: 'Cliente pediu pouco açúcar.',
    customer: {
      name: 'Cliente Exemplo 2',
      phone: '(51) 90000-0002',
      email: 'cliente2@exemplo.com',
    },
    createdAt: '2026-11-18T15:00:00Z',
  },
  {
    id: 'order-3',
    orderNumber: 1022,
    status: 'ready',
    cakeId: 'cake-3',
    sizeId: 'size-s',
    cakeName: 'Ninho com Morango',
    sizeName: 'Pequeno (15cm)',
    price: 95,
    deliveryDate: '2026-11-30',
    preferredTime: '10:00',
    customerNotes: '',
    internalNotes: '',
    customer: {
      name: 'Cliente Exemplo 3',
      phone: '(51) 90000-0003',
      email: 'cliente3@exemplo.com',
    },
    createdAt: '2026-11-15T09:00:00Z',
  },
  {
    id: 'order-4',
    orderNumber: 1021,
    status: 'delivered',
    cakeId: 'cake-1',
    sizeId: 'size-s',
    cakeName: 'Red Velvet',
    sizeName: 'Pequeno (15cm)',
    price: 90,
    deliveryDate: '2026-11-22',
    preferredTime: '16:00',
    customerNotes: '',
    internalNotes: '',
    customer: {
      name: 'Cliente Exemplo 4',
      phone: '(51) 90000-0004',
      email: 'cliente4@exemplo.com',
    },
    createdAt: '2026-11-10T11:00:00Z',
  },
  {
    id: 'order-5',
    orderNumber: 1020,
    status: 'cancelled',
    cakeId: 'cake-2',
    sizeId: 'size-m',
    cakeName: 'Chocolate Belga',
    sizeName: 'Médio (20cm)',
    price: 120,
    deliveryDate: '2026-11-25',
    preferredTime: null,
    customerNotes: '',
    internalNotes: 'Cancelado a pedido da cliente.',
    customer: {
      name: 'Cliente Exemplo 5',
      phone: '(51) 90000-0005',
      email: 'cliente5@exemplo.com',
    },
    createdAt: '2026-11-08T14:00:00Z',
  },
];

// Mock login accepts only these credentials. Not a secret: it never reaches the real API.
export const mockAdminCredentials = {
  email: 'admin@bolosdaglaci.com',
  password: 'admin123',
};

export const mockAdminUser: AdminUser = {
  id: 'admin-1',
  name: 'Glaci',
  email: mockAdminCredentials.email,
};
