import { RoomServices } from '../services/roomServices';
import mockRooms from '../data/mockRooms';

const request = require('supertest');
const { app }  = require('../index');

describe('Rooms controller tests', () => {
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

  it('getRooms returns array of Rooms instances', async () => {
    const res = await request(app)
      .get('/rooms')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      
    expect(res.body).toMatchObject({ rooms: RoomServices.getRooms() })
  })

  it('getRoom returns a single instance of Room', async() => {
    const res = await request(app)
      .get('/Rooms/1234')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')

    expect(res.body).toMatchObject({ room: RoomServices.getRoom('1234') });
  })

  it('addRoom returns a single instance of Room', async() => {
    const res = await request(app)
      .post('/rooms')
      .send(mockRooms[0])
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.body).toMatchObject({ room: RoomServices.addRoom(mockRooms[0]) });
  })

  it('removeRoom returns an array of Room instances', async() => {
    const res = await request(app)
      .delete('/rooms')
      .send({ id: '1234' })
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.body).toMatchObject({ rooms: RoomServices.removeRoom('1234') });
  })

  it('modifyRoom returns an array of Room instances', async() => {
    const mockRoomsCopy = [...mockRooms];
    mockRoomsCopy[0].name = "George Clooney";

    const res = await request(app)
      .put('/rooms')
      .send({ ...mockRooms[0], name: "The Super Room"})
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.body).toMatchObject({ rooms: RoomServices.modifyRoom({...mockRoomsCopy[0], name: "The Super Room"}) });
  })
})