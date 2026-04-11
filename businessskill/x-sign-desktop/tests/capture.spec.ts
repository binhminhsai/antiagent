import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Automated UI Screen Capture for Figma', () => {
  test('Capture all desktop application states', async ({ page }) => {
    // Determine the root output directory (inside the project root)
    const outputDir = path.join(process.cwd(), 'figma_assets');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const capture = async (filename: string) => {
      console.log(`📸 Capturing: ${filename}`);
      await page.screenshot({ path: path.join(outputDir, `${filename}.png`), fullPage: true });
    };

    // 1. Landing Page
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    await capture('01_Landing_Page');

    // 2. Upload Document (Initial State)
    await page.goto('http://localhost:5173/app/upload');
    await page.waitForLoadState('networkidle');
    await capture('02_Upload_Initial');

    // 3. Upload Loading State (65%)
    await page.locator('text=Chọn tệp PDF hoặc kéo thả vào đây').click();
    await page.waitForTimeout(1000); // give it a second to reach ~20-30%
    await capture('03_Upload_Loading_Overlay');

    // 4. Signature Placement
    await page.goto('http://localhost:5173/app/placement');
    await page.waitForLoadState('networkidle');
    await capture('04_Signature_Placement');

    // 5. Config - Unregistered CAS ID
    await page.goto('http://localhost:5173/app/config');
    await page.waitForLoadState('networkidle');
    await capture('05_Signer_Config_Unregistered');

    // 6. Config - Registered CAS ID
    await page.getByText('Đã đăng ký', { exact: true }).click();
    await page.waitForTimeout(500); // brief wait for UI re-render
    await capture('06_Signer_Config_Registered');

    // 7. Execution Gate (Waiting for Phone)
    await page.goto('http://localhost:5173/app/execute');
    await page.waitForLoadState('networkidle');
    await capture('07_Execution_Waiting');

    // 8. Signature Status (Success)
    await page.goto('http://localhost:5173/app/status');
    await page.waitForLoadState('networkidle');
    await capture('08_Signature_Status_Success');

    // 9. Transaction Details (Receipt/Hash info)
    await page.goto('http://localhost:5173/app/details');
    await page.waitForLoadState('networkidle');
    await capture('09_Transaction_Details');

    console.log(`\n✅ Thành công! Toàn bộ 9 màn hình UI đã được Capture ở độ phân giải 1440x900 Pixel-Perfect.`);
    console.log(`📂 Bạn có thể tìm thấy toàn bộ Ảnh tại thư mục: ${outputDir}`);
  });
});
