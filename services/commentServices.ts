import mockComments from "../data/mockComments";
import Comment from "../interfaces/comment";

export class CommentModel {

    static getComments(): Comment[] {
        return mockComments;
    }

    static getComment(id: string): Comment {
        const comment = mockComments.find(comment => comment.id === id);
        if (!comment)
            throw new Error('No comment found');
        return comment;
    }

    static removeComment(id: string): Comment[] {
        const updatedComments = mockComments.filter(comment => comment.id !== id);
        return updatedComments;
    }

    static modifyComment(modifiedComment: Comment): Comment[] {
        const updatedComments = mockComments.map(comment => 
            comment.id === modifiedComment.id ? { ...comment, read: !comment.read} : comment
        );
        return updatedComments;
    }

  }