import http from 'k6/http';
import { check } from 'k6';
import { ORDERpayload } from './ORDERfake.js';
import { RECORDKeys} from './RECORDfake.js';
import { SharedArray } from "k6/data";
import { scenario } from "k6/execution";
import { REPORTKEYS } from './REPORTfake.js';

export const options = {
    scenarios: {
      send: {
        executor: 'shared-iterations',
        vus: 1, // number of threads
        iterations: 10000000,
        maxDuration: '60000s',
      },
    },
};




const ORDERApi = () => {
  
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
  //const data = data_tsmc[scenario.iterationInTest]; //tsmc data
  const data = ORDERpayload(); // random data
  const payload_1  = JSON.stringify(data);
  //const res = http.post('http://34.80.73.51:80/api/order', stable, {headers});//tsmc stable
  const res = http.post('http://34.80.73.51:80/api/order', payload_1, {headers});//tsmc random
  //const res = http.post('http://34.80.73.51:80/api/order', payload_1, params);//tsmc with params
  //const res = http.post('http://34.123.52.100:30100/api/order', stable, {headers});//stable old
  //const res = http.post('http://34.123.52.100:30100/api/order', payload_1, {headers});//random old

  check(res, {
    'Post status is 200 -ORDER': (r) => res.status === 200,
    //'Post Content-Type header': (r) => res.headers['Content-Type'] === 'application/json',
    'Post response is success ': (r) => res.status === 200 && res.json().success === true,
  });
}



export default function () {
  ORDERApi();
}
