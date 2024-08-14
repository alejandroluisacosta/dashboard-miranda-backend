import mongoose from "mongoose";
import Room from "../interfaces/Room";
import RoomModel from '../models/Room';

export class RoomServices {

    static async getRooms(): Promise<Room[]> {
        const allRooms: Room[] = await RoomModel.find().exec();
        return allRooms;
    }

    static async getRoom(identifier: string): Promise<Room> {
        let room: Room | null = null;

        if (mongoose.isValidObjectId(identifier)) {
            room = await RoomModel.findById(identifier)
        } else {
            room = await RoomModel.findOne({ roomType: identifier, status: 'Available'});
        }
        
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

    static async modifyRoom(id: string, modifiedRoom: Room): Promise<Room> {
        await RoomModel.findByIdAndUpdate(id, modifiedRoom)
        return modifiedRoom;
    }

  }