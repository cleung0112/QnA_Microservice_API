CREATE TABLE Questions (
  id SERIAL NOT NULL,
  productId INTEGER NOT NULL,
  questionBody VARCHAR(255) NOT NULL,
  askedTime DATE NOT NULL,
  asker_name TEXT NOT NULL,
  asker_email TEXT NOT NULL,
  reported SMALLINT DEFAULT 0,
  helpfulness SMALLINT DEFAULT 0,
  PRIMARY KEY (id)
);

COPY Questions(id, productId, questionBody, askedTime, asker_name, asker_email, reported, helpfulness)
FROM '/Users/carmanleung/Downloads/questions.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE Questions (
  id SERIAL NOT NULL,
  productId INTEGER NOT NULL,
  questionBody VARCHAR(255) NOT NULL,
  askedTime DATE NOT NULL,
  reported SMALLINT DEFAULT 0,
  helpfulness SMALLINT DEFAULT 0,
  userId INT NOT NULL,
  PRIMARY KEY (id)
);

COPY Questions(id, productId, questionBody, askedTime, reported, helpfulness, userId)
FROM '/home/ubuntu/questions.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE Answers (
  id SERIAL NOT NULL,
  question_id INT NOT NULL,
  answerBody VARCHAR(255) NOT NULL,
  dateWritten DATE NOT NULL,
  answerer_name TEXT NOT NULL,
  answerer_email TEXT NOT NULL,
  reported SMALLINT DEFAULT 0,
  helpfulness SMALLINT DEFAULT 0,
  PRIMARY KEY (id)
);

COPY Answers(id, question_id, answerBody, dateWritten, answerer_name, answerer_email, reported, helpfulness)
FROM '/Users/carmanleung/Downloads/answers.csv'
DELIMITER ','
CSV HEADER;


CREATE TABLE Answers (
  id SERIAL NOT NULL,
  questionId INT NOT NULL,
  answerBody VARCHAR(255) NOT NULL,
  dateWritten DATE NOT NULL,
  reported SMALLINT DEFAULT 0,
  helpfulness SMALLINT DEFAULT 0,
  userId INT NOT NULL,
  PRIMARY KEY (id)
);

COPY Answers(id, questionId, answerBody, dateWritten, reported, helpfulness, userId)
FROM '/home/ubuntu/answers.csv'
DELIMITER ','
CSV HEADER;


CREATE TABLE AnswerPhotos (
  id SERIAL NOT NULL,
  answer_id INTEGER NOT NULL,
  url TEXT NOT NULL,
  PRIMARY KEY (id)
);

COPY AnswerPhotos(id, answer_id, url)
FROM '/Users/carmanleung/Downloads/answers_photos.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE AnswerPhotos (
  id SERIAL NOT NULL,
  url TEXT NOT NULL,
  answerid INTEGER NOT NULL,
  PRIMARY KEY (id)
);

COPY AnswerPhotos(id, url, answerid)
FROM '/home/ubuntu/answerphotos.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE Users (
  id SERIAL NOT NULL,
  username VARCHAR(30) NOT NULL,
  email VARCHAR(70) NOT NULL,
  PRIMARY KEY (id)
);

COPY Users(id, username, email)
FROM '/home/ubuntu/users.csv'
DELIMITER ','
CSV HEADER;

INSERT INTO Users(username, email) SELECT asker_name, asker_email FROM Questions;
INSERT INTO Users(username, email) SELECT answerer_name, answerer_email FROM Answers;


TO DELETE DUPLICATE:
SELECT username, COUNT(username) FROM Users GROUP BY username HAVING COUNT(username)>1 ORDER BY username;
DELETE FROM Users a USING Users b WHERE a.id < b.id AND a.username = b.username;

ALTER TABLE Users ADD CONSTRAINT username_unique UNIQUE (username);
-- DELETE FROM UsersTest2 a USING UsersTest2 b WHERE a.id > b.id AND a.username = b.username;

-- COPY FROM ONE TABLE TO ANOTHER

-- If you need to select only some columns or reorder them, you can do this:

-- INSERT INTO mycopy(colA, colB)
-- SELECT col1, col2 FROM mytable;


ALTER TABLE Questions ADD userID int;

update Questions
   set userID = Users.id
from Users
where Questions.asker_name = Users.username;

-- update QuestionsTest2
--    set UserID = UsersTest2.id
-- from UsersTest2
-- where QuestionsTest2.asker_name = UsersTest2.username;

alter table Questions drop column asker_name;
alter table Questions drop column asker_email;

-- alter table QuestionsTest add constraint fk_QuestionsTest_UsersTest2 foreign key (UsersTest2_id) references UsersTest2(id);
ALTER TABLE Questions ADD CONSTRAINT fk_Questions_Users FOREIGN KEY (userID) REFERENCES Users(id);

ALTER TABLE Questions ADD CONSTRAINT fk_Questions_Users FOREIGN KEY (UserID) REFERENCES Users(id);
--   FOREIGN KEY (userID) REFERENCES Users (id),



LINKING ANSWERS TABLE;

ALTER TABLE Answers ADD userID int;

update Answers
   set userID = Users.id
from Users
where Answers.answerer_name = Users.username;

alter table Answers drop column answerer_name;
alter table Answers drop column answerer_email;

ALTER TABLE Answers ADD CONSTRAINT fk_Answers_Users FOREIGN KEY (userID) REFERENCES Users(id);


ALTER TABLE Answers ADD questionsId int;

update Answers
   set questionsId = Questions.id
from Questions
where Answers.question_id = Questions.id;

alter table Answers drop column question_id;

ALTER TABLE Answers ADD CONSTRAINT fk_Answers_Questions FOREIGN KEY (questionsId) REFERENCES Questions(id);


LINKING ANSWER TO PHOTOS

ALTER TABLE AnswerPhotos ADD answerId int;

update AnswerPhotos
   set answerId = Answers.id
from Answers
where AnswerPhotos.answer_id = Answers.id;

alter table AnswerPhotos drop column answer_id ;

ALTER TABLE AnswerPhotos ADD CONSTRAINT fk_AnswerPhotos_Answers FOREIGN KEY (answerId) REFERENCES Answers(id);

ALTER TABLE users ADD CONSTRAINT UNIQ_username UNIQUE (username);


ALTER TABLE Questions ALTER COLUMN userid SET NOT NULL;

INSERT INTO answers (id, answerbody, helpfulness, reported, answertime, userid) VALUES (5, 'hiii', 12,0, '2020-01-22', 5);

//create composed index
create index on Answers(questionid, reported);

create index on Questions(productid, reported);

// insert a question
"INSERT INTO questions (productid, questionsbody, askedntime, reported, helpfulness, userid) VALUES ($1, $2, $3, $4, $5, (SELECT id FROM users WHERE username = $6) )";