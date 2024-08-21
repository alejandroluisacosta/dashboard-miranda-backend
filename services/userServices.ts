import User from "../interfaces/User";
import UserModel from '../models/User';
import bcrypt from 'bcryptjs';

export class UserServices {

    static async getUsers(): Promise<User[]> {
        const allUsers: User[] = await UserModel.find().exec();
        return allUsers;
    }

    static async getUser(id: string): Promise<User> {
        const user: User | null = await UserModel.findById(id);
        if (!user)
            throw new Error('No user found');
        return user;
    }

    static async addUser(user: User): Promise<User> {
        const newUser = new UserModel(user);
        const plainTextPassword: string = newUser.password;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
        newUser.password = hashedPassword;
        await newUser.save();
        return newUser;
    }

    static async removeUser(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id);
    }

    static async modifyUser(id: string, modifiedUser: User): Promise<User> {
        await UserModel.findByIdAndUpdate(id, modifiedUser);
        return modifiedUser;
    }
  }