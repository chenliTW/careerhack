import http from 'k6/http';
import { check } from 'k6';
import { ORDERpayload } from './ORDERfake.js';
import { RECORDKeys} from './RECORDfake.js';
import { SharedArray } from "k6/data";
import { scenario } from "k6/execution";

export const options = {
    scenarios: {
      send: {
        executor: 'shared-iterations',
        vus: 100, // number of threads
        iterations: 1,
        maxDuration: '120s',
      },
    },
};


const data_tsmc = new SharedArray("test-data", function () {
  return JSON.parse(open("./data.json"));
});

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

  const params = {
    timeout: "10s",
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
    tags: {
      type: "send",
    },
  };

  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json',
  };
  const data = data_tsmc[scenario.iterationInTest]; //tsmc data
  //const data = ORDERpayload(); // random data
  const payload_1  = JSON.stringify(data);
  //const res = http.post('http://34.80.73.51:80/api/order', stable, {headers});//tsmc stable
  //const res = http.post('http://34.80.73.51:80/api/order', payload_1, {headers});//tsmc random
  //const res = http.post('http://34.80.73.51:80/api/order', payload_1, params);//tsmc with params
  const res = http.post('http://34.123.52.100:30100/api/order', stable, {headers});//stable old
  //const res = http.post('http://34.123.52.100:30100/api/order', payload_1, {headers});//random old

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
  //const res = http.get('http://34.123.52.100:30100/api/record?location=l1&date=2023-01-01');//stable old
  //const res = http.get('http://34.80.73.51:80/api/record?location=l1&date=2023-01-01');//old
  const res = http.get(sent);//random
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
  const url = 'http://34.123.52.100:30100/api/report?';
  const sent = url.concat(location, '&', date);
  //const res = http.get(sent);
  const res = http.get('http://34.123.52.100:30100/api/report?location=l1&date=2023-01-01');
  console.log(res);
  check(res,{
    'GET status is 200 -REPORT': (r) => res.status === 200,
    //'date & location is correct': (r) => res.json().location === 'l1',
  })
}
export default function () {
  //ORDERApi();
  //RECORDApi();
  REPORTApi();
}
