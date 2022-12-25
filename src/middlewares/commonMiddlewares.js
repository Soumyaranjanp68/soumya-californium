const userModel=require("../models/userModel")
const productModel=require("../models/productModel")

const isFreeAppUserValidation=function(req, res, next){
    let header = req.headers;
    
    if(header.isfreeappuser){
        req.isFreeAppUser=header.isfreeappuser


    next()
}else{
    res.send({msg:"please give app user a header"})
}
}
 

const userValidation=async function(req,res,next){
    const data=await userModel.findById(req.body.userId)
    if(data) next()
    else
     return res.send({msg:"first create user"})
}

const productValidation=async function(req,res,next){
    const data=await productModel.findById(req.body.productId)
    if(data)
    next()
    else
     return res.send({msg:"with this id product is not available in database"})
}



module.exports.isFreeAppUserValidation=isFreeAppUserValidation
module.exports.userValidation=userValidation
module.exports.productValidation=productValidation
