export interface CakeCategory {
  id: string;
  name: string;
}

export interface CakeSizePrice {
  sizeId: string; // referencia CakeSize.id
  price: number; // em reais
}

export interface Cake {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null; // se null, mostra placeholder
  categoryId: string; // referencia CakeCategory.id
  isPublished: boolean; // controlado pelo botão de olhinho
  isFeatured: boolean; // aparece no "Destaques da Semana"
  sizePrices: CakeSizePrice[]; // uma entrada por tamanho; preço base = menor tamanho
}

export type CakeFormInput = Omit<Cake, 'id' | 'imageUrl'>;
