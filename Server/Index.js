const express = require('express');
const router = require('./Routes.js');
const app = express();
const port = 5001;

app.use('/', router);

app.listen(port, () => {
  console.log(`listening at port ${port}`);
})