import { faker } from '@faker-js/faker'
import User from './interfaces/User';
import { UserServices } from './services/userServices';
import { connectDB } from './db';
import Booking from './interfaces/booking';
import { BookingServices } from './services/bookingServices';
import { RoomServices } from './services/roomServices';
import Room from './interfaces/Room';
import Comment from './interfaces/Comment';
import CommentModel from './models/Comment';
import mongoose from 'mongoose';
import 'dotenv/config';

const NUM_BOOKINGS = 200;
const NUM_COMMENTS = 50;
const NUM_USERS = 20;
const NUM_ROOMS = 50;

connectDB().catch(err => console.log(err));

const run = async () => {
    mongoose.connection.dropDatabase();
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
            image: [faker.image.url()],
            name: faker.person.fullName(),
            roomType: faker.lorem.sentence(3),
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
        const roomId: string = (createdRooms[Math.floor(Math.random() * 50)] as { _id: string })._id;
        const roomType: string = createdRooms.find(room => room._id === roomId)!.roomType as string;

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