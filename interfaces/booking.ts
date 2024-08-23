
  interface Booking {
      name: string;
      id?: number;
      orderDate: string;
      checkInDate: string;
      checkOutDate: string;
      specialRequest?: string;
      roomType: number;
      status: string;
      roomId: number | undefined;
    }

    export default Booking;