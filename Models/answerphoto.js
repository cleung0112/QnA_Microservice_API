const client = require('../Database/index.js');

module.exports = {
  insertPhoto: function (photoInfo) {
    const query = "INSERT INTO answerphoto (photourl, answerid) VALUES ($1, (SELECT id FROM answers WHERE id = $2))";
    client.query(query, [ ...photoInfo ], (err, result) => {
      if (err) {
        console.log('err at insertPhoto', err)
      }
      console.log(result);
    })
  }
}

