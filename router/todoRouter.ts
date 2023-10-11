import express from "express";
import { createToDo, deleteTodo, viewTodos, viewUserTodo } from "../controller/toDoController";

const router = express.Router()

router.route("/:userID/todo").post(createToDo)

router.route("/:userID/one-todo").get(viewUserTodo)
router.route("/all-todo").get(viewTodos)


router.route("/:userID/:todoID/delete").delete(deleteTodo)

export default router
