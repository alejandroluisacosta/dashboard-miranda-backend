import express, { NextFunction, Request, Response } from 'express';
import { CommentModel } from '../services/commentServices';
import Comment from '../interfaces/Comment';

const commentController = express.Router();

commentController.get('/', (_req: Request, res: Response, next: NextFunction): Response<JSON> | void=> {
    try {
        const comments: Comment[] = CommentModel.getComments();
        return res.json({ comments: comments });
    } catch (error) {
        next(error);
    }
})

commentController.get('/:id', (req: Request, res: Response, next: NextFunction): Response<JSON> | void=> {
    try {
        const id: string = req.params.id;
        const comment = CommentModel.getComment(id);
        return res.json({ comment: comment });
    } catch (error) {
        next(error);
    }
})

commentController.delete('/', (req: Request, res: Response, next: NextFunction): Response<JSON> | void=> {
    try {
        const id: string = req.body.id;
        const updatedComments: Comment[] = CommentModel.removeComment(id);
        return res.json({ comments: updatedComments });
    } catch (error) {
        next(error);
    }
})

commentController.patch('/', (req: Request, res: Response, next: NextFunction): Response<JSON> | void=> {
    try {
        const modifiedComment: Comment = req.body;
        const updatedComments: Comment[] = CommentModel.modifyComment(modifiedComment);
        return res.json({ comments: updatedComments });
    } catch (error) {
        next(error);
    }
})

export default commentController;