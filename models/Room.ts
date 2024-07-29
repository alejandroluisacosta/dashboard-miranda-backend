import mongoose, { Schema } from "mongoose";
import Room from "../interfaces/Room";

const RoomSchema = new Schema<Room>({
    image: { type: [String], required: true },
    name: { type: String, required: true },
    roomType: { type: String, required: true },
    amenities: { type: String, required: true },
    rate: { type: Number, required: true },
    offer: { type: String, required: true },
    discount: { type: Number, required: false },
    description: { type: String, required: false },
    status: { type: String, enum: ['Available', 'Booked'], required: true },
    cancellationPolicies: { type: String, required: false },
})

const RoomModel = mongoose.model('RoomModel', RoomSchema, 'rooms');

export default RoomModel;