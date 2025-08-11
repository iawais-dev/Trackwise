import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"UserModel"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    progress:{
        type:Number,
    },
    status:{
        type:String,
        default:"Not Started"
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    resources:[{
        title:String,
        link:String,
        tag:String,
        notes:String
    }]
})  

export const SkillModel = mongoose.model("SkillModel",skillSchema)