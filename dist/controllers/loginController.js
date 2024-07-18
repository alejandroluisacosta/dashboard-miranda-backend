"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginServices_1 = __importDefault(require("../services/loginServices"));
const loginController = express_1.default.Router();
loginController.post('/', (req, res) => {
    try {
        const token = loginServices_1.default.authenticateUser(req.body.username, req.body.password);
        if (token)
            res.json({ token });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});
exports.default = loginController;
