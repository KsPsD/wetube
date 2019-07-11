import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    fileUrl:{
        type:String,
        required:"File URL is required"

    },
    title:{
        type:String,
        required:"Title is required"

    },
    description:String,
    views:{
        type:Number,
        default:0

    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    // comments:[{type:mongoose.Schema.Types.ObjectId,
    //     ref:"Video"//이렇게 비디오에서 커멘트 id를 리스트로 받거나
    // }]

})

const model = mongoose.model("Video",VideoSchema);
export default model;