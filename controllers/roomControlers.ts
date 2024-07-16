import express, { Request, Response } from 'express';
import { RoomModel } from '../services/roomServices';
import Room from '../interfaces/room';
import { authenticateToken } from '../middleware/auth';

const roomController = express.Router();

roomController.get('/',  (_req: Request, res: Response): Response<JSON> => {
    const rooms: Room[] = RoomModel.getRooms();
    return res.json(rooms);
})

roomController.get('/:id', authenticateToken, (req: Request, res: Response): Response<JSON> => {
    const id: string = req.params.id;
    const room = RoomModel.getRoom(id);
    return res.json(room);
})

roomController.post('/', authenticateToken, (req: Request, res: Response): Response<JSON> => {
    const newRoom: Room = req.body as Room;
    RoomModel.addRoom(newRoom);
    return res.json(newRoom);
})

roomController.delete('/', authenticateToken, (req: Request, res: Response): Response<JSON> => {
    const id: string = req.body.id;
    const updatedRooms: Room[] = RoomModel.removeRoom(id);
    return res.json(updatedRooms);
})

roomController.put('/',  (req: Request, res: Response): Response<JSON> => {
    const modifiedRoom: Room = req.body;
    const updatedRooms: Room[] = RoomModel.modifyRoom(modifiedRoom);
    return res.json(updatedRooms);
})

export default roomController;