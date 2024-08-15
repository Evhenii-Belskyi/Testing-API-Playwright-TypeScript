import { test, expect,request } from '@playwright/test';

test('[POST] Try to create TOKEN', async ({ request }) => {
    const response = await request.post('/auth', {
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
        username: 'admin',
        password: 'password123',
      }),
    });
    const responseJson = await response.json();
      console.log(`Response JSON: ${JSON.stringify(responseJson)}`);
  
    expect(response.status()).toBe(200);
  })

test('[POST] Try to do TOKEN is variable', async ({ request }) => {
    const response = await request.post('/auth', {
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
        username: 'admin',
        password: 'password123',
      }),
    });
    const responseJson = await response.json();
    const token = responseJson.token; // assuming the token is returned in the response JSON
    console.log(token)
    expect(response.status()).toBe(200);
  });