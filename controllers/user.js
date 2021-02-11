const User = require("../models/user");
const Order =require("../models/order");

//This is a middleware for set user profile depending on id given in param 
exports.getUserById = (req,res,next,id)=>{
 User.findById(id).exec((err,user)=>{
     if(err || !user){
         return res.status(400).json({
            error:"user not found",
         });
     }
      req.profile = user;
      next();
 });      
};



//This is to get User Profile
exports.getUser = (req,res) =>{
    req.profile.encry_password=undefined;
    req.profile.salt=undefined;
    return res.json(req.profile);     
};


//To update user info depending on what id send in param
exports.updateUser = (req,res) =>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:false}, //here new:true gives you updated value not old
        (err,user) =>{
            if(err || !user){
                return res.status(400).json({
                    error:'no user find to update'
                });
            }
            user.encry_password=undefined;//If undefined not going to show in res but it is there in actual db of user
            user.salt=undefined;
            res.status(200).json(user);
        }
        );
}


//This is To get user purchase list
exports.userPurchaseList = (req,res) =>{
    Order.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err || !order){
            return res.status(400).json({
                error:'No orders found'
            })
        }
    res.status(200).json(order);    
    })
}


//This is middleware to push data in userPurchaselist

exports.pushOrderInUserPurchaseList = (req,res,next) =>{
    let purchases =[];
    req.body.order.products.forEach( product =>{
        purchases.push({
            _id:product._id,
            name:product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.order.amount,
            transaction_id:req.body.order.transaction_id
        });
       
    })

    //Now store this purchases array in purchases of user
    User.findOneAndUpdate({_id:req.profile._id},
        {$push:{purchases:purchases}},
        {new:true},
        (err,user) => {
            if(err || !user){
                return res.status(400).json({
                    error:'No User Found'
                })
            }
            next();
    })
}
