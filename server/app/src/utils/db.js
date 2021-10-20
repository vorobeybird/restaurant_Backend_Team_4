const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  multipleStatements: true,
});
connection.connect((error) => {
  if (error) throw error;
  // temporary - to create table dishes
  const sql = `
    CREATE TABLE IF NOT EXISTS dishes (
      id INT NOT NULL  AUTO_INCREMENT,
       title VARCHAR(100),
        default_ingredients VARCHAR(200),
          price INT,
           weight INT,
            calories INT,
             PRIMARY KEY (id)) ENGINE=INNODB;
             CREATE TABLE IF NOT EXISTS dishes_photos (
              id INT NOT NULL AUTO_INCREMENT,
              dish_id INT NOT NULL,
              photo_url VARCHAR(50) NOT NULL,
              ordinal_num INT,
              width INT,
              height INT,
              PRIMARY KEY (id),
              FOREIGN KEY (dish_id) REFERENCES dishes(id)
              ON DELETE CASCADE
            ) ENGINE=INNODB;
            CREATE TABLE IF NOT EXISTS ingredients (
              id INT NOT NULL AUTO_INCREMENT,
              title VARCHAR(30) NOT NULL,
              PRIMARY KEY (id)
            ) ENGINE=INNODB;
            CREATE TABLE IF NOT EXISTS dishes_ingredients (
              id INT NOT NULL AUTO_INCREMENT,
              dish_id INT NOT NULL,
              ingredient_id INT NOT NULL,
              PRIMARY KEY (id),
              FOREIGN KEY (dish_id) REFERENCES dishes(id)
              ON DELETE CASCADE            
            ) ENGINE=INNODB;
            CREATE TABLE IF NOT EXISTS categories (
              id INT NOT NULL AUTO_INCREMENT,
              title VARCHAR(30) NOT NULL,
              PRIMARY KEY (id)
            ) ENGINE=INNODB;
            CREATE TABLE IF NOT EXISTS dishes_categories (
              id INT NOT NULL AUTO_INCREMENT,
              dish_id INT NOT NULL,
              category_id INT NOT NULL,
              PRIMARY KEY (id),
              FOREIGN KEY (dish_id) REFERENCES dishes(id)
              ON DELETE CASCADE
            ) ENGINE=INNODB;

        
    `;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    result.warningCount === 0 && console.log("Lacking Table dishes created.");
  });
  // !temporary - to create table dishes
  console.log("Successfully connected to the database.");
});
module.exports = connection;
