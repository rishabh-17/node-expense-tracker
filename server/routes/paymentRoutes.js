const paymentController = require('../controllers/paymentController');
const express = require('express');
const userAuth = require('../middleWare/authMiddleware')
const router = express.Router();


router.get('/premium', userAuth.authentication, paymentController.purchasePremium);

router.post('/updatetransaction', userAuth.authentication, paymentController.updateTransaction);

module.exports = router;

