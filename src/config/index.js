require("dotenv").config();

const baseConfig = {
  secrets: {},
  port: 3005,
  db: {
    host: "localhost",
    port: 3306,
    user: "tester",
    password: process.env.DB_PASSWORD,
    database: "FullTextSearch"
  }
};

module.exports = baseConfig;
