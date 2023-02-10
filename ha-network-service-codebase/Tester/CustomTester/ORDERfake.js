import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const ORDERpayload = () => ({
    location : randomString(5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'),
    timestamp : randomString(5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'),
    data: {
        a: randomIntBetween(1, 10000),
        b: randomIntBetween(1, 10000),
        c: randomIntBetween(1, 10000),
        d: randomIntBetween(1, 10000),
    },
});


