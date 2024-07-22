// import mockBookings from "../data/mockBookings";
import Booking from "../interfaces/Booking";
import BookingModel from '../models/Booking';

export class BookingServices {

    static async getBookings(): Promise<Booking[]> {
        const allBookings =  await BookingModel.find().exec();
        return allBookings;
    }

    static async getBooking(id: string): Promise<Booking> {
        const booking = await BookingModel.findById(id);
        if (!booking)
            throw new Error('No booking found');
        return booking;
    }

    static async addBooking(booking: Booking): Promise<Booking> {
        const newBooking = new BookingModel(booking);
        await newBooking.save();
        return newBooking;
    }

    static removeBooking(id: string): void {
        BookingModel.findByIdAndDelete(id);
    }

    static modifyBooking(modifiedBooking: Booking): Booking {
        BookingModel.findByIdAndUpdate(modifiedBooking.id, modifiedBooking);
        return modifiedBooking;
    }

  }