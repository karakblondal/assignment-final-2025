import { test, expect } from "@playwright/test";

test('should not allow starting game without player names', async ({ page }) => {
  await page.goto('http://localhost:3000');
  console.log('Navigated to page');
  
  await page.waitForLoadState('domcontentloaded');
  console.log('Page loaded');
  
  // Athuga hvort Start Game hnappur sé óvirkur
  const startButton = page.locator('text=Start Game');
  await expect(startButton).toBeDisabled();
  console.log('Start button is disabled');
  
  // Færa inn bara eitt nafn
  await page.fill('input[placeholder="❌ Your Name"]', 'Player1');
  await expect(startButton).toBeDisabled();
  console.log('Start button still disabled after first name');
  
  // Færa inn annað nafn
  await page.fill('input[placeholder="⭕ Opponent Name"]', 'Player2');
  await expect(startButton).toBeEnabled();
  console.log('Start button enabled after both names');
});

test('should create a new game', async ({ page }) => {
  // Bíða eftir að síðan hlaðist
  await page.goto('http://localhost:3000');
  console.log('Navigated to page');
  
  await page.waitForLoadState('domcontentloaded');
  console.log('Page loaded');
  
  // Bíða eftir að input reitirnir birtist
  await page.waitForSelector('input[placeholder="❌ Your Name"]', { state: 'visible', timeout: 10000 });
  await page.waitForSelector('input[placeholder="⭕ Opponent Name"]', { state: 'visible', timeout: 10000 });
  console.log('Input fields visible');
  
  // Færa inn nöfn leikmanna
  await page.fill('input[placeholder="❌ Your Name"]', 'Player1');
  await page.fill('input[placeholder="⭕ Opponent Name"]', 'Player2');
  console.log('Names filled in');
  
  // Smella á Start Game hnapp
  await page.click('text=Start Game');
  console.log('Clicked start game');
  
  // Bíða eftir að leikur sé stofnaður
  await page.waitForURL('http://localhost:3000/game/*', { timeout: 10000 });
  console.log('Game created');
});

test('should play a game', async ({ page }) => {
  // Stofna nýjan leik
  await page.goto('http://localhost:3000');
  console.log('Navigated to page');
  
  await page.waitForLoadState('domcontentloaded');
  console.log('Page loaded');
  
  await page.waitForSelector('input[placeholder="❌ Your Name"]', { state: 'visible', timeout: 10000 });
  await page.waitForSelector('input[placeholder="⭕ Opponent Name"]', { state: 'visible', timeout: 10000 });
  console.log('Input fields visible');
  
  await page.fill('input[placeholder="❌ Your Name"]', 'Player1');
  await page.fill('input[placeholder="⭕ Opponent Name"]', 'Player2');
  console.log('Names filled in');
  
  await page.click('text=Start Game');
  console.log('Clicked start game');
  
  // Bíða eftir að leikur sé stofnaður
  await page.waitForURL('http://localhost:3000/game/*', { timeout: 10000 });
  console.log('Game created');
  
  // Bíða eftir að leikborðið birtist
  await page.waitForSelector('[data-testid="cell-0"]', { state: 'visible', timeout: 10000 });
  console.log('Game board visible');
  
  // Gera færslur
  await page.click('[data-testid="cell-0"]');
  await page.click('[data-testid="cell-1"]');
  await page.click('[data-testid="cell-3"]');
  await page.click('[data-testid="cell-4"]');
  await page.click('[data-testid="cell-6"]');
  console.log('Moves made');
  
  // Bíða eftir að vinningsboð birtist
  await expect(page.locator('text=❌ Player1 Won')).toBeVisible({ timeout: 10000 });
  console.log('Win message visible');
});

test('should show draw when game is tied', async ({ page }) => {
  // Stofna nýjan leik
  await page.goto('http://localhost:3000');
  console.log('Navigated to page');
  
  await page.waitForLoadState('domcontentloaded');
  console.log('Page loaded');
  
  await page.waitForSelector('input[placeholder="❌ Your Name"]', { state: 'visible', timeout: 10000 });
  await page.waitForSelector('input[placeholder="⭕ Opponent Name"]', { state: 'visible', timeout: 10000 });
  console.log('Input fields visible');
  
  await page.fill('input[placeholder="❌ Your Name"]', 'Player1');
  await page.fill('input[placeholder="⭕ Opponent Name"]', 'Player2');
  console.log('Names filled in');
  
  await page.click('text=Start Game');
  console.log('Clicked start game');
  
  // Bíða eftir að leikur sé stofnaður
  await page.waitForURL('http://localhost:3000/game/*', { timeout: 10000 });
  console.log('Game created');
  
  // Bíða eftir að leikborðið birtist
  await page.waitForSelector('[data-testid="cell-0"]', { state: 'visible', timeout: 10000 });
  console.log('Game board visible');
  
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
  console.log('Moves made');
  
  // Bíða eftir að jafnteflisboð birtist
  await expect(page.locator('text=Jafntefli!')).toBeVisible({ timeout: 10000 });
  console.log('Draw message visible');
});
