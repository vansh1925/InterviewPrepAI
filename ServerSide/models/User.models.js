import mongoose,{Schema} from "mongoose"
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String,
        default:null
    },
},{timestamps:true})

export const User= mongoose.model("User",userSchema)
    