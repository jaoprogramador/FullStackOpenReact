const { test, expect } = require('@playwright/test');
test('front page can be opened', async ({ page }) => {
  await page.goto('http://localhost:5000');
  await expect(page.locator('text=ivysaur')).toBeVisible();
  await expect(page.locator('text=Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible();
});