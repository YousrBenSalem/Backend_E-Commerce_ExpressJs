const { Router } = require("express")
const userController = require ("../controller/userController")
const route = require ("express").Router()


route.get("/verify/:code",userController.verify);

route.post("/login",userController.login)
route.post("/forget",userController.forgetPassword)
route.post("/reset/:token",userController.resetPassword)



module.exports = route