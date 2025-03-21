const mongoose = require ("mongoose")
const userModel = require ("./userModel")
const customerSchema = new mongoose.Schema ({
    image : {type : String} ,
    address : {type : String},
    city : {type : String} ,
    cin : {type : Number} ,
    commande :[{
      type : mongoose.Types.ObjectId,
      ref:"commande"
    }] 
})

userModel.discriminator("customer",customerSchema)
module.exports = mongoose.model("customer")