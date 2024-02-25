const mongoose = require("mongoose");
const { MONGODB_URL } = process.env;

exports.connect = async () => {
    try {
        console.log(typeof MONGODB_URL);
        await mongoose.connect(MONGODB_URL, {  
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};
