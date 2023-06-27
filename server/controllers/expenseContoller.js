const Expense = require("../models/expenseModel");

exports.add = async (req, res, next) => {
    try {
        const expense = req.body.expense;
        const description = req.body.description;
        const category = req.body.category;

        const result = await Expense.create({
            expense,
            description,
            category
        })
        res.json(result)

    } catch (error) {
        next(error);
    }
}

exports.getAll = async (req,res,next) => {
    try {
        const data = await Expense.findAll();
        res.json(data);
    } catch (error) {
        next(error);
    }
}