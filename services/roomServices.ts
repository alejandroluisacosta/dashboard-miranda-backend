import mockRooms from "../data/mockRooms";
import Room from "../interfaces/room";

export class RoomModel {

    static getRooms(): Room[] {
        return mockRooms;
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