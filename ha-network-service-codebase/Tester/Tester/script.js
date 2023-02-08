import http from 'k6/http';
import { check } from 'k6';
import { server } from './config.js';

export const options = {
    scenarios: {
      send: {
        executor: 'shared-iterations',
        vus: 200, // number of threads
        iterations: 200*50,
        maxDuration: '30s',
      },
    },
  };

export default function () {
    //const res = http.post(`http://${server.host}:${server.port}/${server.send_endpoint}`);
  const res = http.get('http://35.193.9.161:30770/api/record?location=l1&date=2023-01-01');
    check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
