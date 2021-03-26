const pool = require('../Database/index.js');

module.exports = {
  insertPhoto: function (photoInfo, callback) {
    const query = `INSERT INTO answerPhotos (url, answerId) VALUES ($1, $2)`;
    pool.query(query, [ ...photoInfo ], (err) => {
      if (err) {
        console.log('err at insertPhoto', err);
        callback(err);
      }
    })
  }
}

