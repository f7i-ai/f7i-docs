import {expect, test} from '@playwright/test';

// The PM Procedures and Job Plans pages describe the API as it is after job
// plans were introduced: a procedure hangs off a component, a job plan is a
// separate versioned record, and work orders come from the Work Orders API.

test('PM procedures page lists the fields the API requires', async ({page}) => {
  await page.goto('/docs/api/pm-procedures');
  const text = await page.locator('main').innerText();
  for (const field of [
    'componentId', 'code', 'name', 'title', 'description', 'type', 'frequency',
    'duration', 'requiredSkills', 'requiredTools', 'steps', 'safetyPrecautions',
  ]) {
    expect(text, field).toContain(field);
  }
  expect(text).toContain('Required fields');
  expect(text).toContain('jobPlanId');
  expect(text).toContain('jobPlanVersion');
});

test('PM procedures page says a procedure belongs to a component', async ({page}) => {
  await page.goto('/docs/api/pm-procedures');
  const text = await page.locator('main').innerText();
  expect(text).toContain('A procedure belongs to a component');
  expect(text).toContain('GET /rcm/components?assetId={assetId}');
});

test('PM procedures page points work orders at the Work Orders API', async ({page}) => {
  await page.goto('/docs/api/pm-procedures');
  const main = page.locator('main');
  // The endpoint table has no create-work-order row any more.
  await expect(main.locator('table').first()).not.toContainText('createworkorder');
  const text = await main.innerText();
  expect(text).not.toContain('createworkorder');
  expect(text).toContain('POST /rcm/work-orders');
  expect(text).toContain('pmProcedureId');
  await expect(main.getByRole('link', {name: 'Create a work order from a PM procedure'})).toHaveAttribute(
    'href', /\/docs\/api\/work-orders#create-a-work-order-from-a-pm-procedure$/,
  );
});

test('PM procedures page no longer shows the old invented fields', async ({page}) => {
  await page.goto('/docs/api/pm-procedures');
  const text = await page.locator('main').innerText();
  for (const stale of ['pmProcedures', 'schedulingRules', 'estimatedTime', 'nextDue', 'hasMore']) {
    expect(text, stale).not.toContain(stale);
  }
});

test('PM procedures page links to Job Plans', async ({page}) => {
  await page.goto('/docs/api/pm-procedures');
  const link = page.locator('main').getByRole('link', {name: 'job plan'}).first();
  await expect(link).toHaveAttribute('href', /\/docs\/api\/job-plans$/);
});

test('Job Plans page documents every route and the version model', async ({page}) => {
  await page.goto('/docs/api/job-plans');
  const text = await page.locator('main').innerText();
  for (const route of [
    'GET /rcm/job-plans',
    'POST /rcm/job-plans',
    'GET /rcm/job-plans/{jobPlanId}',
    'PUT /rcm/job-plans/{jobPlanId}',
    'DELETE /rcm/job-plans/{jobPlanId}',
    'POST /rcm/job-plans/{jobPlanId}/versions',
    'POST /rcm/job-plans/{jobPlanId}/activate',
    'POST /rcm/job-plans/extract-from-pm',
  ]) {
    expect(text, route).toContain(route);
  }
  expect(text).toContain('activeVersion');
  expect(text).toContain('estimatedMinutes');
  expect(text).toContain('Service: rcm (Prevent)');
});

test('overview lists Job Plans under Prevent', async ({page}) => {
  await page.goto('/docs/api/overview');
  const link = page.locator('main').getByRole('link', {name: 'Job Plans'});
  await expect(link).toHaveAttribute('href', /\/docs\/api\/job-plans$/);
});

test('work orders page explains creating one from a PM procedure', async ({page}) => {
  await page.goto('/docs/api/work-orders');
  const text = await page.locator('main').innerText();
  expect(text).toContain('Create a Work Order from a PM Procedure');
  expect(text).toContain('pmProcedureId');
  expect(text).toContain('/tasks');
});

test('error examples use the message field', async ({page}) => {
  for (const path of ['/docs/api/pm-procedures', '/docs/api/job-plans']) {
    await page.goto(path);
    const text = await page.locator('main').innerText();
    expect(text, path).toContain('"message":');
    expect(text, path).not.toContain('"error":');
  }
});
