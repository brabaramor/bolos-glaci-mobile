import { appConfig } from '../config/appConfig';

// toISOString() is avoided on purpose: it converts to UTC and can shift the day
function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getMinimumDeliveryDate(today: Date = new Date()): string {
  const minimumDate = new Date(today);
  minimumDate.setDate(minimumDate.getDate() + appConfig.orderRules.minimumLeadDays);
  return toIsoDate(minimumDate);
}
