import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req?.body;

    const borrowBook = await Book.findById(book);
    if (!borrowBook) {
      res.status(400).json({
        message: "Book not found",
        success: false,
        error: { name: "NotFoundError" },
      });
      return;
    }
    if (
      borrowBook?.createdAt &&
      new Date(dueDate).getTime() < borrowBook?.createdAt.getTime() &&
      new Date(dueDate).getTime() < Date.now()
    ) {
      res.status(400).send({
        message: "Previous date",
        success: false,
        borrowBook: null,
      });
      return;
    }
    if (borrowBook?.copies && quantity > borrowBook?.copies) {
      res.status(200).send({
        message: "This much book is not available",
        success: false,
        borrowBook: null,
      });
      return;
    }

    const data = await Borrow.create(req.body);
    if (data) {
      try {
        const newAmoung: Number = borrowBook.copies - quantity;
        console.log(newAmoung);
        const updatedBook = await Book.findByIdAndUpdate(
          book,
          { copies: newAmoung },
          {
            new: true,
            runValidators: true,
          }
        );
        console.log(updatedBook);
      } catch (error: any) {
        throw new Error("Something went wrong.");
      }
    }

    res.status(200).send({
      message: "book brrowed successfully",
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(400).send({
      message: "book borrowing failed",
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
});

borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const borroedBook = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      { $unwind: "$bookInfo" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.status(200).send({
      success: true,
      message: "Borrowed books summary retrieved successfully.",
      data: borroedBook,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).send({
      message: "book borrowing failed",
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
});
