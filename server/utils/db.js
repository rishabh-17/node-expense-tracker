const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "mysql",
  process.env.DB_USER_NAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
  }
);

module.exports = sequelize;
