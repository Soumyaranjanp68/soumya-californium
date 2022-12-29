const jwt= require("jsonwebtoken")
const userModel= require("../models/userModel")


const userValidation=async function(req,res,next){
    try{
        let data= req.params
        let user=await userModel.findById(data.userId)
        if(!user){
            return res.status(404).send({msg:"user not found"})
        }
        next()
    }catch(error){
        res.status(500).send({status:false, error:error.message})
    }
}

const tokenValidation = function (req,res,next){
    try{
    let data = req.headers["x-auth-token"]
    if(!data){
        return res.status(400).send({status:false, msg:"token not found"})
    }
    let tokenDes = jwt.verify(data,"functionup-californium")
    if(!tokenDes){
        return res.status(401).send({status:false, msg:"Invalid token Id"})
    }
    next()
}catch(error){
    res.status(500).send({msg:"Error",error:error.message})
}}


const authorise = function(req, res, next) {
    try{
    let token = req.headers["x-auth-token"];
    if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
    let decoded=jwt.verify(token , "functionup-californium")
    if(!decoded){
        return res.status(401).send({status:false, msg:"Invalid token Id"})
    }
    // comapre the logged in user's id and the id in request
    if(decoded.userId !=req.params.userId){
        return res.status(403).send({status:false, msg:"The loggedin user is not authorised"})
    }
    next()
}catch(error){
    res.status(500).send({msg:"error",error:error.message})
}}

module.exports.tokenValidation=tokenValidation
module.exports.authorise=authorise
module.exports.userValidation=userValidation