import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true, "username must be unique"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true, "email must be unique"],
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
         required:[true,"password is required"],
         minlength:6,
         select:false
    },
    verified:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const userModel = mongoose.model("users", userSchema)

export default userModel