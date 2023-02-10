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
        vus: 200, // number of threads
        iterations: 200,
        maxDuration: '120s',
      },
    },
};


const data_tsmc = new SharedArray("test-data", function () {
  return JSON.parse(open("./data.json"));
});
const ORDER_TSMC_Api = () => {
    
    const headers = {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    };
    const data = data_tsmc[scenario.iterationInTest]; //tsmc data
    
    const payload_1  = JSON.stringify(data);
    //const res = http.post('http://34.80.73.51:80/api/order', payload_1, {headers});//tsmc random
    const res = http.post('http://34.123.52.100:30100/api/order', payload_1, {headers});

    check(res, {
      'Post status is 200 -ORDER-1': (r) => res.status === 200,
      //'Post Content-Type header': (r) => res.headers['Content-Type'] === 'application/json',
      'Post response is success ': (r) => res.status === 200 && res.json().success === true,
    });
}


export default function () {
    ORDER_TSMC_Api();
  }