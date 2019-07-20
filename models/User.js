import mongoose from "mongoose";
import passportLocalMoongse from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avartarUrl: String,
  googleId: Number,
  githubId: Number
});

UserSchema.plugin(passportLocalMoongse, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
