require("dotenv").config({ path: "../../.env" }); // this is important!
module.exports = {
  development: {
    username: "root",
    password: "123OceanDB123",
    database: "test_OceanDB",
    host: "127.0.0.1",
    dialect: "mysql",
    port: "3307",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgre",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
