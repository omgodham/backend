const express = require('express');
const app = express();
const User = require('../models/user');

exports.signup = (req,res)=>{
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

