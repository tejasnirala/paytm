import { Schema, model } from "mongoose";

const accountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  }
})

export const Account = model("Account", accountSchema);
