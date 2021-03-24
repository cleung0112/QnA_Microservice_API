const client = require('../Database/index.js');
const users = require('./user.js');
const answerPhoto = require('./answerphoto.js');

module.exports = {
  insertAnswers: function (answerInfo) {
    const query = "INSERT INTO answers (answerbody, helpfulness, reported, answertime, userid) VALUES ($1, $2, $3, $4, (SELECT id FROM users WHERE username = $5))";

    client.query(query, [...answerInfo], (err, result) => {
      if (err) {
        return console.log('err at insertAnswers', err)
      }
      console.log(result);
    })
  },

  getALlNotReportedAnswers: function (AnswerReq, callback) {
    const query = `SELECT Answers.id, Users.username, answerbody, datewritten, AnswerPhotos.url, helpfulness, reported FROM Answers LEFT JOIN AnswerPhotos ON Answers.id = AnswerPhotos.answerid LEFT JOIN Users on Answers.userId=Users.id WHERE Answers.question_id = $1 AND reported = 0 ORDER BY id OFFSET $2 LIMIT $3`;

    client.query(query, [...AnswerReq], (err, result) => {
      if (err) {
        console.log('err at getALlNotReportedAnswers', err)
      }
      callback(result)
    })
  },

  postAnAnswer: function (AnswerDetail, callback) {

    const shouldAbortQuery = (err) => {
      client.query('ROLLBACK', (err, result) => {
        if (err) {
          return console.log('Err at postAnAnswer', err)
        }
      })
    }

    client.query('BEGIN', (err) => {
      if (err) {
        shouldAbortQuery(err);
      }

      users.insertUser([AnswerDetail[1], AnswerDetail[2]], (err, result) => {
        if (err) {
          shouldAbortQuery(err);
        }

        client.query('COMMIT', (err) => {
          if (err) {
            shouldAbortQuery(err);
          }

          users.findUser(AnswerDetail[1], (result) => {
            if (err) {
              shouldAbortQuery(err);
            }
            const answerParams = [AnswerDetail[0], AnswerDetail[3]];
            answerParams.push(result.rows[0].id);


            client.query(`INSERT INTO Answers (question_id, answerbody, datewritten, userid) VALUES ($1, $2, now(), $3) RETURNING id`, [...answerParams], (err, result) => {
              if (err) {
                shouldAbortQuery(err);
              }

              const answerId = result.rows[0].id;
              if (AnswerDetail[4].length > 2) {
                for (const photoUrl of AnswerDetail[4]) {

                  answerPhoto.insertPhoto([photoUrl, answerId], (err, result) => {
                    if (err) {
                      shouldAbortQuery(err);
                    }
                    client.query('COMMIT', (err) => {
                      if (err) {
                        shouldAbortQuery(err);
                      }
                      callback('CREATED');
                    })
                  })
                }
              } else {
                client.query('COMMIT', (err) => {
                  if (err) {
                    shouldAbortQuery(err);
                  }
                  callback('CREATED');
                })
              }
            })
          })
        })
      })
    })
  },

  reportAnswerAsHelpful: function (AnswerId, callback) {
    const query = `UPDATE Answers SET helpfulness = helpfulness + 1 WHERE id = $1 RETURNING helpfulness`;
    client.query(query, [AnswerId], (err, result) => {
      if (err) {
        console.log('err at reportAnswerAsHelpful', err)
      }
      callback(result)
    })
  },

  reportAnswer: function (AnswerId, callback) {
    const query = `UPDATE Answers SET reported = reported + 1 WHERE id = $1 RETURNING reported`;
    client.query(query, [AnswerId], (err, result) => {
      if (err) {
        console.log('err at reportAnswer', err)
      }
      callback(result)
    })
  }
}


