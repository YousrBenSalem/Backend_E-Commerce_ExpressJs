const categoryController = require ("../controller/categoryController")
const route = require ("express").Router()
const upload = require ("../middleWare/upload")
route.post("/add",upload.single("image"),categoryController.createCategory)
route.get("/get",categoryController.getAllCategory)
route.get("/get/:id",categoryController.getCategoryById)
route.delete("/delete/:id",categoryController.deleteCategory)
route.put("/update/:id",upload.single("image"),categoryController.updateCategory)




module.exports = route 