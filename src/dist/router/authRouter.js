"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const router = express_1.default.Router();
router.route("/reg").post(authController_1.register);
router.route("/sign").post(authController_1.signIn);
router.route("/:userID/one").get(authController_1.viewUser);
router.route("/all").get(authController_1.viewUsers);
router.route("/:userID/delete").delete(authController_1.deleteUser);
exports.default = router;
