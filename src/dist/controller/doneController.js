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
exports.deletedone = exports.viewUserdone = exports.viewDones = exports.createDone = void 0;
const authModel_1 = __importDefault(require("../model/authModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const doneModel_1 = __importDefault(require("../model/doneModel"));
const createDone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { doneTask } = req.body;
        const user = yield authModel_1.default.findById(userID);
        if (user) {
            const done = yield doneModel_1.default.create({ doneTask, userID });
            user === null || user === void 0 ? void 0 : user.done.push(new mongoose_1.default.Types.ObjectId(done._id));
            user === null || user === void 0 ? void 0 : user.save();
            return res.status(201).json({
                message: "done created",
                data: done
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
            message: "Error creating done",
            data: error
        });
    }
});
exports.createDone = createDone;
const viewDones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const done = yield doneModel_1.default.find();
        return res.status(200).json({
            message: "dones Found",
            data: done
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Finding dones",
            data: error
        });
    }
});
exports.viewDones = viewDones;
const viewUserdone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield authModel_1.default.findById(userID).populate({
            path: "done",
            options: {
                sort: {
                    createdAt: -1
                }
            }
        });
        return res.status(200).json({
            message: "User dones Found",
            data: user === null || user === void 0 ? void 0 : user.done
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Finding user dones",
            data: error
        });
    }
});
exports.viewUserdone = viewUserdone;
const deletedone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, doneID } = req.params;
        const user = yield authModel_1.default.findById(userID);
        if (user) {
            const doneUser = yield doneModel_1.default.findById(doneID);
            if ((doneUser === null || doneUser === void 0 ? void 0 : doneUser.userID) === userID) {
                const done = yield doneModel_1.default.findByIdAndDelete(doneID);
                return res.status(201).json({
                    message: "done deleted",
                    data: done
                });
            }
            else {
                return res.status(404).json({
                    message: "Cant delete another persons doneTask"
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
            message: "Error Deleting done",
            data: error
        });
    }
});
exports.deletedone = deletedone;
