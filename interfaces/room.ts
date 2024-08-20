interface Room {
    id?: number;
    image: string;
    name: string;
    roomType: string;
    amenities: string;
    rate: number;
    offer: string
    discount?: number;
    description?: string;
    status: 'Available' | 'Booked';
    cancellationPolicies?: string;
  }

  export default Room;