import { expect, test } from '@playwright/test'

test('display day orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('20', { exact: true })).toBeVisible()
  expect(page.getByText('--5% compared to yesterday.')).toBeVisible()
})

test('display month orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('200', { exact: true })).toBeVisible()
  expect(
    page
      .locator('div')
      .filter({ hasText: /^200-5% compared to last month\.$/ })
      .getByRole('paragraph'),
  ).toBeVisible()
})

test('display month canceled orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('5', { exact: true })).toBeVisible()
  expect(
    page
      .locator('div')
      .filter({ hasText: /^5-5% compared to last month\.$/ })
      .getByRole('paragraph'),
  ).toBeVisible()
})

test('display month revenue metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('US$ 2,00')).toBeVisible()
  expect(page.getByText('+100% compared to last month.')).toBeVisible()
})
