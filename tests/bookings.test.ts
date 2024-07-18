import { BookingModel } from "../services/bookingServices";
import mockBookings from '../data/mockBookings';

const request = require('supertest');
const { app }  = require('../index');

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
      
    expect(res.body).toMatchObject({ bookings: BookingModel.getBookings() })
  })

  it('getBooking returns a single instance of Booking', async() => {
    const res = await request(app)
      .get('/bookings/1234')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')

    expect(res.body).toMatchObject({ booking: BookingModel.getBooking('1234') });
  })

  it('addBooking returns a single instance of Booking', async() => {
    const res = await request(app)
      .post('/bookings')
      .send(mockBookings[0])
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.body).toMatchObject({ booking: BookingModel.addBooking(mockBookings[0]) });
  })

  it('removeBookings returns an array of booking instances', async() => {
    const res = await request(app)
      .delete('/bookings')
      .send({ id: '1234' })
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.body).toMatchObject({ bookings: BookingModel.removeBooking('1234') });
  })

  it('modifyBookings returns an array of booking instances', async() => {
    const mockBookingsCopy = [...mockBookings];
    mockBookingsCopy[0].name = "George Clooney";

    const res = await request(app)
      .put('/bookings')
      .send({ ...mockBookings[0], name: "George Clooney"})
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.body).toMatchObject({ bookings: BookingModel.modifyBooking({...mockBookingsCopy[0], name: "George Clooney"}) });
  })
})