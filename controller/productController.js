const {response} = require ("express")
const productModel = require ("../model/productModel")
const providerModel = require("../model/providerModel")
const subCategoryModel = require("../model/subCategoryModel")
const mongoose = require("mongoose");

module.exports = {

createProduct: async (req, res) => {
    try {
        const { provider } = req.body;

        req.body["gallery"] = req.files.length <= 0 
            ? [] 
            : req.files.map((file) => ({ image: file.filename }));

        const product = new productModel(req.body);
        await product.save();

        // Stocke toutes les promesses dans un tableau

        // Mettre à jour la sous-catégorie
            await subCategoryModel.findByIdAndUpdate({_id:req.body.subCategory}, { $push: { products: product._id } })
            await  providerModel.findByIdAndUpdate( { _id: req.body.provider }, { $push: { products: product._id } })
            
        // Attendre que toutes les mises à jour soient terminées

        // Maintenant, on peut envoyer la réponse
        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: product
        });

    } catch (error) {
        console.error("Error creating product:", error);
        res.status(400).json({
            success: false,
            message: "Failed to create product",
            data: null
        });
    }
},


getAllProducts : async (req,res) => {
    try {
        const products = await productModel.find()
        res.status(200).json ({
            success:true,
            message:"products found",
            data:products 
        })
    }
    catch {
        res.status(400).json ({
            success:false,
            message:"failed to find products",
            data:null
        })
    }
},



getProductById : async (req,res) => {
    try {
        const productId = req.params.id
        const product = await productModel.findById(productId)
          if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
          data: null,
        });
      }
        res.status(200).json ({
            success:true,
            message:"product found",
            data:product
        })
    }
    catch (error) {
      console.error("Erreur lors de la recherche de le produit :", error);
        res.status(500).json({
            success:false,
            message:"failed to find",
            data:null
        })
    }
},


deleteProduct : async (req,res) => {
    try {
        const deleteProduct =req.params.id
        const product = await productModel.findByIdAndDelete(deleteProduct)
        res.status(200).json ({
            success:true,
            message:"product deleted",
            data:product
        })
    }
    catch {
        res.status(400).json ({
            success:false,
            message:"failed to delete",
            data:null
        })
    }
},

updateProduct: async (req, res) => {
    try {
        const productId = req.params.id;

        // Récupérer le produit existant
        const existingProduct = await productModel.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: null
            });
        }

        // Vérifier si des fichiers ont été envoyés
        if (req.files.length > 0) {
            // Ajouter les nouvelles images à la galerie existante
            req.body["gallery"] = [
                ...existingProduct.gallery, // Conserver les anciennes images
                ...req.files.map((file) => ({ image: file.filename })) // Ajouter les nouvelles
            ];
        } else {
            // Ne pas modifier la galerie si aucune nouvelle image n'est envoyée
            req.body["gallery"] = existingProduct.gallery;
        }

        const updatedProduct = await productModel.findByIdAndUpdate(productId, req.body, { new: true });

        res.status(200).json({
            success: true,
            message: "Update successful",
            data: updatedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Failed to update",
            data: null
        });
    }
}









































}