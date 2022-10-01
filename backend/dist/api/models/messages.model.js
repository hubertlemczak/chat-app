"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbClient_1 = __importDefault(require("../../utils/dbClient"));
const getAll = async () => await dbClient_1.default.message.findMany({});
const getById = async (id) => {
    const data = await dbClient_1.default.message.findUnique({
        where: { id },
    });
    return data;
};
const createMessage = async ({ content, userId, conversationId, }) => {
    const data = await dbClient_1.default.message.create({
        data: {
            content,
            conversationId,
            userId,
        },
        include: {
            user: {
                select: {
                    username: true,
                },
            },
        },
    });
    return data;
};
exports.default = { getById, getAll, createMessage };
