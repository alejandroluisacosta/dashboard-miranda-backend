import Booking from "../interfaces/Booking";
import { connection } from '../db'
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export class BookingServices {

    static async getBookings(): Promise<Booking[]> {
        const [rows] =  await connection.query('SELECT * FROM bookings');
        return rows as Booking[];
    }

    static async getBooking(id: string): Promise<Booking> {
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM bookings WHERE id = ?', [id])

        if (!rows[0]) {
            throw new Error('No booking found');
        }
        return rows[0] as Booking;
    }

    static async addBooking(booking: Booking): Promise<Booking> {
        const [result] = await connection.query<ResultSetHeader>('INSERT INTO bookings (name, orderDate, checkInDate, checkOutDate, specialRequest, roomType, status, roomId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [booking.name, booking.orderDate, booking.checkInDate, booking.checkOutDate, booking.specialRequest, booking.roomType, booking.status, booking.roomId]
        )

        const id = result.insertId;
        return { ...booking, id} as Booking;
    }

    static async removeBooking(id: string): Promise<void> {
       await connection.query('DELETE FROM bookings WHERE id=?', [id]);
    }

    static async modifyBooking(id: string, modifiedBooking: Booking): Promise<Booking> {
        await connection.query(
            'UPDATE bookings SET name=?, orderDate=?, checkInDate=?, checkOutDate=?, specialRequest=?, roomType=?, status=?, roomId=? WHERE id=?',
            [modifiedBooking.name, modifiedBooking.orderDate, modifiedBooking.checkInDate, modifiedBooking.checkOutDate, modifiedBooking.specialRequest, modifiedBooking.roomType, modifiedBooking.status, modifiedBooking.roomId, id]
        );

        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM bookings WHERE id=?', [id]);

        return rows[0] as Booking;
    }
  }