import { expect, test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('E-mail').fill('johndoe@example.com')
  await page.getByRole('button', { name: 'Log in' }).click()

  const toast = page.getByText(
    'Go check your mailbox, we just sent an authentication link.',
  )

  expect(toast).toBeVisible()
})

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('E-mail').fill('wrong@example.com')
  await page.getByRole('button', { name: 'Log in' }).click()

  const toast = page.getByText('Invalid credentials.')

  expect(toast).toBeVisible()
})

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'New Restaurant' }).click()

  expect(page.url()).toContain('/sign-up')
})
