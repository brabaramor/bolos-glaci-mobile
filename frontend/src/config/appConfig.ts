export const appConfig = {
  appName: 'Bolos da Glaci',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  useMocks: import.meta.env.VITE_USE_MOCKS === 'true',
  contact: {
    phone: import.meta.env.VITE_CONTACT_PHONE,
    socialHandle: import.meta.env.VITE_SOCIAL_HANDLE,
  },
  orderRules: {
    minimumLeadDays: 2,
  },
} as const;
