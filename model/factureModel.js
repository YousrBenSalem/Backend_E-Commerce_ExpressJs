const mongoose = require ("mongoose")
const factureSchema = new mongoose.Schema({
    reference: {type:Number},
    remise:{type:Number},
    description:{type:String},
    commande : {
        type: mongoose.Types.ObjectId,
        ref:"commande"
    }
})
module.exports = mongoose.model("facture",factureSchema)