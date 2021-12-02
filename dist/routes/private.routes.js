"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_jwt_middlerare_1 = __importDefault(require("./../middlewares/check-jwt.middlerare"));
const router = (0, express_1.Router)();
router.get('/private', check_jwt_middlerare_1.default, (req, res) => {
    res.status(200).json({ msg: 'Success!!!' });
});
exports.default = router;
