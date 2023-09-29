const mongoose = require("mongoose");

const handleMongooseError = require("../../Helpers/handleMongooseError");

const emailValidate = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    email: {
      type: String,
      match: emailValidate,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleMongooseError);

const User = mongoose.model("user", userSchema);

module.exports = { User };
