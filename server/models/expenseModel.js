const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const Expense = sequelize.define('Expense', {
    expense: {
        type:Sequelize.STRING,
        allowNull: false,

    },
    description: {
        type:Sequelize.STRING,
        allowNull: false,
    },
    category: {
        type:Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = Expense;