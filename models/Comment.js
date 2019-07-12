import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text:{
        type:String,
        required:"Text is required"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    video:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"//커멘트에 비디오의 id를 줌
    }
})

const model = mongoose.model("Comment",CommentSchema);
export default model;