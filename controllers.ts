import express, { Request, Response } from 'express';
export const router = express.Router();
import { BookingModel } from './services';
import { Booking } from './types';

router.get('/bookings', (_req: Request, res: Response): Response<JSON> => {
    const bookings = BookingModel.getBookings();
    return res.json(bookings);
})

router.get('/bookings', (req: Request, res: Response): Response<JSON> => {
    const id = req.params.id;
    const booking = BookingModel.getBooking(id);
    return res.json(booking);
})

router.post('/bookings', (req: Request, res: Response): Response<JSON> => {
    const newBooking= req.body as Booking; // MAS SEGURO QUE const `newBooking: Booking`?
    console.log(req.body);
    BookingModel.addBooking(newBooking);
    return res.json(newBooking);
})