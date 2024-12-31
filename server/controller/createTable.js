const dbConnection = require("../db/dbConfig");

async function createTable(req, res) {
  const Users = `CREATE TABLE if not exists users(
    userid INT(20) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (userid)
  )`;

  const Questions = `CREATE TABLE if not exists questions(
    id INT(20) NOT NULL AUTO_INCREMENT,
    questionid VARCHAR(100) NOT NULL UNIQUE,
    userid INT(20) NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    tag VARCHAR(20),
    PRIMARY KEY (id, questionid),
    FOREIGN KEY (userid) REFERENCES users(userid)
  )`;

  const Answers = `CREATE TABLE if not exists answers(
    answerid INT(20) NOT NULL AUTO_INCREMENT,
    userid INT(20) NOT NULL,
    questionid VARCHAR(100) NOT NULL,
    answer VARCHAR(200) NOT NULL,
    PRIMARY KEY (answerid),
    FOREIGN KEY (questionid) REFERENCES questions(questionid),
    FOREIGN KEY (userid) REFERENCES users(userid)
  )`;

  try {
    await dbConnection.query(Users);
    await dbConnection.query(Questions);
    await dbConnection.query(Answers);

    console.log("All tables created successfully");
    res.send("Tables created successfully");
  } catch (err) {
    console.log("Error creating table:", err);
    res.status(500).send("Error creating table");
  }
}

module.exports = { createTable };
