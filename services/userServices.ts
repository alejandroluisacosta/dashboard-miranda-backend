import User from "../interfaces/User";
import bcrypt from 'bcryptjs';
import { connection } from '../db';
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class UserServices {

    static async getUsers(): Promise<User[]> {
        const [rows] = await connection.query('SELECT * FROM users');
        return rows as User[];
    }

    static async getUser(identifier: number | string): Promise<User> {
        let rows: User[] = []

        if (typeof identifier === 'number') {
            const [result] = await connection.query<RowDataPacket[]>('SELECT * FROM users WHERE id=?', [identifier]);
            rows = result as User[];
        } else {
            const [result] = await connection.query<RowDataPacket[]>('SELECT * FROM users WHERE userName=?', [identifier]);
            rows = result as User[];
        }

        if (!rows[0]) {
            throw new Error('No user found');
        }
        return rows[0] as User;
    }

    static async addUser(user: User): Promise<User> {
        const plainTextPassword: string = user.password;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
        const [result] = await connection.query<ResultSetHeader>(
            'INSERT INTO users (name, userName, image, incorporatedOn, jobDesk, schedule, phone, status, role, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [user.name, user.userName, user.image, user.incorporatedOn, user.jobDesk, user.schedule, user.phone, user.status, user.role, user.email, hashedPassword]
        );
        
        const id = result.insertId;
        return { ...user, id } as User;
    }

    static async removeUser(id: number): Promise<void> {
        await connection.query('DELETE FROM users WHERE id=?', [id]);
    }

    static async modifyUser(id: number, modifiedUser: User): Promise<User> {
        await connection.query(
            'UPDATE users SET name=?, userName=?, image=?, incorporatedOn=?, jobDesk=?, schedule=?, phone=?, status=?, role=?, email=?, WHERE id=?',
            [modifiedUser.name, modifiedUser.userName, modifiedUser.image, modifiedUser.incorporatedOn, modifiedUser.jobDesk, modifiedUser.schedule, modifiedUser.phone, modifiedUser.status, modifiedUser.role, modifiedUser.email, id]
        );

        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM users WHERE id=?', [id]);

        return rows[0] as User;
    }
  }