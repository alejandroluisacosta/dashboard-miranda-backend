import express, { Request, Response } from 'express';
export const router = express.Router();
import { BookingModel } from './services';

router.get('/bookings', (_req: Request, res: Response) => {
    const bookings = BookingModel.getBookings();
    return res.json(bookings);
})

