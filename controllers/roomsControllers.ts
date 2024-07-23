import express, { NextFunction, Request, Response } from 'express';
import { RoomServices } from '../services/roomServices';
import Room from '../interfaces/Room';

const roomsController = express.Router();

roomsController.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void> => {
    try {
        const rooms: Room[] = await RoomServices.getRooms();
        return res.status(200).json({ rooms });
    } catch (error) {
        next(error);
    }
})

roomsController.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void> => {
    try {
        const id: string = req.params.id;
        const room = await RoomServices.getRoom(id);
        return res.status(200).json({ room });
    } catch (error) {
        next(error);
    }
})

roomsController.post('/', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void> => {
    try {
        const newRoom: Room = req.body as Room;
        const addedRoom = await RoomServices.addRoom(newRoom);
        return res.status(201).json({ room: addedRoom });
    } catch (error) {
        next(error);
    }
})

roomsController.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void> => {
    try {
        const id: string = req.params.id;
        await RoomServices.removeRoom(id);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
})

roomsController.put('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void> => {
    try {
        const modifiedRoom: Room = req.body;
        const updatedRoom: Room = await RoomServices.modifyRoom(modifiedRoom);
        return res.status(200).json({ rooms: updatedRoom });
    } catch (error) {
        next(error);
    }
})

export default roomsController;