const mongoose = require ('mongoose');
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema({

  name:{
      type:String,
      trim:true,
      required:true,
      maxlength:32
  },
  price:{
    type:Number,
    required:true
  },
  description:{
      type:String,
      maxlength:2000
    },
    //TO DO: come back again
    photo:{
        data:Buffer,
        contentType:String,
        required:true
    },
    category:{
        type:ObjectId,
        ref:"Category"
    }
},{timestamps:true});

module.exports = mongoose.model("Product",productSchema);