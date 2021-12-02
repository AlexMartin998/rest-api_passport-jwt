"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const routes_1 = require("../routes");
const passport_middleware_1 = __importDefault(require("../middlewares/passport.middleware"));
const app = (0, express_1.default)();
app.set('port', process.env.PORT || 3000);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('public'));
app.use((0, morgan_1.default)('dev'));
app.use(passport_1.default.initialize());
passport_1.default.use(passport_middleware_1.default);
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'GET Home' });
});
app.use('/', routes_1.authRoutes);
app.use('/', routes_1.privateRoutes);
exports.default = app;
