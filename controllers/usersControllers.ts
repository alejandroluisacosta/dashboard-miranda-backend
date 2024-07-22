import express, { NextFunction, Request, Response } from 'express';
import { UserServices } from '../services/userServices';
import User from '../interfaces/User';

const usersController = express.Router();

usersController.get('/', (_req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const users: User[] = UserServices.getUsers();
        return res.json({ users: users });
    } catch (error) {
        next(error);
    }
})

usersController.get('/:id', (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const id: string = req.params.id;
        const user = UserServices.getUser(id);
        return res.json({ user: user });
    } catch (error) {
        next(error);
    }
})

usersController.post('/', (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const newUser: User = req.body as User;
        UserServices.addUser(newUser);
        return res.json({ user: newUser });
    } catch (error) {
        next(error);
    }
})

usersController.delete('/:id', (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const id: string = req.params.id;
        const updatedUsers: User[] = UserServices.removeUser(id);
        return res.json({ users: updatedUsers });
    } catch (error) {
        next(error);
    }
})

usersController.put('/:id',  (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const modifiedUser: User = req.body;
        const updatedUsers: User[] = UserServices.modifyUser(modifiedUser);
        return res.json({ users: updatedUsers });
    } catch (error) {
        next(error);
    }
})

export default usersController;