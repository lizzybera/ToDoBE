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
exports.deleteUser = exports.signIn = exports.viewUser = exports.viewUsers = exports.register = void 0;
const authModel_1 = __importDefault(require("../model/authModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const user = yield authModel_1.default.create({ userName, email, password: hash });
        return res.status(201).json({
            message: "User Registered",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Registering",
            data: error
        });
    }
});
exports.register = register;
const viewUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authModel_1.default.find();
        return res.status(200).json({
            message: "Users Found",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Finding users",
            data: error
        });
    }
});
exports.viewUsers = viewUsers;
const viewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield authModel_1.default.findById(userID);
        return res.status(200).json({
            message: "User Found",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Finding user",
            data: error
        });
    }
});
exports.viewUser = viewUser;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield authModel_1.default.findOne({ email });
        if (user) {
            const check = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (check) {
                return res.status(201).json({
                    message: `welcome back ${user === null || user === void 0 ? void 0 : user.userName}`,
                    data: user === null || user === void 0 ? void 0 : user._id
                });
            }
            else {
                return res.status(404).json({
                    message: "Incorrect Password"
                });
            }
        }
        else {
            return res.status(404).json({
                message: "User Not Found"
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Signing user",
            data: error
        });
    }
});
exports.signIn = signIn;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield authModel_1.default.findByIdAndDelete(userID);
        return res.status(200).json({
            message: `User...${user === null || user === void 0 ? void 0 : user.userName} Deleted`,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Deleting user",
            data: error
        });
    }
});
exports.deleteUser = deleteUser;
