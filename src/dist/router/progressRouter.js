"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const progressController_1 = require("../controller/progressController");
const router = express_1.default.Router();
router.route("/:userID/progress").post(progressController_1.createProgress);
router.route("/:userID/one-progress").get(progressController_1.viewUserprogress);
router.route("/all-progress").get(progressController_1.viewprogresss);
router.route("/:userID/:progressID/delete-progress").delete(progressController_1.deleteprogress);
exports.default = router;
