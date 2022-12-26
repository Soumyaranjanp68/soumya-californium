const userModel = require("../models/userModel");

let userValidation=function(req,res,next){
let token = req.headers["x-auth-token"];
next();
if (!token) return res.send({ status: false, msg: "token must be present" })
};



module.exports.userValidation=userValidation