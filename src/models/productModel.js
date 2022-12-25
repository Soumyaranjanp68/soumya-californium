const mongoose = require('mongoose');

const productSchema= new mongoose.Schema({
   
    productName:String,
    catagory:String,
    price:{
        type:Number,
        required:true
    }
    },
    {timestamps:true});



module.exports = mongoose.model('newproduct1', productSchema)