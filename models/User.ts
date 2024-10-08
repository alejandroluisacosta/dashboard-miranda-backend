import mongoose, { Schema } from "mongoose";
import User from '../interfaces/user'

const UserSchema = new Schema<User>({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    image: { type: String, required: true },
    incorporatedOn: { type: String, required: true },
    jobDesk: { type: String, required: true },
    schedule: { type: String, required: false },
    phone: { type: String, required: true },
    status: { type: String, required: true },
    role: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: true },
});

const UserModel = mongoose.model('UserModel', UserSchema, 'users');

export default UserModel;