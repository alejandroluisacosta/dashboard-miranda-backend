import mockRooms from "../data/mockRooms";
import Room from "../interfaces/Room";
import RoomModel from '../models/Room';

export class RoomServices {

    static async getRooms(): Promise<Room[]> {
        const allRooms: Room[] = await RoomModel.find().exec();
        return allRooms;
    }

    static getRoom(id: string): Room {
        const room = mockRooms.find(room => room.id === id);
        if (!room)
            throw new Error('No room found');
        return room;
    }

    static addRoom(room: Room): Room {
        mockRooms.push(room);
        return room;
    }

    static removeRoom(id: string): Room[] {
        const updatedRooms = mockRooms.filter(room => room.id !== id);
        return updatedRooms;
    }

    static modifyRoom(modifiedRoom: Room): Room[] {
        const updatedRooms = mockRooms.map(room => 
            room.id === modifiedRoom.id ? room = modifiedRoom : room
        );
        return updatedRooms;
    }

  }