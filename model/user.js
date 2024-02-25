const mongoose =require("mongoose")
const userShema = new mongoose.Schema({
    firstname:{
        type: String,
        default: null
    },
    lastname:{
        type: String,
        default: null
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
    },
    
    token:{
        type: String,
        default: null
    },
})

module.exports = mongoose.model("user",userShema)