
  interface Booking {
      name: string;
      id?: string;
      orderDate: string;
      checkInDate: string;
      checkOutDate: string;
      specialRequest?: string;
      roomType: string;
      status: string;
      roomId: string | undefined;
    }

    export default Booking;