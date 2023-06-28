const expenseController = require('../controllers/expenseContoller');
const express = require('express');
const userAuth = require('../middleWare/authMiddleware')
const router = express.Router();


router.post('/addexpense', userAuth.authentication, expenseController.add);
router.get('/getexpense', userAuth.authentication , expenseController.getAll);
router.delete('/deleteexpense/:id', userAuth.authentication , expenseController.deleteExpense);

module.exports = router;

