"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doneController_1 = require("../controller/doneController");
const router = express_1.default.Router();
router.route("/:userID/done").post(doneController_1.createDone);
router.route("/:userID/one-done").get(doneController_1.viewUserdone);
router.route("/all-done").get(doneController_1.viewDones);
router.route("/:userID/:doneID/delete-done").delete(doneController_1.deletedone);
exports.default = router;
