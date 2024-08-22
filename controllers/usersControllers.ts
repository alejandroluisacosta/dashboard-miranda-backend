import express, { NextFunction, Request, Response } from 'express';
import { UserServices } from '../services/userServices';
import User from '../interfaces/User';

const usersController = express.Router();

usersController.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void> => {
    try {
        const users: User[] = await UserServices.getUsers();
        return res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
})

usersController.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void> => {
    try {
        const id: number = parseInt(req.params.id);
        const user = await UserServices.getUser(id);
        return res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
})

usersController.post('/', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void> => {
    try {
        const newUser: User = req.body as User;
        const addedUser = await UserServices.addUser(newUser);
        return res.status(201).json({ user: addedUser });
    } catch (error) {
        next(error);
    }
})

usersController.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void> => {
    try {
        const id: number = parseInt(req.params.id);
        UserServices.removeUser(id);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
})

usersController.put('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void> => {
    try {
        const modifiedUser: User = req.body;
        const id: number = parseInt(req.params.id);
        const updatedUser: User = await UserServices.modifyUser(id, modifiedUser);
        return res.status(200).json({ user: updatedUser });
    } catch (error) {
        next(error);
    }
})

export default usersController;