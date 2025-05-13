import { test, expect, Locator } from '@playwright/test';

async function getBackgroundColour(element: Locator): Promise<string> {
  return await element.evaluate((el) => {
    return window.getComputedStyle(el).getPropertyValue('background-color');
  })
}

test('search bar visible and active', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  const searchBar = page.locator('#searchbox_homepage');
  await expect(searchBar).toBeVisible();
  await expect(searchBar).toBeEnabled();
})

test('set to dark mode', async ({ page }) => {
  await page.goto('https://duckduckgo.com/settings#appearance');
  const backgroundColourDefault: string = await getBackgroundColour(page.locator('body'));
  expect(backgroundColourDefault).toEqual('rgb(255, 255, 255)');
  await page.getByText('Dark').click();
  const backgroundColourDark: string = await getBackgroundColour(page.locator('body'));
  expect(backgroundColourDark).toEqual('rgb(28, 28, 28)');
})