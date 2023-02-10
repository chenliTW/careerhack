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
        iterations: 1000000,
        maxDuration: '30s',
      },
    },
};


const data_tsmc = new SharedArray("test-data", function () {
  return JSON.parse(open("./data.json"));
});

const ORDERApi = () => {
  

  const stable = JSON.stringify({
    "location": "TSMC",
    "timestamp": "2023-02-10",
    "data": {
      "a": 1000,
      "b": 1000,
      "c": 1000,
      "d": 1000,
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
  
  const data = ORDERpayload(); // random data
  const payload_1  = JSON.stringify(data);
  //const res = http.post('http://34.80.73.51:80/api/order', stable, {headers});//tsmc stable
  //const res = http.post('http://34.80.73.51:80/api/order', payload_1, {headers});//tsmc random
  //const res = http.post('http://34.80.73.51:80/api/order', payload_1, params);//tsmc with params
  //const res = http.post('http://34.123.52.100:30100/api/order', stable, {headers});//stable old
  const res = http.post('http://34.123.52.100:30100/api/order', payload_1, {headers});//random old
  check(res, {
    'Post status is 200 -ORDER-1': (r) => res.status === 200,
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
  //const res = http.get('http://34.80.73.51:80/api/record?location=TSMC&date=2023-02-10');//old
  const res = http.get(sent);//random
  //console.log(res);
  check(res, {
    'GET status is 200 -RECORD': (r) => res.status === 200,
    //'location is correct': (r) => res.json()[0].location.length != 0 ,
    //'timestamp is correct':(r) =>res.json()[0].timestamp != 0,
    //'signatures is correct':(r) =>res.json()[0].signature.length != 0,
    //'material is correct':(r) =>res.json()[0].material.length != 0,
  });
}

const REPORTApi = () => {
  const data = JSON.stringify({
    "location": "TSMC",
    "timestamp": "2023-02-10",
    "data": {
      "a": 1000,
      "b": 1000,
      "c": 1000,
      "d": 1000,
    }
  });

  const location  = 'location='.concat(REPORTKEYS().location);
  const date = 'date='.concat(REPORTKEYS().date);
  const url = 'http://34.123.52.100:30100/api/report?';
  const sent = url.concat(location, '&', date);
  const res = http.get(sent);
  //const res = http.get('http://34.80.73.51:80/api/report?location=TSMC&date=2023-02-10');  
  //console.log(res);
  check(res,{
    'GET status is 200 -REPORT': (r) => res.status === 200,
    'material correct': (r) => res.json().material != 0,
    'count correct': (r) => res.json().count != 0,
    //'date & location is correct': (r) => res.json().location === 'l1',
  })
}

const CLEANapi = () => {
  const res = http.get('http://34.80.73.51:80/api/clean');
  //console.log(res);
  check(res,{               
    'GET status is 200 -CLEAN': (r) => res.status === 200,
    'CLEAN response is success ': (r) => res.status === 200 && res.json().success === true,
  })
}

export default function () {
  ORDERApi();
  //RECORDApi();
  //REPORTApi();
  //CLEANapi();
}
