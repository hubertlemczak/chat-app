"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_model_1 = __importDefault(require("./api/models/messages.model"));
const auth_1 = require("./auth");
const messages_command_1 = require("./commands/messages.command");
function socket({ io }) {
    io.on('connection', socket => {
        socket.on('login', ({ token }, cb) => {
            const user = (0, auth_1.decodeToken)(token);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            socket.user = user;
            cb(user);
        });
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        socket.on('chat message', async ({ content, userId, conversationId }) => {
            try {
                const createdMessage = await messages_command_1.messagesCmdBus.dispatch(new messages_command_1.CreateMessage({ content, userId, conversationId }));
                io.emit('chat message', createdMessage);
                console.log('With Command', createdMessage);
            }
            catch (err) {
                console.error(err);
            }
            try {
                const createdMessage = await messages_model_1.default.createMessage({
                    content,
                    conversationId,
                    userId,
                });
                io.emit('chat message', createdMessage);
                console.log('With model', createdMessage);
            }
            catch (err) {
                console.error('err', err);
            }
        });
        socket.on('typing', () => {
            socket.broadcast.emit('typing');
        });
    });
}
exports.default = socket;
