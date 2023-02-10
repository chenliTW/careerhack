import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const RECORDKeys = () => ({
    location : randomString(1, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    date : randomString(1, 'abcdefghijklmnopqrstuvwxyz0123456789'),
});
