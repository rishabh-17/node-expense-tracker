const User = require("../models/userModel");
const Expense = require("../models/expenseModel");
const jwt = require("jsonwebtoken");
exports.add = async (req, res, next) => {
    try {
        const expense = req.body.expense;
        const description = req.body.description;
        const category = req.body.category;
    
        const result = await Expense.create({
            expense,
            description,
            category,
            UserId: req.user.id

        })
        const user = await User.findByPk(req.user.id); 
        const currentTotalExpense = user.totalExpense || 0; 
        const newTotalExpense = currentTotalExpense + +expense; 

        await user.update({ totalExpense: newTotalExpense }); 

        res.json(result)

    } catch (error) {
        next(error);
    }
}

exports.getAll = async (req,res,next) => {
    try {
        req.user.getExpenses().then(data =>{
            res.json(data);
        })
    } catch (error) {
        next(error);
    }
}


exports.deleteExpense = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Expense.destroy({where:{
            id: id
        }})
        res.json({msg:"Delete successfully"})
    } catch (error) {
        next(error);
    }
}