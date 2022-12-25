const mongoose = require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId

const orderSchema=new mongoose.Schema({

    userId:{
        type:ObjectId,
        ref:"newuser"    
     },
     productId:{
        type:ObjectId,
        ref:"newproduct"
     },
     amount:Number,
     isFreeAppUser: Boolean,
     date: String


},{timestamps:true}
)


module.exports = mongoose.model('neworder', orderSchema)