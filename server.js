const express = require ("express") 
const env = require ("dotenv").config()
const port = 3000 
const app = express ()
const connectDB = require ("./database")
const cors = require("cors");
app.use(cors()); 

connectDB ()
app.use(express.json())

//
const adminRouter = require ("./router/adminRouter")
app.use("/admin",adminRouter)

const providerRouter = require ("./router/providerRouter")
app.use("/provider",providerRouter)

const orderRouter = require ("./router/orderRouter")
app.use("/order",orderRouter)

const productRouter = require ("./router/productRouter")
app.use("/product",productRouter)

const subCategoryRouter = require ("./router/subCategoryRouter")
app.use("/subCategory",subCategoryRouter)


const categoryRouter = require ("./router/categoryRouter")
app.use("/category",categoryRouter)

const factureRouter = require ("./router/factureRouter")
app.use("/facture",factureRouter)

const commandeRouter = require ("./router/commandeRouter")
app.use("/commande",commandeRouter) 

const customerRouter = require ("./router/customerRouter")
app.use("/customer",customerRouter)

const userRouter = require ("./router/userRouter")
app.use("/user",userRouter)


app.get('/storage/:img',(req,res)=>{
    res.sendFile(__dirname+"/storage/"+req.params.img)
})


app.listen(port,function(){
    console.log(`the server is running with ${process.env.PORT} open at http://localhost:${process.env.PORT}`)
})