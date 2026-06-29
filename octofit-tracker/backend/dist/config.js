"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.API_BASE_URL = exports.PORT = void 0;
exports.PORT = 8000;
const codespaceName = process.env.CODESPACE_NAME;
exports.API_BASE_URL = codespaceName
    ? `https://${codespaceName}-${exports.PORT}.app.github.dev`
    : `http://localhost:${exports.PORT}`;
exports.MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
