"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateRoutes = exports.authRoutes = void 0;
const auth_routes_1 = __importDefault(require("./auth.routes"));
exports.authRoutes = auth_routes_1.default;
const private_routes_1 = __importDefault(require("./private.routes"));
exports.privateRoutes = private_routes_1.default;
