import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    headless: true,
    browserName: "chromium",
    trace: 'off',
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  reporter: [["line"], ["json", { outputFile: "test-result.json" }],
  ['html', {
    open: "never",
    outputFolder: "playwright-report/"
  }]
],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
 
  ]
});
