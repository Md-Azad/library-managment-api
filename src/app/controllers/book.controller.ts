import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
export const bookRoutes = express.Router();

bookRoutes.post("/create-book", async (req: Request, res: Response) => {
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
