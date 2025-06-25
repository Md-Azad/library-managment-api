"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        trim: true,
        minlength: [3, "First name should be at least 3 characters"],
        required: [true, "First name is a mandatory field"],
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Last name is a mandatory field"],
    },
    email: {
        type: String,
        trim: true,
        unique: [true, "email have to be unique"],
        validate: {
            validator: function (email) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    password: {
        type: String,
        minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
        type: String,
        default: "user",
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
