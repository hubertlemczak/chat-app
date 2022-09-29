"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbClient_1 = __importDefault(require("../../utils/dbClient"));
const getAll = async () => {
    const data = await dbClient_1.default.user.findMany({
        select: {
            username: true,
            id: true,
        },
    });
    return data;
};
const getById = async (id) => {
    const data = await dbClient_1.default.user.findUnique({
        where: { id },
        select: {
            username: true,
            id: true,
            chatrooms: {
                include: { conversation: true },
            },
        },
    });
    return data;
};
exports.default = { getById, getAll };
