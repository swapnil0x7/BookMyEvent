import { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";

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

UserSchema.methods = {
  generateJwtToken: function () {
    return jwt.sign(
      { id: this._id, role: this.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },
};

const User = model("User", UserSchema);

export default User;
