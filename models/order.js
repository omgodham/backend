const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

//This is product in cart
const productCartSchema =new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:'Product'
    },
    name:String,
    count:Number,
    price:Number,
},{timestamps:true});

const ProductCart = mongoose.model('ProductCartSchema',productCartSchema);


const orderSchema = new mongoose.Schema({
    products:[productCartSchema],
    transaction_id:{},
    amount:{type:Number},
    address:String,
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User"
    },
},{timestamps:true});

const Order = mongoose.model('Order',orderSchema);

module.exports = {ProductCart,Order};