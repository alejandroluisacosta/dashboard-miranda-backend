import jwt from 'jsonwebtoken';

export function generateAccessToken(username: string) {
    return (jwt.sign( username, process.env.TOKEN_SECRET!, { expiresin: '3000000s' }));
}