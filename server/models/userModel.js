const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const User = sequelize.define('User', {
    name: Sequelize.STRING,
    email: {
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: Sequelize.STRING,
    isPremiumUser: {
        type : Sequelize.BOOLEAN,
        defaultValue : false
    }
})

module.exports = User;