import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required!"],
      minLength: [3, "Min. 3 characters are required!"],
      maxLength: [20, "Max. 20 characters are allowed!"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: [true, "User already registered!"],
      required: [true, "Email is required!"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minLength: [6, "Min. 3 characters are required!"],
      select: false,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema);

export default User;
