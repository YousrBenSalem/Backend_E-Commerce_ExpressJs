const mongoose = require ("mongoose")
const gallerySchema = new mongoose.Schema ({
    image : String
})

const productSchema = new mongoose.Schema({
    ref: {type : Number},
    price: {type : Number},
    description: {type : String},
    quantity: {type : Number},
    gallery : [gallerySchema],
    subCategory :{
        type: mongoose.Types.ObjectId,
        ref:"subCategory"
    },
    order : {
        type: mongoose.Types.ObjectId,
        ref : "order"
    },
    provider :{
        type: mongoose.Types.ObjectId,
        ref:"provider"
    },
  
})
module.exports = mongoose.model("product",productSchema)