/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_USE_MOCKS: string;
  readonly VITE_CONTACT_PHONE: string;
  readonly VITE_SOCIAL_HANDLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
