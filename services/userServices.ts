import User from "../interfaces/User";
import bcrypt from 'bcryptjs';
import { connection } from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class UserServices {

    static async getUsers(): Promise<User[]> {
        const [rows] = await connection.query('SELECT * FROM users');
        return rows as User[];
    }

    static async getUser(id: string): Promise<User> {
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM users WHERE id=?', [id]);
        if (!rows[0]) {
            throw new Error('No user found');
        }
        return rows[0] as User;
    }

    static async addUser(user: User): Promise<User> {
        const plainTextPassword: string = user.password;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
        const [result] = await connection.query<ResultSetHeader>('INSERT INTO users (name, userName, image, incorporatedON, jobDesk, schedule, phone, status, role, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [user.name, user.userName, user.image, user.incorporatedOn, user.jobDesk, user.schedule, user.phone, user.status, user.role, user.role, user.email, hashedPassword]
        );
        
        const id = result.insertId;
        return { ...user, id } as User;
    }

    static async removeUser(id: string): Promise<void> {
        await connection.query('DELETE FROM rooms WHERE id=?', [id]);
    }

    static async modifyUser(id: string, modifiedUser: User): Promise<User> {
        await connection.query(
            'UPDATE users SET name=?, userName=?, image=?, incorporatedOn=?, jobDesk=?, schedule=?, phone=?, status=?, role=?, email=?, password=? WHERE id=?',
            [modifiedUser.name, modifiedUser.userName, modifiedUser.image, modifiedUser.incorporatedOn, modifiedUser.jobDesk, modifiedUser.schedule, modifiedUser.phone, modifiedUser.status, modifiedUser.role, modifiedUser.email, modifiedUser.password, id]
        );

        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM users WHERE id=?', [id]);

        return rows[0] as User;
    }
  }