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
exports.deleteTodo = exports.viewUserTodo = exports.viewTodos = exports.createToDo = void 0;
const authModel_1 = __importDefault(require("../model/authModel"));
const toDoModel_1 = __importDefault(require("../model/toDoModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { task } = req.body;
        const user = yield authModel_1.default.findById(userID);
        if (user) {
            const todo = yield toDoModel_1.default.create({ task, userID });
            user === null || user === void 0 ? void 0 : user.todo.push(new mongoose_1.default.Types.ObjectId(todo._id));
            user === null || user === void 0 ? void 0 : user.save();
            return res.status(201).json({
                message: "todo created",
                data: todo
            });
        }
        else {
            return res.status(404).json({
                message: "User Cannot be Found"
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating Todo",
            data: error
        });
    }
});
exports.createToDo = createToDo;
const viewTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield toDoModel_1.default.find();
        return res.status(200).json({
            message: "todos Found",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Finding todos",
            data: error
        });
    }
});
exports.viewTodos = viewTodos;
const viewUserTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield authModel_1.default.findById(userID).populate({
            path: "todo",
            options: {
                sort: {
                    createdAt: -1
                }
            }
        });
        return res.status(200).json({
            message: "User todos Found",
            data: user === null || user === void 0 ? void 0 : user.todo
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Finding user todos",
            data: error
        });
    }
});
exports.viewUserTodo = viewUserTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, todoID } = req.params;
        const user = yield authModel_1.default.findById(userID);
        if (user) {
            const todoUser = yield toDoModel_1.default.findById(todoID);
            if ((todoUser === null || todoUser === void 0 ? void 0 : todoUser.userID) == userID) {
                const todo = yield toDoModel_1.default.findByIdAndDelete(todoID);
                return res.status(201).json({
                    message: "todo deleted",
                    data: todo
                });
            }
            else {
                return res.status(404).json({
                    message: "Cant delete another persons task"
                });
            }
        }
        else {
            return res.status(404).json({
                message: "Error finding user"
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Deleting todo",
            data: error
        });
    }
});
exports.deleteTodo = deleteTodo;
