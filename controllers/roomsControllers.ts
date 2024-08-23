import express, { NextFunction, Request, Response } from 'express';
import { RoomServices } from '../services/roomServices';
import Room from '../interfaces/Room';
import createValidationMiddleware from '../middleware/validation';
import roomSchema from '../validators/room';

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
        const id: number = parseInt(req.params.id);
        const room = await RoomServices.getRoom(id);
        return res.status(200).json({ room });
    } catch (error) {
        next(error);
    }
})

roomsController.post('/', createValidationMiddleware(roomSchema), async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void> => {
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
        const id = parseInt(req.params.id, 10);
        await RoomServices.removeRoom(id);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
})

roomsController.put('/:id', createValidationMiddleware(roomSchema), async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void> => {
    try {
        const modifiedRoom: Room = req.body;
        const id = parseInt(req.params.id, 10);
        const updatedRoom: Room = await RoomServices.modifyRoom(id, modifiedRoom);
        return res.status(200).json({ rooms: updatedRoom });
    } catch (error) {
        next(error);
    }
})

export default roomsController;