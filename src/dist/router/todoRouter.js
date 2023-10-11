"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const toDoController_1 = require("../controller/toDoController");
const router = express_1.default.Router();
router.route("/:userID/todo").post(toDoController_1.createToDo);
router.route("/:userID/one-todo").get(toDoController_1.viewUserTodo);
router.route("/all-todo").get(toDoController_1.viewTodos);
router.route("/:userID/:todoID/delete").delete(toDoController_1.deleteTodo);
exports.default = router;
