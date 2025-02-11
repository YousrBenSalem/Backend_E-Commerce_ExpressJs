const mongoose = require ("mongoose")
const userModel = require ("../model/userModel")
const providerSchema = new mongoose.Schema({
    matricule : {type:String},
    company : {type:String},
    service : {type:String},
    products : [{
      type : mongoose.Types.ObjectId,
      ref: "product"
    }],
})
userModel.discriminator("provider",providerSchema)
module.exports = mongoose.model("provider")