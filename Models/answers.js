const client = require('../Database/index.js');

module.exports = {
  insertAnswers: function (answerInfo) {
    const query = "INSERT INTO answers (answerbody, helpfulness, reported, answertime, userid) VALUES ($1, $2, $3, $4, (SELECT id FROM users WHERE username = $5))";

    client.query(query, [ ...answerInfo ], (err, result) => {
      if (err) {
        console.log('err at insertAnswers', err)
      }
      console.log(result);
    })
  }
}


