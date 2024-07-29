import { BookingServices } from "../services/bookingServices";
import mockBookings from '../data/mockBookings';

const request = require('supertest');
const { app }  = require('../app');

describe('Bookings controller tests', () => {
  let token: string;
  
  beforeEach(async () => {
    const authRes = await request(app)
      .post('/login')
      .send({
        "username": "John",
        "password": "1234"
      })
      .set("Content-Type", "application/json");

      token = authRes.body.token
  })

  it('getBookings returns array of bookings instances', async () => {
    const res = await request(app)
      .get('/bookings')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      
    expect(res.body).toMatchObject({ bookings: BookingServices.getBookings() })
  })

  it('getBooking returns a single instance of Booking', async() => {
    const res = await request(app)
      .get('/bookings/1234')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')

    expect(res.body).toMatchObject({ booking: BookingServices.getBooking('1234') });
  })

  it('addBooking returns a single instance of Booking', async() => {
    const newBooking = ({
      "name": "Aaron Glover",
      "orderDate": "2024-03-04",
      "checkInDate": "2024-03-11",
      "checkOutDate": "2024-03-19",
      "specialRequest": "Deficio corroboro votum amplexus aureus conicio.",
      "roomType": "Adhaero coniecto adeptio.",
      "status": "Check-Out",
      "roomId": "66a0e3bf3b7710011d2d4923"
    })
    const res = await request(app)
      .post('/bookings')
      .send(newBooking)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.body).toMatchObject({ booking: BookingServices.addBooking(newBooking) });
  })

  it('removeBookings returns an array of booking instances', async() => {
    const res = await request(app)
      .delete('/bookings')
      .send({ id: '1234' })
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.body).toMatchObject({ bookings: BookingServices.removeBooking('1234') });
  })

  it('modifyBookings returns an array of booking instances', async() => {
    const mockBookingsCopy = [...mockBookings];
    mockBookingsCopy[0].name = "George Clooney";

    const res = await request(app)
      .put('/bookings')
      .send({ ...mockBookings[0], name: "George Clooney"})
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.body).toMatchObject({ bookings: BookingServices.modifyBooking({...mockBookingsCopy[0], name: "George Clooney"}) });
  })
})