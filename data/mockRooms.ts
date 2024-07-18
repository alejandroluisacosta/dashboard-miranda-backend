import Room from "../interfaces/Room";

const mockRooms: Room[] = [
    {
      name: 'Deluxe A-91235',
      id: '1234',
      image: '/assets/HotelRoom3.jpeg',
      roomType: 'Single Bed',
      amenities: 'Ocean view, King bed, Jacuzzi',
      rate: 300,
      offer: '20% off',
      status: 'Available',
      discount: 0,
    },
    {
      name: 'Deluxe A-91234',
      id: '5678',
      image: '/assets/HotelRoom3.jpeg',
      roomType: 'Single Bed',
      amenities: 'Queen bed, City view',
      rate: 150,
      offer: '10% off',
      status: 'Available',
      discount: 0,
    },
    {
      name: 'Deluxe A-91234',
      id: '9012',
      image: '/assets/HotelRoom3.jpeg',
      roomType: 'Double Bed',
      amenities: 'City view, Living room, Kitchenette',
      rate: 400,
      offer: '30% off',
      status: 'Booked',
      discount: 0,
    },
    {
      name: 'Deluxe A-91234',
      id: '3456',
      image: '/assets/HotelRoom3.jpeg',
      roomType: 'Double Superior',
      amenities: 'Two bedrooms, Garden view',
      rate: 250,
      offer: '15% off',
      status: 'Available',
      discount: 0,
    },
    {
      name: 'Deluxe A-91234',
      id: '7890',
      image: '/assets/HotelRoom3.jpeg',
      roomType: 'Suite',
      amenities: 'Ocean view, Balcony',
      rate: 350,
      offer: '25% off',
      status: 'Booked',
      discount: 0,
    }
  ];

  export default mockRooms;