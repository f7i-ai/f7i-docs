import {defineConfig} from '@playwright/test';

const port = 3210;

// Tests run against the built site, so run `npm run build` first.
export default defineConfig({
  testDir: './tests',
  use: {baseURL: `http://localhost:${port}`},
  webServer: {
    command: `npx docusaurus serve --port ${port} --no-open`,
    url: `http://localhost:${port}`,
    reuseExistingServer: false,
  },
});
