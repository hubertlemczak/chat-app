"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareStringToHash = exports.hashStr = exports.decodeToken = exports.signToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || '';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const signToken = (data) => jsonwebtoken_1.default.sign(data, JWT_SECRET);
exports.signToken = signToken;
const decodeToken = (token) => jsonwebtoken_1.default.decode(token);
exports.decodeToken = decodeToken;
const hashStr = async (str) => {
    try {
        return await bcrypt_1.default.hash(str, 10);
    }
    catch (err) {
        console.error('[HASHSTR]', err);
        return false;
    }
};
exports.hashStr = hashStr;
const compareStringToHash = async (str, hash) => {
    try {
        if (!hash)
            return false;
        return await bcrypt_1.default.compare(str, hash);
    }
    catch (err) {
        console.error('[COMPAREHASH]', err);
        return false;
    }
};
exports.compareStringToHash = compareStringToHash;
