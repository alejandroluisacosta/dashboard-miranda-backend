import express, { NextFunction, Request, Response } from 'express';
import { UserModel } from '../services/userServices';
import User from '../interfaces/User';

const usersController = express.Router();

usersController.get('/', (_req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const users: User[] = UserModel.getUsers();
        return res.json({ users: users });
    } catch (error) {
        next(error);
    }
})

usersController.get('/:id', (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const id: string = req.params.id;
        const user = UserModel.getUser(id);
        return res.json({ user: user });
    } catch (error) {
        next(error);
    }
})

usersController.post('/', (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const newUser: User = req.body as User;
        UserModel.addUser(newUser);
        return res.json({ user: newUser });
    } catch (error) {
        next(error);
    }
})

usersController.delete('/', (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const id: string = req.body.id;
        const updatedUsers: User[] = UserModel.removeUser(id);
        return res.json({ users: updatedUsers });
    } catch (error) {
        next(error);
    }
})

usersController.put('/',  (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const modifiedUser: User = req.body;
        const updatedUsers: User[] = UserModel.modifyUser(modifiedUser);
        return res.json({ users: updatedUsers });
    } catch (error) {
        next(error);
    }
})

export default usersController;