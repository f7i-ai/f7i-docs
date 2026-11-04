import {expect, test} from '@playwright/test';
import {readdirSync} from 'node:fs';
import {join} from 'node:path';

// Every page the build produced under /docs/api.
const apiDocsDir = join(__dirname, '..', 'build', 'docs', 'api');
const apiPages = readdirSync(apiDocsDir, {recursive: true, encoding: 'utf8'})
  .filter((file) => file.endsWith('index.html'))
  .map((file) => `/docs/api/${file.replace(/\/?index\.html$/, '')}`);

test('overview shows the hyphenated API addresses', async ({page}) => {
  await page.goto('/docs/api/overview');
  const text = await page.locator('main').innerText();
  expect(text).toContain('https://api-<your-subdomain>.f7i.ai');
  expect(text).toContain('https://api-acme.f7i.ai');
  expect(text).toContain('https://api-app.f7i.ai');
});

test('finds the API pages', () => {
  expect(apiPages.length).toBeGreaterThan(20);
});

for (const path of apiPages) {
  test(`${path} has no dotted API address`, async ({page}) => {
    await page.goto(path);
    const text = await page.locator('main').innerText();
    // api.app.f7i.ai and friends do not exist in DNS.
    expect(text).not.toMatch(/\bapi\.[^\s/."]+\.f7i\.ai/);
  });
}

test('Prevent pages use the /rcm service', async ({page}) => {
  await page.goto('/docs/api/assets');
  const text = await page.locator('main').innerText();
  expect(text).toContain('GET /rcm/assets');
  expect(text).toContain('https://api-acme.f7i.ai/rcm/assets');
});

test('Predict pages use the /predict service', async ({page}) => {
  await page.goto('/docs/api/metrics');
  const text = await page.locator('main').innerText();
  expect(text).toContain('GET /predict/metrics');
  expect(text).toContain('https://api-acme.f7i.ai/predict/metrics');
});

test('the removed Schedules API is not listed', async ({page}) => {
  expect(apiPages).not.toContain('/docs/api/schedules');
  await page.goto('/docs/api/overview');
  await expect(page.locator('main').getByRole('link', {name: 'Schedules'})).toHaveCount(0);
});

for (const path of apiPages) {
  test(`${path} has no /prod address or path without a service`, async ({page}) => {
    await page.goto(path);
    const text = await page.locator('main').innerText();
    // /prod is not a route on the API, and every path starts with its service.
    expect(text).not.toContain('.f7i.ai/prod');
    expect(text).not.toMatch(/\b(GET|POST|PUT|DELETE)\s+\/(?!rcm\/|predict\/)/);
  });
}

for (const page_ of ['assets', 'parts']) {
  test(`${page_} page shows the real photo upload route`, async ({page}) => {
    await page.goto(`/docs/api/${page_}`);
    const text = await page.locator('main').innerText();
    expect(text).toContain('/photos/presigned-upload-url');
    expect(text).not.toContain('/photos/presigned-url');
  });
}

test('Prevent page says to use the rcm service', async ({page}) => {
  await page.goto('/docs/api/assets');
  await expect(page.locator('main')).toContainText('Service: rcm (Prevent)');
  await expect(page.locator('main')).toContainText('https://api-<your-subdomain>.f7i.ai/rcm');
});

test('Predict page says to use the predict service', async ({page}) => {
  await page.goto('/docs/api/metrics');
  await expect(page.locator('main')).toContainText('Service: predict (Predict)');
  await expect(page.locator('main')).toContainText('https://api-<your-subdomain>.f7i.ai/predict');
});

test('every resource page says which service to use', async ({page}) => {
  for (const path of apiPages.filter((p) => !p.endsWith('/overview'))) {
    await page.goto(path);
    await expect(page.locator('main'), path).toContainText(/Service: (rcm \(Prevent\)|predict \(Predict\))/);
  }
});

test('overview says which service each resource list uses', async ({page}) => {
  await page.goto('/docs/api/overview');
  const text = await page.locator('main').innerText();
  expect(text).toContain('Prevent endpoints use the rcm service');
  expect(text).toContain('Predict endpoints use the predict service');
});

test('overview lists every service', async ({page}) => {
  await page.goto('/docs/api/overview');
  const table = page.locator('main table').first();
  for (const service of ['/rcm', '/predict', '/po', '/notifications', '/chat', '/agent']) {
    await expect(table.getByRole('cell', {name: service, exact: true})).toBeVisible();
  }
});
