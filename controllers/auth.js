const express = require('express');
const app = express();
const User = require('../models/user');
const { check , validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req,res)=>{
    
    
    const errors = validationResult(req);
    // console.log(errors);

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
                    error:'email and password does not match'
                });
            }
            //Token Creation
            const token = jwt.sign({id:user._id},process.env.SECRET);
            //Token save using cookie
            res.cookie('token',token,{expires: new Date(Date.now() + 999)});
            const {_id,name,role} = user;
            return res.json({token,user:{_id,name,email,role}});
        })

}

//Middleware coming from expreess
exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    userProperty : 'auth'
    });
  
 //Custom Middlewares 
 exports.isAuthenticate = (req,res,next) =>{
     
     const checker = req.profile && req.auth && req.profile._id == req.auth.id;
     if(!checker){
         return res.status(403).json({
             error:'Access Denied'
         });
        }
         next();
     }
 
     exports.isAdmin = (req,res,next) =>{
        if(req.profile.role == 0){
            return res.status(403).json({
                error:'You are not ADMIN'
            });
        }
            next();
        }    

  
exports.signout = (req,res)=>{
    res.send('User Signout');
}

