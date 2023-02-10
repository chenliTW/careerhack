import http from 'k6/http';
import { check } from 'k6';
import { POSTpayload } from './POSTfake.js';
import { GETKeys, GETpayload } from './GETfake.js';


export const options = {
    scenarios: {
      send: {
        executor: 'shared-iterations',
        vus: 1000, // number of threads
        iterations: 10000,
        maxDuration: '30s',
      },
    },
};


const POSTApi = () => {

  const stable = JSON.stringify({
    "location": "l1",
    "timestamp": "2021-03-01T00:00:00.000Z",
    "data": {
      "a": 18,
      "b": 8,
      "c": 6,
      "d": 28
    }
  });

  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const data = POSTpayload();
  const payload_1  = JSON.stringify(data);
  const res = http.post('http://34.123.52.100:30100/api/order', payload_1, {headers});
  //const res = http.post('http://34.123.52.100:30100/api/order', stable, {headers});

  check(res, {
    'Post status is 200 -1': (r) => res.status === 200,
    //'Post Content-Type header': (r) => res.headers['Content-Type'] === 'application/json',
    'Post response is success ': (r) => res.status === 200 && res.json().success === true,
  });
}

const GETApi = () => {

  const location = 'location=' + GETKeys().location;
  const date  = 'data=' + GETKeys().date;
  const url = 'http://34.123.52.100:30100/api/report?';
  const sent = url.concat(location, '&', date);
  const res = http.get('http://34.123.52.100:30100/api/record?location=l1&date=2023-01-01');
  //const res = http.get(sent);

  check(res, {
    'GET status is 200 -2': (r) => res.status === 200,
  });
}

export default function () {
  POSTApi();
  //GETApi();
}
