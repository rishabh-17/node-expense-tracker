const User = require("../models/userModel");
const Expense = require("../models/expenseModel");
const jwt = require("jsonwebtoken");
const sequelize = require("../utils/db");

exports.add = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const expense = req.body.expense;
    const description = req.body.description;
    const category = req.body.category;

    const result = await Expense.create(
      {
        expense,
        description,
        category,
        UserId: req.user.id,
      },
      { transaction: t }
    );
    const currentTotalExpense = req.user.totalExpense || 0;
    const newTotalExpense = currentTotalExpense + +expense;
    await req.user.update(
      { totalExpense: newTotalExpense },
      { transaction: t }
    );
    t.commit();
    res.json(result);
  } catch (error) {
    t.rollback();
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    req.user.getExpenses().then((data) => {
      res.json(data);
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteExpense = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Expense.destroy({
      where: {
        id: id,
      },
    });
    res.json({ msg: "Delete successfully" });
  } catch (error) {
    next(error);
  }
};
