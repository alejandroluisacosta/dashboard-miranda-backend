import express, { NextFunction, Request, Response } from 'express';
import { RoomModel } from '../services/roomServices';
import Room from '../interfaces/room';

const roomsController = express.Router();

roomsController.get('/', (_req: Request, res: Response, next: NextFunction): Response<JSON> | void=> {
    try {
        const rooms: Room[] = RoomModel.getRooms();
        return res.json({ rooms: rooms });
    } catch (error) {
        next(error);
    }
})

roomsController.get('/:id', (req: Request, res: Response, next: NextFunction): Response<JSON> | void=> {
    try {
        const id: string = req.params.id;
        const room = RoomModel.getRoom(id);
        return res.json({ room: room });
    } catch (error) {
        next(error);
    }
})

roomsController.post('/', (req: Request, res: Response, next: NextFunction): Response<JSON> | void=> {
    try {
        const newRoom: Room = req.body as Room;
        RoomModel.addRoom(newRoom);
        return res.json({ room: newRoom });
    } catch (error) {
        next(error);
    }
})

roomsController.delete('/', (req: Request, res: Response, next: NextFunction): Response<JSON> | void=> {
    try {
        const id: string = req.body.id;
        const updatedRooms: Room[] = RoomModel.removeRoom(id);
        return res.json({ rooms: updatedRooms });
    } catch (error) {
        next(error);
    }
})

roomsController.put('/', (req: Request, res: Response, next: NextFunction): Response<JSON> | void=> {
    try {
        const modifiedRoom: Room = req.body;
        const updatedRooms: Room[] = RoomModel.modifyRoom(modifiedRoom);
        return res.json({ rooms: updatedRooms });
    } catch (error) {
        next(error);
    }
})

export default roomsController;