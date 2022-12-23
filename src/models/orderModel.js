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
     date: Date
// orderSchema.find().populate("userid").populate("productId").select({userId.name:1,productId.name:1})

},{timestamps:true}
)


module.exports = mongoose.model('neworder', orderSchema)