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
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../models/user.model");
exports.userRoutes = express_1.default.Router();
exports.userRoutes.post("/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const user = new user_model_1.User(payload);
        const data = yield user.save();
        res.status(201).send({
            message: "user create successfully",
            success: true,
            data,
        });
    }
    catch (error) {
        res.status(400).send({
            message: "user creation failed",
            success: false,
            error: {
                name: error.name,
                errors: error.errors,
            },
        });
    }
}));
