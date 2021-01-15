const express = require('express');
const app = express();
const User = require('../models/user');
const { check , validationResult } = require('express-validator');


exports.signup = (req,res)=>{
    
    
    const errors = validationResult(req);
    console.log(errors);

    //If any validation errors 
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg,
            location:errors.array()[0].param
        });
    }


    const user = new User(req.body);
        user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                message:'Eror is accured'
            });
        }
        res.json({
            user:user.name,
            email:user.email,
            id:user._id
        });
    });
}

exports.signout = (req,res)=>{
    res.send('User Signout');
}

