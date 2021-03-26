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
  const randomQuestionId = Math.floor(Math.random() * 3521634);

  let res = http.get(`http://localhost:5001/${randomQuestionId}/answers?page=1&count=4`);
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
  sleep(10);
}

