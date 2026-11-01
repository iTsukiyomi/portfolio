import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { spawn } from 'child_process';

const VIEWPORTS = [
  { name: '2560', width: 2560, height: 1440 },
  { name: '1920', width: 1920, height: 1080 },
  { name: '1440', width: 1440, height: 900 },
  { name: '1024', width: 1024, height: 768 },
  { name: '768', width: 768, height: 1024 },
  { name: '390', width: 390, height: 844 },
];

mkdirSync('screenshots', { recursive: true });

async function run() {
  console.log('Starting preview server...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173'], { stdio: 'inherit' });

  // Wait for server to boot
  await new Promise((r) => setTimeout(r, 1500));

  const browser = await chromium.launch();

  try {
    // 1. Capture Desktop Home across Viewports in Theme: Photocopy
    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto('http://localhost:4173/portfolio/', { waitUntil: 'networkidle' });

      // Dismiss boot screen if present by pressing Escape
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(100);

      await page.screenshot({ path: `screenshots/home_${vp.name}_photocopy.png` });
      console.log(`Captured home_${vp.name}_photocopy.png`);
      await page.close();
    }

    // 2. Capture Home in Theme: Dusk and Theme: Phosphor at 1440px
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto('http://localhost:4173/portfolio/', { waitUntil: 'networkidle' });
      await page.keyboard.press('Space');
      await page.waitForTimeout(200);

      // Switch to Dusk
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dusk'));
      await page.waitForTimeout(200);
      await page.screenshot({ path: 'screenshots/home_1440_dusk.png' });
      console.log('Captured home_1440_dusk.png');

      // Switch to Phosphor
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'phosphor'));
      await page.waitForTimeout(200);
      await page.screenshot({ path: 'screenshots/home_1440_phosphor.png' });
      console.log('Captured home_1440_phosphor.png');

      await page.close();
    }

    // 3. Capture Open Window: dueler (Pokémon Battle Engine) Case Study
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto('http://localhost:4173/portfolio/#projects/dueler', { waitUntil: 'networkidle' });
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);

      await page.screenshot({ path: 'screenshots/window_dueler_1440.png' });
      console.log('Captured window_dueler_1440.png');
      await page.close();
    }

    // 4. Capture Open Window: contact.sh Interactive Terminal Shell
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto('http://localhost:4173/portfolio/#contact', { waitUntil: 'networkidle' });
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);

      await page.screenshot({ path: 'screenshots/window_contact_1440.png' });
      console.log('Captured window_contact_1440.png');
      await page.close();
    }

    // 5. Capture Mobile Open Window (Sheet mode) at 390px
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await page.goto('http://localhost:4173/portfolio/#projects/dueler', { waitUntil: 'networkidle' });
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);

      await page.screenshot({ path: 'screenshots/mobile_sheet_390.png' });
      console.log('Captured mobile_sheet_390.png');
      await page.close();
    }

    // 6. Test Reduced Motion
    {
      const page = await browser.newPage({
        viewport: { width: 1440, height: 900 },
        reducedMotion: 'reduce',
      });
      await page.goto('http://localhost:4173/portfolio/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      await page.screenshot({ path: 'screenshots/reduced_motion_1440.png' });
      console.log('Captured reduced_motion_1440.png (boot skipped immediately)');
      await page.close();
    }
  } finally {
    await browser.close();
    server.kill();
    console.log('Finished capturing all verification screenshots.');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
