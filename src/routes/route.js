const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middleware=require("../middleware/auth")



router.post("/users", userController.createUser)
router.post("/login", userController.loginUser)
router.get("/users/:userId",middleware.userValidation,middleware.tokenValidation,middleware.authorise,userController.getUserData)
router.put("/users/:userId",middleware.userValidation,middleware.tokenValidation ,middleware.authorise,userController.updateUser)
router.delete("/delete/users/:userId",middleware.userValidation,middleware.tokenValidation,middleware.authorise,userController.deleteUser)

module.exports = router;