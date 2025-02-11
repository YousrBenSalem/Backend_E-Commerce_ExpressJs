const mongoose = require ("mongoose")
const categorySchema = new mongoose.Schema({
    name: {type : String}, 
    description : {type : String},
    image : {type : String},
    subcategories : [{
        type : mongoose.Types.ObjectId,
        ref:"subCategory"
    }]
  
})
module.exports = mongoose.model("category",categorySchema)