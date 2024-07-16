import mockBookings from "../data/bookings";
import Booking from "../interfaces/booking";

export class BookingModel {

    static getBookings(): Booking[] {
        return mockBookings;
    }

    static getBooking(id: string): Booking {
        const booking = mockBookings.find(booking => booking.id === id);
        if (!booking)
            throw new Error('No booking found');
        return booking;
    }

    static addBooking(booking: Booking): Booking {
        mockBookings.push(booking);
        return booking;
    }

    static removeBooking(id: string): Booking[] {
        const updatedBookings = mockBookings.filter(booking => booking.id !== id);
        return updatedBookings;
    }

    static modifyBooking(modifiedBooking: Booking): Booking[] {
        mockBookings.map(booking => 
            booking.id === modifiedBooking.id ? booking = modifiedBooking : booking
        );
        return mockBookings;
    }

  }