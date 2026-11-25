import type { OrderStatus } from '../models/order';

// Record<OrderStatus, string> faz o TypeScript falhar se add status sem label
export const orderStatusLabels: Record<OrderStatus, string> = {
  new: 'Novo',
  in_production: 'Em Produção',
  ready: 'Pronto',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
};

export type CakeSortOption = 'popular' | 'price_asc' | 'newest';

export const cakeSortLabels: Record<CakeSortOption, string> = {
  popular: 'Mais populares',
  price_asc: 'Menor preço',
  newest: 'Mais recentes',
};

export const commonLabels = {
  loading: 'Carregando...',
  emptyList: 'Nenhum item encontrado.',
  genericError: 'Algo deu errado. Tente novamente.',
  retry: 'Tentar novamente',
  save: 'Salvar Alterações',
  cancel: 'Cancelar',
  networkError: 'Sem conexão com o servidor',
  notFound: 'Item não encontrado',
} as const;

export const authLabels = {
  invalidCredentials: 'E-mail ou senha inválidos',
} as const;
