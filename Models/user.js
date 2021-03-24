const client = require('../Database/index.js');

module.exports = {
  insertUser: function (userInfo, callback) {
    const query = "INSERT INTO users (username, email) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING";
    client.query(query, [ ...userInfo ], (err, result) => {
      if (err) {
        return console.log('err at insertUser', err);
      }
      callback(err, result);
    })
  },

  findUser: function(username, callback) {
    const query = "SELECT id FROM users WHERE username = $1";
    client.query(query, [ username ], (err, result) => {
      if (err) {
        return console.log('err at findUser', err)
      }
      callback(result);
    })
  }
}

