const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middleWare= require("../middleWare/middleware")


router.post("/users", userController.createUser  )
router.post("/login", userController.loginUser)
router.get("/users/:userId",middleWare.userValidation, userController.getUserData)
router.put("/users/:userId",middleWare.userValidation ,userController.updateUser)
router.delete("/delete/users/:userId",middleWare.userValidation,userController.deleteUser)

module.exports = router;