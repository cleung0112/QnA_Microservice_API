const client = require('../Database/index.js');

module.exports = {
  insertUser: function (userInfo) {
    const query = "INSERT INTO users (username, email) VALUES ($1, $2)";
    client.query(query, [ ...userInfo ], (err, result) => {
      if (err) {
        console.log('err at insertUser', err)
      }
      console.log(result);
    })
  }
}

