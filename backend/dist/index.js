"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
require('express-async-errors');
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
    },
});
app.disable('x-powered-by');
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
const api_1 = __importDefault(require("./api"));
const errors_1 = __importDefault(require("./api/errors"));
const socket_1 = __importDefault(require("./socket"));
app.use('/api', api_1.default);
app.get('/', (req, res) => {
    res.status(200).json({ message: 'hi' });
});
app.use(errors_1.default);
const port = process.env.PORT;
server.listen(port, () => {
    console.log(`\n[server] runnning on http://localhost:${port}\n`);
    (0, socket_1.default)({ io });
});
