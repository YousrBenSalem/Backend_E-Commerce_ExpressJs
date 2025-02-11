const orderController = require ("../controller/orderController")
const route = require ("express").Router()

route.post("/add",orderController.createOrder)
route.get("/get",orderController.getAllOrders)
route.get("/get/:id",orderController.getOrderById)
route.delete("/delete/:id",orderController.deleteOrder)
route.put("/update/:id",orderController.updateOrder)


module.exports=route