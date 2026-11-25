const MOCK_DELAY_MS = 600;

export function mockDelay<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(data)), MOCK_DELAY_MS);
  });
}
