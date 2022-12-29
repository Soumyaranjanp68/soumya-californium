const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const userValidation = async function (req, res, next) {
  try {
    let userId = req.params.userId;
    let userDetails = await UserModel.findById(userId);

    if (userDetails) {
      next();
    } else {
      return res.status(404).send({ msg: "Error", Error: "No such user exists with this ID." });
    }
  } catch (err) {
    res.status(500).send({ msg: "Error", Error: err.message });
  }
}

const tokenAuthentication = function (req, res, next) {
  try {
    let token = req.headers["x-auth-token"];
    if (!token) {
      return res.status(400).send({ status: false, msg: "the header token is required." });
    }

    let decoded = jwt.verify(token, "functionup-californium-secret-key");

    next();
  } catch (err) {
    res.status(500).send({ msg: "Error", Error: err.message });
  }
}

const tokenAuthorization = function (req, res, next) {
  try{
  let token = req.headers["x-auth-token"];
    if (!token) {
      return res.status(400).send({ status: false, msg: "the header token is required." });
    }

    let decoded = jwt.verify(token, "functionup-californium-secret-key");
    
    if (decoded.userId != req.params.userId) {
      return res.status(403).send({ status: false, msg: "The loggdin user is not authorized." });
    }
    next();
  }catch(err){
    res.status(500).send({ msg: "Error", Error: err.message });
  }
}

module.exports.userValidation = userValidation;
module.exports.tokenAuthentication = tokenAuthentication;
module.exports.tokenAuthorization = tokenAuthorization;