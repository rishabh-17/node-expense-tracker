const User = require("../models/userModel");
const Expense = require("../models/expenseModel");
const sequelize = require('../utils/db')


exports.leaderboard = async (req, res) => {
    try {
      const user = await User.findAll({
        attributes: [
          'id',
          'name',
          [
            sequelize.fn('sum', sequelize.col('Expenses.expense')),
            'total_cost',
          ],
        ],
        include: [
          {
            model: Expense,
            attributes: [],
          },
        ],
        group: ['User.id'],
        order: [['total_cost', 'DESC']]
      });
      console.log(user);
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  };
  