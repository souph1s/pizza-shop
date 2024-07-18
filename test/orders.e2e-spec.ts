import { expect, test } from '@playwright/test'

test('list orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  expect(
    page.getByRole('cell', { name: 'customer-1', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'customer-10', exact: true }),
  ).toBeVisible()
})

test('paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Next page' }).click()

  expect(
    page.getByRole('cell', { name: 'customer-11', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'customer-20', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Last page' }).click()

  expect(
    page.getByRole('cell', { name: 'customer-51', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'customer-60', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Previous page' }).click()

  expect(
    page.getByRole('cell', { name: 'customer-41', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'customer-50', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'First page' }).click()

  expect(
    page.getByRole('cell', { name: 'customer-1', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'customer-10', exact: true }),
  ).toBeVisible()
})

test('filter by order id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder("Customer's name").fill('order-1')
  await page.getByRole('button', { name: 'Filter results' }).click()

  expect(page.getByRole('cell', { name: 'order-1', exact: true })).toBeVisible()
})

test('filter by customer name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder("Order's ID").fill('customer-1')
  await page.getByRole('button', { name: 'Filter results' }).click()

  expect(
    page.getByRole('cell', { name: 'customer-1', exact: true }),
  ).toBeVisible()
})

test('filter by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Pending').getByText('Pending').click()
  await page.getByRole('button', { name: 'Filter results' }).click()

  const tableRows = await page.getByRole('cell', { name: 'Pending' }).all()

  expect(tableRows).toHaveLength(10)
})
