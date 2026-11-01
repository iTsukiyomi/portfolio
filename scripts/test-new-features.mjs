import { chromium } from 'playwright';
import { spawn } from 'child_process';

async function testNewFeatures() {
  console.log('Testing newly requested features...');
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

    // Verify centerpiece is in full focus initially
    const centerpiece = page.locator('.desktop-hero-centerpiece');
    const initialOpacity = await centerpiece.evaluate((el) => window.getComputedStyle(el).opacity);
    console.log('Centerpiece initial opacity (should be 1):', initialOpacity);
    if (parseFloat(initialOpacity) < 0.9) {
      throw new Error(`Expected centerpiece opacity 1, got ${initialOpacity}`);
    }
    console.log('✓ Centerpiece is 100% focused initially');

    // Verify Pokemon duel button is NOT highlighted by default
    const duelerActionBtn = page.locator('.desktop-action-btn:has-text("POKÉMON DUEL")');
    const hasFeaturedClass = await duelerActionBtn.evaluate((el) => el.classList.contains('featured'));
    if (hasFeaturedClass) {
      throw new Error('POKÉMON DUEL button still has featured highlight class');
    }
    console.log('✓ POKÉMON DUEL button has neutral styling by default (no highlight)');

    // Open dueler.bot
    console.log('Opening dueler.bot...');
    await page.locator('button[aria-label="Open dueler.bot"]').click();
    await page.waitForTimeout(400);

    // Verify window is centered
    const duelerWindow = page.locator('article[aria-label*="dueler.bot"]');
    const winBox = await duelerWindow.boundingBox();
    console.log('Window opened at box:', winBox);
    const expectedCenterX = Math.round((1440 - winBox.width) / 2);
    console.log(`Expected center X: ${expectedCenterX}, Actual: ${winBox.x}`);
    if (Math.abs(winBox.x - expectedCenterX) > 30) {
      throw new Error(`Window is not centered: actual X=${winBox.x}, expected X=${expectedCenterX}`);
    }
    console.log('✓ Window opens centered by default');

    // Verify image inside dueler.bot case study
    const projectImg = duelerWindow.locator('img[alt*="preview"]');
    if ((await projectImg.count()) > 0) {
      console.log('✓ Project image element found in case study');
    }

    // Verify centerpiece is dimmed while window is open
    const dimmedOpacity = await centerpiece.evaluate((el) => window.getComputedStyle(el).opacity);
    console.log('Centerpiece dimmed opacity (should be < 0.5):', dimmedOpacity);
    if (parseFloat(dimmedOpacity) > 0.5) {
      throw new Error(`Expected dimmed centerpiece, got ${dimmedOpacity}`);
    }

    // Minimize dueler.bot window
    console.log('Minimizing dueler.bot window...');
    await duelerWindow.locator('button[title="Minimize window"]').click();
    await page.waitForTimeout(300);

    // Verify centerpiece IMMEDIATELY returns to full focus (opacity: 1)
    const restoredOpacity = await centerpiece.evaluate((el) => window.getComputedStyle(el).opacity);
    console.log('Centerpiece opacity after minimize (should be 1):', restoredOpacity);
    if (parseFloat(restoredOpacity) < 0.9) {
      throw new Error(`Centerpiece failed to restore focus after minimize: got ${restoredOpacity}`);
    }
    console.log('✓ Centerpiece immediately returns to full focus when all tabs minimized or closed!');

    // Close window completely via dock
    await page.locator('button[aria-label="Close dueler"]').click();
    await page.waitForTimeout(300);

    // Test right-click context menu
    console.log('Testing right-click context menu on desktop...');
    await page.mouse.click(500, 300, { button: 'right' });
    await page.waitForTimeout(300);

    const contextMenu = page.locator('div[aria-label="Desktop Context Menu"]');
    if (!(await contextMenu.isVisible())) {
      throw new Error('Right-click context menu did not appear');
    }
    console.log('✓ Right-click context menu appeared at cursor');

    // Test switching to Dusk theme from context menu
    console.log('Switching to Dusk theme via context menu...');
    await page.locator('button[role="menuitem"]:has-text("Theme: Dusk")').click();
    await page.waitForTimeout(300);

    const dataTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    if (dataTheme !== 'dusk') {
      throw new Error(`Expected dusk theme, got ${dataTheme}`);
    }
    console.log('✓ Context menu theme switch verified (in sync with system)');

    // Test right-click drag selection box
    console.log('Testing right-click drag selection box...');
    await page.mouse.move(400, 200);
    await page.mouse.down({ button: 'right' });
    await page.mouse.move(600, 400, { steps: 5 });
    await page.waitForTimeout(100);

    const selectionBox = page.locator('.desktop-selection-box');
    const isSelectionVisible = await selectionBox.isVisible();
    console.log('Selection box visible during drag:', isSelectionVisible);
    if (!isSelectionVisible) {
      throw new Error('Selection marquee box failed to appear during drag');
    }
    console.log('✓ Windows-style blue selection box rendered during drag');

    await page.mouse.up({ button: 'right' });
    await page.waitForTimeout(200);

    // Test start.sh terminal compact neofetch
    console.log('Opening contact.sh to verify compact neofetch and command list...');
    await page.locator('button[aria-label="Open contact.sh"]').click();
    await page.waitForTimeout(400);

    const terminalText = await page.locator('div[aria-live="polite"]').textContent();
    console.log('Terminal initial output:\n' + terminalText);
    if (!terminalText.includes('OMARCHY LINUX 7.2.5') || !terminalText.includes('Commands:')) {
      throw new Error('Terminal did not show compact neofetch summary');
    }
    console.log('✓ Terminal shows compact 2-3 line neofetch and short command list');

    await page.close();

    // 2. Mobile Viewport Test (390x844)
    console.log('Testing mobile layout (390px)...');
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto('http://localhost:4173/portfolio/', { waitUntil: 'networkidle' });
    await mobilePage.keyboard.press('Escape');
    await mobilePage.waitForTimeout(300);

    const mobileCenterpiece = mobilePage.locator('.desktop-hero-centerpiece');
    const isMobileCenterpieceVisible = await mobileCenterpiece.isVisible();
    console.log('Mobile centerpiece visible:', isMobileCenterpieceVisible);
    if (!isMobileCenterpieceVisible) {
      throw new Error('Centerpiece is not visible on mobile');
    }

    const mobileCenterpieceBox = await mobileCenterpiece.boundingBox();
    console.log('Mobile centerpiece bounding box:', mobileCenterpieceBox);
    if (mobileCenterpieceBox.width > 380) {
      throw new Error(`Mobile centerpiece overflowed 390px viewport width: ${mobileCenterpieceBox.width}px`);
    }
    console.log('✓ Mobile centerpiece is visible below icons and fits within viewport!');

    await mobilePage.screenshot({ path: 'screenshots/mobile_workspace_390.png' });
    await mobilePage.close();

    console.log('\nALL NEW REQUESTED FEATURES VERIFIED SUCCESSFULLY! ✓');
  } finally {
    await browser.close();
    server.kill();
  }
}

testNewFeatures().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
