import mongoose, { Schema } from "mongoose";
import Comment from "../interfaces/Comment";

const CommentSchema = new Schema<Comment>({
    text: { type: String, required: true },
    userName: { type: String, required: true },
    timestamp: { type: String, required: true },
    read: { type: Boolean, required: true },
});

const CommentModel = mongoose.model('CommentModel', CommentSchema, 'comments');

export default CommentModel;