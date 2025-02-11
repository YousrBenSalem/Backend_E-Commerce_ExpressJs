const commandeController = require ("../controller/commandeController")
const route = require ("express").Router()

route.post("/add",commandeController.createCommande)
route.get("/get",commandeController.getAllcommandes)
route.get("/get/:id",commandeController.getCommandeById)
route.delete("/delete/:id",commandeController.deleteCommande)
route.put("/update/:id",commandeController.updateCommande)

module.exports = route