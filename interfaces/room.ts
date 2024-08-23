interface Room {
    id?: number;
    name: string;
    roomType: number;
    rate: number;
    amenities: string;
    offer: string
    discount?: number;
    description?: string;
    status: 'Available' | 'Booked';
    cancellationPolicies?: string;
    images: string[];
  }

  export default Room;