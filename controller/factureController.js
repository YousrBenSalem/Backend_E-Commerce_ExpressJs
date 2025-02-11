const {response} = require("express")
const factureModel = require ("../model/factureModel")
const commandeModel = require("../model/commandeModel")
module.exports = {



    createFacture : async (req, res) => {
        try {
            const facture = await factureModel(req.body)
            await facture.save()
            res.status(200).json({
                success: true,
                message: "data created",
                data: facture
    
            })
            await commandeModel.findByIdAndUpdate(req.body.commande,{$push:{facture:facture}})
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "failed to create"+err,
                data: null
            })
        }
    },




    getAllFactures: async (req, res) => {
        try {
            const factures = await factureModel.find()
            res.status(200).json({
                success: true,
                message: "factures found", 
                data: factures
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




    getFactureById : async (req,res)=> {
        try {
            const factureId =req.params.id 
            const facture = await factureModel.findById(factureId)
            res.status(200).json({
                success: true,
                message: "facture found",
                data: facture
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "facture not found",
                data: null
            })
        }
    },


    deleteFacture: async (req, res) => {
        try {
            const deleteFacture = req.params.id
            const facture = await factureModel.findByIdAndDelete(deleteFacture)
            res.status(200).json({
                success: true,
                message: "facture deleted",
                data: facture
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "facture not deleted",
                data: null
            })
        }
    },


    updateFacture: async (req, res) => {
        try {
            const updateFactureId = req.params.id
            const facture = await factureModel.findByIdAndUpdate(updateFactureId,req.body,{new:true})
            res.status(200).json({
                success: true,
                message: "facture updated",
                data:facture
            })
        }
        catch (err) {
            res.status(400).json({
                success:false,
                message:"update failed"+err,
                data:null
            })
        }
}







}