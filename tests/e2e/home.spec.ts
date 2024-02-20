import { test, expect } from '@playwright/test';

const EMAIL = "goldroger@onepiece.com"

test('has header', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Akienist/);

  // Show login button
  await expect(page.getByText('Sign In')).toBeVisible();
});

test('has body', async ({ page }) => {
  await page.goto('/');

  // Show articles
  const list = page.getByTestId('list')
  await expect(list).toBeVisible()
});

test('has footer', async ({ page }) => {
  await page.goto('/');

  // Show social links
  await expect(page.getByText('Follow')).toBeVisible();
  await expect(page.getByText('Linkedin')).toBeVisible();

  // Subscribe to the news letter
  const input = page.getByPlaceholder('Your email');
  await input.fill(EMAIL)

  await expect(input).toHaveValue(EMAIL)
  await input.press('Enter')

  // Email added the input is empty
  await expect(input).toBeEmpty()
});

