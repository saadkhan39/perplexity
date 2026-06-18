import express from "express"
import { registerValidator } from "../validators/auth.validators.js"
import { register ,verifyEmail} from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/register",registerValidator,register)

authRouter.get("/verify-email",verifyEmail)



export default authRouter
