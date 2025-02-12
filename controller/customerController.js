const { response } = require("express")
const customerModel = require ("../model/customerModel")
const orderModel = require("../model/orderModel");
const {randomBytes} = require("crypto");
const code = randomBytes(6).toString("hex");
const nodemailer = require("nodemailer");
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

    const customer = await customerModel({...req.body , code :code});
    const savedCustomer = await customer.save();

    if (order && order.length > 0) {
        for (const orderId of order) {
            if (typeof orderId !== "string" || !mongoose.Types.ObjectId.isValid(orderId)) {
                console.error(`Invalid ObjectId: ${orderId}`);
                continue;
            }
            await orderModel.findByIdAndUpdate(orderId, { $push: { customer: savedCustomer._id } });
        }
    }

     res.status(200).json({
        success: true,
        message: "Customer created",
        data: savedCustomer
    });
      const transport = nodemailer.createTransport({
        host :"sandbox.smtp.mailtrap.io",
            port : 2525,
            secure : false ,
            auth : {
                user : '5eb65c03cb943e',
                pass : '0d8fa1526d3e9d'
    
            }
      });
            transport.sendMail({
                from: "admin@gmail.com",
                to: savedCustomer.email,
                subject: "hello" +""+savedCustomer.fullname,
                text: "mail de confirmation",
                html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <h1>verify account</h1>
                    <a href ="http://localhost:3000/user/verify/${savedCustomer.code}"> click here </a>
                  
                </body>
                </html>`
            })
    

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
          const updateCustomerId = req.params.id;
        
        // Récupérer le client existant pour conserver l'image si aucune nouvelle n'est envoyée
        const existingCustomer = await customerModel.findById(updateCustomerId);
        if (!existingCustomer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
                data: null
            });
        }
           // Ne met à jour l'image que si une nouvelle image est envoyée
        if (req.file) {
            req.body.image = req.file.filename;
        } else {
            req.body.image = existingCustomer.image; // Conserver l'ancienne image
        }
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