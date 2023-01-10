const orderModel = require('../models/order')
const ItemModel = require('../models/item')




const orderCreate = async function (req, res) {
    try {
        const data = req.body

        const createOrder = await orderModel.create(data)

        res.status(201).send({ status: "GENERATED", msg: createOrder })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}



const orderUpdate = async function (req, res) {
    try {
        const data = req.body
        const orderId = req.params.orderId;
        const updateOrder = await ItemModel.findOneAndUpdate({ _id: orderId, deleted: false }, {
            $set: {
                productName: data.productName, quantity: data.quantity,
                stockPrice: data.stockPrice, sellPrice: data.sellPrice, updatedAt: Date.now()
            }
        }, { new: true })

        res.status(200).send({ status: "COMPLETED", msg: updateOrder })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}




const getOrder = async function (req, res) {
    try {
        const orderId = req.params.orderId

        const orderDetails = await orderModel.find({ _id: orderId, deleted: false }).populate("orderLineItemsId")

        res.status(200).send({ status: true, msg: orderDetails })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}


const deleteOrder = async function (req, res) {
    try {
        const orderId = req.params.orderId

        const del = await orderModel.findOneAndUpdate({ _id: orderId, deleted: false }, { $set: { deleted: true } })

        res.status(200).send({ status: "CANCELLED", msg: "deleted Successfully" })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}



module.exports = { orderCreate, orderUpdate, deleteOrder, getOrder }