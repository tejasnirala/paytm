import { connect, Schema, model } from "mongoose";

connect("mongodb://localhost:27017/paytm-project");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6
  },
  firstName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: false,
    maxLength: 30
  }
})

export const User = model("User", userSchema);
