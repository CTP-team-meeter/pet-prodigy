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
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/user");
const { generateAccessToken, authenticateToken, } = require("../middlewares/authentication");
const bcrypt = require("bcrypt");
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield User.exists({ username: req.body.username })) {
            return res.status(400).json({
                msg: "This username is already taken. Enter a different username",
            });
        }
        const hashedPassword = bcrypt.hashSync(req.body.password, Number(process.env.SALT));
        const newUser = yield new User({
            username: req.body.username,
            password: hashedPassword,
        });
        yield newUser.save();
        const id = newUser._id.toString();
        const token = yield generateAccessToken({ username: req.body.username });
        res.status(201).json({ token, id });
    }
    catch (err) {
        res.status(400).json({ msg: "Failed Signup", err });
    }
});
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(yield User.exists({ username: req.body.username }))) {
            return res.status(400).json({
                msg: "This username doesn't exist. Enter a different username",
            });
        }
        const user = yield User.findOne({
            username: req.body.username,
        });
        const id = user._id.toString();
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = yield generateAccessToken({ username: req.body.username });
            res.status(200).json({ token, id });
        }
        else {
            res
                .status(400)
                .json({ msg: "Invalid password, Enter a correct password." });
        }
    }
    catch (err) {
        res.status(400).json({ msg: "Failed Login", err });
    }
});
exports.check_login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield authenticateToken(req, res, () => {
        const username = req.user.username;
        res.status(200).json({ msg: "Logged in", username: username });
    });
});
