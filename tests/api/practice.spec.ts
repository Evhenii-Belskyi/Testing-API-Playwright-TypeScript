import { test, expect,request } from '@playwright/test';

let bookingId 

test.describe('All Collaction POSTMAN', ()=> {
  test('[GET] Check the status of GET request and Time GetBooking method', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get('/booking', {
        headers: { 'Accept': 'application/json' }
      });
      const endTime = Date.now();
      const requestDuration = endTime - startTime;

      console.log(`Request took ${requestDuration}ms`);

      expect(response.status()).toBe(200);
      console.log('Status ===> 200')
})

test('[GET] GET all BookID', async ({ request }) => {
    const response = await request.get('/booking', {
        headers: { 'Accept': 'application/json' }
      });
      
      // Get the response text (as a string)
      const responseBody = await response.text();
      console.log(`Response body: ${responseBody}`);

      // Get the response JSON (as an object)
      const responseJson = await response.json();
      console.log(`Response JSON: ${JSON.stringify(responseJson)}`);

      expect(response.status()).toBe(200);
})

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


test('[POST] Create a book', async ({ request }) => {
    const response = await request.post('/booking', {
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
    "firstname" : "Jimmy",
    "lastname" : "Goodman",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
    })
    });
  
    expect(response.status()).toBe(200);
  });

test('[POST] Create a book and get his ID', async ({ request }) => {
    
    const response = await request.post('/booking', {
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
    "firstname" : "Jimmy",
    "lastname" : "Goodman",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
    })
    });

    
    const responseBody = await response.json();
    bookingId = responseBody.bookingId;

    console.log(`Created booking ID: ${bookingId}`);

    expect(response.status()).toBe(200);
  }); 
  
test('[PUT] Change the book', async ({ request }) => { 
    const response = await request.patch('/booking/2922', {
      headers: { 'Content-Type': 'application/json',
                 'Accept': 'application/json',
                 'Cookie': 'token=abc123'
       },
      data: JSON.stringify({
    "firstname" : "Jimmy",
    "lastname" : "Amazing",
    "totalprice" : 500,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
    })
    });
    const responseBody = await response.json();
    bookingId = responseBody.bookingId;
    
    console.log(`Created booking ID: ${bookingId}`);

    expect(response.status()).toBe(200);
  });

})

