const express = require('express');
const paymentControler = require('../controller/userPayments')
const router = express.Router();
router.post('/payments',paymentControler.userPayments);

module.exports = router;