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
exports.signIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const config_1 = __importDefault(require("./../config/config"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: '24h',
    });
}
const generateJWT = (user) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.jwtSecret, { expiresIn: '12h' }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Sorry, the JWT culd not be generated!');
            }
            else
                resolve(token);
        });
    });
};
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res
            .status(400)
            .json({ msg: 'Please, send your email and password!' });
    const user = yield models_1.User.findOne({ email });
    if (user)
        return res
            .status(400)
            .json({ msg: `Email '${email}' is alreade registered!` });
    const newUser = new models_1.User({ email, password });
    yield newUser.save();
    return res.status(201).json({ msg: 'Created!', newUser });
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res
            .status(400)
            .json({ msg: 'Please, send your email and password!' });
    const user = yield models_1.User.findOne({ email });
    if (!user)
        return res.status(400).json({ msg: `User '${email}' doesn't exist!` });
    const isMatch = yield user.comparePassword(password);
    if (!isMatch)
        return res.status(401).json({ msg: 'Incorrect password!' });
    const token = createToken(user);
    return res.status(201).json({ msg: 'Log In', token });
});
exports.signIn = signIn;
