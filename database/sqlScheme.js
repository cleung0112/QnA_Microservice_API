
DROP TABLE IF EXISTS `Questions`;

CREATE TABLE `Questions` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `questionBody` VARCHAR(255) NOT NULL,
  `helpfulness` SMALLINT DEFAULT 0 COMMENT 'Assumption: total votes on helpfulness < 32767',
  `reported` TINYINT DEFAULT 0,
  `userID` INTEGER NOT NULL,
  `productID` INTEGER NOT NULL,
  `askedTime` TIMESTAMP NOT NULL COMMENT 'Assumption: web app services customer from different time zo',
  PRIMARY KEY (`id`),
  FOREIGN KEY (userID) REFERENCES `Users` (`id`),
  FOREIGN KEY (productID) REFERENCES `product` (`id`)
);


DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `product_ID` CHAR(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`product_ID`)
);


DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) NOT NULL,
  `e-mail` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`username`, `e-mail`)
);


DROP TABLE IF EXISTS `Answers`;

CREATE TABLE `Answers` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `answerBody` VARCHAR(500) NOT NULL,
  `helpfulness` SMALLINT DEFAULT 0,
  `reported` TINYINT DEFAULT 0,
  `answerTime` TIMESTAMP NOT NULL,
  `userID` INTEGER NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (userID) REFERENCES `Users` (`id`)
);


DROP TABLE IF EXISTS `Questions and Answers`;

CREATE TABLE `Questions and Answers` (
  `id` INTEGER NULL AUTO_INCREMENT,
  `questionsId` INTEGER NOT NULL,
  `answersId` INTEGER NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (questionsId) REFERENCES `Questions` (`id`),

);


DROP TABLE IF EXISTS `AnswerPhoto`;

CREATE TABLE `AnswerPhoto` (
  `id` INTEGER NULL AUTO_INCREMENT,
  `photoURL` MEDIUMTEXT NOT NULL,
  `AnswerID` INTEGER NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (AnswerID) REFERENCES `Answers` (`id`)
);

