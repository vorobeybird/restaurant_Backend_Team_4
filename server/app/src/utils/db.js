const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
connection.connect((error) => {
  if (error) throw error;
  // temporary - to create table dishes
  const sql = `
    CREATE TABLE IF NOT EXISTS dishes (
      id INT NOT NULL  AUTO_INCREMENT,
       title VARCHAR(50),
        ingredients VARCHAR(100),
         category VARCHAR(100),
          price INT, photo VARCHAR(50),
           weight INT,
            calories INT,
             PRIMARY KEY (id));
        
    `;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    result.warningCount === 0 && console.log("Lacking Table dishes created.");
  });
  // !temporary - to create table dishes
  console.log("Successfully connected to the database.");
});
module.exports = connection;