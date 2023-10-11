"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./router/authRouter"));
const todoRouter_1 = __importDefault(require("./router/todoRouter"));
const doneRouter_1 = __importDefault(require("./router/doneRouter"));
const progressRouter_1 = __importDefault(require("./router/progressRouter"));
const mainApp = (app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)(
    //     {
    // origin : "*",
    // }
    ));
    app.use("/api", authRouter_1.default);
    app.use("/api", todoRouter_1.default);
    app.use("/api", doneRouter_1.default);
    app.use("/api", progressRouter_1.default);
    app.get("/", (req, res) => {
        try {
            return res.status(200).json({
                message: 'welcome'
            });
        }
        catch (error) {
            return res.status(404).json({
                message: 'Error'
            });
        }
    });
};
exports.mainApp = mainApp;
