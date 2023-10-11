"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const authModel = new mongoose_1.default.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    image: {
        type: String
    },
    imageID: {
        type: String
    },
    todo: {
        type: [
            {
                type: mongoose_1.default.Types.ObjectId,
                refs: "todos"
            }
        ]
    },
    progress: {
        type: [
            {
                type: mongoose_1.default.Types.ObjectId,
                refs: "progress"
            }
        ]
    },
    done: {
        type: [
            {
                type: mongoose_1.default.Types.ObjectId,
                refs: "dones"
            }
        ]
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("auths", authModel);
