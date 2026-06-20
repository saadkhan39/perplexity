import "dotenv/config";
import { testAi } from "./src/service/ai.service.js";
import app from "./src/app.js";
import connectToDb from "./src/config/database.js";

connectToDb()
testAi()

app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})
