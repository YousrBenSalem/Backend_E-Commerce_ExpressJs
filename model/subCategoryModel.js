const mongoose = require ("mongoose")
const subCategorySchema = new mongoose.Schema ({
    name : {type : String},
    description : {type : String} ,
    category : [{
        type : mongoose.Types.ObjectId,
        ref : "category"
    }],
    products : [{
        type : mongoose.Types.ObjectId,
        ref : "product"
    }]
  
    
})
 module.exports = mongoose.model("subCategory",subCategorySchema)