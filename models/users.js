import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    userId: { type: String, required: true },
    isVerified: { type: Boolean },
    secretNumber: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", UserSchema);
