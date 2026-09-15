const mongoose=require("mongoose");


const connectDB=async()=>{
    try {
        mongoose.connection.on("connected",()=>{
            console.log("db connected")
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/Hotel-Booking`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports=connectDB;