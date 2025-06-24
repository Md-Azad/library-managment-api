import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/controllers/user.controller";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("library server is running");
});

export default app;
