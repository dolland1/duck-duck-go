import { test, expect } from '@playwright/test';

test('api smoke test', async ({ request }) => {
    const response = await request.get('/?q=playwright&format=json');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('AbstractURL');
})