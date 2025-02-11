const mongoose = require ("mongoose")
const commandeSchema = new mongoose.Schema({
    date : {type : String},
    etat : {type: String },
    lieuLivraison : {type: String},
    typeLivraison : {type : String},
    deliveryPrice: {type : Number},
    facture : {
        type : mongoose.Types.ObjectId,
        ref: "facture"
    },
    order : {
        type : mongoose.Types.ObjectId,
        ref:"order"
    },
  

})
module.exports = mongoose.model("commande",commandeSchema)