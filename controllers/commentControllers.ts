// import express, { NextFunction, Request, Response } from 'express';
// import { CommentServices } from '../services/commentServices';
// import Comment from '../interfaces/Comment';

// const commentController = express.Router();

// commentController.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void> => {
//     try {
//         const comments: Comment[] = await CommentServices.getComments();
//         return res.status(200).json({ comments: comments });
//     } catch (error) {
//         next(error);
//     }
// })

// commentController.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void> => {
//     try {
//         const id: string = req.params.id;
//         const comment = CommentServices.getComment(id);
//         return res.status(200).json({ comment: comment });
//     } catch (error) {
//         next(error);
//     }
// })

// commentController.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void> => {
//     try {
//         const id: string = req.params.id;
//         await CommentServices.removeComment(id);
//         return res.status(204).send();
//     } catch (error) {
//         next(error);
//     }
// })

// commentController.patch('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void> => {
//     try {
//         const modifiedComment: Comment = req.body;
//         const updatedComment: Comment = await CommentServices.modifyComment(modifiedComment);
//         return res.status(200).json({ comment: updatedComment });
//     } catch (error) {
//         next(error);
//     }
// })

// export default commentController;