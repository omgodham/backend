const express = require('express');
const app = express();
const User = require('../models/user');
const { check , validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

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

exports.signin = (req,res) => {

    const {email,password} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(402).json({
                error:errors.array()[0].msg
        });
    }
        User.findOne({email},(err,user)=>{
            if(!user || err){
                return res.status(400).json({
                    error:'email does not match'
                });
            }
            if(!user.authenticate(password)){
                return res.status(400).json({
                    error:'enter valid password'
                });
            }
            //Token Creation
            const token = jwt.sign({id:user._id},process.env.SECRET);
            //Token save using cookie
            res.cookie('token',token,{expires: new Date(Date.now() + 999)});

            res.json({token,email});
        })

}

exports.signout = (req,res)=>{
    res.send('User Signout');
}

