"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/signup', controllers_1.signUp);
router.post('/signin', controllers_1.signIn);
exports.default = router;
