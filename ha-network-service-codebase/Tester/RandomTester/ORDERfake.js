import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const ORDERpayload = () => ({
    location : randomString(2, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    timestamp : randomString(2, 'abcdefghijklmnopqrstuvwxyz0123456789'),
    data: {
        a: randomIntBetween(1, 5),
        b: randomIntBetween(1, 5),
        c: randomIntBetween(1, 5),
        d: randomIntBetween(1, 5),
    },
});


