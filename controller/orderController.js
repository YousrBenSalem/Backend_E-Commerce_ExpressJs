const {response} = require ("express")
const orderModel = require ("../model/orderModel")
const productModel = require("../model/productModel")
const customerModel = require("../model/customerModel")
module.exports = {

createOrder : async (req,res) => {
    try {
        const Order = await orderModel(req.body)
        await Order.save()
        res.status(200).json({
            success:true,
            message:"order created",
            data:Order
        })
        
      //  await productModel.findByIdAndUpdate(req.body.product,{$push:{orders:Order}}) 
      const productsId = req.body.products 
      if (productsId && productsId.length>0){
        for (const productId of productsId){
            await productModel.findByIdAndUpdate({_id:productId},{$push:{orders:Order}})
        }
      }
     
    }
    catch {
         res.status(200).json({
            success:false,
            message:"failed to create data",
            data:null
         }) 
    }
},

getAllOrders: async (req, res) => {
    try {
        const order = await orderModel.find()
        res.status(200).json({
            success: true,
            message: "orders found",
            data: order
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "failed to find",
            data: null
        })
    }
},

getOrderById : async (req,res) => {
    try {
        const orderId =req.params.id 
    const order =await orderModel.findById(orderId)
    res.status(200).json({
        success: true,
        message: "order found",
        data: order
    })
    }
    catch {
        res.status(200).json ({
            success: false,
            message: "failed to find",
            data: null 
        })
    }
},


deleteOrder : async (req,res) => {
    try {
        const deleteOrder = req.params.id
        const order = await orderModel.findByIdAndDelete(deleteOrder)
        res.status(200).json({
            success:true,
            message:"order deleted",
            data:order
        })
    }
    catch {
        res.status(200).json ({
            success:false,
            message:"failed to delete",
            data:null
        })
    }
    
},


updateOrder: async (req, res) => {
    try {
        const updateOrderId = req.params.id
        const order = await orderModel.findByIdAndUpdate(updateOrderId,req.body,{new:true})
        res.status(200).json({
            success: true,
            message: "order updated",
            data:order
        })
    }
    catch {
        res.status(400).json({
            success:false,
            message:"update failed",
            data:null
        })
    }
},








}