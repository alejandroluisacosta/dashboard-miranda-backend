import express , { Request, Response } from 'express';
import LoginServices from '../services/loginServices';

const loginController = express.Router();

loginController.post('/', async (req: Request, res: Response) => {
    try {
    const token: string = await LoginServices.authenticateUser(req.body);
    if (token)
        res.json({ token });
    }
    catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});

export default loginController;