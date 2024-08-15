import { test, expect,request } from '@playwright/test';

test('[GET] Ping Helth Check', async ({ request }) => {
    const response = await request.post('/auth', {
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
        username: 'admin',
        password: 'password123',
      }),
    });
})