import Room from "../interfaces/Room";
import { connection } from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class RoomServices {

    static async getRooms(): Promise<Room[]> {
        const [rows] = await connection.query(`
            SELECT r.*, 
                   GROUP_CONCAT(DISTINCT i.url ORDER BY i.url ASC) AS images,
                   GROUP_CONCAT(DISTINCT a.amenity ORDER BY a.amenity ASC) AS amenities
            FROM rooms r
            LEFT JOIN room_types_images rti ON r.roomType = rti.roomType
            LEFT JOIN images i ON rti.imageId = i.id
            LEFT JOIN rooms_amenities ra ON r.id = ra.roomId
            LEFT JOIN amenities a ON ra.amenityId = a.id
            GROUP BY r.id;
        `);
        
        return rows as Room[];
    }

    static async getRoom(identifier: string | number): Promise<Room> {
        let rows: Room[] = [];

        if (typeof identifier === 'number') {
            const [result] = await connection.query<RowDataPacket[]>(`
                SELECT r.*, 
                       GROUP_CONCAT(DISTINCT i.url ORDER BY i.url ASC) AS images,
                       GROUP_CONCAT(DISTINCT a.amenity ORDER BY a.amenity ASC) AS amenities
                FROM rooms r
                LEFT JOIN room_types_images rti ON r.roomType = rti.roomType
                LEFT JOIN images i ON rti.imageId = i.id
                LEFT JOIN rooms_amenities ra ON r.id = ra.roomId
                LEFT JOIN amenities a ON ra.amenityId = a.id
                WHERE r.id = ?
                GROUP BY r.id;`, [identifier]
            );
            
            rows = result as Room[];
        } else {
            const [result] = await connection.query<RowDataPacket[]>(`
                SELECT r.*, 
                       GROUP_CONCAT(DISTINCT i.url ORDER BY i.url ASC) AS images,
                       GROUP_CONCAT(DISTINCT a.amenity ORDER BY a.amenity ASC) AS amenities
                FROM rooms r
                LEFT JOIN room_types_images rti ON r.roomType = rti.roomType
                LEFT JOIN images i ON rti.imageId = i.id
                LEFT JOIN rooms_amenities ra ON r.id = ra.roomId
                LEFT JOIN amenities a ON ra.amenityId = a.id
                WHERE r.roomType = ? AND r.status = ?
                GROUP BY r.id
                LIMIT 1;`, [identifier, 'Available']
            );
            rows = result as Room[];
        }

        if (!rows[0]) {
            throw new Error('No room found');
        }
        
        return rows[0] as Room;
    }

    static async addRoom(room: Room): Promise<Room> {
        const [result] = await connection.query<ResultSetHeader>('INSERT INTO rooms (name, roomType, rate, offer, discount, description, status, cancellationPolicies) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)',
            [room.name, room.roomType, room.rate, room.offer, room.discount, room.description, room.status, room.cancellationPolicies]);

        const roomId = result.insertId;

        const amenities = room.amenities.split(',').map(amenity => amenity.trim());

        for (const amenity of amenities) {
            const [amenityResult] = await connection.query<RowDataPacket[]>(
                'SELECT id FROM amenities WHERE amenity=?',
                [amenity]
            );
            if (amenityResult.length) {
                const amenityId = amenityResult[0].id;
                await connection.query(
                    'INSERT INTO rooms_amenities (roomId, amenityId) VALUES (?, ?)',
                    [roomId, amenityId]
                );
            }
        }

        return { ...room, id: roomId };
    }

    static async removeRoom(id: number): Promise<void> {
        await connection.query('DELETE FROM rooms WHERE id=?', [id]);
    }

    static async modifyRoom(id: number, modifiedRoom: Room): Promise<Room> {
        await connection.query(
            'UPDATE rooms SET name=?, roomType=?, rate=?, offer=?, discount=?, description=?, status=?, cancellationPolicies=? WHERE id=?',
            [modifiedRoom.name, modifiedRoom.roomType, modifiedRoom.rate, modifiedRoom.offer, modifiedRoom.discount, modifiedRoom.description, modifiedRoom.status, modifiedRoom.cancellationPolicies, id]
        );

        await connection.query('DELETE FROM rooms_amenities WHERE roomId=?', [id]);
        
        const amenities = modifiedRoom.amenities.split(',').map(amenity => amenity.trim());
        for (const amenity of amenities) {
            const [amenityResult] = await connection.query<RowDataPacket[]>(
                'SELECT id FROM amenities WHERE amenity=?',
                [amenity]
            );
            if (amenityResult.length) {
                const amenityId = amenityResult[0].id;
                await connection.query(
                    'INSERT INTO rooms_amenities (roomId, amenityId) VALUES (?, ?)',
                    [id, amenityId]
                );
            }
        }        

        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM rooms WHERE id=?', [id]);

        return rows[0] as Room;
    }

  }