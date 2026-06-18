import express from "express"
import { registerValidator } from "../validators/auth.validators.js"
import { register } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/register",registerValidator,register)



export default authRouter
