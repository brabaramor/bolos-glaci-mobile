export const ORDER_STATUSES = ['new', 'in_production', 'ready', 'delivered', 'cancelled'] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface Customer {
  name: string;
  phone: string; // WhatsApp
  email: string | null; // opcional
}

//o que a API retorna (lista, detalhes e telas de confirmaçao)
export interface Order {
  id: string;
  orderNumber: number;
  status: OrderStatus;
  cakeId: string;
  sizeId: string;
  cakeName: string;
  sizeName: string;
  price: number;
  deliveryDate: string;
  preferredTime: string | null;
  customerNotes: string;
  internalNotes: string;
  customer: Customer;
  createdAt: string;
}

// o que o formulário envia para a API (criação de pedido)
export interface CreateOrderInput {
  cakeId: string;
  sizeId: string;
  deliveryDate: string;
  preferredTime: string | null;
  customerNotes: string;
  customer: Customer;
  hasAcceptedPrivacyTerms: boolean;
}

// O que "Salvar Alterações" envia para a API (edição de pedido)
export interface UpdateOrderInput {
  status: OrderStatus;
  internalNotes: string;
}
