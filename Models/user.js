const client = require('../Database/index.js');

module.exports = {
  insertUser: function (userInfo) {
    const query = "INSERT INTO users (username, email) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING";
    client.query(query, [ ...userInfo ], (err, result) => {
      if (err) {
        console.log('err at insertUser', err)
      }
    })
  },
  findUser: function(username) {
    const query = "SELECT id FROM users WHERE username = $1";
    client.query(query, [ username ], (err, result) => {
      if (err) {
        console.log('err at findUser', err)
      }
    })
  }
}



