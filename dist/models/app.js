"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.User = void 0;
const user_models_1 = __importDefault(require("./user.models"));
exports.User = user_models_1.default;
const server_model_1 = __importDefault(require("./server.model"));
exports.app = server_model_1.default;
