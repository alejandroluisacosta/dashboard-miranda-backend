import { generateAccessToken } from '../utils/authUtils';

class LoginModel {

    static authenticateUser(username: string, password: string): string {
        
        const placeholderUser = {
            userName: 'John',
            password: '1234'
        };
        
        if (username === placeholderUser.userName && password === placeholderUser.password) {
            const token = generateAccessToken(placeholderUser.userName);
            return token;
        } else {
            throw new Error('No user found');
        }
    }
}

export default LoginModel;
