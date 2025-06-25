"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req === null || req === void 0 ? void 0 : req.body;
        const borrowBook = yield book_model_1.Book.findById(book);
        if (!borrowBook) {
            res.status(400).json({
                message: "Book not found",
                success: false,
                error: { name: "NotFoundError" },
            });
            return;
        }
        if ((borrowBook === null || borrowBook === void 0 ? void 0 : borrowBook.createdAt) &&
            new Date(dueDate).getTime() < (borrowBook === null || borrowBook === void 0 ? void 0 : borrowBook.createdAt.getTime()) &&
            new Date(dueDate).getTime() < Date.now()) {
            res.status(400).send({
                message: "Previous date",
                success: false,
                borrowBook: null,
            });
            return;
        }
        if ((borrowBook === null || borrowBook === void 0 ? void 0 : borrowBook.copies) >= 0 && quantity > (borrowBook === null || borrowBook === void 0 ? void 0 : borrowBook.copies)) {
            res.status(200).send({
                message: "This much book is not available",
                success: false,
                borrowBook: null,
            });
            return;
        }
        const data = yield borrow_model_1.Borrow.create(req.body);
        if (data) {
            const status = yield book_model_1.Book.updateAvilableityMethod(book);
            if (!status) {
                yield book_model_1.Book.findByIdAndUpdate(book, { avilable: status }, {
                    new: true,
                });
            }
        }
        res.status(200).send({
            message: "book brrowed successfully",
            success: true,
            data,
        });
    }
    catch (error) {
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
}));
exports.borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borroedBook = yield borrow_model_1.Borrow.aggregate([
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
    }
    catch (error) {
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
}));
