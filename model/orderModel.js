const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({
    quantity: { type: Number },
    price: { type: Number },
    commande : {
        type : mongoose.Types.ObjectId,
        ref : "commande"
    },
    customers : [{
        type : mongoose.Types.ObjectId,
        ref:"customer"
    }],
    products : [{
        type : mongoose.Types.ObjectId,
        ref: "product"
    }],
    
})
module.exports=mongoose.model("order",orderSchema)
