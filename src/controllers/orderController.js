const OrderModel = require("../models/orderModel");
const UserModel = require("../models/userModel");
const ProductModel = require("../models/productModel");

const createOrder = async function(req , res){
    let data = req.body;
    let createData;
    if(req.headers.isfreeappuser == "true"){
        data.amount = 0;
        data.isFreeAppUser = true;
        createData= await OrderModel.create(data);
    }else{
        let user = await UserModel.findById(data.userId).select({balance:1 , _id:0});
        let balance = user.balance;
        
        let Product = await ProductModel.findById(data.productId).select({price:1 , _id:0});
        let price = Product.price;

        if(price <= balance){
            await UserModel.findOneAndUpdate(
                {_id : data.userId},
                {$inc:{balance : -price}}
            );

            data.amount = price;
            createData = await OrderModel.create(data);
        }else{
            res.send({Error : "Insufficient balance."});
        }
    }

    res.send({show : createData});
}

module.exports.createOrder = createOrder