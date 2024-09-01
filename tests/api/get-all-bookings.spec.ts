import { test, expect } from '@playwright/test';
import { Request } from '../../helpers/request';
import { get } from 'http';

// all tests with endpoint booking
const backend = new Request

test('[GET] /booking should return status code 200', async ({ request }) => {
 const response = await backend.get(request, "/booking")
 expect(response.status()).toBe(200);
});