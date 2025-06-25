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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("./book.model");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
    versionKey: false,
});
borrowSchema.post("save", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield book_model_1.Book.findByIdAndUpdate(doc.book, { $inc: { copies: -doc.quantity } }, { new: true });
        }
        catch (err) {
            console.error("Failed to update book copies after borrow:", err);
        }
    });
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
