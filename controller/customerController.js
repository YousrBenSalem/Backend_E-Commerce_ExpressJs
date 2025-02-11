const { response } = require("express")
const customerModel = require ("../model/customerModel")
const orderModel = require("../model/orderModel")
const mongoose = require("mongoose");

module.exports = {
    createCustomer: async (req, res) => {
        try {
    const { email, order } = req.body;
    const existingCustomer = await customerModel.findOne({ email });

    if (existingCustomer) {
        return res.status(400).json({
            success: false,
            message: "Customer already exists with this email",
            data: null
        });
    }

    if (req.file) {
        req.body.image = req.file.filename;
    }

    const customer = new customerModel(req.body);
    await customer.save();

    if (order && order.length > 0) {
        for (const orderId of order) {
            if (typeof orderId !== "string" || !mongoose.Types.ObjectId.isValid(orderId)) {
                console.error(`Invalid ObjectId: ${orderId}`);
                continue;
            }
            await orderModel.findByIdAndUpdate(orderId, { $push: { customer: customer._id } });
        }
    }

    return res.status(200).json({
        success: true,
        message: "Customer created",
        data: customer
    });

} catch (error) {
    console.error("Error creating customer:", error);
    return res.status(500).json({
        success: false,
        message: "Failed to create customer",
        data: null
    });
}

    },

    getAllCustomers: async (req, res) => {
        try {
            const customer = await customerModel.find()
            res.status(200).json({
                success: true,
                message: "customer found",
                data: customer
            })
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "failed to find" + err,
                data: null
            })
        }
    },
    getCustomerById: async (req, res) => {
        try {
            const customerId = req.params.id
            const customer = await customerModel.findById(customerId)
            res.status(200).json({
                success: true,
                message: "customer found",
                data: customer
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "customer not found",
                data: null
            })
        }
    },

    deleteCustomer: async (req, res) => {
        try {
            const deleteCustomer = req.params.id
            const customer = await customerModel.findByIdAndDelete(deleteCustomer)
            res.status(200).json({
                success: true,
                message: "customer deleted",
                data: customer
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "customer not deleted",
                data: null
            })
        }
    },

    updateCustomer: async (req, res) => {
        try {
            req.body.image=req.file.filename
            const updateCustomerId = req.params.id
            const customer = await customerModel.findByIdAndUpdate(updateCustomerId,req.body,{new:true})
            res.status(200).json({
                success: true,
                message: "customer updated",
                data:customer
            })
           
        }
        catch {
            res.status(400).json({
                success:false,
                message:"update failed",
                data:null
            })
        }
}



}