"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mockBookings_1 = __importDefault(require("../data/mockBookings"));
class BookingModel {
    static getBookings() {
        return mockBookings_1.default;
    }
    static getBooking(id) {
        const booking = mockBookings_1.default.find(booking => booking.id === id);
        if (!booking)
            throw new Error('No booking found');
        return booking;
    }
    static addBooking(booking) {
        mockBookings_1.default.push(booking);
        return booking;
    }
    static removeBooking(id) {
        const updatedBookings = mockBookings_1.default.filter(booking => booking.id !== id);
        return updatedBookings;
    }
    static modifyBooking(modifiedBooking) {
        const updatedBookings = mockBookings_1.default.map(booking => booking.id === modifiedBooking.id ? modifiedBooking : booking);
        return updatedBookings;
    }
}
exports.BookingModel = BookingModel;
