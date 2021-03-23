const client = require('../Database/index.js');

module.exports = {
  insertQuestion: function (questionInfo) {
    const query = "INSERT INTO questions (questionbody, helpfulness, reported, userid, productid, askedtime) VALUES ($1, $2, $3, (SELECT id FROM users WHERE username = $4), $5, $6)";

    client.query(query, [...questionInfo], (err, result) => {
      if (err) {
        console.log('err at insertQuestion', err)
      }
      console.log(result);
    })
  },
  // does not include reported questions
  getALlNotReportedQuestions: function (QuestionsReq, callback) {
    const query = `SELECT * FROM questions WHERE productid = $1 AND reported = 0 ORDER BY id OFFSET $2 LIMIT $3`;
    client.query(query, [...QuestionsReq], (err, result) => {
      if (err) {
        console.log('err at getALlNotReportedQuestions', err)
      }
      callback(result);
    })
  }
}

