import { Booking, Room } from './types';

const mockBookings: Booking[] = [
    {
      name: 'John Doe',
      id: '1234',
      orderDate: '2024-06-01',
      checkInDate: '2024-06-15',
      checkOutDate: '2024-06-17',
      specialRequest: "Could you please arrange for a quiet room overlooking the garden? We prefer a non-smoking room and would appreciate extra towels. Additionally, if possible, could we have a room on a higher floor? Thank you so much for your assistance and attention to these details!",
      roomType: 'Double Room',
      status: 'booked',
      room: {} as Room,
    },
    {
      name: 'Jane Smith',
      id: '3456',
      orderDate: '2024-06-02',
      checkInDate: '2024-06-18',
      checkOutDate: '2024-06-25',
      specialRequest: "",
      roomType: 'Single Room',
      status: 'pending',
      room: {} as Room,

    },
    {
      name: 'Michael Johnson',
      id: '7890',
      orderDate: '2024-06-05',
      checkInDate: '2024-06-20',
      checkOutDate: '2024-06-23',
      specialRequest: "Hello",
      roomType: 'Suite',
      status: 'cancelled',
      room: {} as Room,

    },
    {
      name: 'Emily Davis',
      id: '7891',
      orderDate: '2024-06-08',
      checkInDate: '2024-06-25',
      checkOutDate: '2024-06-28',
      specialRequest: "",
      roomType: 'Double Room',
      status: 'booked',
      room: {} as Room,

    },
    {
      name: 'Daniel Wilson',
      id: '7892',
      orderDate: '2024-06-10',
      checkInDate: '2024-06-22',
      checkOutDate: '2024-06-27',
      specialRequest: "Hello again",
      roomType: 'Single Room',
      status: 'pending',
      room: {} as Room,

    }
  ];

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