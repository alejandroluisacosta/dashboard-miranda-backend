import { UserServices } from '../services/userServices';
import mockUsers from '../data/mockUsers';

const request = require('supertest');
const { app }  = require('../index');

describe('Users controller tests', () => {
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

  it('getUsers returns array of User instances', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      
    expect(res.body).toMatchObject({ users: UserServices.getUsers() })
  })

  it('getUser returns a single instance of User', async() => {
    const res = await request(app)
      .get('/users/001')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')

    expect(res.body).toMatchObject({ user: UserServices.getUser('001') });
  })

  it('addUser returns a single instance of User', async() => {
    const res = await request(app)
      .post('/users')
      .send(mockUsers[0])
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.body).toMatchObject({ user: UserServices.addUser(mockUsers[0]) });
  })

  it('removeUsers returns an array of User instances', async() => {
    const res = await request(app)
      .delete('/users')
      .send({ id: '001' })
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.body).toMatchObject({ users: UserServices.removeUser('001') });
  })

  it('modifyUsers returns an array of User instances', async() => {
    const mockUsersCopy = [...mockUsers];
    mockUsersCopy[0].name = "Ben Affleck";

    const res = await request(app)
      .put('/users')
      .send({ ...mockUsers[0], name: "Ben Affleck"})
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.body).toMatchObject({ users: UserServices.modifyUser({...mockUsersCopy[0], name: "Ben Affleck"}) });
  })
})