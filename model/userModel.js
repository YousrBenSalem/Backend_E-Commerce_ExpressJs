const mongoose = require ("mongoose")
const bcrypt = require ("bcrypt")
const baseOptions = {discriminatorKey : "itemType",collection: "items"}
const userSchema = new mongoose.Schema ({
    fullname : {type:String}, 
    email : {type:String},
    password : {type:String},
    phone : {type:Number},
    token : {type:String}

},baseOptions)
userSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})
module.exports=mongoose.model ("user",userSchema)