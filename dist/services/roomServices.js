"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModel = void 0;
const mockRooms_1 = __importDefault(require("../data/mockRooms"));
class RoomModel {
    static getRooms() {
        return mockRooms_1.default;
    }
    static getRoom(id) {
        const room = mockRooms_1.default.find(room => room.id === id);
        if (!room)
            throw new Error('No room found');
        return room;
    }
    static addRoom(room) {
        mockRooms_1.default.push(room);
        return room;
    }
    static removeRoom(id) {
        const updatedRooms = mockRooms_1.default.filter(room => room.id !== id);
        return updatedRooms;
    }
    static modifyRoom(modifiedRoom) {
        const updatedRooms = mockRooms_1.default.map(room => room.id === modifiedRoom.id ? room = modifiedRoom : room);
        return updatedRooms;
    }
}
exports.RoomModel = RoomModel;
