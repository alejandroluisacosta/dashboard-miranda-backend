import Room from "./Room";

interface Booking {
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

  export default Booking;