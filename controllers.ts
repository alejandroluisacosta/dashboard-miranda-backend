import express, { Request, Response } from 'express';
export const router = express.Router();
import { BookingModel } from './services';
import { Booking } from './types';

router.get('/bookings', (_req: Request, res: Response): Response<JSON> => {
    const bookings = BookingModel.getBookings();
    return res.json(bookings);
})

router.get('/bookings/:id', (req: Request, res: Response): Response<JSON> => {
    const id = req.params.id;
    const booking = BookingModel.getBooking(id);
    return res.json(booking);
})

router.post('/bookings', (req: Request, res: Response): Response<JSON> => {
    const newBooking = req.body as Booking; // MAS SEGURO QUE const `newBooking: Booking`?
    BookingModel.addBooking(newBooking);
    return res.json(newBooking);
})

router.delete('/bookings', (req: Request, res: Response): Response<JSON> => {
    const id = req.body.id; // Mejor así o a través de URL?
    const updatedBookings = BookingModel.removeBooking(id);
    return res.json(updatedBookings);
})

router.put('/bookings', (req: Request, res: Response): Response<JSON> => {
    const modifiedBooking = req.body;
    const updatedBookings = BookingModel.modifyBooking(modifiedBooking);
    return res.json(updatedBookings);
})