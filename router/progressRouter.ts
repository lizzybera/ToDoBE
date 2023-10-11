import express from "express";
import { createProgress, deleteprogress, viewUserprogress, viewprogresss } from "../controller/progressController";

const router = express.Router()

router.route("/:userID/progress").post(createProgress)

router.route("/:userID/one-progress").get(viewUserprogress)
router.route("/all-progress").get(viewprogresss)


router.route("/:userID/:progressID/delete-progress").delete(deleteprogress)

export default router
