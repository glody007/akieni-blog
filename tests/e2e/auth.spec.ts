import { test, expect } from '@playwright/test';

test('has blocked routes', async ({ page }) => {
  // Start waiting for navigation before parsing. Note no await.
  const navigationPromise = page.waitForURL(/sign-in/);

  // test if dashboard is protected
  await page.goto('/dashboard');
  await navigationPromise
  // show clerk form
  await expect(page.getByText('Username')).toBeVisible();

  // test if editor is protected
  await page.goto('/editor/1');
  await navigationPromise
  // show clerk form
  await expect(page.getByText('Username')).toBeVisible();

});