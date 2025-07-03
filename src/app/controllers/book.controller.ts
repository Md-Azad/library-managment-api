import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();

bookRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const { genre, sortBy, sort, limit } = req.query;
    const searchObject: any = {};
    if (genre) {
      searchObject["genre"] = genre;
    }

    const sortObject: any = {};
    if (sortBy) {
      sortObject[sortBy as string] = sort === "asc" ? 1 : -1;
    }

    let searchLimit: number = 10;
    if (limit) {
      searchLimit = Number(limit);
    }

    const data = await Book.find(searchObject)
      .sort(sortObject)
      .limit(searchLimit);

    res.status(200).send({
      success: true,
      message: "book fetched successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).send({
      message: "book fetcheing failed",
      success: false,
      error: {
        message: error.message,
        name: error.name,
        errors: error.errors,
      },
    });
  }
});

bookRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const data = await Book.create(payload);
    res
      .status(201)
      .send({ success: true, message: "book created successfully", data });
  } catch (error: any) {
    res.status(400).send({
      message: "book creation failed",
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
});

bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params?.bookId;
    const data = await Book.findById(bookId);
    if (!data) {
      res.status(200).send({
        success: false,
        message: "book did not found",
        data,
      });
    }

    res.status(200).send({
      success: true,
      message: "book found successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).send({
      message: "something went wrong during finding a book",
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
});

bookRoutes.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params?.bookId;
    if (req.body.copies > 0) {
      req.body["avilable"] = true;
    }

    const data = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
    res.status(200).send({
      success: true,
      message: "book updated successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).send({
      message: "book did not found",
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
});
bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params?.bookId;

    const data = await Book.findByIdAndDelete(bookId);

    res.status(200).send({
      success: true,
      message: "book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(400).send({
      message: "book did not found",
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
});
