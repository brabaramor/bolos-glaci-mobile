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

export const cakeCardLabels = {
  startingAt: 'A partir de',
  orderButton: 'Pedir',
  imagePlaceholder: 'Imagem do bolo em breve',
  imagePlaceholderIcon: '🎂',
} as const;

export const brandLabels = {
  logoIcon: '🎂',
  openMenu: 'Abrir menu',
  menuTitle: 'Menu',
} as const;

export const navigationLabels = {
  home: 'Início',
  catalog: 'Catálogo',
  placeOrder: 'Fazer Encomenda',
  adminArea: 'Área da Confeiteira',
} as const;

export const homeLabels = {
  heroTitle: 'Bolos Artesanais',
  heroSubtitle: 'Feitos com carinho e ingredientes selecionados para tornar sua ocasião especial ainda mais doce',
  viewCatalog: 'Ver Catálogo Completo',
  featuredIcon: '✨',
  featuredTitle: 'Destaques da Semana',
  callToActionTitle: 'Pronto para fazer seu pedido?',
  callToActionDescription: 'Entre em contato conosco e encomende o bolo perfeito para sua ocasião',
  callToActionButton: 'Fazer Encomenda',
  noFeatured: 'Em breve, novos destaques aqui.',
} as const;
