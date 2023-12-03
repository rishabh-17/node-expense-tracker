const User = require("../models/userModel");
const Expense = require("../models/expenseModel");
const sequelize = require("../utils/db");
// const uploadS3 = require("../services/aws");
exports.leaderboard = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: ["name", "totalExpense"],
    });
    console.log(user);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.report = async (req, res) => {
  try {
    req.user
      .getExpenses()
      .then((data) => {
        const stringyfyData = JSON.stringify(data);
        const name = req.user.id + new Date();
        uploadS3(stringyfyData, name).then((S3Response) => {
          res.json(S3Response);
        });
      })
      .catch((err) => res.json(err));
  } catch (error) {
    next(error);
  }
};
