"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbClient_1 = __importDefault(require("../../utils/dbClient"));
const index_js_1 = require("../../auth/index.js");
const login = async (req, res) => {
    const user = await validateCredentials(req.body);
    const token = await (0, index_js_1.signToken)(user);
    res.status(200).json({ token });
};
const validateCredentials = async ({ usernameOrEmail, password, }) => {
    if (!usernameOrEmail || !password) {
        throw Error('Missing fields in request body');
    }
    const username = usernameOrEmail.includes('@') ? undefined : usernameOrEmail;
    const email = usernameOrEmail.includes('@') ? usernameOrEmail : undefined;
    const user = await dbClient_1.default.user.findUnique({
        where: { username, email },
    });
    const isValid = await (0, index_js_1.compareStringToHash)(password, user === null || user === void 0 ? void 0 : user.password);
    if (!isValid) {
        throw Error('Invalid credentials');
    }
    return { id: user === null || user === void 0 ? void 0 : user.id, username: user === null || user === void 0 ? void 0 : user.username, email: user === null || user === void 0 ? void 0 : user.email };
};
exports.default = { login };
