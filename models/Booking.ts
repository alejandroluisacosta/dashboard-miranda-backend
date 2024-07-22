import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema({
    name: { type: String, required: true },
    orderDate: { type: String, required: true },
    checkInDate: { type: String, required: true },
    checkOutDate: { type: String, required: true },
    specialRequest: { type: String, required: false },
    roomType: { type: String, required: true },
    status: { type: String, required: true },
    room: { type: Schema.Types.ObjectId, ref: 'RoomModel', required: true},
})

const BookingModel = mongoose.model('BookingModel', BookingSchema);

export default BookingModel;