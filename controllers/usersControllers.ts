import express, { Request, Response } from 'express';
import { UsersModel } from '../services/userServices';
import User from '../interfaces/user';

const usersController = express.Router();

usersController.get('/', (_req: Request, res: Response): Response<JSON> => {
    const users: User[] = UsersModel.getUsers();
    return res.json(users);
})

usersController.get('/:id', (req: Request, res: Response): Response<JSON> => {
    const id: string = req.params.id;
    const user = UsersModel.getUser(id);
    return res.json(user);
})

usersController.post('/', (req: Request, res: Response): Response<JSON> => {
    const newUser: User = req.body as User;
    UsersModel.addUser(newUser);
    return res.json(newUser);
})

usersController.delete('/', (req: Request, res: Response): Response<JSON> => {
    const id: string = req.body.id;
    const updatedUsers: User[] = UsersModel.removeUser(id);
    return res.json(updatedUsers);
})

usersController.put('/',  (req: Request, res: Response): Response<JSON> => {
    const modifiedUser: User = req.body;
    const updatedUsers: User[] = UsersModel.modifyUser(modifiedUser);
    return res.json(updatedUsers);
})

export default usersController;