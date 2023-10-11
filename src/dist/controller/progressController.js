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
exports.deleteprogress = exports.viewUserprogress = exports.viewprogresss = exports.createProgress = void 0;
const authModel_1 = __importDefault(require("../model/authModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const progressModel_1 = __importDefault(require("../model/progressModel"));
const createProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { progressTask } = req.body;
        const user = yield authModel_1.default.findById(userID);
        if (user) {
            const progress = yield progressModel_1.default.create({ progressTask, userID });
            user === null || user === void 0 ? void 0 : user.progress.push(new mongoose_1.default.Types.ObjectId(progress._id));
            user === null || user === void 0 ? void 0 : user.save();
            return res.status(201).json({
                message: "progress created",
                data: progress
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
            message: "Error creating progress",
            data: error
        });
    }
});
exports.createProgress = createProgress;
const viewprogresss = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const progress = yield progressModel_1.default.find();
        return res.status(200).json({
            message: "progresss Found",
            data: progress
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Finding progresss",
            data: error
        });
    }
});
exports.viewprogresss = viewprogresss;
const viewUserprogress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield authModel_1.default.findById(userID).populate({
            path: "progress",
            options: {
                sort: {
                    createdAt: -1
                }
            }
        });
        return res.status(200).json({
            message: "User progresss Found",
            data: user === null || user === void 0 ? void 0 : user.progress
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Finding user progresss",
            data: error
        });
    }
});
exports.viewUserprogress = viewUserprogress;
const deleteprogress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, progressID } = req.params;
        const user = yield authModel_1.default.findById(userID);
        if (user) {
            const progressUser = yield progressModel_1.default.findById(progressID);
            if ((progressUser === null || progressUser === void 0 ? void 0 : progressUser.userID) === userID) {
                const progress = yield progressModel_1.default.findByIdAndDelete(progressID);
                return res.status(201).json({
                    message: "progress deleted",
                    data: progress
                });
            }
            else {
                return res.status(404).json({
                    message: "Cant delete another persons progressTask"
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
            message: "Error Deleting progress",
            data: error
        });
    }
});
exports.deleteprogress = deleteprogress;
