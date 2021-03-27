const { Pool } = require('pg');

const pool = new Pool({
  host: '54.183.147.247',
  user: 'ubuntu',
  database: 'sdc',
  password: 'sdc',
  port: 5432
});

pool.connect((err) => {
  if (err) {
    console.log('err at connecting to psql', err);
  } else {
    console.log('connected to psql');
  }
})

module.exports = pool;