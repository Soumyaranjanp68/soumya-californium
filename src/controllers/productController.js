const productModel=require("../models/productModel")

const createProduct=  async function (req, res){

    let data=req.body

    let createAllProduct = await productModel.create(data)
    res.send({msg:createAllProduct})
}


module.exports.createProduct=createProduct