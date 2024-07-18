"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateToken(req, res, next) {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.sendStatus(401);
            return;
        }
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err) => {
            if (err) {
                res.sendStatus(403);
                return;
            }
            next();
        });
    }
    catch (error) {
        res.sendStatus(500);
    }
}
