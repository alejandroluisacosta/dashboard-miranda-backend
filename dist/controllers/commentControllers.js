"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentServices_1 = require("../services/commentServices");
const commentController = express_1.default.Router();
commentController.get('/', (_req, res, next) => {
    try {
        const comments = commentServices_1.CommentModel.getComments();
        return res.json({ comments: comments });
    }
    catch (error) {
        next(error);
    }
});
commentController.get('/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const comment = commentServices_1.CommentModel.getComment(id);
        return res.json({ comment: comment });
    }
    catch (error) {
        next(error);
    }
});
commentController.delete('/', (req, res, next) => {
    try {
        const id = req.body.id;
        const updatedComments = commentServices_1.CommentModel.removeComment(id);
        return res.json({ comments: updatedComments });
    }
    catch (error) {
        next(error);
    }
});
commentController.patch('/', (req, res, next) => {
    try {
        const modifiedComment = req.body;
        const updatedComments = commentServices_1.CommentModel.modifyComment(modifiedComment);
        return res.json({ comments: updatedComments });
    }
    catch (error) {
        next(error);
    }
});
exports.default = commentController;
