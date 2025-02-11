const providerController = require ("../controller/providerController")
const route = require ("express").Router()


route.post("/add",providerController.createProvider)
route.get("/get",providerController.getAllProviders)
route.get("/get/:id",providerController.getproviderById)
route.delete("/delete/:id",providerController.deleteProvider)
route.put("/update/:id",providerController.updateProvider)







module.exports=route