import Comment from '../interfaces/Comment';
import CommentModel from '../models/Comment';

export class CommentServices {

    static async getComments(): Promise<Comment[]> {
        const allComments = await CommentModel.find().exec();
        return allComments;
    }

    static async getComment(id: string): Promise<Comment> {
        const comment = await CommentModel.findById(id)
        if (!comment)
            throw new Error('No comment found');
        return comment;
    }

    static async removeComment(id: string): Promise<void> {
        await CommentModel.findByIdAndDelete(id);
    }

    static async modifyComment(modifiedComment: Comment): Promise<Comment> {
        await CommentModel.findOneAndUpdate(modifiedComment, { read: !modifiedComment.read });
        return modifiedComment;
    }
  }