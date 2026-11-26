const BRAZIL_COUNTRY_CODE = '55';

// abre uma mensagem do wpp com mensagem fixa
// aceita os formatos: "(51) 9 9999-9999" becomes "5551999999999".
export function buildWhatsAppUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, '');
  const fullNumber = digits.length <= 11 ? `${BRAZIL_COUNTRY_CODE}${digits}` : digits;
  return `https://wa.me/${fullNumber}?text=${encodeURIComponent(message)}`;
}
