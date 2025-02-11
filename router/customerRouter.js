const customerController = require("../controller/customerController")
const userController = require ("../controller/customerController")
const route = require ("express").Router()

const upload = require ("../middleWare/upload")

route.post("/add",upload.single("image"),customerController.createCustomer)
route.get("/get",customerController.getAllCustomers)
route.get("/get/:id",customerController.getCustomerById)
route.put("/update/:id", upload.single("image"), customerController.updateCustomer);

route.delete("/delete/:id",customerController.deleteCustomer)
module.exports = route
