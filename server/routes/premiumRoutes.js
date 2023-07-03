const premiumController = require('../controllers/premiumController');
const express = require('express');
const userAuth = require('../middleWare/authMiddleware')
const router = express.Router();

router.get('/leaderboard', userAuth.authentication, premiumController.leaderboard);

module.exports = router;