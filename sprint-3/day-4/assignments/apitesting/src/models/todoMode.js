import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  title: { type: String, required: true },
  status: { type: Boolean, enum: ["true", "false"], default: "false" },
  desc: { type: String },
  createTime: { type: Date },
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
});

const todoModel = model("newtodos", todoSchema);

export default todoModel;
