const { response } = require("express")
const categoryModel = require("../model/categoryModel")
module.exports = {
    createCategory: async (req, res) => {
        try {
            req.body.image=req.file.filename
            const category = await categoryModel(req.body)
            await category.save()
            res.status(200).json({
                success: true,
                message: "data created",
                data: category

            })
        }
        catch (err){
            res.status(400).json({
                success: false,
                message: "failed to create"+err,
                data: null
            })
        }
    },

    getAllCategory: async (req, res) => {
        try {
            const category = await categoryModel.find()
            res.status(200).json({
                success: true,
                message: "category found",
                data: category
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
    getCategoryById: async (req, res) => {
        try {
            const categoryId = req.params.id
            const category = await categoryModel.findById(categoryId)
            res.status(200).json({
                success: true,
                message: "category found",
                data: category
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "category not found",
                data: null
            })
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const deleteCategory = req.params.id
            const category = await categoryModel.findByIdAndDelete(deleteCategory)
            res.status(200).json({
                success: true,
                message: "category deleted",
                data: category
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "category not deleted",
                data: null
            })
        }
    },

updateCategory: async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Vérifier si la catégorie existe
        const existingCategory = await categoryModel.findById(categoryId);
        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
                data: null
            });
        }

        // Si une nouvelle image est envoyée, mettre à jour l'image
        if (req.file) {
            req.body.image = req.file.filename;
        } else {
            // Conserver l'ancienne image
            req.body.image = existingCategory.image;
        }

        // Mise à jour de la catégorie
        const updatedCategory = await categoryModel.findByIdAndUpdate(categoryId, req.body, { new: true });

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: updatedCategory
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Update failed",
            data: null
        });
    }
}



}

