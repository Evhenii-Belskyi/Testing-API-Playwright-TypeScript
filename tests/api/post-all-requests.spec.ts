import { test, expect } from '@playwright/test';
import { Request } from '../../helpers/request';
import { json } from 'stream/consumers';

const backend = new Request()
let data = {
    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
} 

test.describe('Create booking', () => {
    test('[POST] create a token', async ({ request }) => {
        const response = await backend.post(request, "/booking", data)
        expect(response.status()).toBe(200);
    })
    
    test.only('[POST] different values', async ({ request }) => {
        data.totalprice = 555  
        const response = await backend.post(request, "/booking", data)
        console.log(response.body)
        //expect(response.totalprice()).toBe(555);
    })

});
