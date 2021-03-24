const client = require('../Database/index.js');
const user = require('./user.js');

module.exports = {
  getALlUnreportedQuestions: function (QuestionsReq, callback) {
    const query = `SELECT Questions.id, Users.username, questionbody, askedtime, helpfulness, reported FROM Questions LEFT JOIN Users ON Questions.userId = Users.id WHERE Questions.productid = $1 AND Questions.reported = 0 ORDER BY id OFFSET $2 LIMIT $3`;

    client.query(query, [...QuestionsReq], (err, result) => {
      if (err) {
        console.log('err at getALlUnreportedQuestions', err)
      }
      callback(result);
    })
  },

  postAQuestion: function (questionInfo, callback) {

    const shouldAbortQuery = (err) => {
      client.query('ROLLBACK', (err) => {
        console.log('err at postAQuestion', err);
      })
    }

    client.query('BEGIN', (err) => {
      if (err) {
        shouldAbortQuery(err)
      }
      user.insertUser([questionInfo[1], questionInfo[2]], (err, result) => {
        if (err) {
          shouldAbortQuery(err)
        }
        client.query('COMMIT', (err) => {
          if (err) {
            shouldAbortQuery(err)
          }
          const postPara = [questionInfo[0], questionInfo[3]];
          user.findUser(questionInfo[1], (result) => {
            postPara.push(result.rows[0].id);

            const query = `INSERT INTO Questions (productid, questionbody, askedtime, userid ) VALUES ($1, $2, now(), $3)`;
            client.query(query, [...postPara], (err, result) => {
              if (err) {
                shouldAbortQuery(err)
              }

              client.query('COMMIT', (err) => {
                if (err) {
                  console.log('Cannot commit transaction', err);
                } else {
                  callback('Created');
                }
              })
            })
          })
        })
      });

    })
  },

  reportQuestionAsHelpful: function (questionId, callback) {
    const query = `UPDATE Questions SET helpfulness = helpfulness + 1 WHERE id = $1 RETURNING helpfulness`;
    client.query(query, [questionId], (err, result) => {
      if (err) {
        console.log('err at reportQuestionAsHelpful', err)
      }
      callback(result);
    })
  },

  reportQuestion: function (questionId, callback) {
    const query = `UPDATE Questions SET reported = reported + 1 WHERE id = $1 RETURNING reported`;
    client.query(query, [questionId], (err, result) => {
      if (err) {
        console.log('err at reportQuestion', err)
      }
      callback(result);
    })
  }
}

// insert a questions
// 1. insert user name
// 2. get userId
// 3. insert into questions
// BEGIN;

// INSERT INTO users (username, email) VALUES ('test', 'test@gmail.com') ON CONFLICT (username) DO NOTHING;

// INSERT INTO Questions (productid, questionbody, askedtime, userid ) VALUES (1, 'tester', now(), ( SELECT id FROM Users WHERE username = 'test'));

// END;
// WITH questionID AS (SELECT id FROM Questions WHERE productid = 1)
// SELECT answerbody FROM Answers WHERE Answers.question_id IN (SELECT id FROM questionID)


// INSERT INTO Questions (productid, questionbody, askedtime, userid ) VALUES (1, 'tester', now(), 15914586);
