import { chromium } from 'playwright';
import { spawn } from 'child_process';

async function capture() {
  console.log('Capturing screenshots of clean multi-page portfolio...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173'], { stdio: 'inherit' });
  await new Promise((r) => setTimeout(r, 2000));

  const browser = await chromium.launch();

  try {
    // 1. Desktop Light (Overview)
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://localhost:4173/portfolio/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'screenshots/overview_1440_light.png' });
    console.log('Captured overview_1440_light.png');

    // 2. Desktop Dark (Overview)
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await page.waitForTimeout(200);
    await page.screenshot({ path: 'screenshots/overview_1440_dark.png' });
    console.log('Captured overview_1440_dark.png');

    // 3. Projects Page
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    await page.locator('button.nav-tab-btn:has-text("Projects")').click();
    await page.waitForTimeout(200);
    await page.screenshot({ path: 'screenshots/projects_1440.png' });
    console.log('Captured projects_1440.png');

    // 4. Experience Page
    await page.locator('button.nav-tab-btn:has-text("Experience")').click();
    await page.waitForTimeout(200);
    await page.screenshot({ path: 'screenshots/experience_1440.png' });
    console.log('Captured experience_1440.png');

    // 5. Resume Page
    await page.locator('button.nav-tab-btn:has-text("Resume")').click();
    await page.waitForTimeout(200);
    await page.screenshot({ path: 'screenshots/resume_1440.png' });
    console.log('Captured resume_1440.png');

    // 6. Contact Page
    await page.locator('button.nav-tab-btn:has-text("Contact")').click();
    await page.waitForTimeout(200);
    await page.screenshot({ path: 'screenshots/contact_1440.png' });
    console.log('Captured contact_1440.png');

    await page.close();

    // 7. Mobile Viewports (390x844)
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto('http://localhost:4173/portfolio/', { waitUntil: 'networkidle' });
    await mobilePage.screenshot({ path: 'screenshots/mobile_overview_390.png' });
    console.log('Captured mobile_overview_390.png');

    await mobilePage.locator('button.nav-tab-btn:has-text("Projects")').click();
    await mobilePage.waitForTimeout(200);
    await mobilePage.screenshot({ path: 'screenshots/mobile_projects_390.png' });
    console.log('Captured mobile_projects_390.png');

    await mobilePage.close();
    console.log('\nAll clean portfolio screenshots captured successfully!');
  } finally {
    await browser.close();
    server.kill();
  }
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
