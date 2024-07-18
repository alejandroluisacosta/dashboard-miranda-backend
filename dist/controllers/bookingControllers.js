"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingServices_1 = require("../services/bookingServices");
const bookingController = express_1.default.Router();
bookingController.get('/', (_req, res, next) => {
    try {
        const bookings = bookingServices_1.BookingModel.getBookings();
        return res.json({ bookings: bookings });
    }
    catch (error) {
        next(error);
    }
});
bookingController.get('/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const booking = bookingServices_1.BookingModel.getBooking(id);
        return res.json({ booking: booking });
    }
    catch (error) {
        next(error);
    }
});
bookingController.post('/', (req, res, next) => {
    try {
        const newBooking = req.body;
        bookingServices_1.BookingModel.addBooking(newBooking);
        return res.json({ booking: newBooking });
    }
    catch (error) {
        next(error);
    }
});
bookingController.delete('/', (req, res, next) => {
    try {
        const id = req.body.id;
        const updatedBookings = bookingServices_1.BookingModel.removeBooking(id);
        return res.json({ bookings: updatedBookings });
    }
    catch (error) {
        next(error);
    }
});
bookingController.put('/', (req, res, next) => {
    try {
        const modifiedBooking = req.body;
        const updatedBookings = bookingServices_1.BookingModel.modifyBooking(modifiedBooking);
        return res.json({ bookings: updatedBookings });
    }
    catch (error) {
        next(error);
    }
});
exports.default = bookingController;
