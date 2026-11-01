import { chromium } from 'playwright';
import { spawn } from 'child_process';

async function testInteractions() {
  console.log('Testing keyboard navigation and interactive terminal...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173'], { stdio: 'inherit' });
  await new Promise((r) => setTimeout(r, 2500));

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));

  try {
    await page.goto('http://localhost:4173/portfolio/', { waitUntil: 'networkidle' });

    // 1. Test Boot Skip via Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // 2. Open contact.sh via desktop icon click or enter
    console.log('Opening contact.sh terminal...');
    const contactIcon = page.locator('button[aria-label="Open contact.sh"]');
    await contactIcon.click();
    await page.waitForTimeout(400);

    // Verify window is opened and focused
    const contactWindow = page.locator('article[aria-label*="contact.sh"]');
    if (!(await contactWindow.isVisible())) {
      throw new Error('Contact window failed to open');
    }
    console.log('✓ contact.sh window opened successfully');

    // 3. Test typing commands in terminal
    console.log('Executing whoami command...');
    const terminalInput = page.locator('input[aria-label="Terminal command prompt"]');
    await terminalInput.fill('whoami');
    await terminalInput.press('Enter');
    await page.waitForTimeout(300);

    // Verify output appears
    const terminalBody = page.locator('div[aria-live="polite"]');
    const textContent = await terminalBody.textContent();
    if (!textContent.includes('Meet Rathod') || !textContent.includes('Gojo')) {
      throw new Error('Terminal whoami output missing expected bio');
    }
    console.log('✓ whoami command returned verified bio text');

    // 4. Test theme change via terminal command
    console.log('Executing theme dusk command...');
    await terminalInput.fill('theme dusk');
    await terminalInput.press('Enter');
    await page.waitForTimeout(300);

    const activeTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    if (activeTheme !== 'dusk') {
      throw new Error(`Theme command failed, active theme is ${activeTheme}`);
    }
    console.log('✓ theme dusk command successfully switched document theme to dusk');

    // 5. Test Escape key to close focused window
    console.log('Testing Escape key to close focused window...');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    const count = await contactWindow.count();
    const isVis = count > 0 && (await contactWindow.isVisible());
    console.log('contactWindow count in DOM:', count, 'isVis:', isVis);
    if (isVis) {
      throw new Error('Escape key failed to close focused window');
    }
    console.log('✓ Escape key closed focused window');

    // 6. Test URL hash navigation
    console.log('Testing URL hash navigation (#projects/mafioso)...');
    await page.evaluate(() => {
      window.location.hash = '#projects/mafioso';
    });
    await page.waitForTimeout(400);

    const mafiosoWindow = page.locator('article[aria-label*="mafioso.py"]');
    if (!(await mafiosoWindow.isVisible())) {
      throw new Error('Hash navigation failed to open mafioso.py window');
    }
    console.log('✓ Hash navigation #projects/mafioso opened window');

    console.log('\nALL INTERACTION & KEYBOARD TESTS PASSED SUCCESSFULLY! ✓');
  } finally {
    await browser.close();
    server.kill();
  }
}

testInteractions().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
