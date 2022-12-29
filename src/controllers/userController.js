const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  try{
  let data = req.body;
  if(Object.keys(data).length !=0){
  let savedData = await userModel.create(data);
  res.status(201).send({ status:true,data: savedData });
}else{
  res.status(400).send({msg:"Bad Request"})
}}
catch(error){
  res.status(500).send({msg:"error",error:error.message})
}
  
}

const loginUser = async function (req, res) {
  try{
  let userName = req.body.emailId;
  let password = req.body.password;
  let data=req.body
  if(Object.keys(data).length !=0){

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.status(401).send({
      status: false,
      msg: "username or the password is not corerct",
    })
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "californium",
      organisation: "FUnctionUp",
    },
    "functionup-californium"
  )
  res.status(200).send({ status: true, data: token });
}else{
    res.status(400).send({msg:"Bad Request"})
}
}catch(error){
  res.status(500).send({status:false, msg:error.message})
}
}



const getUserData = async function (req, res) {
  try{
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.status(404).send({ status: false, msg: "No such user exists" });

  res.status(200).send({ status: true, data: userDetails });
}catch(error){
  res.status(500).send({status:false,msg:error.message})
}
}

const updateUser = async function (req, res) {

  try{
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.status(404).send("No such user exists");
  }

  let userData = req.body;
  if(Object.keys(userData).length !=0){
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, {$set:userData},{new:true});
  res.status(201).send({ status: updatedUser, data: updatedUser });
}else{
  res.status(400).send({msg:"Bad Request"})
}
  }catch(error){
    res.status(500).send({msg:"error",error:error.message})
  }}

const postMessage = async function (req, res) {
    let message = req.body.message
    let userToBeModified = req.params.userId
    //userId for the logged-in user
    let userLoggedIn = decodedToken.userId

    //userId comparision to check if the logged-in user is requesting for their own data
    if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})

    let user = await userModel.findById(req.params.userId)
    if(!user) return res.send({status: false, msg: 'No such user exists'})
    
    let updatedPosts = user.posts
    //add the message to user's posts
    updatedPosts.push(message)
    let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})

    //return the updated user document
    return res.send({status: true, data: updatedUser})
}

const deleteUser= async function(req, res){
  try{
  let userId=req.params.userId
  let user=await userModel.findById(userId)
  let deleteUser=await userModel.findOneAndUpdate({_id:userId},{$set:{isDeleted:true}},{new:true})
  res.status(201).send({status:true, data:deleteUser})
}catch(error){
  res.status(500).send({msg:"error",error:error.message})
}}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.postMessage = postMessage
module.exports.deleteUser=deleteUser
