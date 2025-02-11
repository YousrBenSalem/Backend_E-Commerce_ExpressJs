const { response } = require("express")
const commandeModel =require ("../model/commandeModel")
const orderModel = require("../model/orderModel")
module.exports = {



    createCommande: async (req, res) => {
        try {
            const commande = await commandeModel(req.body)
            await commande.save()
            res.status(200).json({
                success: true,
                message: "data created",
                data: commande
    
            })
            await orderModel.findByIdAndUpdate(req.body.order,{$push:{commande:commande}})
        }
        catch {
            res.status(400).json({
                success: false,
                message: "failed to create",
                data: null
            })
        }
    },


    getAllcommandes: async (req, res) => {
        try {
            const commande = await commandeModel.find()
            res.status(200).json({
                success: true,
                message: "commande found", 
                data: commande
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


    getCommandeById: async (req, res) => {
        try {
            const commandeId = req.params.id
            const commande = await commandeModel.findById(commandeId)
            res.status(200).json({
                success: true,
                message: "commande found",
                data: commande
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "commande not found",
                data: null
            })
        }
    },




    deleteCommande: async (req, res) => {
        try {
            const deleteCommande = req.params.id
            const commande = await commandeModel.findByIdAndDelete(deleteCommande)
            res.status(200).json({
                success: true,
                message: "commande deleted",
                data: commande
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "commande not deleted",
                data: null
            })
        }
    },


    updateCommande: async (req, res) => {
        try {
            const updateCommandeId = req.params.id
            const commande = await commandeModel.findByIdAndUpdate(updateCommandeId,req.body,{new:true})
            res.status(200).json({
                success: true,
                message: "commande updated",
                data:commande
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