import Room from "../interfaces/Room";
import { connection } from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class RoomServices {

    static async getRooms(): Promise<Room[]> {
        const [rows] = await connection.query('SELECT * FROM rooms');
        return rows as Room[];
    }

    static async getRoom(identifier: string | number): Promise<Room> {
        let rows: Room[] = [];

        if (typeof identifier === 'number') {
            const [result] = await connection.query<RowDataPacket[]>('SELECT * FROM rooms WHERE id=?', [identifier]);
            rows = result as Room[];
        } else {
            const [result] = await connection.query<RowDataPacket[]>('SELECT * FROM rooms WHERE roomType=? AND status=? LIMIT 1', [identifier, 'Available']);
            rows = result as Room[];
        }

        if (!rows[0]) {
            throw new Error('No room found');
        }
        
        return rows[0] as Room;
    }

    static async addRoom(room: Room): Promise<Room> {
        const [result] = await connection.query<ResultSetHeader>('INSERT INTO rooms (image, name, roomType, amenities, rate, offer, discount, description, status, cancellationPolicies) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [room.image, room.name, room.roomType, room.amenities, room.rate, room.offer, room.discount, room.description, room.status, room.cancellationPolicies]);

        const id = result.insertId;
        return { ...room, id };
    }

    static async removeRoom(id: number): Promise<void> {
        await connection.query('DELETE FROM rooms WHERE id=?', [id]);
    }

    static async modifyRoom(id: number, modifiedRoom: Room): Promise<Room> {
        await connection.query(
            'UPDATE rooms SET image=?, name=?, roomType=?, amenities=?, rate=?, offer=?, discount=?, description=?, status=?, cancellationPolicies=? WHERE id=?',
            [modifiedRoom.image, modifiedRoom.name, modifiedRoom.roomType, modifiedRoom.amenities, modifiedRoom.rate, modifiedRoom.offer, modifiedRoom.discount, modifiedRoom.description, modifiedRoom.status, modifiedRoom.cancellationPolicies, id]
        );

        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM rooms WHERE id=?', [id]);

        return rows[0] as Room;
    }

  }