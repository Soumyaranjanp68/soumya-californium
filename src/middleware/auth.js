const jwt= require("jsonwebtoken")


// const authenticate = function(req, req, next) {
//   let token = req.headers["x-Auth-Token"]
//   if(!token) return res.send({status:false, msg:"token must be present"})

//     let decodedToken = jwt.verify(token,  "functionup-californium")
//     if(!decodedToken) return res.send({status:false, msg:"Invalid token id"})
//     next()
// }

const tokenValidation = async function(req,res,next){
    let data = req.headers["x-auth-token"]
    if(!data){
        return res.send({status:false, msg:"token not found"})
    }
    let tokenDes = jwt.verify(data,"functionup-californium")
    next()
}


const authorise = function(req, res, next) {
    
    let token = req.headers["x-auth-token"];
    if (!token) return res.send({ status: false, msg: "token must be present" });
    let decoded=jwt.verify(token , "functionup-californium")
    if(!decoded){
        return res.send({status:false, msg:"Invalid token Id"})
    }
    // comapre the logged in user's id and the id in request
    if(decoded.userId !=req.params.userId){
        console.log(decoded)
        return res.send({status:false, msg:"The loggedin user is not authorised"})
    }
    next()
}

module.exports.tokenValidation=tokenValidation
module.exports.authorise=authorise