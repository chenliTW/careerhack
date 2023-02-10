import http from 'k6/http';
import { check } from 'k6';
import { ORDERpayload } from './ORDERfake.js';
import { RECORDKeys} from './RECORDfake.js';


export const options = {
    scenarios: {
      send: {
        executor: 'shared-iterations',
        vus: 1000, // number of threads
        iterations: 1000,
        maxDuration: '120s',
      },
    },
};


const ORDERApi = () => {

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

  const data = ORDERpayload();
  const payload_1  = JSON.stringify(data);
  const res = http.post('http://34.80.73.51:80/api/order', payload_1, {headers});//random
  //const res = http.post('http://34.123.52.100:30100/api/order', stable, {headers});//stable
  //const res = http.post('http://34.80.73.51:80/api/order', stable, {headers});//old

  check(res, {
    'Post status is 200 -ORDER': (r) => res.status === 200,
    //'Post Content-Type header': (r) => res.headers['Content-Type'] === 'application/json',
    'Post response is success ': (r) => res.status === 200 && res.json().success === true,
  });
}

const RECORDApi = () => {

  const location = 'location=' + RECORDKeys().location;
  const date  = 'data=' + RECORDKeys().date;
  const url = 'http://34.80.73.51:80/api/record?';
  const sent = url.concat(location, '&', date);
  //const res = http.get('http://34.123.52.100:30100/api/record?location=l1&date=2023-01-01');//stable
  const res = http.get('http://34.80.73.51:80/api/record?location=l1&date=2023-01-01');//old
  //const res = http.get(sent);//random
  //console.log(res);
  check(res, {
    'GET status is 200 -RECORD': (r) => res.status === 200,
  });
}

const REPORTApi = () => {
  const data = JSON.stringify({
    "location": "l1",
    "timestamp": "2021-03-01T00:00:00.000Z",
    "data": {
      "a": 18,
      "b": 8,
      "c": 6,
      "d": 28
    }
  });

  const location  = 'location='.concat('l1');
  const date = 'date='.concat('2021-03-01T00:00:00.000Z');
  const url = 'http://34.80.73.51:8100/api/report?';
  const sent = url.concat(location, '&', date);
  const res = http.get(sent);
  console.log(res.json().material);
  console.log(res.json().a);
  console.log(res.json().b);
  console.log(res.json().c);
  console.log(res.json().d);
  check(res,{
    'GET status is 200 -REPORT': (r) => res.status === 200,
    'date & location is correct': (r) => res.json().location === 'l1',
  })
}
export default function () {
  //ORDERApi();
  RECORDApi();
  //REPORTApi();
}
