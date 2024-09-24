// import { ObjectId } from "mongodb";
import Booking from "../interfaces/booking";
import BookingModel from '../models/Booking';

export class BookingServices {

    static async getBookings(): Promise<Booking[]> {
        const allBookings: Booking[] =  await BookingModel.find().exec();
        return allBookings;
    }

    static async getBooking(id: string): Promise<Booking> {
        const booking: Booking | null = await BookingModel.findById(id);
        if (!booking)
            throw new Error('No booking found');
        return booking;
    }

    static async addBooking(booking: Booking): Promise<Booking> {
        const newBooking = new BookingModel(booking);
        await newBooking.save();
        return newBooking;
    }

    static async removeBooking(id: string): Promise<void> {
       await BookingModel.findByIdAndDelete(id);
    }

    static async modifyBooking(id: string, modifiedBooking: Booking): Promise<Booking> {
        await BookingModel.findByIdAndUpdate(id, modifiedBooking);
        return modifiedBooking;
    }
  }