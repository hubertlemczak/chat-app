"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
const errorHandler = (err, req, res, next) => {
    console.log('in error handler');
    console.error('[error]', err);
    next();
};
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.HttpException = HttpException;
exports.default = errorHandler;
