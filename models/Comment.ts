import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
    text: { type: String, required: true },
    userName: { type: String, required: true },
    timestamp: { type: String, required: true },
    read: { type: Boolean, required: true },
});

const CommentModel = mongoose.model('CommentModel', CommentSchema);

export default CommentModel;