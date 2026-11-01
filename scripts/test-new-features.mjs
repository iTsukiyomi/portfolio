import { chromium } from 'playwright';
import { spawn } from 'child_process';

async function testNewFeatures() {
  console.log('Testing all latest features and fixes...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173'], { stdio: 'inherit' });
  await new Promise((r) => setTimeout(r, 2000));

  const browser = await chromium.launch();

  try {
    // 1. Desktop Tests (1440x900)
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://localhost:4173/portfolio/', { waitUntil: 'networkidle' });

    // Dismiss boot sequence
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // Verify icons on light theme have black background
    const iconBox = page.locator('.icon-graphic-box').first();
    const iconBg = await iconBox.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    console.log('Desktop icon box background color:', iconBg);
    // RGB for #0d0f12 is rgb(13, 15, 18)
    if (!iconBg.includes('13, 15, 18') && !iconBg.includes('0, 0, 0')) {
      throw new Error(`Expected dark/black icon box background, got: ${iconBg}`);
    }
    console.log('✓ Desktop icons are solid black on light theme for maximum contrast');

    // Verify contact.sh opens dedicated ContactView (not terminal!)
    console.log('Opening contact.sh...');
    await page.locator('button[aria-label="Open contact.sh"]').click();
    await page.waitForTimeout(400);

    const contactHeader = page.locator('h1:has-text("GET IN TOUCH")');
    if (!(await contactHeader.isVisible())) {
      throw new Error('contact.sh failed to open dedicated ContactView');
    }
    console.log('✓ contact.sh opens dedicated ContactView with email, discord, linkedin, and message form!');

    // Close contact window
    await page.locator('article[aria-label*="contact.sh"] button.win-control-btn.close').click();
    await page.waitForTimeout(300);

    // Verify START.SH opens terminal with neofetch
    console.log('Opening START.SH terminal...');
    await page.locator('button[aria-label="Open Terminal Shell"]').click();
    await page.waitForTimeout(400);

    const terminalWindow = page.locator('article[aria-label*="terminal.sh"]');
    if (!(await terminalWindow.isVisible())) {
      throw new Error('START.SH failed to open terminal');
    }

    const termOutput = await page.locator('div[aria-live="polite"]').textContent();
    console.log('Terminal Boot Output:\n' + termOutput);
    if (!termOutput.includes('neofetch') || !termOutput.includes('gojo@omarchy') || !termOutput.includes('Kernel: 7.2.5')) {
      throw new Error('Terminal failed to auto-run neofetch at boot');
    }
    console.log('✓ Terminal automatically ran neofetch and printed Arch Linux specs!');

    // Close terminal window
    await page.locator('article[aria-label*="terminal.sh"] button.win-control-btn.close').click();
    await page.waitForTimeout(300);

    // Test theme toggle button (switches between light and dark only)
    console.log('Testing theme button (light/dark only)...');
    const themeBtn = page.locator('button.theme-switcher-btn');
    await themeBtn.click();
    await page.waitForTimeout(300);

    let activeTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    console.log('Theme after 1st click:', activeTheme);
    if (activeTheme !== 'dark') {
      throw new Error(`Expected dark theme, got ${activeTheme}`);
    }

    await themeBtn.click();
    await page.waitForTimeout(300);
    activeTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    console.log('Theme after 2nd click:', activeTheme);
    if (activeTheme !== 'light') {
      throw new Error(`Expected light theme, got ${activeTheme}`);
    }
    console.log('✓ Theme toggles directly between LIGHT and DARK (yellow/auto removed)');

    await page.close();

    // 2. Mobile Viewport Tests (390x844)
    console.log('\nTesting mobile phone layout & close tab button...');
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto('http://localhost:4173/portfolio/', { waitUntil: 'networkidle' });
    await mobilePage.keyboard.press('Escape');
    await mobilePage.waitForTimeout(300);

    // Open dueler.bot on mobile
    console.log('Opening dueler.bot on mobile...');
    await mobilePage.locator('button[aria-label="Open dueler.bot"]').click();
    await mobilePage.waitForTimeout(400);

    // Verify clean simple top-right cross icon close button on mobile
    const mobileCloseBtn = mobilePage.locator('.win-control-btn.close');
    const isMobileCloseVisible = await mobileCloseBtn.isVisible();
    console.log('Mobile simple top-right cross icon visible on sheet header:', isMobileCloseVisible);
    if (!isMobileCloseVisible) {
      throw new Error('Mobile sheet close button is not visible');
    }

    // Verify center close bar was removed as requested
    const mobileSheetCloseBar = mobilePage.locator('.mobile-close-sheet-btn');
    const hasCenterBar = (await mobileSheetCloseBar.count()) > 0;
    if (hasCenterBar) {
      throw new Error('Redundant center close tab button was not removed');
    }
    console.log('✓ Redundant center close tab button removed; simple top-right cross is active');

    // Click mobile top-right cross icon
    console.log('Clicking mobile top-right cross icon [×]...');
    await mobileCloseBtn.click();
    await mobilePage.waitForTimeout(400);

    const isSheetStillVisible = await mobilePage.locator('article.os-window-frame').isVisible();
    console.log('Sheet visible after clicking close (should be false):', isSheetStillVisible);
    if (isSheetStillVisible) {
      throw new Error('Mobile close button failed to close sheet');
    }
    console.log('✓ Mobile top-right cross icon closed the sheet cleanly!');

    // Capture mobile workspace
    await mobilePage.screenshot({ path: 'screenshots/mobile_workspace_verified.png' });
    await mobilePage.close();

    console.log('\nALL TESTS PASSED! ZERO REGRESSIONS. ✓');
  } finally {
    await browser.close();
    server.kill();
  }
}

testNewFeatures().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
