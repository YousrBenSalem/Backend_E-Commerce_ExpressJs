const { Router } = require("express")
const subCategory = require ("../controller/subCategoryController")
const subCategoryController = require("../controller/subCategoryController")
const route = require ("express").Router()

route.post("/add",subCategoryController.createSubCategory)
route.get("/get",subCategoryController.getAllSubCategory)
route.get("/get/:id",subCategoryController.getSubCategoryById)
route.delete("/delete/:id",subCategoryController.deleteSubCategory)
route.put("/update/:id",subCategoryController.updateSubCategory)
route.get("/products/:id" , subCategoryController.getProductBySubCategory)



module.exports= route