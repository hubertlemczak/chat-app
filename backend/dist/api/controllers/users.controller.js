"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_js_1 = __importDefault(require("../models/users.model.js"));
const getAll = async (req, res) => {
    const users = await users_model_js_1.default.getAll();
    res.status(200).json({ users });
};
const getById = async (req, res) => {
    const id = req.params.id;
    const user = await users_model_js_1.default.getById(id);
    res.status(200).json({ user });
};
exports.default = { getAll, getById };
