import express, { Request, Response } from 'express';
import { BookingModel } from '../services/bookingServices';
import Booking from '../interfaces/booking';

const bookingController = express.Router();

bookingController.get('/', (_req: Request, res: Response): Response<JSON> => {
    const bookings = BookingModel.getBookings();
    return res.json(bookings);
})

bookingController.get('/:id', (req: Request, res: Response): Response<JSON> => {
    const id = req.params.id;
    const booking = BookingModel.getBooking(id);
    return res.json(booking);
})

bookingController.post('/', (req: Request, res: Response): Response<JSON> => {
    const newBooking = req.body as Booking; // MAS SEGURO QUE const `newBooking: Booking`?
    BookingModel.addBooking(newBooking);
    return res.json(newBooking);
})

bookingController.delete('/', (req: Request, res: Response): Response<JSON> => {
    const id = req.body.id; // Mejor así o a través de URL?
    const updatedBookings = BookingModel.removeBooking(id);
    return res.json(updatedBookings);
})

bookingController.put('/', (req: Request, res: Response): Response<JSON> => {
    const modifiedBooking = req.body;
    const updatedBookings = BookingModel.modifyBooking(modifiedBooking);
    return res.json(updatedBookings);
})

export default bookingController;