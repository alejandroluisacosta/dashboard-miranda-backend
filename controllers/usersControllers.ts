import express, { NextFunction, Request, Response } from 'express';
import { UsersModel } from '../services/userServices';
import User from '../interfaces/user';

const usersController = express.Router();

usersController.get('/', (_req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const users: User[] = UsersModel.getUsers();
        return res.json(users);
    } catch (error) {
        next(error);
    }
})

usersController.get('/:id', (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const id: string = req.params.id;
        const user = UsersModel.getUser(id);
        return res.json(user);
    } catch (error) {
        next(error);
    }
})

usersController.post('/', (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const newUser: User = req.body as User;
        UsersModel.addUser(newUser);
        return res.json(newUser);
    } catch (error) {
        next(error);
    }
})

usersController.delete('/', (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const id: string = req.body.id;
        const updatedUsers: User[] = UsersModel.removeUser(id);
        return res.json(updatedUsers);
    } catch (error) {
        next(error);
    }
})

usersController.put('/',  (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const modifiedUser: User = req.body;
        const updatedUsers: User[] = UsersModel.modifyUser(modifiedUser);
        return res.json(updatedUsers);
    } catch (error) {
        next(error);
    }
})

export default usersController;