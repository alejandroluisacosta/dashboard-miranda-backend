import express , { Request, Response } from 'express';
import LoginServices from '../services/loginServices';

const loginController = express.Router();

loginController.post('/', (req: Request, res: Response) => {
    try {
    const token: string = LoginServices.authenticateUser(req.body.username, req.body.password);
    if (token)
        res.json({ token });
    }
    catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});

export default loginController;