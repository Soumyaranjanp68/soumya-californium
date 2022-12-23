const orderModel=require("../models/orderModel")

const createOrder= async function(req, res){

    let data= req.body

    let createAllOrder= await orderModel.create(data)
    res.send({msg:createAllOrder})
}



module.exports.createOrder=createOrder