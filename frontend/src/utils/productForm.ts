import { validationLabels } from '../config/labels';
import type { Cake, CakeFormInput } from '../models/cake';
import type { CakeSize } from '../models/cakeSize';

export interface ProductFormValues {
  name: string;
  description: string;
  categoryId: string;
  prices: Record<string, string>;
  isPublished: boolean;
  isFeatured: boolean;
}

export type ProductFormErrors = Partial<Record<'name' | 'description' | 'categoryId' | 'prices', string>>;

export function parsePrice(value: string): number {
  return Number(value.trim().replace(',', '.'));
}

function formatPriceForInput(price: number): string {
  return price.toFixed(2).replace('.', ',');
}

export function createProductForm(sizes: CakeSize[], cake?: Cake): ProductFormValues {
  const prices: Record<string, string> = {};
  sizes.forEach((size) => {
    const sizePrice = cake?.sizePrices.find((price) => price.sizeId === size.id);
    prices[size.id] = sizePrice ? formatPriceForInput(sizePrice.price) : '';
  });

  return {
    name: cake?.name ?? '',
    description: cake?.description ?? '',
    categoryId: cake?.categoryId ?? '',
    prices,
    isPublished: cake?.isPublished ?? true,
    isFeatured: cake?.isFeatured ?? false,
  };
}

export function validateProductForm(values: ProductFormValues, sizes: CakeSize[]): ProductFormErrors {
  const errors: ProductFormErrors = {};

  if (!values.name.trim()) errors.name = validationLabels.required;
  if (!values.description.trim()) errors.description = validationLabels.required;
  if (!values.categoryId) errors.categoryId = validationLabels.required;

  const hasInvalidPrice = sizes.some((size) => {
    const price = parsePrice(values.prices[size.id] ?? '');
    return Number.isNaN(price) || price <= 0;
  });
  if (hasInvalidPrice) errors.prices = validationLabels.invalidPrices;

  return errors;
}

export function toCakeFormInput(values: ProductFormValues, sizes: CakeSize[]): CakeFormInput {
  return {
    name: values.name.trim(),
    description: values.description.trim(),
    categoryId: values.categoryId,
    isPublished: values.isPublished,
    isFeatured: values.isFeatured,
    sizePrices: sizes.map((size) => ({
      sizeId: size.id,
      price: parsePrice(values.prices[size.id] ?? ''),
    })),
  };
}
