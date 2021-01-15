const express = require('express');
const app = express();
require('dotenv').config();
const router = express.Router();
const {signout,signup} = require('../controllers/auth');

const { check } = require('express-validator');

router.post('/signup',[
    check('name','name should be minimum of three char').isLength({min:3}),
    check('email','enter valid email').isEmail(),
    check('password','password should be minimum of three char').isLength({min:3})
],signup); 
router.get('/signout',signout);

module.exports = router;