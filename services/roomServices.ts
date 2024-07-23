import mockRooms from "../data/mockRooms";
import Room from "../interfaces/Room";
import RoomModel from '../models/Room';

export class RoomServices {

    static async getRooms(): Promise<Room[]> {
        const allRooms: Room[] = await RoomModel.find().exec();
        return allRooms;
    }

    static async getRoom(id: string): Promise<Room> {
        const room: Room | null = await RoomModel.findById(id);
        if (!room)
            throw new Error('No room found');
        return room;
    }

    static async addRoom(room: Room): Promise<Room> {
        const newRoom = new RoomModel(room);
        await newRoom.save();
        return newRoom;
    }

    static async removeRoom(id: string): Promise<void> {
        await RoomModel.findByIdAndDelete(id);
    }

    static async modifyRoom(modifiedRoom: Room): Promise<Room> {
        await RoomModel.findByIdAndUpdate(modifiedRoom.id, modifiedRoom)
        return modifiedRoom;
    }

  }