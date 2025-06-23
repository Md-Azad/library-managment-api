import express, { Request, Response, Router } from "express";
import { User } from "../models/user.model";

export const userRoutes = express.Router();

userRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const user = new User(payload);
    const data = await user.save();

    res.status(201).send({
      message: "user create successfully",
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(400).send({
      message: "user creation failed",
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
});
