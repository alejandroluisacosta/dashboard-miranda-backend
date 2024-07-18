"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authUtils_1 = require("../utils/authUtils");
class LoginModel {
    static authenticateUser(username, password) {
        const placeholderUser = {
            userName: 'John',
            password: '1234'
        };
        if (username === placeholderUser.userName && password === placeholderUser.password) {
            const token = (0, authUtils_1.generateAccessToken)(placeholderUser.userName);
            return token;
        }
        else {
            throw new Error('No user found');
        }
    }
}
exports.default = LoginModel;
