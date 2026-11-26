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

export const filterLabels = {
  filterButton: 'Filtros',
  activeFilterIndicator: ' (1)',
  filterTitle: 'Filtrar por categoria',
  allCategories: 'Todas as categorias',
} as const;

export const catalogLabels = {
  title: 'Nosso Catálogo',
  searchPlaceholder: 'Buscar bolo',
  sortLabel: 'Ordenar por',
  noResults: 'Nenhum bolo encontrado. Tente outra busca ou categoria.',
  availableCount: (count: number): string => (count === 1 ? '1 produto disponível' : `${count} produtos disponíveis`),
} as const;

export const validationLabels = {
  required: 'Campo obrigatório.',
  deliveryDateTooSoon: (days: number): string => `Escolha uma data com pelo menos ${days} dias de antecedência.`,
  invalidPhone: 'Informe um telefone com DDD.',
  invalidEmail: 'Informe um e-mail válido.',
  consentRequired: 'É preciso concordar para enviar o pedido.',
} as const;

export const placeOrderLabels = {
  bannerIcon: '🎂',
  title: 'Fazer encomenda',
  subtitle: 'Preencha os dados abaixo para realizar seu pedido',
  cakeLabel: 'Escolha o Bolo',
  cakePlaceholder: 'Selecione o bolo...',
  sizeLabel: 'Tamanho',
  sizePlaceholder: 'Selecione o tamanho...',
  deliveryDateLabel: 'Data de Entrega',
  preferredTimeLabel: 'Horário Preferencial',
  notesLabel: 'Observações',
  notesPlaceholder: 'Ex: decoração especial, mensagem no bolo, restrições alimentares...',
  customerSectionTitle: 'Seus Dados',
  nameLabel: 'Nome Completo',
  namePlaceholder: 'Digite seu nome',
  phoneLabel: 'Telefone/WhatsApp',
  phonePlaceholder: '(XX) X XXXX-XXXX',
  emailLabel: 'E-mail',
  emailPlaceholder: 'seu@email.com',
  consentTitle: 'Concordo com o uso dos meus dados',
  consentDescription:
    'Seus dados serão utilizados apenas para processamento e contato sobre seu pedido, conforme a LGPD.',
  submit: 'Confirmar',
  submitting: 'Enviando...',
  cancel: 'Cancelar',
} as const;

export const orderFieldLabels = {
  product: 'Produto',
  deliveryDate: 'Data de Entrega',
  customer: 'Cliente',
  phone: 'Telefone',
  productName: (cakeName: string, sizeName: string): string => `${cakeName} - ${sizeName}`,
  dateWithTime: (date: string, time: string): string => `${date} às ${time}`,
  orderNumber: (orderNumber: number): string => `#${orderNumber}`,
} as const;

export const confirmationLabels = {
  bannerIcon: '✅',
  title: 'Pedido Confirmado!',
  subtitle: 'Recebemos sua encomenda com sucesso',
  orderNumberCaption: 'Número do pedido',
  orderNumber: (orderNumber: number): string => `#${orderNumber}`,
  orderNumberHint: 'Anote este número para acompanhar seu pedido',
  nextStepsIcon: '📱',
  nextStepsTitle: 'Próximos Passos',
  nextSteps: [
    'Você receberá uma mensagem no WhatsApp confirmando o pedido',
    'Entraremos em contato 1 dia antes da entrega para confirmar',
    'Qualquer dúvida, entre em contato conosco pelo WhatsApp',
  ],
  backToCatalog: 'Voltar ao Catálogo',
} as const;

export const adminLoginLabels = {
  bannerIcon: '🎂',
  subtitle: 'Painel administrativo',
  welcomeTitle: 'Bem-vinda de volta!',
  welcomeText: 'Entre com suas credenciais para acessar o painel',
  emailLabel: 'E-mail',
  emailPlaceholder: 'seu@email.com',
  passwordLabel: 'Senha',
  passwordPlaceholder: 'Digite sua senha',
  submit: '🔒 Entrar no Painel',
  submitting: 'Entrando...',
  backToSite: '⬅️ Voltar ao site público',
  secureFooter: (appName: string, year: number): string => `🔒 Conexão segura SSL · ${appName} ${year}`,
} as const;

export const adminLabels = {
  panelTitle: 'Painel Administrativo',
  orders: 'Pedidos',
  products: 'Produtos',
  logout: 'Sair',
} as const;

export const orderCardLabels = {
  orderDateIcon: '📅',
  orderDate: 'Pedido:',
  deliveryDateIcon: '🚚',
  deliveryDate: 'Entrega:',
  phoneIcon: '📱',
  viewDetails: 'Ver Detalhes',
} as const;

export const orderStatusFilterLabels: Record<OrderStatus | 'all', string> = {
  all: 'Todos',
  new: 'Novo',
  in_production: 'Em produção',
  ready: 'Pronto',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
};

export const adminOrdersLabels = {
  title: 'Gerenciar Pedidos',
  filterAriaLabel: 'Filtrar pedidos por status',
  emptyList: 'Nenhum pedido encontrado.',
} as const;

export const whatsAppLabels = {
  orderMessage: (customerName: string, orderNumber: number, appName: string): string =>
    `Olá, ${customerName}! Aqui é da ${appName}, sobre o seu pedido #${orderNumber}.`,
} as const;

export const orderDetailLabels = {
  backToList: '← Voltar para lista de pedidos',
  title: (orderNumber: number): string => `Pedido #${orderNumber}`,
  orderInfoIcon: '📋',
  orderInfoTitle: 'Informações do Pedido',
  statusLabel: 'Status do Pedido',
  productLabel: 'Produto',
  sizeLabel: 'Tamanho do Bolo',
  orderDateLabel: 'Data do Pedido',
  deliveryDateLabel: 'Data da Entrega',
  customerNotesLabel: 'Observações do Cliente',
  noCustomerNotes: 'Sem observações',
  internalNotesLabel: 'Notas Internas',
  internalNotesPlaceholder: 'Adicione anotações sobre o pedido...',
  customerIcon: '👤',
  customerTitle: 'Dados do Cliente',
  nameLabel: 'Nome',
  phoneLabel: 'Telefone',
  emailLabel: 'E-mail',
  whatsAppButton: '📱 Contatar via WhatsApp',
  actionsIcon: '⚡',
  actionsTitle: 'Ações',
  cancelOrder: 'Cancelar Pedido',
  saveChanges: 'Salvar Alterações',
  saving: 'Salvando...',
  cancelConfirmTitle: 'Cancelar pedido?',
  cancelConfirmMessage: 'O pedido será marcado como cancelado.',
  cancelConfirmYes: 'Sim, cancelar',
  cancelConfirmNo: 'Voltar',
  savedMessage: 'Alterações salvas.',
} as const;
