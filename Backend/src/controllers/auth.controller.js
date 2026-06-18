import userModel from "../models/user.model.js"
import bcrypt from 'bcryptjs';
import { sendEmail } from "../service/mail.service.js"

//register controller
export async function register(req,res) {
    
    const {username ,email ,password} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"user with this email or username already exists",
            success:false,
            err:"user already exists"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash
    })

     await sendEmail({
        to: email,
        subject: "Welcome to Perplexity!",
        html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Best regards,<br>The Perplexity Team</p>
        `
    })

    res.status(201).json({
        message:"user registered successfully",
        success:true,
        user:{
           id:user._id,
           username:user.username,
           email:user.email
        }
    })
}