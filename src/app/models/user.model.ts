import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      trim: true,
      minlength: [3, "First name should be at least 3 characters"],
      required: [true, "First name is a mandatory field"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Last name is a mandatory field"],
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "email have to be unique"],
      validate: {
        validator: function (email) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
