import http from 'k6/http';
import { check } from 'k6';
import { server } from './config.js';

export const options = {
    scenarios: {
      send: {
        executor: 'shared-iterations',
        vus: 10, // number of threads
        iterations: 200,
        maxDuration: '30s',
      },
    },
  };

export default function () {
  const res = http.get(`http://${server.host}:${server.port}/${server.send_endpoint}`);
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
