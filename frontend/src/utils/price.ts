import type { Cake } from '../models/cake';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatPrice(value: number): string {
  return currencyFormatter.format(value);
}

export function getStartingPrice(cake: Cake): number {
  return Math.min(...cake.sizePrices.map((sizePrice) => sizePrice.price));
}
