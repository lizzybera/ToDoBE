import express from "express";
import { deleteUser, register, signIn, viewUser, viewUsers } from "../controller/authController";

const router = express.Router()

router.route("/reg").post(register)
router.route("/sign").post(signIn)

router.route("/:userID/one").get(viewUser)
router.route("/all").get(viewUsers)


router.route("/:userID/delete").delete(deleteUser)

export default router
