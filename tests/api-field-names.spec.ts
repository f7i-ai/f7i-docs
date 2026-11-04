import {expect, test} from '@playwright/test';

// The Prevent API pages use the field names the live API uses. A partner
// loading a customer's data hit a failed call for each of the names these
// tests pin down.

async function mainText(page: import('@playwright/test').Page, path: string) {
  await page.goto(path);
  return page.locator('main').innerText();
}

test('work orders page uses workOrderId and estimatedQuantity', async ({page}) => {
  const text = await mainText(page, '/docs/api/work-orders');
  expect(text).toContain('workOrderId');
  expect(text).toContain('estimatedQuantity');
  expect(text).toContain('workOrderPartId');
  expect(text).not.toContain('"createdDate"');
  expect(text).not.toContain('"id": "wo-');
});

test('work orders page explains who sees API-created work orders', async ({page}) => {
  const text = await mainText(page, '/docs/api/work-orders');
  expect(text).toContain('assignedTo=all');
  expect(text).toContain('assignedTo=unassigned');
  expect(text).toContain('All work orders');
  expect(text).toContain('createdAt');
  expect(text).toContain('completedAt');
});

test('parts page uses unit and says what is ignored', async ({page}) => {
  await page.goto('/docs/api/parts');
  const text = await page.locator('main').innerText();
  expect(text).toContain('unit');
  expect(text).toContain('ignored');
  expect(text).toContain('partId');
  expect(text).not.toContain('"id": "part-');
  // unitOfMeasure may be mentioned as an alias, but never as the request field.
  const createExample = page.locator('main pre').filter({hasText: '"partNumber": "FLUKE-175"'}).first();
  await expect(createExample).toBeVisible();
  expect(await createExample.innerText()).not.toContain('unitOfMeasure');
  expect(await createExample.innerText()).toContain('"unit"');
});

test('parts page points stock on hand at the Inventory API', async ({page}) => {
  await page.goto('/docs/api/parts');
  const text = await page.locator('main').innerText();
  expect(text).toContain('Setting stock on hand');
  expect(text).toContain('PUT /rcm/inventory/{partId}');
  await expect(page.locator('main').getByRole('link', {name: 'Inventory API'}).first()).toHaveAttribute(
    'href', /\/docs\/api\/inventory$/,
  );
});

test('components page uses the real status values', async ({page}) => {
  const text = await mainText(page, '/docs/api/components');
  expect(text).toContain('decommissioned');
  expect(text).toContain('componentId');
  expect(text).not.toContain('"status": "operational"');
  expect(text).not.toContain('`operational`:');
  expect(text).not.toContain('"id": "comp-');
  expect(text).toContain('partIds');
});

test('failure codes page describes the FMEA table', async ({page}) => {
  const text = await mainText(page, '/docs/api/failure-codes');
  for (const field of ['failureMode', 'failureEffect', 'failureCause', 'occurrence', 'detection', 'componentId', 'failureCodeId']) {
    expect(text, field).toContain(field);
  }
  expect(text).not.toContain('symptoms');
  expect(text).not.toContain('"id": "fc-');
  expect(text).toContain('/rcm/failurecodes');
  expect(text).toContain('/rcm/failure-modes');
});

test('overview documents the error format and the missing routes', async ({page}) => {
  const text = await mainText(page, '/docs/api/overview');
  expect(text).toContain('/rcm/failurecodes');
  expect(text).toContain('Invalid key=value pair');
  expect(text).toContain('/rcm/schedules');
  expect(text).toContain('"message":');
  expect(text).not.toContain('"error":');
  expect(text).toContain('PM scheduling');
});

for (const path of ['/docs/api/assets', '/docs/api/pm-procedures', '/docs/api/inventory']) {
  test(`${path} returns the resource's own id, not "id"`, async ({page}) => {
    const text = await mainText(page, path);
    expect(text).not.toMatch(/"id": "/);
  });
}

test('PM procedures page says how steps are stored', async ({page}) => {
  const text = await mainText(page, '/docs/api/pm-procedures');
  expect(text).toContain('description');
  expect(text).toContain('line of text');
});
