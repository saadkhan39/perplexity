import express from "express"
import { registerValidator ,loginValidator } from "../validators/auth.validators.js"
import { register ,verifyEmail ,login ,getMe} from "../controllers/auth.controller.js"
import { authUser } from "../middleware/auth.middleware.js"

const authRouter = express.Router()

// POST /api/auth/register
authRouter.post("/register",registerValidator,register)

// POST /api/auth/login
authRouter.post("/login",loginValidator, login)

// GET /api/auth/get-me
authRouter.get("/get-me",authUser,getMe)

// GET /api/auth/verify-email
authRouter.get("/verify-email",verifyEmail)




export default authRouter
