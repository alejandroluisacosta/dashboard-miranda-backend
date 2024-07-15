export interface Room {
    id: string;
    image: string;
    name: string;
    roomType: string;
    amenities: string;
    rate: number;
    offer: string
    discount: number;
    description?: string;
    status: 'Available' | 'Booked';
    cancellationPolicies?: string;
  }

export interface Booking {
    name: string;
    id: string;
    orderDate: string;
    checkInDate: string;
    checkOutDate: string;
    specialRequest: string;
    roomType: string;
    status: string;
    room: Room;
  }

export interface User {
    name: string;
    id: string;
    image: string;
    incorporatedOn: string;
    jobDesk: string;
    schedule?: string;
    phone: string;
    status: string;
    role?: string;
    email?: string;
}