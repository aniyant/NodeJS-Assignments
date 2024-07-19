import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
});

// mongoose we some hooks -> prev , post

//

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    // what are the things are requird to hast the password
    //1- slat
    // password
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next()
});

// this is the function for the matching the password
// userSchema.method.comparePassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

const userModel = model("users", userSchema);

export default userModel;
