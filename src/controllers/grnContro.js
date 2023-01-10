const grnModel = require('../models/grn')
const grnItem = require('../models/item')



const createGrn = async function (req, res) {
    try {
        const grnData = req.body

        const saveGrn = await grnModel.create(grnData)

        res.status(201).send({ status: "GENERATED", msg: saveGrn })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}




const updateItem = async function (req, res) {
    try {
        const data = req.body
        const grnId = req.params.grnId
        const updateItems = await grnItem.findOneAndUpdate(
            { _id: grnId, deleted: false },
            { $set: { quantity: data.quantity, productName: data.productName, sellPrice: data.sellPrice, stockPrice: data.stockPrice, updatedAt: Date.now() } },
            { new: true })

        res.status(200).send({ status: "COMPLETED", msg: updateItems })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}


const getGrn = async function (req, res) {
    try {
        const grnId = req.params.grnId

        const grnDetails = await grnModel.find({ _id: grnId, deleted: false }).populate("grnLineItemsId")

        res.status(200).send({ status: true, msg: grnDetails })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}




const deleteGrn = async function (req, res) {
    try {
        const grnId = req.params.grnId

        const del = await grnModel.findOneAndUpdate({ _id: grnId, deleted: false }, { $set: { deleted: true } })

        res.status(200).send({ status: "CANCELLED", msg: "deleted Successfully" })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports = { createGrn, updateItem, getGrn, deleteGrn }