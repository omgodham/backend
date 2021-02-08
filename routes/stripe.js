const express =require('express');
const router = express.Router();
const {makePayment} = require('../controllers/stripe');

router.post('/payment' , makePayment);

module.exports = router;