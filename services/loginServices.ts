import { RowDataPacket } from 'mysql2';
import { connection } from '../db';
import User from '../interfaces/User';
import { generateAccessToken } from '../utils/authUtils';
import bcrypt from 'bcryptjs';

class LoginServices {

    static async authenticateUser(user: User): Promise<string> {
        
        const [userToCheck] = await connection.query<RowDataPacket[]>('SELECT * FROM users WHERE userName=?', [user.userName]);
        
        if ((userToCheck[0] && user.userName === userToCheck[0].userName)) {
            const match = await bcrypt.compare(user.password, userToCheck[0].password);
            if (match) {
                const token = generateAccessToken(user.userName);
                return token;
                }
        }
        throw new Error('Invalid credentials');
    }
}

export default LoginServices;
