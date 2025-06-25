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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const data = yield book_model_1.Book.create(payload);
        res
            .status(201)
            .send({ success: true, message: "book created successfully", data });
    }
    catch (error) {
        res.status(400).send({
            message: "book creation failed",
            success: false,
            error: {
                name: error.name,
                errors: error.errors,
            },
        });
    }
}));
exports.bookRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { genre, sortBy, sort, limit } = req.query;
        const searchObject = {};
        if (genre) {
            searchObject["genre"] = genre;
        }
        const sortObject = {};
        if (sortBy) {
            sortObject[sortBy] = sort === "asc" ? 1 : -1;
        }
        let searchLimit = 10;
        if (limit) {
            searchLimit = Number(limit);
        }
        const data = yield book_model_1.Book.find(searchObject)
            .sort(sortObject)
            .limit(searchLimit);
        res.status(200).send({
            success: true,
            message: "book fetched successfully",
            data,
        });
    }
    catch (error) {
        res.status(400).send({
            message: "book creation failed",
            success: false,
            error: {
                name: error.name,
                errors: error.errors,
            },
        });
    }
}));
exports.bookRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const bookId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.bookId;
        const data = yield book_model_1.Book.findById(bookId);
        res.status(200).send({
            success: true,
            message: "book found successfully",
            data,
        });
    }
    catch (error) {
        res.status(400).send({
            message: "book did not found",
            success: false,
            error: {
                name: error.name,
                errors: error.errors,
            },
        });
    }
}));
exports.bookRoutes.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const bookId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.bookId;
        const data = yield book_model_1.Book.findByIdAndUpdate(bookId, req.body, { new: true });
        res.status(200).send({
            success: true,
            message: "book updated successfully",
            data,
        });
    }
    catch (error) {
        res.status(400).send({
            message: "book did not found",
            success: false,
            error: {
                name: error.name,
                errors: error.errors,
            },
        });
    }
}));
exports.bookRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const bookId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.bookId;
        const data = yield book_model_1.Book.findByIdAndDelete(bookId);
        console.log(data);
        res.status(200).send({
            success: true,
            message: "book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(400).send({
            message: "book did not found",
            success: false,
            error: {
                name: error.name,
                errors: error.errors,
            },
        });
    }
}));
