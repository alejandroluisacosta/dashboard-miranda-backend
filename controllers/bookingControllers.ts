import express, { Request, Response, NextFunction } from 'express';
import { BookingModel } from '../services/bookingServices';
import Booking from '../interfaces/Booking';

const bookingController = express.Router();

bookingController.get('/', (_req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const bookings = BookingModel.getBookings();
        return res.json({ bookings: bookings });
    } catch (error) {
        next(error);
    }
});

bookingController.get('/:id', (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const id = req.params.id;
        const booking = BookingModel.getBooking(id);
        return res.json({ booking: booking });
    } catch (error) {
        next(error);
    }
});

bookingController.post('/', (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const newBooking = req.body as Booking;
        BookingModel.addBooking(newBooking);
        return res.json({ booking: newBooking });
    } catch (error) {
        next(error);
    }
});

bookingController.delete('/:id', (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const id = req.params.id;
        const updatedBookings = BookingModel.removeBooking(id);
        return res.json({ bookings: updatedBookings });
    } catch (error) {
        next(error);
    }
});

bookingController.put('/:id', (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const modifiedBooking = req.body;
        const updatedBookings = BookingModel.modifyBooking(modifiedBooking);
        return res.json({ bookings: updatedBookings });
    } catch (error) {
        next(error);
    }
})

export default bookingController;
