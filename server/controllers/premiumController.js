const User = require("../models/userModel");
const Expense = require("../models/expenseModel");
const sequelize = require('../utils/db')


exports.leaderboard = async (req, res) => {
    try {
      const user = await User.findAll({
        attributes: [
          'name',
          'totalExpense',
        ]
      });
      console.log(user);
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  };
  