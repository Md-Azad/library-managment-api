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
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false,
    timestamps: true,
});
bookSchema.static("updateAvilableityMethod", function updateAvilableityMethod(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const updated = yield exports.Book.findById(id);
        if (updated && updated.copies === 0) {
            return false;
        }
        else {
            return true;
        }
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
