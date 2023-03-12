const express = require('express');
const paymentControler = require('../controller/userPayments')
const router = express.Router();
router.post('/payments',paymentControler.userPayments);
router.post('/mpesaPay',paymentControler.createToken,paymentControler.mpesaPayments)
module.exports = router;