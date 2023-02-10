import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const REPORTpayload = () => ({
    location : randomString(5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'),
    Date : randomString(5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'),
});