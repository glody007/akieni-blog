import { test, expect } from '@playwright/test';

test('has details', async ({ page }) => {
  await page.goto('/');

  // navigate to the first article's page
  const list = page.getByTestId('list')
  await expect(list).toBeVisible()
  const a = list.locator("a").nth(0)
  const link = await a.getAttribute("href")

  // article item must have a link
  await expect(link).toBeDefined()
  await page.goto(link || "/")

  // test articles details
  const title = page.getByTestId('title')
  await expect(title).toBeVisible()

  const body = page.getByTestId('body')
  await expect(body).toBeVisible()

  const date = page.getByTestId('date')
  await expect(date).toBeVisible()
});