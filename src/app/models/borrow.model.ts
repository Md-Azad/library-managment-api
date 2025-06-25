import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./book.model";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book Id is a mandatory field."],
    },
    quantity: {
      type: Number,
      min: [0, "Quantity can not be less then 0"],
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

borrowSchema.post("save", async function (doc) {
  try {
    await Book.findByIdAndUpdate(
      doc.book,
      { $inc: { copies: -doc.quantity } },
      { new: true }
    );
  } catch (err) {
    console.error("Failed to update book copies after borrow:", err);
  }
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
