"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mockUsers_1 = __importDefault(require("../data/mockUsers"));
class UserModel {
    static getUsers() {
        return mockUsers_1.default;
    }
    static getUser(id) {
        const user = mockUsers_1.default.find(user => user.id === id);
        if (!user)
            throw new Error('No user found');
        return user;
    }
    static addUser(user) {
        mockUsers_1.default.push(user);
        return user;
    }
    static removeUser(id) {
        const updatedUsers = mockUsers_1.default.filter(user => user.id !== id);
        return updatedUsers;
    }
    static modifyUser(modifiedUser) {
        const updatedUsers = mockUsers_1.default.map(User => User.id === modifiedUser.id ? User = modifiedUser : User);
        return updatedUsers;
    }
}
exports.UserModel = UserModel;
