import { devices, expect, PlaywrightTestConfig } from '@playwright/test';
import { matchers } from 'expect-playwright';

expect.extend(matchers);

const config: PlaywrightTestConfig = {
  use: {
    // Browser options
    headless: false,
    ignoreHTTPSErrors: true,

    // Context options
    viewport: { width: 1080, height: 800 },

    // Artifacts
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Look for tests files in the "tests" directory, relative to this configuration file
  testDir: './tests',

  timeout: 90000,

  retries: 0,

  // Limits the number of workers
  workers: 1,

  // Test result reporter
  reporter: [
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: 'allure-results',
        suiteTitle: false,
      },
    ],
  ],

  fullyParallel: true,

  forbidOnly: false,
};
export default config;
