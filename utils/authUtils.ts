import jwt from 'jsonwebtoken';

export function generateAccessToken(username: string) {
    return (jwt.sign( username, process.env.SECRET_KEY!, { expiresin: '3000000s' }));
}