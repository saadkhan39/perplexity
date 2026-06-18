import mongoose from "mongoose"
import "dotenv/config"

async function connectToDb() {
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("connected to DB");
        
    })
}

export default connectToDb