import { BookingModel } from "../services/bookingServices";

const request = require('supertest');
const { app }  = require('../index');

describe('Bookings controller tests', () => {
  it('getBookings returns array of bookings instances', async () => {
    const res = await request(app)
      .get('/bookings')
    expect(res.body).toMatchObject(BookingModel.getBookings())
  })
})