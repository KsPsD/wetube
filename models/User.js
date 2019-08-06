import mongoose from "mongoose";
import passportLocalMoongse from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatarUrl: String,
  googleId: Number,
  githubId: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment" //
    }
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video" //
    }
  ]
});

UserSchema.plugin(passportLocalMoongse, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
