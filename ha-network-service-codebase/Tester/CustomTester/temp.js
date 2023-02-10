import http from 'k6/http';
import { SharedArray } from "k6/data";
import { scenario } from "k6/execution";
import { check } from 'k6';
import { server } from './config.js.js';

const dataList = new SharedArray("test-data", function () {
  return JSON.parse(open("./data.json"));
});


export const options = {
    scenarios: {
      send: {
        executor: 'shared-iterations',
        vus: 10, // number of threads
        iterations: 20,
        maxDuration: '30s',
      },
    },
  };

export default function () {
  const data = dataList[scenario.iterationInTest];
  const url = `http://${server.host}:${server.port}/${server.send_endpoint}`;
  const payload = JSON.stringify(data);

  const params = {
    timeout: "10s",
    headers: {
      'Content-Type': 'application/json',
    },
    tags: {
      type: "send",
    },
  };

  const res = http.post(url, payload, params);
  check(res, {
    "success": (res) => (res.status == 200)
  })
}
