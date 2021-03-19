const client = require('../Database/index.js');

module.exports = {
  insertQuestions: function (questionInfo) {
    const query = "INSERT INTO questions (questionbody, helpfulness, reported, userid, productid, askedtime) VALUES ($1, $2, $3, (SELECT id FROM users WHERE username = $4), (SELECT id FROM product WHERE product_ID = $5), $6)";

    client.query(query, [ ...questionInfo ], (err, result) => {
      if (err) {
        console.log('err at insertQuestions', err)
      }
      console.log(result);
    })
  }
}


