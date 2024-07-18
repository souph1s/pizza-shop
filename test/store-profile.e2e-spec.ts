import { expect, test } from '@playwright/test'

test('update profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Restaurant`s profile' }).click()
  await page.getByLabel('Name').fill('Rocket Pizza')
  await page.locator('#description').fill('Another description')

  await page.getByRole('button', { name: 'Save' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Profile has been updated.')

  expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Cancel' }).click()

  await page.waitForTimeout(1000)

  expect(page.getByRole('button', { name: 'Rocket Pizza' })).toBeVisible()
})
