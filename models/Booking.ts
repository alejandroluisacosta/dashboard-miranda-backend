import mongoose, { Schema } from "mongoose";
import Booking from "../interfaces/Booking";

const BookingSchema = new Schema<Booking>({
    name: { type: String, required: true },
    orderDate: { type: String, required: true },
    checkInDate: { type: String, required: true },
    checkOutDate: { type: String, required: true },
    specialRequest: { type: String, required: false },
    roomType: { type: String, required: true },
    status: { type: String, required: true },
    roomId: { type: String, required: true},
})

const BookingModel = mongoose.model<Booking>('BookingModel', BookingSchema, 'bookings');

export default BookingModel;