import { test, expect,request } from '@playwright/test';
test.describe.configure({ mode: "serial" });
let bookingId 
let token;

// Before What Not Working
// test.beforeAll(async () => {
//   test('[POST] Try to do TOKEN is variable', async ({ request }) => {
//     const response = await request.post('/auth', {
//       headers: { 'Content-Type': 'application/json' },
//       data: JSON.stringify({
//         username: 'admin',
//         password: 'password123',
//       }),
//     });
//     const responseJson = await response.json();
//     const token = responseJson.token; // assuming the token is returned in the response JSON
//     console.log(token)
//     expect(response.status()).toBe(200);
//   });
 
//   console.log('Before all tests');
// });

test.beforeAll(async ({ playwright }) => {
  const context = await playwright.request.newContext();
  const response = await context.post('/auth', {
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({
      username: 'admin',
      password: 'password123',
    }),
  });
  const responseJson = await response.json();
  token = responseJson.token; // assuming the token is returned in the response JSON
  console.log(token);
});

test('[POST] Try to do TOKEN is variable', async ({ request }) => {
  // Use the token obtained in beforeAll
  const response = await request.post('/some-other-endpoint', {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  expect(response.status()).toBe(200);
});

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


  test.only('[POST] Create a book and get his ID', async ({ request }) => {
    
    const response = await request.post('/booking', {
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
    "firstname" : "Ji1mmy",
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
    bookingId = responseBody.bookingid;
    console.log(responseBody)
    console.log(`Created booking ID: ${bookingId}`);

    expect(response.status()).toBe(200);
  });

  
test('[PATCH] Change the one sting in book', async ({ request }) => { 
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
    bookingId = responseBody.bookingid;
    
    console.log(`Created booking ID: ${bookingId}`);

    expect(response.status()).toBe(200);
  });

test('[PUT] Change the book', async ({ request }) => { 
    const response = await request.patch(`/booking/${bookingId}`, {
      headers: { 'Content-Type': 'application/json',
                 'Accept': 'application/json',
                 'Cookie': 'token=abc123'
       },
      data: JSON.stringify({
    "firstname" : "AAAA",
    "lastname" : "WOW",
    "totalprice" : 245,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
    })
    });
    const responseBody = await response.json();
    bookingId = responseBody.bookingid;
    
    console.log(`Created booking ID: ${bookingId}`);

    expect(response.status()).toBe(200);
  });

  test.only('[DELETE] Delete one book', async ({ request }) => {
    console.log(bookingId)
    const response = await request.patch(`/booking/${bookingId}`, {
        headers: { 'Content-Type': 'application/json',
                   'Accept': 'application/json',
                   'Cookie': 'token=abc123'
        }
});
expect(response.status()).toBe(200)
  })