import { faker } from '@faker-js/faker'
import User from './interfaces/User';
import { UserServices } from './services/userServices';
import { connection } from './db';
import Booking from './interfaces/Booking';
import { BookingServices } from './services/bookingServices';
import { RoomServices } from './services/roomServices';
import Room from './interfaces/Room';
import Comment from './interfaces/Comment';
import CommentModel from './models/Comment';
import 'dotenv/config';
import { startServer } from './app';

const NUM_BOOKINGS = 200;
const NUM_COMMENTS = 50;
const NUM_USERS = 20;
const NUM_ROOMS = 50;

startServer();

const run = async () => {
    await connection.query('USE miranda');

    await connection.query('DROP TABLE bookings');
    await connection.query('DROP TABLE rooms');
    await connection.query('DROP TABLE users');

    await connection.query(`
        CREATE TABLE IF NOT EXISTS rooms (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            roomType INT,
            rate INT NOT NULL,
            offer VARCHAR(10) NOT NULL,
            discount TINYINT,
            description VARCHAR(300),
            status VARCHAR(255) NOT NULL,
            cancellationPolicies VARCHAR(300),
            FOREIGN KEY (roomType) REFERENCES room_types(id)
        );
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            orderDate VARCHAR(255) NOT NULL,
            checkInDate VARCHAR(255) NOT NULL,
            checkOutDate VARCHAR(255) NOT NULL,
            specialRequest VARCHAR(300),
            roomType VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL,
            roomId INT,
            FOREIGN KEY (roomId) REFERENCES rooms(id)
        )
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            userName VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            incorporatedOn VARCHAR(10) NOT NULL,
            jobDesk VARCHAR(255) NOT NULL,
            schedule VARCHAR(50) NOT NULL,
            phone VARCHAR(30) NOT NULL,
            status VARCHAR(15) NOT NULL,
            role VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `);

    const createdBookings = [];
    const createdComments = [];
    const createdRooms = [];
    const createdUsers = [];


    const allAmenities = ["Gym", "Pool", "Jacuzzi", "Room Service", "TV", "Hot Water"];
    const getRandomAmenities = (maxItems: number): string => {
        const shuffled = allAmenities.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, maxItems).join(', ');
    }

    for (let i = 0; i < NUM_ROOMS; i++) {
        const roomData: Room = {
            name: faker.person.fullName(),
            roomType: faker.number.int({ min: 1, max: 4 }),
            amenities: getRandomAmenities(4),
            rate: faker.number.int(99),
            offer: Math.random() < 0.5 ? 'Yes' : 'No',
            discount: faker.number.int(99),
            description: faker.lorem.sentence(6),
            status: Math.random() < 0.5 ? 'Available' : 'Booked',
            cancellationPolicies: faker.lorem.sentence(4),
            }
            const newRoom = await RoomServices.addRoom(roomData);
            createdRooms.push(newRoom);
    }

    for (let i = 0; i < NUM_BOOKINGS; i++) {
        const orderDate: Date = faker.date.between({ from: '2024-01-01T00:00:00.000Z', to: '2024-12-31T00:00:00.000Z' });
        const checkInDate: Date = new Date(orderDate);
        checkInDate.setDate(orderDate.getDate() + faker.number.int({ min: 1, max: 10 }));
        const checkOutDate: Date = new Date(checkInDate);
        checkOutDate.setDate(checkInDate.getDate() + faker.number.int({ min: 2, max: 20 }));
        const roomId: number = (createdRooms[Math.floor(Math.random() * 50)] as { id: number }).id;
        const roomType: number = createdRooms.find(room => room.id === roomId)!.roomType as number;

        const bookingData: Booking = {
            name: faker.person.fullName(),
            orderDate: orderDate.toISOString().split('T')[0],
            checkInDate: checkInDate.toISOString().split('T')[0],
            checkOutDate: checkOutDate.toISOString().split('T')[0],
            specialRequest: faker.lorem.sentence(6),
            roomType: roomType,
            status: Math.random() < 0.5 ? 'Check-In' : 'Check-Out',
            roomId: roomId,
        }
        const newBooking = await BookingServices.addBooking(bookingData);
        createdBookings.push(newBooking);
    }

    for (let i = 0; i < NUM_USERS; i++) {
        const userData: User = {
            name: faker.person.fullName(),
            userName: faker.internet.userName(),
            image: faker.image.urlPicsumPhotos(),
            incorporatedOn: '01-01-24',
            jobDesk: faker.lorem.sentence(4),
            schedule: 'Monday - Friday',
            phone: faker.phone.number(),
            status: 'Available',
            role: faker.person.jobTitle(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }
        const newUser = await UserServices.addUser(userData);
        createdUsers.push(newUser);
    }

    for (let i = 0; i < NUM_COMMENTS; i++) {
        const commentData: Comment = {
            text: faker.lorem.sentence(10),
            userName: faker.internet.userName(),
            timestamp: '01-01-01',
            read: Math.random() < 0.5 ? true : false,
        }
        const newComment = new CommentModel(commentData);
        await newComment.save();
        createdComments.push(newComment);
    }
}

run();