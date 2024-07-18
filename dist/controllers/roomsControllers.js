"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomServices_1 = require("../services/roomServices");
const roomsController = express_1.default.Router();
roomsController.get('/', (_req, res, next) => {
    try {
        const rooms = roomServices_1.RoomModel.getRooms();
        return res.json({ rooms: rooms });
    }
    catch (error) {
        next(error);
    }
});
roomsController.get('/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const room = roomServices_1.RoomModel.getRoom(id);
        return res.json({ room: room });
    }
    catch (error) {
        next(error);
    }
});
roomsController.post('/', (req, res, next) => {
    try {
        const newRoom = req.body;
        roomServices_1.RoomModel.addRoom(newRoom);
        return res.json({ room: newRoom });
    }
    catch (error) {
        next(error);
    }
});
roomsController.delete('/', (req, res, next) => {
    try {
        const id = req.body.id;
        const updatedRooms = roomServices_1.RoomModel.removeRoom(id);
        return res.json({ rooms: updatedRooms });
    }
    catch (error) {
        next(error);
    }
});
roomsController.put('/', (req, res, next) => {
    try {
        const modifiedRoom = req.body;
        const updatedRooms = roomServices_1.RoomModel.modifyRoom(modifiedRoom);
        return res.json({ rooms: updatedRooms });
    }
    catch (error) {
        next(error);
    }
});
exports.default = roomsController;
