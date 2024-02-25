const mongoose =require("mongoose")
const MONGODB_URL = process.env


exports.connect = ()=>{
    mongoose.connect(MONGODB_URL,{
        userNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then()
    .catch((e)=>{
        console.log("Database connection failed")
        console.log(e)
        process.exit(1)
    })
}