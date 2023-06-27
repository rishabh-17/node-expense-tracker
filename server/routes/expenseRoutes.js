const expenseController = require('../controllers/expenseContoller');
const express = require('express');

const router = express.Router();


router.post('/addexpense', expenseController.add);
router.get('/getexpense', expenseController.getAll);

module.exports = router;

