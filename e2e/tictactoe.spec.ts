import { test, expect } from "@playwright/test";

test('should not allow starting game without player names', async ({ page }) => {
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('domcontentloaded');
  
  // Athuga hvort Start Game hnappur sé óvirkur
  const startButton = page.locator('text=Start Game');
  await expect(startButton).toBeDisabled();
  
  // Færa inn bara eitt nafn
  await page.fill('input[placeholder="❌ Your Name"]', 'Player1');
  await expect(startButton).toBeDisabled();
  
  // Færa inn annað nafn
  await page.fill('input[placeholder="⭕ Opponent Name"]', 'Player2');
  await expect(startButton).toBeEnabled();
});

test('should create a new game', async ({ page }) => {
  // Bíða eftir að síðan hlaðist
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('domcontentloaded');
  
  // Bíða eftir að input reitirnir birtist
  await page.waitForSelector('input[placeholder="❌ Your Name"]', { state: 'visible' });
  await page.waitForSelector('input[placeholder="⭕ Opponent Name"]', { state: 'visible' });
  
  // Færa inn nöfn leikmanna
  await page.fill('input[placeholder="❌ Your Name"]', 'Player1');
  await page.fill('input[placeholder="⭕ Opponent Name"]', 'Player2');
  
  // Smella á Start Game hnapp
  await page.click('text=Start Game');
  
  // Bíða eftir að leikur sé stofnaður
  await page.waitForURL('http://localhost:3001/game/*');
});

test('should play a game', async ({ page }) => {
  // Stofna nýjan leik
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('domcontentloaded');
  
  await page.waitForSelector('input[placeholder="❌ Your Name"]', { state: 'visible' });
  await page.waitForSelector('input[placeholder="⭕ Opponent Name"]', { state: 'visible' });
  
  await page.fill('input[placeholder="❌ Your Name"]', 'Player1');
  await page.fill('input[placeholder="⭕ Opponent Name"]', 'Player2');
  await page.click('text=Start Game');
  
  // Bíða eftir að leikur sé stofnaður
  await page.waitForURL('http://localhost:3001/game/*');
  
  // Bíða eftir að leikborðið birtist
  await page.waitForSelector('[data-testid="cell-0"]', { state: 'visible' });
  
  // Gera færslur
  await page.click('[data-testid="cell-0"]');
  await page.click('[data-testid="cell-1"]');
  await page.click('[data-testid="cell-3"]');
  await page.click('[data-testid="cell-4"]');
  await page.click('[data-testid="cell-6"]');
  
  // Bíða eftir að vinningsboð birtist
  await expect(page.locator('text=❌ Player1 Won')).toBeVisible({ timeout: 10000 });
});

test('should show draw when game is tied', async ({ page }) => {
  // Stofna nýjan leik
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('domcontentloaded');
  
  await page.waitForSelector('input[placeholder="❌ Your Name"]', { state: 'visible' });
  await page.waitForSelector('input[placeholder="⭕ Opponent Name"]', { state: 'visible' });
  
  await page.fill('input[placeholder="❌ Your Name"]', 'Player1');
  await page.fill('input[placeholder="⭕ Opponent Name"]', 'Player2');
  await page.click('text=Start Game');
  
  // Bíða eftir að leikur sé stofnaður
  await page.waitForURL('http://localhost:3001/game/*');
  
  // Bíða eftir að leikborðið birtist
  await page.waitForSelector('[data-testid="cell-0"]', { state: 'visible' });
  
  // Gera færslur sem leiða til jafnteflis
  await page.click('[data-testid="cell-0"]');
  await page.click('[data-testid="cell-1"]');
  await page.click('[data-testid="cell-2"]');
  await page.click('[data-testid="cell-4"]');
  await page.click('[data-testid="cell-3"]');
  await page.click('[data-testid="cell-5"]');
  await page.click('[data-testid="cell-7"]');
  await page.click('[data-testid="cell-6"]');
  await page.click('[data-testid="cell-8"]');
  
  // Bíða eftir að jafnteflisboð birtist
  await expect(page.locator('text=Jafntefli!')).toBeVisible({ timeout: 10000 });
});
