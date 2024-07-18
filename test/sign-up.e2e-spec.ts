import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Restaurant name').fill('Pizza Shop')
  await page.getByLabel('Your name').fill('John Doe')
  await page.getByLabel('Your E-mail').fill('johndoe@example.com')
  await page.getByLabel('Your phone number').fill('124141213')

  await page.getByRole('button', { name: 'Sign Up' }).click()

  const toast = page.getByText('New restaurant created!')

  expect(toast).toBeVisible()
})

test('sign up error', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Restaurant name').fill('Invalid name')
  await page.getByLabel('Your name').fill('John Doe')
  await page.getByLabel('Your E-mail').fill('johndoe@example.com')
  await page.getByLabel('Your phone number').fill('124141213')

  await page.getByRole('button', { name: 'Sign Up' }).click()

  const toast = page.getByText('Something went wrong.')

  expect(toast).toBeVisible()
})

test('navigate to new login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Log in' }).click()

  expect(page.url()).toContain('/sign-in')
})
