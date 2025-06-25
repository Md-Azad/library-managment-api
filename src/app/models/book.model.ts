import { model, Schema, Types } from "mongoose";
import { BookModelStatic, IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook, BookModelStatic>(
  {
    title: {
      type: String,
      required: [true, "Title must be provided"],
      minlength: [1, "Name can not be empty"],
    },
    author: {
      type: String,
      required: [true, "Author name is a mandatory field"],
    },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      uppercase: true,
    },
    isbn: {
      type: String,
      required: [true, "Isbn is a mandatory field."],
      unique: [true, "Isbn have to be unique."],
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: [true, "Copies is a mandatory field."],
      min: [0, "copies can not a negative or zero"],
    },
    avilable: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.static(
  "updateAvilableityMethod",
  async function updateAvilableityMethod(id: Types.ObjectId) {
    const updated = await Book.findById(id);

    if (updated && updated.copies === 0) {
      return false;
    } else {
      return true;
    }
  }
);

export const Book = model<IBook, BookModelStatic>("Book", bookSchema);
