import { Model, Types } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  avilable: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BookModelStatic extends Model<IBook> {
  updateAvilableityMethod(book: Types.ObjectId): boolean;
}
