import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    incorporatedOn: { type: String, required: true },
    jobDesk: { type: String, required: true },
    schedule: { type: String, required: false },
    phone: { type: String, required: true },
    status: { type: String, required: true },
    role: { type: String, required: false },
    email: { type: String, required: false },
});

const UserModel = mongoose.model('UserModel', UserSchema);

export default UserModel;