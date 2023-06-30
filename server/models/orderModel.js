const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const Orders = sequelize.define('Orders', {
    orderId : Sequelize.STRING,
    paymentId : Sequelize.STRING,
    status : Sequelize.STRING
    
})

module.exports = Orders;