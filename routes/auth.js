const express = require('express');
const app = express();
require('dotenv').config();
const router = express.Router();
const {signout,signup,signin,isSignedIn} = require('../controllers/auth');

const { check } = require('express-validator');

//Signup Route
router.post('/signup',[
    check('name','name should be minimum of three char').isLength({min:3}),
    check('email','enter valid email').isEmail(),
    check('password','password should be minimum of three char').isLength({min:3})
],signup); 

//signout route
router.get('/signout',signout);

//Signin Route
router.post('/signin',[
    check('email','enter valid email').isEmail(),
    check('password','password should be minimum of three char').isLength({min:3})
],signin); 

//Signout Route
router.get('/signout',signout);

//Protected route for testing purpose
router.get('/protected',isSignedIn,(req,res)=>{
    // res.send('Protected Route');
    res.json(req.auth);  
})




module.exports = router;