"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwtSecret: process.env.SECRETORPRIVATEKEY || 'somesecrettoken',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/e_ts-node',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD,
    },
};
