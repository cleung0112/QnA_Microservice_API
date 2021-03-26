import { sleep, check } from 'k6';
import http from 'k6/http';


export let options = {
  stages: [
    { duration: '1s', target: 1 },
    { duration: '1s', target: 10 },
    { duration: '1s', target: 100 },
    { duration: '1s', target: 1000 }
  ]
};

export default function () {
  let res = http.put('http://localhost:5001/answers/1/report');
  check(res, {
    'is status 204': (r) => r.status === 204,
  });

  sleep(10);
}

