import express, { Request, Response, NextFunction } from 'express';
import { BookingServices } from '../services/bookingServices';
import Booking from '../interfaces/Booking';

const bookingController = express.Router();

bookingController.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void > => {
    try {
        const bookings: Booking[] = await BookingServices.getBookings();
        return res.status(200).json({ bookings });
    } catch (error) {
        next(error);
    }
});

bookingController.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void > => {
    try {
        const id: string = req.params.id;
        const booking = await BookingServices.getBooking(id);
        return res.status(200).json({ booking });
    } catch (error) {
        next(error);
    }
});

bookingController.post('/', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void > => {
    try {
        
        const newBooking: Booking = req.body as Booking;
        const addedBooking = await BookingServices.addBooking(newBooking);
        return res.status(201).json({ booking: addedBooking });
    } catch (error) {
        next(error);
    }
});

bookingController.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void > => {
    try {
        const id: string = req.params.id;
        await BookingServices.removeBooking(id);
        return res.status(204).send(); 
    } catch (error) {
        next(error);
    }
});

bookingController.put('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response<JSON> | void > => {
    try {
        const modifiedBooking: Booking = req.body;
        const updatedBooking: Booking = await BookingServices.modifyBooking(modifiedBooking);
        return res.status(200).json({ booking: updatedBooking });
    } catch (error) {
        next(error);
    }
})

export default bookingController;
