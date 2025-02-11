const factureController = require ("../controller/factureController")
const route = require ("express").Router()


route.post("/add",factureController.createFacture)
route.get("/get",factureController.getAllFactures)
route.get("/get/:id",factureController.getFactureById)
route.delete("/delete/:id",factureController.deleteFacture)
route.put("/update/:id",factureController.updateFacture)


module.exports=route