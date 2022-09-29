"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api = express_1.default.Router();
const users_controller_1 = __importDefault(require("./controllers/users.controller"));
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
api.get('/users', users_controller_1.default.getAll);
api.get('/users/:id', users_controller_1.default.getById);
api.post('/login', auth_controller_1.default.login);
exports.default = api;
