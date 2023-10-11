import express from "express";
import { createDone, deletedone, viewDones, viewUserdone } from "../controller/doneController";

const router = express.Router()

router.route("/:userID/done").post(createDone)

router.route("/:userID/one-done").get(viewUserdone)
router.route("/all-done").get(viewDones)


router.route("/:userID/:doneID/delete-done").delete(deletedone)

export default router
