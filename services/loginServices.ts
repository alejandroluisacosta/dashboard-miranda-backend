import User from '../interfaces/User';
import UserModel from '../models/User';
import { generateAccessToken } from '../utils/authUtils';
import bcrypt from 'bcryptjs';

class LoginServices {

    static async authenticateUser(user: User): Promise<string> {
        
        const userToCheck: User | null = await UserModel.findOne({ userName: user.userName });
        
        if (userToCheck && user.userName === userToCheck.userName) {
            const match = await bcrypt.compare(user.password, userToCheck.password);
            if (match) {
                const token = generateAccessToken(user.userName);
                return token;
                }
        }
        throw new Error('Invalid credentials');
    }
}

export default LoginServices;
