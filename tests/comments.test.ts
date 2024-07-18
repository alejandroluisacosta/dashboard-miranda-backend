import { CommentModel } from '../services/commentServices';
import mockComments from '../data/mockComments';

const request = require('supertest');
const { app }  = require('../index');

describe('Comments controller tests', () => {
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

  it('getComments returns array of comments instances', async () => {
    const res = await request(app)
      .get('/contact')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      
    expect(res.body).toMatchObject({ comments: CommentModel.getComments() })
  })

  it('getComment returns a single instance of Comment', async() => {
    const res = await request(app)
      .get('/contact/001')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')

    expect(res.body).toMatchObject({ comment: CommentModel.getComment('001') });
  })

  it('removeComments returns an array of Comment instances', async() => {
    const res = await request(app)
      .delete('/contact')
      .send({ id: '001' })
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.body).toMatchObject({ comments: CommentModel.removeComment('001') });
  })

  it('modifyComment returns an array of Comment instances', async() => {
    const mockCommentsCopy = [...mockComments];
    mockCommentsCopy[0].read = true;

    const res = await request(app)
      .patch('/contact')
      .send({ ...mockComments[0] })
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.body).toMatchObject({ comments: CommentModel.modifyComment({...mockCommentsCopy[0], read: true}) });
  })
})