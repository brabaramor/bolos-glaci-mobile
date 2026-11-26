import { appConfig } from '../config/appConfig';

export function toIsoDate(date: Date): string {
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

export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

// "2026-11-20T10:30:00Z" -> "20/11/2026"
export function formatTimestampDate(timestamp: string): string {
  return formatDate(toIsoDate(new Date(timestamp)));
}
