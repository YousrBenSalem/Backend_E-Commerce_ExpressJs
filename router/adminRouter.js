const adminController = require ("../controller/adminController")
const route = require ("express").Router()


route.post("/add",adminController.createAdmin)
route.get("/get",adminController.getAllAdmins)
route.get("/get/:id",adminController.getAdminById)
route.delete("/delete/:id",adminController.deleteAdmin)
route.put("/update/:id",adminController.updateAdmin)





module.exports = route