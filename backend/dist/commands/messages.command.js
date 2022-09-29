"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesCmdBus = exports.CreateMessage = void 0;
const depot_command_bus_1 = require("depot-command-bus");
const dbClient_1 = __importDefault(require("../utils/dbClient"));
class CreateMessage {
    constructor({ content, userId, conversationId }) {
        this._content = content;
        this._conversationId = conversationId;
        this._userId = userId;
    }
    get content() {
        return this._content;
    }
    get conversationId() {
        return this._conversationId;
    }
    get userId() {
        return this._userId;
    }
    getName() {
        return 'CreateMessage';
    }
}
exports.CreateMessage = CreateMessage;
class CreateMessageHandler {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async handle(command) {
        const newMessage = await dbClient_1.default.message.create({
            data: {
                content: command.content,
                conversationId: command.conversationId,
                userId: command.userId,
            },
            include: {
                user: true,
            },
        });
        return newMessage;
    }
}
const registry = new depot_command_bus_1.Registry([['CreateMessage', new CreateMessageHandler()]]);
exports.messagesCmdBus = new depot_command_bus_1.Depot(registry);
