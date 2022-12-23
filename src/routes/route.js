const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const commonMW = require ("../middlewares/commonMiddlewares")
const orderController=require("../controllers/orderController")
const productController=require("../controllers/productController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBook", commonMW.abc, BookController.createBook  )
router.post("/createUser", commonMW.mid1, UserController.createUser)
router.post("/createOrder",orderController.createOrder)
router.post("/createProduct",productController.createProduct)
module.exports = router;