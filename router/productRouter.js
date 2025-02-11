const productController = require ("../controller/productController")
/* const authentificationToken = require("../middleWare/authenticateToken") */
const route = require ("express").Router()
const upload = require ("../middleWare/upload")
route.post("/add",upload.array("image"),productController.createProduct)
route.get("/get",productController.getAllProducts)
route.get("/get/:id",productController.getProductById)
route.delete("/delete/:id",productController.deleteProduct)
route.put("/update/:id",upload.array("image"),productController.updateProduct)
module.exports=route
