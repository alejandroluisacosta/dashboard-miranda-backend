import express, { NextFunction, Request, Response } from 'express';
import { RoomServices } from '../services/roomServices';
import Room from '../interfaces/Room';

const roomsController = express.Router();

roomsController.get('/', (_req: Request, res: Response, next: NextFunction): Response<JSON> | void=> {
    try {
        const rooms: Room[] = RoomServices.getRooms();
        return res.json({ rooms: rooms });
    } catch (error) {
        next(error);
    }
})

roomsController.get('/:id', (req: Request, res: Response, next: NextFunction): Response<JSON> | void=> {
    try {
        const id: string = req.params.id;
        const room = RoomServices.getRoom(id);
        return res.json({ room: room });
    } catch (error) {
        next(error);
    }
})

roomsController.post('/', (req: Request, res: Response, next: NextFunction): Response<JSON> | void=> {
    try {
        const newRoom: Room = req.body as Room;
        RoomServices.addRoom(newRoom);
        return res.json({ room: newRoom });
    } catch (error) {
        next(error);
    }
})

roomsController.delete('/:id', (req: Request, res: Response, next: NextFunction): Response<JSON> | void=> {
    try {
        const id: string = req.params.id;
        const updatedRooms: Room[] = RoomServices.removeRoom(id);
        return res.json({ rooms: updatedRooms });
    } catch (error) {
        next(error);
    }
})

roomsController.put('/:id', (req: Request, res: Response, next: NextFunction): Response<JSON> | void=> {
    try {
        const modifiedRoom: Room = req.body;
        const updatedRooms: Room[] = RoomServices.modifyRoom(modifiedRoom);
        return res.json({ rooms: updatedRooms });
    } catch (error) {
        next(error);
    }
})

export default roomsController;