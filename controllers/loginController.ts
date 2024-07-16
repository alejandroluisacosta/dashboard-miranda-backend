import express , { Request, Response, Router } from 'express';
import { generateAccessToken } from '../utils/authUtils';
import LoginModel from '../services/loginServices';

const loginController = express.Router();

loginController.post('/login', (req: Request, res: Response) => {
    try {
    const token: string = LoginModel.authenticateUser(req.body.username, req.body.password);
    if (token)
        res.json({ token });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});

export default loginController;