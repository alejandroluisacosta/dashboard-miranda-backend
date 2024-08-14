import express , { Request, Response } from 'express';
import LoginServices from '../services/loginServices';
import UserModel from '../models/User';

const loginController = express.Router();

loginController.post('/', async (req: Request, res: Response) => {
    try {
    const token: string = await LoginServices.authenticateUser(req.body);
    const userData = await UserModel.find({ userName: req.body.userName });
    if (token)
        res.json({ token, userData });
    }
    catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});

export default loginController;