import { appConfig } from '../config/appConfig';
import { validationLabels } from '../config/labels';
import type { CreateOrderInput } from '../models/order';

export interface OrderFormValues {
  cakeId: string;
  sizeId: string;
  deliveryDate: string;
  preferredTime: string;
  customerNotes: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  hasAcceptedPrivacyTerms: boolean;
}

export type OrderFormErrors = Partial<Record<keyof OrderFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function createEmptyOrderForm(cakeId = ''): OrderFormValues {
  return {
    cakeId,
    sizeId: '',
    deliveryDate: '',
    preferredTime: '',
    customerNotes: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    hasAcceptedPrivacyTerms: false,
  };
}

export function validateOrderForm(values: OrderFormValues, minimumDeliveryDate: string): OrderFormErrors {
  const errors: OrderFormErrors = {};
  const phoneDigits = values.customerPhone.replace(/\D/g, '');

  if (!values.cakeId) errors.cakeId = validationLabels.required;
  if (!values.sizeId) errors.sizeId = validationLabels.required;

  if (!values.deliveryDate) {
    errors.deliveryDate = validationLabels.required;
  } else if (values.deliveryDate < minimumDeliveryDate) {
    errors.deliveryDate = validationLabels.deliveryDateTooSoon(appConfig.orderRules.minimumLeadDays);
  }

  if (!values.customerName.trim()) errors.customerName = validationLabels.required;

  if (!phoneDigits) {
    errors.customerPhone = validationLabels.required;
  } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    errors.customerPhone = validationLabels.invalidPhone;
  }

  if (!values.customerEmail.trim()) {
    errors.customerEmail = validationLabels.required;
  } else if (!EMAIL_PATTERN.test(values.customerEmail.trim())) {
    errors.customerEmail = validationLabels.invalidEmail;
  }

  if (!values.hasAcceptedPrivacyTerms) {
    errors.hasAcceptedPrivacyTerms = validationLabels.consentRequired;
  }

  return errors;
}

export function toCreateOrderInput(values: OrderFormValues): CreateOrderInput {
  return {
    cakeId: values.cakeId,
    sizeId: values.sizeId,
    deliveryDate: values.deliveryDate,
    preferredTime: values.preferredTime || null,
    customerNotes: values.customerNotes.trim(),
    customer: {
      name: values.customerName.trim(),
      phone: values.customerPhone.trim(),
      email: values.customerEmail.trim(),
    },
    hasAcceptedPrivacyTerms: values.hasAcceptedPrivacyTerms,
  };
}
