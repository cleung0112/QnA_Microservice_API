
DROP TABLE IF EXISTS product;

CREATE TABLE product (
  id SERIAL NOT NULL,
  product_ID INTEGER NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (product_ID)
);

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  id SERIAL NOT NULL,
  username VARCHAR(30) NOT NULL,
  email VARCHAR(70) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (username, email)
);


DROP TABLE IF EXISTS Questions;

CREATE TABLE Questions (
  id SERIAL NOT NULL,
  questionBody VARCHAR(255) NOT NULL,
  helpfulness SMALLINT DEFAULT 0,
  reported SMALLINT DEFAULT 0,
  userID INTEGER NOT NULL,
  productID INTEGER NOT NULL,
  askedTime DATE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userID) REFERENCES Users (id),
  FOREIGN KEY (productID) REFERENCES product (id)
);


DROP TABLE IF EXISTS Answers;

CREATE TABLE Answers (
  id SERIAL NOT NULL,
  answerBody VARCHAR(500) NOT NULL,
  helpfulness SMALLINT DEFAULT 0,
  reported SMALLINT DEFAULT 0,
  answerTime DATE NOT NULL,
  userID INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userID) REFERENCES Users (id)
);


DROP TABLE IF EXISTS QuestionsAndAnswers;

CREATE TABLE QuestionsAndAnswers (
  id SERIAL NOT NULL,
  questionsId INTEGER NOT NULL,
  answersId INTEGER NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (questionsId) REFERENCES Questions (id),
  FOREIGN KEY (answersId) REFERENCES Answers (id)
);


DROP TABLE IF EXISTS AnswerPhoto;

CREATE TABLE AnswerPhoto (
  id SERIAL NOT NULL,
  photoURL TEXT NOT NULL,
  AnswerID INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (AnswerID) REFERENCES Answers (id)
);

