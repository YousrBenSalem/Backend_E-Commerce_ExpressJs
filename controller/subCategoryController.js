const { response } = require("express")
const categoryModel = require ("../model/categoryModel")
const subCategoryModel = require ("../model/subCategoryModel")
module.exports = {

createSubCategory : async (req,res) => {
      try {
    const subCategory = await subCategoryModel (req.body)
    await subCategory.save()
    res.status(200).json ({
        success : true,
        message :"created successfully",
        data: subCategory
    })
    await categoryModel.findByIdAndUpdate(req.body.category,{$push:{subcategories:subCategory._id}})
   } 
   catch {
    res.status(400).json ({
        success: false,
        message:"creation failed",
        data:null
    })
   }
},


getAllSubCategory : async (req,res) => {
    try {
        const subCategory = await subCategoryModel.find()
        res.status(200).json({
            success:true,
            message:"subCategory found",
            data:subCategory
        })
    }
    catch {
        res.status(400).json ({
            success:false,
            message:"failed to find subCategory",
            data:null 
        })
    }
},

getSubCategoryById : async (req,res) => {
    try {
        const subCategoryId = req.params.id
        const subCategory = await subCategoryModel.findById(subCategoryId)
        
          if (!subCategory) {
        return res.status(404).json({
          success: false,
          message: "subCategory not found",
          data: null,
        });
      }
        res.status(200).json({
            success:true,
            message:"subCategory found",
            data:subCategory
        })
    }
    catch {
        res.status(400).json({
            success:false,
            message:"subCategory not found",
            data:null
        })

}
},


deleteSubCategory: async (req, res) => {
    try {
        const deleteSubCategory = req.params.id
        const category = await subCategoryModel.findByIdAndDelete(deleteSubCategory)
        res.status(200).json({
            success: true,
            message: "subcategory deleted",
            data: category
        })
    }
    catch {
        res.status(400).json({
            success: false,
            message: "subcategory not deleted",
            data: null
        })
    }
},
 
updateSubCategory : async (req,res) => {
    try {
        const updateSubCategoryById = req.params.id
        const subCategory = await subCategoryModel.findByIdAndUpdate(updateSubCategoryById,req.body,{new:true})
        res.status(200).json({
            success:true,
            message:"update successful",
            data:subCategory
        })
    
    }
    catch {
        res.status(400).json ({
            success:false,
            message:"failed to update",
            data:null
        })
    }
},





























}