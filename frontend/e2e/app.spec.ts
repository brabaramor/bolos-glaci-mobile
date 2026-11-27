import { expect, test } from '@playwright/test';

test('loads the app with the brand title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Bolos da Glaci');
});
