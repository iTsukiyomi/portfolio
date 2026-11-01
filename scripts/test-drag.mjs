import { chromium } from 'playwright';
import { spawn } from 'child_process';

async function testDrag() {
  console.log('Testing window dragging and close interaction...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173'], { stdio: 'inherit' });
  await new Promise((r) => setTimeout(r, 2000));

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    await page.goto('http://localhost:4173/portfolio/', { waitUntil: 'networkidle' });

    // Dismiss boot sequence
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // 1. Click on dueler.bot icon to open window
    console.log('Opening dueler.bot window via icon click...');
    const duelerIcon = page.locator('button[aria-label="Open dueler.bot"]');
    await duelerIcon.click();
    await page.waitForTimeout(400);

    const windowArticle = page.locator('article[aria-label*="dueler.bot"]');
    if (!(await windowArticle.isVisible())) {
      throw new Error('dueler.bot window failed to open');
    }

    const titlebar = windowArticle.locator('header.window-titlebar');
    const initialBox = await windowArticle.boundingBox();
    console.log('Initial window box:', initialBox);

    // 2. Drag the titlebar by +100px X and +60px Y
    console.log('Dragging window titlebar...');
    const titlebarBox = await titlebar.boundingBox();
    await page.mouse.move(titlebarBox.x + 100, titlebarBox.y + 15);
    await page.mouse.down();
    await page.mouse.move(titlebarBox.x + 200, titlebarBox.y + 75, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(300);

    const newBox = await windowArticle.boundingBox();
    console.log('New window box after drag:', newBox);

    const deltaX = newBox.x - initialBox.x;
    const deltaY = newBox.y - initialBox.y;
    console.log(`Delta X: ${deltaX}, Delta Y: ${deltaY}`);

    if (Math.abs(deltaX - 100) > 15 || Math.abs(deltaY - 60) > 15) {
      throw new Error(`Window drag delta did not match movement: dx=${deltaX}, dy=${deltaY}`);
    }
    console.log('✓ Window dragging moved window accurately!');

    // 3. Test clicking Close button [×]
    console.log('Testing close button [×]...');
    const closeBtn = windowArticle.locator('button.win-control-btn.close');
    await closeBtn.click();
    await page.waitForTimeout(400);

    const isStillVisible = await windowArticle.isVisible();
    if (isStillVisible) {
      throw new Error('Close button failed to close window');
    }
    console.log('✓ Close button successfully closed window!');

    // 4. Test opening multiple windows and cycling focus
    console.log('Opening mafioso.py and contact.sh...');
    await page.locator('button[aria-label="Open mafioso.py"]').click();
    await page.waitForTimeout(300);
    await page.locator('button[aria-label="Open contact.sh"]').click();
    await page.waitForTimeout(300);

    const openCount = await page.locator('article.os-window-frame').count();
    console.log('Open windows count:', openCount);
    if (openCount !== 2) {
      throw new Error(`Expected 2 open windows, found ${openCount}`);
    }
    console.log('✓ Multiple windows opened and stacked cleanly!');

    // 5. Test closing via dock tab close button
    console.log('Testing close via bottom dock tab button...');
    const dockCloseBtn = page.locator('button[aria-label="Close mafioso"]');
    await dockCloseBtn.click();
    await page.waitForTimeout(400);

    const countAfterDockClose = await page.locator('article.os-window-frame').count();
    console.log('Open windows after dock close:', countAfterDockClose);
    if (countAfterDockClose !== 1) {
      throw new Error(`Expected 1 open window after dock close, found ${countAfterDockClose}`);
    }
    console.log('✓ Dock tab close button successfully closed window!');

    // 6. Close the remaining contact window via titlebar
    console.log('Closing final window via titlebar [×]...');
    const contactCloseBtn = page.locator('article.os-window-frame button.win-control-btn.close');
    await contactCloseBtn.click();
    await page.waitForTimeout(400);

    const countAfterAllClose = await page.locator('article.os-window-frame').count();
    console.log('Open windows after closing all:', countAfterAllClose);
    if (countAfterAllClose !== 0) {
      throw new Error(`Expected 0 open windows, found ${countAfterAllClose}`);
    }
    console.log('✓ All windows closed cleanly!');

    console.log('\nDRAGGING AND WINDOW CONTROL TESTS ALL PASSED! ✓');
  } finally {
    await browser.close();
    server.kill();
  }
}

testDrag().catch((err) => {
  console.error('Drag test failed:', err);
  process.exit(1);
});
