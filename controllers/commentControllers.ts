import express, { Request, Response } from 'express';
import { CommentModel } from '../services/commentServices';
import Comment from '../interfaces/comment';
import { authenticateToken } from '../middleware/auth';

const commentController = express.Router();

commentController.get('/', authenticateToken, (_req: Request, res: Response): Response<JSON> => {
    const comments: Comment[] = CommentModel.getComments();
    return res.json(comments);
})

commentController.get('/:id', authenticateToken, (req: Request, res: Response): Response<JSON> => {
    const id: string = req.params.id;
    const comment = CommentModel.getComment(id);
    return res.json(comment);
})

commentController.delete('/', authenticateToken, (req: Request, res: Response): Response<JSON> => {
    const id: string = req.body.id;
    const updatedComments: Comment[] = CommentModel.removeComment(id);
    return res.json(updatedComments);
})

commentController.patch('/', authenticateToken, (req: Request, res: Response): Response<JSON> => {
    const modifiedComment: Comment = req.body;
    const updatedComments: Comment[] = CommentModel.modifyComment(modifiedComment);
    return res.json(updatedComments);
})

export default commentController;