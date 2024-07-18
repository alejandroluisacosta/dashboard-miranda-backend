"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mockComments_1 = __importDefault(require("../data/mockComments"));
class CommentModel {
    static getComments() {
        return mockComments_1.default;
    }
    static getComment(id) {
        const comment = mockComments_1.default.find(comment => comment.id === id);
        if (!comment)
            throw new Error('No comment found');
        return comment;
    }
    static removeComment(id) {
        const updatedComments = mockComments_1.default.filter(comment => comment.id !== id);
        return updatedComments;
    }
    static modifyComment(modifiedComment) {
        const updatedComments = mockComments_1.default.map(comment => comment.id === modifiedComment.id ? Object.assign(Object.assign({}, comment), { read: !comment.read }) : comment);
        return updatedComments;
    }
}
exports.CommentModel = CommentModel;
