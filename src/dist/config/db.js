"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const URL = "mongodb://localhost:27017/todo";
const db = () => {
    mongoose_1.default.connect(URL).then(() => {
        console.log("server is connected");
    });
};
exports.default = db;
