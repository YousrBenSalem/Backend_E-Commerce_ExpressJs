const mongoose = require ("mongoose") 
const url = "mongodb://localhost:27017/e-commerce"
const connect = () => {
    try {
mongoose.connect(url)
console.log ("connect with success")
    }
    catch {
console.log("connection failed")
    }
} 
module.exports = connect 