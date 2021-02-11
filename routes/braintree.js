const express = require('express');
const router = express.Router();
const {isSignedIn,isAuthenticate} = require("../controllers/auth");
const {getToken,makeBraintreePayment} = require('../controllers/braintree');
const {getUserById} = require('../controllers/user')

router.param('userId',getUserById);

router.get('/payment/getToken/:userId' , isSignedIn,isAuthenticate, getToken);

router.post('/payment/braintree/:userId',isSignedIn, isAuthenticate, makeBraintreePayment);

module.exports = router;