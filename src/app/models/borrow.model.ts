import { model, Schema, Types } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book Id is a mandatory field."],
    },
    quantity: {
      type: Number,
      min: [1, "Quantity can not be less then 0"],
      required: [true, "Quantity is a mandatory field."],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is a mandatory field."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
