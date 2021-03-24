const client = require('../Database/index.js');

module.exports = {
  insertPhoto: function (photoInfo, callback) {
    const query = `INSERT INTO answerphoto (photourl, answerid) VALUES ($1, $2)`;
    client.query(query, [ ...photoInfo ], (err, result) => {
      if (err) {
        console.log('err at insertPhoto', err)
      }
      callback(err, result);
    })
  }
}

