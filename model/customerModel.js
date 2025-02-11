const mongoose = require ("mongoose")
const userModel = require ("./userModel")
const customerSchema = new mongoose.Schema ({
    image : {type : String} ,
    address : {type : String},
    city : {type : String} ,
    cin : {type : Number} ,
    order : {
      type : mongoose.Types.ObjectId,
      ref:"order"
    }
})

userModel.discriminator("customer",customerSchema)
module.exports = mongoose.model("customer")