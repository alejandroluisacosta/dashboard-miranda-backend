"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userServices_1 = require("../services/userServices");
const usersController = express_1.default.Router();
usersController.get('/', (_req, res, next) => {
    try {
        const users = userServices_1.UserModel.getUsers();
        return res.json({ users: users });
    }
    catch (error) {
        next(error);
    }
});
usersController.get('/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const user = userServices_1.UserModel.getUser(id);
        return res.json({ user: user });
    }
    catch (error) {
        next(error);
    }
});
usersController.post('/', (req, res, next) => {
    try {
        const newUser = req.body;
        userServices_1.UserModel.addUser(newUser);
        return res.json({ user: newUser });
    }
    catch (error) {
        next(error);
    }
});
usersController.delete('/', (req, res, next) => {
    try {
        const id = req.body.id;
        const updatedUsers = userServices_1.UserModel.removeUser(id);
        return res.json({ users: updatedUsers });
    }
    catch (error) {
        next(error);
    }
});
usersController.put('/', (req, res, next) => {
    try {
        const modifiedUser = req.body;
        const updatedUsers = userServices_1.UserModel.modifyUser(modifiedUser);
        return res.json({ users: updatedUsers });
    }
    catch (error) {
        next(error);
    }
});
exports.default = usersController;
